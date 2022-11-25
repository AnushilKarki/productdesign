"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = require("fastify-plugin");
const redis_1 = require("@fastify/redis");
exports.default = (0, fastify_plugin_1.default)(async (fastify) => {
    fastify.register(redis_1.default, {
        host: "127.0.0.1",
        port: 6379,
        family: 4,
    });
});
//# sourceMappingURL=redis.js.map