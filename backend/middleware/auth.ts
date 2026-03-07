import passport from "passport";
import { AppError } from "../errors/AppError";

export function auth(req: any, res: any, next: any) {
  passport.authenticate(["jwt", "anonymous"], { session: false })(
    req,
    res,
    next,
  );
}

export const userAuth = [
  auth,
  (req: any, res: any, next: any) => {
    if (req.user) {
      return next();
    } else {
      throw new AppError(
        "Access denied, friend! This lounge is reserved for registered users. " +
          "Quit lurking. Sign up and strut in.",
        403,
      );
    }
  },
];
