// import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
// import { uploader } from '../helper/uploader';

// const upload: FastifyPluginAsync = async (fastify) => {
//     fastify.post(
//         '/upload',
//         {
//             schema: {
//                 description: 'upload(single) file',
//                 tags: ['upload'],
//                 summary: 'upload file',
//             },
//         },
//         async (request: FastifyRequest, reply: FastifyReply) => {
//             if (!request.isMultipart) {
//                 throw new Error('Request is not multipart');
//             }

//             try {
//                 const data = await request.file();
//                 const buffer = await data.toBuffer();
//                 const image = await uploader(buffer);
//                 reply.status(200).send({
//                     sucess: true,
//                     message: 'file uploaded successfully',
//                     image,
//                 });
//             } catch (error) {
//                 reply.code(500).send(error);
//             }
//         },
//     );
// };
// export default upload;
