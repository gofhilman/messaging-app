import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/");
usersRouter.patch("/me/name");
usersRouter.patch("/me/picture");
usersRouter.patch("/me/online");

export default usersRouter;
