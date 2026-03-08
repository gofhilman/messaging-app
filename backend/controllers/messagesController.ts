import { prisma } from "../lib/prisma";

async function textPost(req: any, res: any) {
  const { chatId, text } = req.body;
  const message = await prisma.message.create({
    data: {
      chatId,
      text,
      type: "TEXT",
      userId: req.user.id,
    },
  });
  res.json({ message });
}

async function imagePost(req: any, res: any) {}

export { textPost, imagePost };
