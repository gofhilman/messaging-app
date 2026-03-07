/*
  Warnings:

  - You are about to drop the column `groupChatId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `groupChatId` on the `Text` table. All the data in the column will be lost.
  - You are about to drop the `GroupChat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GroupChatToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('PRIVATE', 'GROUP');

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_groupChatId_fkey";

-- DropForeignKey
ALTER TABLE "Text" DROP CONSTRAINT "Text_groupChatId_fkey";

-- DropForeignKey
ALTER TABLE "_GroupChatToUser" DROP CONSTRAINT "_GroupChatToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupChatToUser" DROP CONSTRAINT "_GroupChatToUser_B_fkey";

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "name" TEXT,
ADD COLUMN     "type" "Type" NOT NULL;

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "groupChatId";

-- AlterTable
ALTER TABLE "Text" DROP COLUMN "groupChatId";

-- DropTable
DROP TABLE "GroupChat";

-- DropTable
DROP TABLE "_GroupChatToUser";
