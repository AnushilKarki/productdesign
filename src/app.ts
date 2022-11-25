import { join } from "path";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import { FastifyPluginAsync } from "fastify";
import { JWT } from "@fastify/jwt";

import * as cloudinary from "cloudinary";
declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
    redis: any;
  }
  export interface FastifyInstance {
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
export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Place here your custom code!
  // Place here your custom code!
  fastify.addHook("preHandler", (req, reply, next) => {
    req.jwt = fastify.jwt;
    req.redis = fastify.redis;
    next();
  });
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: { prefix: "api/v1", ...opts },
  });
};

export default app;
export { app };
