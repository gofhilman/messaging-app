import { AppError } from "../errors/AppError";
import { findChatByUsers } from "../generated/prisma/sql";
import { prisma } from "../lib/prisma";

async function chatsGet(req: any, res: any) {
  const chats = await prisma.chat.findMany({
    orderBy: { lastMessageAt: "desc" },
    include: {
      messages: true,
    },
    where: {
      users: {
        some: { id: req.user.id },
      },
      lastMessageAt: { not: null },
    },
  });
  res.json({ chats });
}

async function specificChatGet(req: any, res: any) {
  const select = {
    username: true,
    name: true,
    picture: true,
    online: true,
  };
  const chat = await prisma.chat.findUnique({
    include: {
      users: { select },
      messages: {
        orderBy: { createdAt: "desc" },
        include: {
          user: { select },
        },
      },
    },
    where: {
      id: req.params.chatId,
    },
  });
  res.json({ chat });
}

async function chatPost(req: any, res: any) {
  let chat;
  const { name, type, userIds } = req.body;
  if (!userIds.includes(req.user.id)) {
    userIds.push(req.user.id);
  }
  if (name) {
    chat = await prisma.chat.create({
      data: {
        name,
        type,
        users: {
          connect: userIds.map((id: any) => ({ id })),
        },
      },
    });
  } else {
    const [existing] = await prisma.$queryRawTyped(
      findChatByUsers(type, userIds),
    );
    chat = await prisma.chat.upsert({
      where: { id: existing?.id ?? "" },
      update: {},
      create: {
        type,
        users: {
          connect: userIds.map((id: any) => ({ id })),
        },
      },
    });
  }
  res.json({ chat });
}

async function chatNamePatch(req: any, res: any) {
  const chat = await prisma.chat.update({
    where: { id: req.params.chatId },
    data: { name: req.body.name },
  });
  res.json({ chat });
}

export { chatsGet, specificChatGet, chatPost, chatNamePatch };
