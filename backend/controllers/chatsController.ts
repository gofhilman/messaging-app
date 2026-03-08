import { findChatByUsers } from "../generated/prisma/sql";
import { prisma } from "../lib/prisma";
import { v2 as cloudinary } from "cloudinary";

async function chatsGet(req: any, res: any) {
  const users = {
    select: {
      id: true,
      username: true,
      picture: true,
      online: true,
    },
  };
  const chats = await prisma.chat.findMany({
    orderBy: { lastMessageAt: "desc" },
    include: {
      users,
      messages: true,
      read: {
        include: {
          users,
        },
      },
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

async function globalChatGet(req: any, res: any) {
  const select = {
    id: true,
    username: true,
    picture: true,
    online: true,
  };
  const chat = await prisma.chat.findFirst({
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
      type: "GLOBAL",
    },
  });
  res.json({ chat });
}

async function specificChatGet(req: any, res: any) {
  const select = {
    id: true,
    username: true,
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
  const read = {
    create: {
      users: {
        connect: { id: req.user.id },
      },
    },
  };
  if (name) {
    chat = await prisma.chat.create({
      data: {
        name,
        type,
        read,
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
        read,
        users: {
          connect: userIds.map((id: any) => ({ id })),
        },
      },
    });
  }
  res.json({ chat });
}

async function textPost(req: any, res: any) {
  const message = await prisma.message.create({
    data: {
      chatId: req.params.chatId,
      type: "TEXT",
      text: req.body.text,
      userId: req.user.id,
    },
  });
  await updateChat(req.params.chatId, req.user.id);
  res.json({ message });
}

async function imagePost(req: any, res: any) {
  const base64 = req.file.buffer.toString("base64");
  const fileUri = `data:${req.file.mimetype};base64,${base64}`;
  const file = await cloudinary.uploader.upload(fileUri, {
    asset_folder: "messaging_app",
  });
  const message = await prisma.message.create({
    data: {
      chatId: req.params.chatId,
      type: "IMAGE",
      image: file.secure_url,
      userId: req.user.id,
    },
  });
  await updateChat(req.params.chatId, req.user.id);
  res.json({ message });
}

async function chatNamePatch(req: any, res: any) {
  const chat = await prisma.chat.update({
    where: { id: req.params.chatId },
    data: { name: req.body.name },
  });
  res.json({ chat });
}

async function chatReadPatch(req: any, res: any) {
  const chat = await prisma.chat.update({
    where: { id: req.params.chatId },
    data: {
      read: {
        update: {
          users: {
            connect: { id: req.user.id },
          },
        },
      },
    },
  });
  res.json({ chat });
}

async function updateChat(chatId: string, userId: string) {
  await prisma.chat.update({
    where: { id: chatId },
    data: {
      lastMessageAt: new Date(),
      read: {
        update: {
          users: {
            set: { id: userId },
          },
        },
      },
    },
  });
}

export {
  chatsGet,
  globalChatGet,
  specificChatGet,
  chatPost,
  textPost,
  imagePost,
  chatNamePatch,
  chatReadPatch,
};
