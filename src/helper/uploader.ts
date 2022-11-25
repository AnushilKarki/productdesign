/* eslint-disable @typescript-eslint/no-explicit-any */
import * as cloudinary from "cloudinary";
export const uploader = (file: any) =>
  new Promise((resolve, rejects) => {
    cloudinary.v2.uploader
      .upload_stream(
        {
          folder: "base_api",
        },
        (error, result) => {
          if (error) {
            rejects(error);
          }
          resolve(result);
        }
      )
      .end(file);
  });

//multiple file upload
//  async () => {
//             if (!request.isMultipart) {
//                 throw new Error('Request is not multipart');
//             }
//             const urls = [];

//             try {
//                 const files = await request.files();

//                 for await (const part of files) {
//                     request.log.info('storing %s', part.filename);
//                     const buffer = await part.toBuffer();
//                     const image = await uploader(buffer);
//                     urls.push(image);
//                 }
//                 console.log('ursl', urls);
//                 reply.status(200).send({
//                     urls,
//                 });
//             } catch (error) {
//                 reply.code(500).send(error);
//             }
//         },
