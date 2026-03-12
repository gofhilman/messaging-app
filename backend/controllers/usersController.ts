import { prisma } from "../lib/prisma";
import { v2 as cloudinary } from "cloudinary";

const offlineTimers = new Map();

async function usersGet(req: any, res: any) {
  const users = await prisma.user.findMany({
    orderBy: [{ online: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
      username: true,
      picture: true,
      online: true,
    },
  });
  res.json({ users });
}

async function specificUserGet(req: any, res: any) {
  const user = await prisma.user.findUnique({
    select: {
      id: true,
      username: true,
      picture: true,
      online: true,
    },
    where: {
      username: req.params.username,
    },
  });
  res.json({ user });
}

async function userPicturePatch(req: any, res: any) {
  const base64 = req.file.buffer.toString("base64");
  const fileUri = `data:${req.file.mimetype};base64,${base64}`;
  const file = await cloudinary.uploader.upload(fileUri, {
    asset_folder: "messaging_app",
  });
  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: { picture: file.secure_url },
    select: {
      id: true,
      username: true,
      picture: true,
      online: true,
    },
  });
  res.json({ user });
}

async function userOnlinePatch(req: any, res: any) {
  const id = req.user.id;
  const select = {
    id: true,
    username: true,
    picture: true,
    online: true,
  };
  const user = await prisma.user.update({
    where: { id },
    data: { online: true },
    select,
  });
  if (offlineTimers.has(id)) {
    clearTimeout(offlineTimers.get(id));
  }
  offlineTimers.set(
    id,
    setTimeout(async () => {
      await prisma.user.update({
        where: { id },
        data: { online: false },
        select,
      });
      offlineTimers.delete(id);
    }, 60 * 1000), // turn to offline after 1 min
  );

  res.json({ user });
}

export { usersGet, specificUserGet, userPicturePatch, userOnlinePatch };
