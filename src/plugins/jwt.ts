/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie = require("@fastify/cookie");

export default fp(async function (fastify) {
  fastify.register(fastifyCookie);
  // @ts-ignore
  fastify.register(fastifyJwt, {
    secret: `${process.env.ACCESS_TOKEN_SECRET}`,
    cookie: {
      cookieName: "refreshToken",
    },
    sign: {
      expiresIn: "100m",
    },
  });
  fastify.decorate(
    "authenticate",
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    }
  );
});
