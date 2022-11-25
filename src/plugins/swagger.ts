import fp from "fastify-plugin";
import swagger, { SwaggerOptions } from "@fastify/swagger";

export default fp<SwaggerOptions>(async (fastify) => {
  fastify.register(swagger, {
    routePrefix: "/documentation",
    swagger: {
      info: {
        title: "BASE API",
        description: "this is base api ",
        version: "0.1.0",
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here",
      },
      // host: 'localhost',
      // schemes: ['http'],
      consumes: ["application/json"],
      produces: ["application/json"],
      // securityDefinitions: {
      //     apiKey: {
      //         type: 'apiKey',
      //         name: 'apiKey',
      //         in: 'header',
      //     },
      // },
    },
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true,
  });
});
