import multer from "multer";
import { upload } from "./multer.middleware.js";
import { ApiError } from "../utils/ApiError.js";

const fileUploader = fieldName => (req, res, next) => {
    upload.single(fieldName) (req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return next(new ApiError(400, err.message))
        } else if (err) {
            return next(new ApiError(500, err.message))
        }

        next();
    });
};

export { fileUploader }