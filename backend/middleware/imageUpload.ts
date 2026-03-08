import { AppError } from "../errors/AppError";
import { upload } from "../lib/multer";

export function imageUpload(req: any, res: any, next: any) {
  upload(req, res, (err) => {
    if (err) {
      throw new AppError(err.message, err.code);
    }
    next();
  });
}
