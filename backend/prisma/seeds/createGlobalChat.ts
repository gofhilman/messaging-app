import { prisma } from "../../lib/prisma";

async function main() {
  console.log("seeding...");
  await prisma.chat.create({
    data: {
      name: "Global Chat",
      type: "GLOBAL",
    },
  });
  console.log("done");
}

main();
