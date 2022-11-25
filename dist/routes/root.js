"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const root = async (fastify) => {
    fastify.get("/", {
        schema: {
            tags: ["healthcheck"],
            summary: "healthcheck",
            description: "Healthcheck endpoint to determine if server is up and running",
            response: {
                200: {
                    type: "object",
                    properties: {
                        status: { type: "string" },
                        timestamp: { type: "string", format: "date-time" },
                    },
                },
            },
        },
    }, async function () {
        return { status: "ok", timestamp: new Date().toISOString() };
    });
};
exports.default = root;
//# sourceMappingURL=root.js.map