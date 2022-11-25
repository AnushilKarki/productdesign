"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = require("fastify-plugin");
const cors_1 = require("@fastify/cors");
exports.default = (0, fastify_plugin_1.default)(async (fastify) => {
    fastify.register(cors_1.default, {});
});
//# sourceMappingURL=cors.js.map