"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = require("fastify-plugin");
const multipart_1 = require("@fastify/multipart");
exports.default = (0, fastify_plugin_1.default)(async (fastify) => {
    fastify.register(multipart_1.default, {
        limits: {
            fileSize: 1000000,
        },
    });
});
//# sourceMappingURL=multipart.js.map