/*
  Warnings:

  - You are about to drop the column `downvotes` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `upvotes` on the `Content` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "downvotes",
DROP COLUMN "upvotes";
