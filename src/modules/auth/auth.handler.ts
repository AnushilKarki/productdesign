/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from 'fastify';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import {
    ProspectInputType,
    LoginInputType,
    SignUpInputType,
} from './auth.schema';
import {
    createUser,
    findUserByEmail,
    findUserById,
    createProspectUser,
    loginService,
    updatePassword,
    findProspectUserByEmail,
    updateUser,
    deleteUser,
    getUser,
} from './auth.service';
import { resetLink, sendVerificationMail } from '../../utils/sendMail';

export const prospectUserHandler = async (
    request: FastifyRequest<{
        Body: ProspectInputType;
    }>,
    reply: FastifyReply,
) => {
    const {
        server: { prisma },
        body,
    } = request;

    try {
        reply.status(200);
        const user = await createProspectUser(prisma, body);
        await sendVerificationMail({
            token: user.id,
            email: body?.email,
        });

        return {
            success: true,
            message: 'Invitation send successfully',
        };
    } catch (error) {
        throw new Error('Fail to send invitaion');
    }
};

export const signupHandler = async (
    request: FastifyRequest<{
        Body: SignUpInputType;
    }>,
    reply: FastifyReply,
) => {
    const {
        server: { prisma },
        body: { userId, ...rest },
    } = request;

    try {
        if (!request.body?.email) {
            throw new Error('Looks like your email is not register');
        }
        const user = await findProspectUserByEmail(prisma, rest.email);

        if (!user || !user.is_verified) {
            throw new Error('Not register/verified email');
        }
        const newUser = await createUser(request.server.prisma, { ...rest });

        if (!newUser) {
            throw new Error('Unable to register');
        }
        reply.status(201);

        return {
            success: true,
            results: newUser,
        };
    } catch (error: any) {
        console.log('error=>', error);

        return new Error('Unable to register');
    }
};

export const loginHandler = async (
    request: FastifyRequest<{
        Body: LoginInputType;
    }>,
    reply: FastifyReply,
) => {
    const { email, password } = request.body;

    try {
        const user = await loginService(request.server.prisma, email);

        if (!user) {
            throw new Error();
        }

        const isValidPassword = await bcrypt.compare(
            password,
            `${user?.password}`,
        );

        if (!isValidPassword) {
            throw new Error();
        }
        // const roles = user?.roles?.map((r) => r.Roles?.title);
        const accessToken = await reply.jwtSign({
            email: user?.email,
            id: user?.id,
            // roles,
        });

        const refreshToken = await reply.jwtSign(
            {
                email: user?.email,
                id: user?.id,
                // name: user?.full_name,
            },
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
        );
        await request.redis.set(
            user?.id,
            refreshToken,
            'EX',
            process.env.REFRESH_TOKEN_EXPIRY,
            () => {
                return reply
                    .setCookie('refreshToken', refreshToken, {
                        // domain: 'your.domain',
                        path: '/',
                        secure: false, // send cookie over HTTPS only
                        httpOnly: true,
                        // sameSite: true, // alternative CSRF protection
                    })
                    .code(200)
                    .send({
                        accessToken,
                        user: {
                            email: user?.email,
                            id: user?.id,
                            // roles,
                            // profile: user?.profile,
                            // full_name: user?.full_name,
                        },
                    });
            },
        );
    } catch (error) {
        return new Error('Invalid username/password');
    }
};

export const meHandler = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    try {
        // const { userId } = request.session.user;
        // TODO
        // find user by id

        reply.status(200);

        return {
            id: '1234',
            username: 'bijay',
        };
    } catch (error) {
        throw new Error('You must be logged in');
    }
};

export const forgetPasswordHandler = async (
    request: FastifyRequest<{
        Body: {
            email: string;
        };
    }>,
    reply: FastifyReply,
) => {
    const { email } = request.body;

    try {
        const user = await findUserByEmail(request.server.prisma, email);

        if (email !== user?.email) {
            throw new Error();
        }
        //if user exits  create unique jwt secret valid for 15 minuts
        const secret = process.env.JWT_SECRET + user?.password;
        const payload = {
            email: user?.email,
            id: user?.id,
        };
        const token = jwt.sign(payload, secret, { expiresIn: '30m' });
        const link = `${process.env.DOMAIN}/reset-password/?id=${user?.id}&token=${token}`;
        await resetLink({
            link,
            email: 'nepal.bijaybudhathoki@gmail.com',
        });

        reply.status(200);

        return {
            success: true,
            message: 'Password reset link has been sent to your email',
        };
    } catch (error) {
        throw new Error('User not found');
    }
};

export const passwordResetTokenCheckHandler = async (
    request: FastifyRequest<{
        Params: {
            [x: string]: any;
        };
    }>,
    reply: FastifyReply,
) => {
    const { id } = request.params;
    const token = request.params['*'];
    console.log(token);

    try {
        const user = await findUserById(request.server.prisma, parseInt(id));

        if (!user) throw new Error();
        const secret = process.env.JWT_SECRET + user?.password;
        await jwt.verify(token, secret);
        reply.status(200);

        return {
            success: true,
        };
    } catch (error) {
        throw new Error('Your token is invalid/expired');
    }
};

export const passwordResetHandler = async (
    request: FastifyRequest<{
        Params: {
            [x: string]: any;
        };
        Body: {
            password: string;
        };
    }>,
    reply: FastifyReply,
) => {
    const { id } = request.params;
    const { password } = request.body;

    try {
        await updatePassword(request.server.prisma, parseInt(id), password);

        reply.status(200);

        return {
            success: true,
            message: 'Password has been reset successfully',
        };
    } catch (error) {
        console.log('error-r', error);
        throw new Error('Fail to up');
    }
};

/** verify emial address */
export const verifyEmailHandler = async (
    request: FastifyRequest<{
        Querystring: {
            token: number;
            email: string;
        };
    }>,
    reply: FastifyReply,
) => {
    const { email } = request.query;

    try {
        const user = await request.server.prisma.prospectUsers.findUnique({
            where: {
                email: email,
            },
        });

        if (user?.is_verified) {
            return reply.code(200).send({
                success: true,
                message: 'Email already varifed',
            });
        }

        if (!user) {
            throw new Error();
        }

        await request.server.prisma.prospectUsers.update({
            where: {
                email,
            },
            data: {
                is_verified: true,
            },
        });
        reply.status(200);
        reply.send({ success: true, message: 'Email vefifed' });
    } catch (error) {
        return new Error('unable to varify email');
    }
};

export const updateUsers = async (
    request: FastifyRequest<{
        Params: {
            id: string;
        };
        Body: any;
    }>,
    reply: FastifyReply,
) => {
    const {
        server: { prisma },
        params: { id },
        body,
    } = request;

    try {
        const user = await updateUser(prisma, parseInt(id), body);

        return reply.code(200).send({
            success: true,
            results: user,
        });
    } catch (error) {
        return new Error('Failt to fetch user');
    }
};

export const deleteUsers = async (
    request: FastifyRequest<{
        Params: {
            id: string;
        };
        Body: any;
    }>,
    reply: FastifyReply,
) => {
    const {
        server: { prisma },
        params: { id },
    } = request;

    try {
        const user = await deleteUser(prisma, parseInt(id));

        return reply.code(200).send({
            success: true,
            message: 'user deleted successulyy',
            result: user,
        });
    } catch (error) {
        return new Error('Failt to fetch user');
    }
};

export const getUsers = async (
    request: FastifyRequest<{
        Params: {
            id: string;
        };
    }>,
    reply: FastifyReply,
) => {
    const { id } = request.params;

    try {
        const user = await getUser(request.server.prisma, parseInt(id));
        reply.status(200).send({
            success: true,
            results: user,
        });
    } catch (error) {
        return reply.code(500).send(error);
    }
};
