/*
  Warnings:

  - Made the column `description` on table `Content` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tags` on table `Content` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Content" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "tags" SET NOT NULL;
