/*
  Warnings:

  - You are about to drop the column `pictureUrl` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "pictureUrl",
ADD COLUMN     "profilePicture" TEXT;
