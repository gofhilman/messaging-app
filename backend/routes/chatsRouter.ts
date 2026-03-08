import { Router } from "express";
import { userAuth } from "../middleware/auth";
import {
  chatNamePatch,
  chatPost,
  chatsGet,
  globalChatGet,
  imagePost,
  specificChatGet,
  textPost,
} from "../controllers/chatsController";
import { validateChat, validateText } from "../middleware/validators";
import { imageUpload } from "../middleware/imageUpload";

const chatsRouter = Router();

chatsRouter.get("/", userAuth, chatsGet);
chatsRouter.get("/global", globalChatGet);
chatsRouter.get("/:chatId", userAuth, specificChatGet);
chatsRouter.post("/", userAuth, validateChat, chatPost);
chatsRouter.post("/:chatId/messages/text", userAuth, validateText, textPost);
chatsRouter.post("/:chatId/messages/image", userAuth, imageUpload, imagePost);
chatsRouter.patch("/:chatId/name", userAuth, validateChat, chatNamePatch);

export default chatsRouter;
