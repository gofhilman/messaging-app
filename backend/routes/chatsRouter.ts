import { Router } from "express";

const chatsRouter = Router();

chatsRouter.get("/");
chatsRouter.get("/:chatId");
chatsRouter.post("/");
chatsRouter.patch("/:chatId/name");

export default chatsRouter;
