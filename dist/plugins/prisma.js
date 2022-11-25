"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = require("fastify-plugin");
const client_1 = require("@prisma/client");
const prismaPlugin = (0, fastify_plugin_1.default)(async (server) => {
    const prisma = new client_1.PrismaClient();
    await prisma.$connect();
    server.decorate("prisma", prisma);
    server.addHook("onClose", async (server) => {
        await server.prisma.$disconnect();
    });
});
exports.default = prismaPlugin;
//# sourceMappingURL=prisma.js.map