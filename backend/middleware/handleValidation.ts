import { validationResult } from "express-validator";

export function handleValidation(req: any, res: any, next: any) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: {
        code: 400,
        message: errors.array().map((err) => err.msg),
      },
    });
  }
  next();
}
