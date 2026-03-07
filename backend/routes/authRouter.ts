import { Router } from "express";
import { auth } from "../middleware/auth";
import { loginPost, meGet, signupPost } from "../controllers/authController";
import { validateLogin, validateSignup } from "../middleware/validators";

const authRouter = Router();

authRouter.get("/me", auth, meGet);
authRouter.post("/signup", validateSignup, signupPost);
authRouter.post("/login", validateLogin, loginPost);

export default authRouter;
