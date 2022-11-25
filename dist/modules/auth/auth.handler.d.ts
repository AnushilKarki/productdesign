import { FastifyRequest, FastifyReply } from 'fastify';
import { ProspectInputType, LoginInputType, SignUpInputType } from './auth.schema';
export declare const prospectUserHandler: (request: FastifyRequest<{
    Body: ProspectInputType;
}>, reply: FastifyReply) => Promise<{
    success: boolean;
    message: string;
}>;
export declare const signupHandler: (request: FastifyRequest<{
    Body: SignUpInputType;
}>, reply: FastifyReply) => Promise<Error | {
    success: boolean;
    results: import(".prisma/client").Users;
}>;
export declare const loginHandler: (request: FastifyRequest<{
    Body: LoginInputType;
}>, reply: FastifyReply) => Promise<Error | undefined>;
export declare const meHandler: (request: FastifyRequest, reply: FastifyReply) => Promise<{
    id: string;
    username: string;
}>;
export declare const forgetPasswordHandler: (request: FastifyRequest<{
    Body: {
        email: string;
    };
}>, reply: FastifyReply) => Promise<{
    success: boolean;
    message: string;
}>;
export declare const passwordResetTokenCheckHandler: (request: FastifyRequest<{
    Params: {
        [x: string]: any;
    };
}, import("fastify").RawServerDefault, import("http").IncomingMessage, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, unknown, import("fastify").FastifyBaseLogger, import("fastify/types/type-provider").ResolveFastifyRequestType<import("fastify").FastifyTypeProviderDefault, import("fastify").FastifySchema, {
    Params: {
        [x: string]: any;
    };
}>>, reply: FastifyReply) => Promise<{
    success: boolean;
}>;
export declare const passwordResetHandler: (request: FastifyRequest<{
    Params: {
        [x: string]: any;
    };
    Body: {
        password: string;
    };
}, import("fastify").RawServerDefault, import("http").IncomingMessage, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, unknown, import("fastify").FastifyBaseLogger, import("fastify/types/type-provider").ResolveFastifyRequestType<import("fastify").FastifyTypeProviderDefault, import("fastify").FastifySchema, {
    Params: {
        [x: string]: any;
    };
    Body: {
        password: string;
    };
}>>, reply: FastifyReply) => Promise<{
    success: boolean;
    message: string;
}>;
export declare const verifyEmailHandler: (request: FastifyRequest<{
    Querystring: {
        token: number;
        email: string;
    };
}>, reply: FastifyReply) => Promise<Error | undefined>;
export declare const updateUsers: (request: FastifyRequest<{
    Params: {
        id: string;
    };
    Body: any;
}>, reply: FastifyReply) => Promise<Error>;
export declare const deleteUsers: (request: FastifyRequest<{
    Params: {
        id: string;
    };
    Body: any;
}>, reply: FastifyReply) => Promise<Error>;
export declare const getUsers: (request: FastifyRequest<{
    Params: {
        id: string;
    };
}>, reply: FastifyReply) => Promise<undefined>;
