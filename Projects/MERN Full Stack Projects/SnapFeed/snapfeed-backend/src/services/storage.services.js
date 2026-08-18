import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadPostImage = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "snapfeed/posts",
                resource_type: "image",
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        stream.end(fileBuffer);
    });
};

const uploadProfileImage = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "snapfeed/profile",
                resource_type: "image",
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        stream.end(fileBuffer);
    });
};


export {
    uploadPostImage,
    uploadProfileImage
};

// Using Funtion : const result = await uploadPostImage(req.file.buffer);
// For express purpose: 
/*
import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
    storage,
});
*/