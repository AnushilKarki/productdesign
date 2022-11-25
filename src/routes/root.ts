import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get(
    "/",
    {
      schema: {
        tags: ["healthcheck"],
        summary: "healthcheck",
        description:
          "Healthcheck endpoint to determine if server is up and running",
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
    },
    async function () {
      return { status: "ok", timestamp: new Date().toISOString() };
    }
  );
};

export default root;
