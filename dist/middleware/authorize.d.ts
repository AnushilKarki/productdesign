import { FastifyRequest } from "fastify";
export declare const verifySuperAdmin: (request: FastifyRequest) => Promise<void>;
export declare const verifyAdmin: () => Promise<void>;
export declare const verifyUser: () => Promise<void>;
