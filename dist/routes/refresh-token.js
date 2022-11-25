"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("../modules/auth/auth.service");
const refreshToken = async (fastify) => {
    fastify.addHook('onRequest', async (request) => {
        await request.jwtVerify({ onlyCookie: true });
    });
    fastify.post('/refresh-token', {}, async (request, reply) => {
        var _a;
        try {
            const refToken = await ((_a = request.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken);
            const decoded = await request.jwt.verify(refToken || '');
            const storeData = await request.redis.get(decoded === null || decoded === void 0 ? void 0 : decoded.id);
            if (!storeData)
                throw new Error();
            const user = await (0, auth_service_1.loginService)(request.server.prisma, decoded === null || decoded === void 0 ? void 0 : decoded.email);
            if (!user) {
                throw new Error('Resources not found');
            }
            const token = await reply.jwtSign({
                email: user === null || user === void 0 ? void 0 : user.email,
                id: user === null || user === void 0 ? void 0 : user.id,
            });
            const refreshToken = await reply.jwtSign({
                email: decoded === null || decoded === void 0 ? void 0 : decoded.email,
                id: decoded === null || decoded === void 0 ? void 0 : decoded.id,
            }, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
            await request.redis.set(decoded === null || decoded === void 0 ? void 0 : decoded.id, refreshToken, 'EX', process.env.REFRESH_TOKEN_EXPIRY, () => {
                return reply
                    .setCookie('refreshToken', refreshToken, {
                    path: '/',
                    secure: false,
                    httpOnly: true,
                    sameSite: 'lax',
                })
                    .code(200)
                    .send({ accessToken: token });
            });
        }
        catch (error) {
            return new Error('something went wrong');
        }
    });
};
exports.default = refreshToken;
//# sourceMappingURL=refresh-token.js.map