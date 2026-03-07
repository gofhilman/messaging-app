export class AppError extends Error {
  statusCode: any;
  constructor(message: any, statusCode: any) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
}