/*
  Warnings:

  - You are about to drop the column `read` on the `Chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "read";

-- CreateTable
CREATE TABLE "Read" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,

    CONSTRAINT "Read_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ReadToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ReadToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Read_chatId_key" ON "Read"("chatId");

-- CreateIndex
CREATE INDEX "_ReadToUser_B_index" ON "_ReadToUser"("B");

-- AddForeignKey
ALTER TABLE "Read" ADD CONSTRAINT "Read_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReadToUser" ADD CONSTRAINT "_ReadToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Read"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReadToUser" ADD CONSTRAINT "_ReadToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
