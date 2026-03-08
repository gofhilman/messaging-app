import { prisma } from "../lib/prisma";

async function usersGet(req: any, res: any) {
  const users = await prisma.user.findMany({
    orderBy: {
      online: "desc",
      createdAt: "desc",
      username: "asc",
    },
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
      id: req.params.userId,
    },
  });
  res.json({ user });
}

async function userPicturePatch(req: any, res: any) {}

async function userOnlinePatch(req: any, res: any) {}

export { usersGet, specificUserGet, userPicturePatch, userOnlinePatch };
