import { Router } from "express";

const chatsRouter = Router();

chatsRouter.get("/");
chatsRouter.get("/:chatId");
chatsRouter.post("/");

export default chatsRouter;
