"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const path_1 = require("path");
const autoload_1 = require("@fastify/autoload");
const cloudinary = require("cloudinary");
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = async (fastify, opts) => {
    fastify.addHook("preHandler", (req, reply, next) => {
        req.jwt = fastify.jwt;
        req.redis = fastify.redis;
        next();
    });
    void fastify.register(autoload_1.default, {
        dir: (0, path_1.join)(__dirname, "plugins"),
        options: opts,
    });
    void fastify.register(autoload_1.default, {
        dir: (0, path_1.join)(__dirname, "routes"),
        options: { prefix: "api/v1", ...opts },
    });
};
exports.app = app;
exports.default = app;
//# sourceMappingURL=app.js.map