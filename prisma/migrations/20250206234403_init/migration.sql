/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Vote` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "createdAt";
