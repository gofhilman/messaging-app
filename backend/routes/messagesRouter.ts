import { Router } from "express";

const messagesRouter = Router();

messagesRouter.post("/text");
messagesRouter.post("/image");

export default messagesRouter;
