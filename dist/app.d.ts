import { AutoloadPluginOptions } from "@fastify/autoload";
import { FastifyPluginAsync } from "fastify";
import { JWT } from "@fastify/jwt";
declare module "fastify" {
    interface FastifyRequest {
        jwt: JWT;
        redis: any;
    }
    interface FastifyInstance {
        authenticate: any;
        user: any;
    }
}
declare module "@fastify/jwt" {
    interface FastifyJWT {
        user: {
            id: number;
            email: string;
            [x: string]: any;
        };
    }
}
export declare type AppOptions = {} & Partial<AutoloadPluginOptions>;
declare const app: FastifyPluginAsync<AppOptions>;
export default app;
export { app };
