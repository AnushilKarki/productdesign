"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = void 0;
const cloudinary = require("cloudinary");
const uploader = (file) => new Promise((resolve, rejects) => {
    cloudinary.v2.uploader
        .upload_stream({
        folder: "base_api",
    }, (error, result) => {
        if (error) {
            rejects(error);
        }
        resolve(result);
    })
        .end(file);
});
exports.uploader = uploader;
//# sourceMappingURL=uploader.js.map