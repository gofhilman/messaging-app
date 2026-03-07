import { Router } from "express";
import { auth } from "../middleware/auth";

const authRouter = Router();

authRouter.get("/me", auth);
authRouter.post("/signup");
authRouter.post("/login");

export default authRouter;
