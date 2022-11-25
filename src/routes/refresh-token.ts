/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FastifyPluginAsync } from 'fastify';
import { loginService } from '../modules/auth/auth.service';

// import { refreshTokenHandler } from '../modules/auth/auth.handler';

const refreshToken: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.addHook('onRequest', async (request) => {
        //@ts-ignore
        await request.jwtVerify({ onlyCookie: true });
    });
    /**
     * @api {POST} /api/v1/refresh-token
     * @access public
     */

    fastify.post('/refresh-token', {}, async (request, reply) => {
        try {
            const refToken = await request.cookies?.refreshToken;
            const decoded: any = await request.jwt.verify(refToken || '');
            const storeData = await request.redis.get(decoded?.id);

            if (!storeData) throw new Error();

            const user = await loginService(
                request.server.prisma,
                decoded?.email,
            );

            if (!user) {
                throw new Error('Resources not found');
            }
            // const roles = user?.roles;
            const token = await reply.jwtSign({
                email: user?.email,
                id: user?.id,
                // roles,
            });
            const refreshToken = await reply.jwtSign(
                {
                    email: decoded?.email,
                    id: decoded?.id,
                },
                { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
            );
            await request.redis.set(
                decoded?.id,
                refreshToken,
                'EX',
                process.env.REFRESH_TOKEN_EXPIRY,
                () => {
                    return reply
                        .setCookie('refreshToken', refreshToken, {
                            // domain: 'your.domain',
                            path: '/',
                            secure: false, // send cookie over HTTPS only
                            httpOnly: true,
                            sameSite: 'lax', // alternative CSRF protection
                        })
                        .code(200)
                        .send({ accessToken: token });
                },
            );
        } catch (error) {
            return new Error('something went wrong');
        }
    });
};
export default refreshToken;
