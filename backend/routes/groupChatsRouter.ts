import { Router } from "express";

const groupChatsRouter = Router();

groupChatsRouter.get("/");
groupChatsRouter.get("/:groupChatId");
groupChatsRouter.post("/");
groupChatsRouter.patch("/:groupChatId/name");

export default groupChatsRouter;
