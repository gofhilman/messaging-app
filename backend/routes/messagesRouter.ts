import { Router } from "express";
import { imagePost, textPost } from "../controllers/messagesController";
import { imageUpload } from "../middleware/imageUpload";

const messagesRouter = Router();

messagesRouter.post("/text", textPost);
messagesRouter.post("/image", imageUpload, imagePost);

export default messagesRouter;
