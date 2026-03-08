import "dotenv/config";
import { prisma } from "../../lib/prisma";

async function main() {
  console.log("seeding...");
  const user = await prisma.user.create({
    data: {
      username: "god",
      password:
        process.env.GOD_PASSWORD ??
        (() => {
          throw new Error("GOD_PASSWORD missing");
        })(),
      picture:
        "https://res.cloudinary.com/dwyzndpyq/image/upload/v1772988393/god_r6exd4.png",
    },
  });
  await prisma.chat.create({
    data: {
      name: "Global Chat",
      type: "GLOBAL",
      read: {
        create: {
          users: {
            connect: { id: user.id },
          },
        },
      },
    },
  });
  console.log("done");
}

main();
