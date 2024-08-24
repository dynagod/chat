import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, "./src/public/temp");
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`);
    }
  });

  export const upload = multer(
    {
      storage,
      limits: { fileSize: 1024 * 1024 * 5 }
    }
  )