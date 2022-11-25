import fp from "fastify-plugin";
import fastifyRedis, { FastifyRedisPluginOptions } from "@fastify/redis";

export default fp<FastifyRedisPluginOptions>(async (fastify) => {
  fastify.register(fastifyRedis, {
    host: "127.0.0.1",
    port: 6379,
    family: 4,
  });
});
