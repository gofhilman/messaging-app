import multer from "multer";
import { AppError } from "../errors/AppError";

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Max file size: 50 MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new AppError(
          "Uh-uh honey, only cute pics allowed! (jpeg, png, webp, gif)",
          415,
        ),
      );
    }
  },
}).single("image");

export { upload };
