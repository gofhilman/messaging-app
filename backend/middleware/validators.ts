import { body } from "express-validator";
import { prisma } from "../lib/prisma";
import { AppError } from "../errors/AppError";
import { handleValidation } from "./handleValidation";

const validateLogin: any = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(
      "Trying to log in without a username? Sweetie, we need to know " +
        "who's knocking before we open the velvet rope.",
    ),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(
      "No password? This isn't a casual stroll, it's a secured entrance. " +
        "Flash the credentials or sashay away!",
    ),
];

const validateSignup: any = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(
      "You're registering, darling. That means choosing a name that slaps, " +
        "sparkles, and screams main character energy. Don't ghost us!",
    )
    .custom(async (username) => {
      const user = await prisma.user.findUnique({
        where: { username },
      });
      if (user) {
        throw new AppError(
          "That username's already booked and busy, darling. Try something with more sparkle!",
          409,
        );
      }
      return true;
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(
      "A new account without a password? That's like wearing heels with no attitude. " +
        "Lock it down, secure your sparkle, and strut into the system!",
    ),
  body("confirm-password")
    .trim()
    .notEmpty()
    .withMessage(
      "Confirming your password is like checking your reflection before the runway, darling. " +
        "We need to know you're serving consistency!",
    )
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new AppError(
          "Mismatch alert! Your passwords aren't twinning, darling. " +
            "Serve us a perfect match before you strut in!",
          400,
        );
      }
      return true;
    }),
];

for (const validator of [validateLogin, validateSignup]) {
  validator.push(handleValidation);
}

export { validateLogin, validateSignup };
