"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = require("fastify-plugin");
const jwt_1 = require("@fastify/jwt");
const fastifyCookie = require("@fastify/cookie");
exports.default = (0, fastify_plugin_1.default)(async function (fastify) {
    fastify.register(fastifyCookie);
    fastify.register(jwt_1.default, {
        secret: `${process.env.ACCESS_TOKEN_SECRET}`,
        cookie: {
            cookieName: "refreshToken",
        },
        sign: {
            expiresIn: "100m",
        },
    });
    fastify.decorate("authenticate", async function (request, reply) {
        try {
            await request.jwtVerify();
        }
        catch (err) {
            reply.send(err);
        }
    });
});
//# sourceMappingURL=jwt.js.map