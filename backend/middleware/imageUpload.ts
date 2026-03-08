import { AppError } from "../errors/AppError";
import { upload } from "../lib/multer";

export function imageUpload(req: any, res: any, next: any) {
  upload(req, res, (err) => {
    if (err) throw new AppError(err.message, err.code);
    if (!req.file) {
      throw new AppError("Honey, don't play shy, upload that image!", 400);
    }
    next();
  });
}
