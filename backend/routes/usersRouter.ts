import { Router } from "express";
import {
  specificUserGet,
  userOnlinePatch,
  userPicturePatch,
  usersGet,
} from "../controllers/usersController";
import { userAuth } from "../middleware/auth";
import { imageUpload } from "../middleware/imageUpload";

const usersRouter = Router();

usersRouter.get("/", usersGet);
usersRouter.get("/:username", specificUserGet);
usersRouter.patch("/me/picture", userAuth, imageUpload, userPicturePatch);
usersRouter.patch("/me/online", userAuth, userOnlinePatch);

export default usersRouter;
