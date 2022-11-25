"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.deleteUsers = exports.updateUsers = exports.verifyEmailHandler = exports.passwordResetHandler = exports.passwordResetTokenCheckHandler = exports.forgetPasswordHandler = exports.meHandler = exports.loginHandler = exports.signupHandler = exports.prospectUserHandler = void 0;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth_service_1 = require("./auth.service");
const sendMail_1 = require("../../utils/sendMail");
const prospectUserHandler = async (request, reply) => {
    const { server: { prisma }, body, } = request;
    try {
        reply.status(200);
        const user = await (0, auth_service_1.createProspectUser)(prisma, body);
        await (0, sendMail_1.sendVerificationMail)({
            token: user.id,
            email: body === null || body === void 0 ? void 0 : body.email,
        });
        return {
            success: true,
            message: 'Invitation send successfully',
        };
    }
    catch (error) {
        throw new Error('Fail to send invitaion');
    }
};
exports.prospectUserHandler = prospectUserHandler;
const signupHandler = async (request, reply) => {
    var _a;
    const { server: { prisma }, body: { userId, ...rest }, } = request;
    try {
        if (!((_a = request.body) === null || _a === void 0 ? void 0 : _a.email)) {
            throw new Error('Looks like your email is not register');
        }
        const user = await (0, auth_service_1.findProspectUserByEmail)(prisma, rest.email);
        if (!user || !user.is_verified) {
            throw new Error('Not register/verified email');
        }
        const newUser = await (0, auth_service_1.createUser)(request.server.prisma, { ...rest });
        if (!newUser) {
            throw new Error('Unable to register');
        }
        reply.status(201);
        return {
            success: true,
            results: newUser,
        };
    }
    catch (error) {
        console.log('error=>', error);
        return new Error('Unable to register');
    }
};
exports.signupHandler = signupHandler;
const loginHandler = async (request, reply) => {
    const { email, password } = request.body;
    try {
        const user = await (0, auth_service_1.loginService)(request.server.prisma, email);
        if (!user) {
            throw new Error();
        }
        const isValidPassword = await bcrypt.compare(password, `${user === null || user === void 0 ? void 0 : user.password}`);
        if (!isValidPassword) {
            throw new Error();
        }
        const accessToken = await reply.jwtSign({
            email: user === null || user === void 0 ? void 0 : user.email,
            id: user === null || user === void 0 ? void 0 : user.id,
        });
        const refreshToken = await reply.jwtSign({
            email: user === null || user === void 0 ? void 0 : user.email,
            id: user === null || user === void 0 ? void 0 : user.id,
        }, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
        await request.redis.set(user === null || user === void 0 ? void 0 : user.id, refreshToken, 'EX', process.env.REFRESH_TOKEN_EXPIRY, () => {
            return reply
                .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: false,
                httpOnly: true,
            })
                .code(200)
                .send({
                accessToken,
                user: {
                    email: user === null || user === void 0 ? void 0 : user.email,
                    id: user === null || user === void 0 ? void 0 : user.id,
                },
            });
        });
    }
    catch (error) {
        return new Error('Invalid username/password');
    }
};
exports.loginHandler = loginHandler;
const meHandler = async (request, reply) => {
    try {
        reply.status(200);
        return {
            id: '1234',
            username: 'bijay',
        };
    }
    catch (error) {
        throw new Error('You must be logged in');
    }
};
exports.meHandler = meHandler;
const forgetPasswordHandler = async (request, reply) => {
    const { email } = request.body;
    try {
        const user = await (0, auth_service_1.findUserByEmail)(request.server.prisma, email);
        if (email !== (user === null || user === void 0 ? void 0 : user.email)) {
            throw new Error();
        }
        const secret = process.env.JWT_SECRET + (user === null || user === void 0 ? void 0 : user.password);
        const payload = {
            email: user === null || user === void 0 ? void 0 : user.email,
            id: user === null || user === void 0 ? void 0 : user.id,
        };
        const token = jwt.sign(payload, secret, { expiresIn: '30m' });
        const link = `${process.env.DOMAIN}/reset-password/?id=${user === null || user === void 0 ? void 0 : user.id}&token=${token}`;
        await (0, sendMail_1.resetLink)({
            link,
            email: 'nepal.bijaybudhathoki@gmail.com',
        });
        reply.status(200);
        return {
            success: true,
            message: 'Password reset link has been sent to your email',
        };
    }
    catch (error) {
        throw new Error('User not found');
    }
};
exports.forgetPasswordHandler = forgetPasswordHandler;
const passwordResetTokenCheckHandler = async (request, reply) => {
    const { id } = request.params;
    const token = request.params['*'];
    console.log(token);
    try {
        const user = await (0, auth_service_1.findUserById)(request.server.prisma, parseInt(id));
        if (!user)
            throw new Error();
        const secret = process.env.JWT_SECRET + (user === null || user === void 0 ? void 0 : user.password);
        await jwt.verify(token, secret);
        reply.status(200);
        return {
            success: true,
        };
    }
    catch (error) {
        throw new Error('Your token is invalid/expired');
    }
};
exports.passwordResetTokenCheckHandler = passwordResetTokenCheckHandler;
const passwordResetHandler = async (request, reply) => {
    const { id } = request.params;
    const { password } = request.body;
    try {
        await (0, auth_service_1.updatePassword)(request.server.prisma, parseInt(id), password);
        reply.status(200);
        return {
            success: true,
            message: 'Password has been reset successfully',
        };
    }
    catch (error) {
        console.log('error-r', error);
        throw new Error('Fail to up');
    }
};
exports.passwordResetHandler = passwordResetHandler;
const verifyEmailHandler = async (request, reply) => {
    const { email } = request.query;
    try {
        const user = await request.server.prisma.prospectUsers.findUnique({
            where: {
                email: email,
            },
        });
        if (user === null || user === void 0 ? void 0 : user.is_verified) {
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
    }
    catch (error) {
        return new Error('unable to varify email');
    }
};
exports.verifyEmailHandler = verifyEmailHandler;
const updateUsers = async (request, reply) => {
    const { server: { prisma }, params: { id }, body, } = request;
    try {
        const user = await (0, auth_service_1.updateUser)(prisma, parseInt(id), body);
        return reply.code(200).send({
            success: true,
            results: user,
        });
    }
    catch (error) {
        return new Error('Failt to fetch user');
    }
};
exports.updateUsers = updateUsers;
const deleteUsers = async (request, reply) => {
    const { server: { prisma }, params: { id }, } = request;
    try {
        const user = await (0, auth_service_1.deleteUser)(prisma, parseInt(id));
        return reply.code(200).send({
            success: true,
            message: 'user deleted successulyy',
            result: user,
        });
    }
    catch (error) {
        return new Error('Failt to fetch user');
    }
};
exports.deleteUsers = deleteUsers;
const getUsers = async (request, reply) => {
    const { id } = request.params;
    try {
        const user = await (0, auth_service_1.getUser)(request.server.prisma, parseInt(id));
        reply.status(200).send({
            success: true,
            results: user,
        });
    }
    catch (error) {
        return reply.code(500).send(error);
    }
};
exports.getUsers = getUsers;
//# sourceMappingURL=auth.handler.js.map