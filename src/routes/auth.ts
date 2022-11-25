/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import {
    prospectUserHandler,
    signupHandler,
    loginHandler,
    forgetPasswordHandler,
    passwordResetTokenCheckHandler,
    passwordResetHandler,
    verifyEmailHandler,
    getUsers,
    deleteUsers,
    updateUsers,
} from '../modules/auth/auth.handler';
import {
    ProspectInputResponse,
    ProspectInputType,
    // LoginInputResponse,
    LoginInputType,
    SignUpInputResponseType,
    SignUpInputType,
    SignUpResponse,
} from '../modules/auth/auth.schema';

const auth: FastifyPluginAsync = async (fastify): Promise<void> => {
    /**
     * @api {POST} /api/v1/get-started
     * @access public
     * @description collect user email
     */
    fastify.post<{
        Body: ProspectInputType;
    }>(
        '/get-started',
        {
            schema: {
                description: 'Send invitation link',
                tags: ['Invite'],
                summary: 'invitation link',
                response: {
                    200: ProspectInputResponse,
                },
            },
        },
        prospectUserHandler,
    );

    /**
     * @api {POST} /api/v1/signup
     * @access public
     * @description create user
     */
    fastify.post<{
        Body: SignUpInputType;
        Reply: SignUpInputResponseType;
    }>(
        '/signup',
        {
            schema: {
                description: 'user login route',
                tags: ['Signup'],
                summary: 'auth',
                response: {
                    200: SignUpResponse,
                },
            },
        },
        signupHandler,
    );

    /**
     * @api {POST} /api/v1/login
     * @access public
     * @description user login
     */
    fastify.post<{
        Body: LoginInputType;
    }>(
        '/login',
        {
            schema: {
                description: 'user login route',
                tags: ['Login'],
                summary: 'auth',
            },
        },
        loginHandler,
    );

    /**
     * @api {POST} /api/v1/me
     * @access public
     * @description  get user profile
     */
    fastify.get(
        '/me',
        {
            preHandler: [fastify.authenticate],
        },
        () => {
            console.log('handler');
        },
    );

    /**
     * @api {POST} /api/v1/logout
     * @access public
     */
    fastify.post(
        '/logout',
        { preHandler: [fastify.authenticate] },
        async (request: FastifyRequest, reply: FastifyReply) => {
            return reply
                .clearCookie('refreshToken')
                .code(200)
                .send({ success: true });
            // .setCookie('refreshToken', '', {
            //     //@ts-ignore
            //     expires: Date.now(),
            //     // domain: 'your.domain',
            //     path: '/',
            //     secure: false, // send cookie over HTTPS only
            //     httpOnly: true,
            //     // sameSite: true, // alternative CSRF protection
            // })
        },
    );
    /**
     * @api {POST} /api/v1/forgetPassword
     * @access public
     */
    fastify.post(
        '/forget-password',
        {
            schema: {
                description: 'forget password',
                tags: ['Forget password'],
                summary: 'forget password',
                body: {
                    type: 'object',
                    properties: {
                        email: { type: 'string' },
                    },
                },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                        },
                    },
                },
            },
        },
        forgetPasswordHandler,
    );

    /**
     * @api {POST} /api/v1/reset-password/:id/:token
     * @access public
     */
    fastify.get(
        '/reset-password/:id/*',
        {
            schema: {
                tags: ['Reset password'],
                summary: 'reset password',
                params: {
                    id: { type: 'string' },
                    token: { type: 'string' },
                },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            messsage: { type: 'string' },
                        },
                    },
                },
            },
        },
        passwordResetTokenCheckHandler,
    );

    /**
     * @api {POST} /api/v1/reset-password/:id/:token
     * @access public
     * @description reset password
     */
    fastify.post(
        '/reset-password/:id/*',
        {
            preHandler: passwordResetTokenCheckHandler,
            schema: {
                tags: ['Reset password'],
                summary: 'reset password',
                params: {
                    id: { type: 'string' },
                    token: { type: 'string' },
                },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                        },
                    },
                },
            },
        },
        passwordResetHandler,
    );

    /**
     * @api {POST} /api/v1/varify
     * @access public
     */
    fastify.get(
        '/user-email/verify',
        {
            schema: {
                tags: ['varify email'],
                summary: 'email verify',
                querystring: {
                    token: { type: 'string' },
                    email: { type: 'string' },
                },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                        },
                    },
                },
            },
        },
        verifyEmailHandler,
    );
    fastify.get(
        '/users',
        {
            schema: {
                description: 'Fetch all users',
                tags: ['user'],
                summary: 'fetch users',
                response: {
                    200: SignUpResponse,
                },
            },
        },
        getUsers,
    );

    fastify.put(
        '/:id',
        {
            schema: {
                description: 'Update single user',
                tags: ['user'],
                summary: 'update user',
                response: {
                    200: SignUpResponse,
                },
            },
        },
        updateUsers,
    );

    fastify.delete(
        '/:id',
        {
            schema: {
                description: 'delete single user',
                tags: ['user'],
                summary: 'delete user',
            },
        },
        deleteUsers,
    );
};

export default auth;
