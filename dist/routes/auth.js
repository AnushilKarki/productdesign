"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_handler_1 = require("../modules/auth/auth.handler");
const auth_schema_1 = require("../modules/auth/auth.schema");
const auth = async (fastify) => {
    fastify.post('/get-started', {
        schema: {
            description: 'Send invitation link',
            tags: ['Invite'],
            summary: 'invitation link',
            response: {
                200: auth_schema_1.ProspectInputResponse,
            },
        },
    }, auth_handler_1.prospectUserHandler);
    fastify.post('/signup', {
        schema: {
            description: 'user login route',
            tags: ['Signup'],
            summary: 'auth',
            response: {
                200: auth_schema_1.SignUpResponse,
            },
        },
    }, auth_handler_1.signupHandler);
    fastify.post('/login', {
        schema: {
            description: 'user login route',
            tags: ['Login'],
            summary: 'auth',
        },
    }, auth_handler_1.loginHandler);
    fastify.get('/me', {
        preHandler: [fastify.authenticate],
    }, () => {
        console.log('handler');
    });
    fastify.post('/logout', { preHandler: [fastify.authenticate] }, async (request, reply) => {
        return reply
            .clearCookie('refreshToken')
            .code(200)
            .send({ success: true });
    });
    fastify.post('/forget-password', {
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
    }, auth_handler_1.forgetPasswordHandler);
    fastify.get('/reset-password/:id/*', {
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
    }, auth_handler_1.passwordResetTokenCheckHandler);
    fastify.post('/reset-password/:id/*', {
        preHandler: auth_handler_1.passwordResetTokenCheckHandler,
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
    }, auth_handler_1.passwordResetHandler);
    fastify.get('/user-email/verify', {
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
    }, auth_handler_1.verifyEmailHandler);
    fastify.get('/users', {
        schema: {
            description: 'Fetch all users',
            tags: ['user'],
            summary: 'fetch users',
            response: {
                200: auth_schema_1.SignUpResponse,
            },
        },
    }, auth_handler_1.getUsers);
    fastify.put('/:id', {
        schema: {
            description: 'Update single user',
            tags: ['user'],
            summary: 'update user',
            response: {
                200: auth_schema_1.SignUpResponse,
            },
        },
    }, auth_handler_1.updateUsers);
    fastify.delete('/:id', {
        schema: {
            description: 'delete single user',
            tags: ['user'],
            summary: 'delete user',
        },
    }, auth_handler_1.deleteUsers);
};
exports.default = auth;
//# sourceMappingURL=auth.js.map