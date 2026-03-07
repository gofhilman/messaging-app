import { Router } from "express";
import { userAuth } from "../middleware/auth";
import {
  chatNamePatch,
  chatPost,
  chatsGet,
  specificChatGet,
} from "../controllers/chatsController";
import { validateChat } from "../middleware/validators";

const chatsRouter = Router();

chatsRouter.get("/", userAuth, chatsGet);
chatsRouter.get("/:chatId", userAuth, specificChatGet);
chatsRouter.post("/", userAuth, validateChat, chatPost);
chatsRouter.patch("/:chatId/name", userAuth, validateChat, chatNamePatch);

export default chatsRouter;
