/*
  Warnings:

  - You are about to drop the column `pictureUrl` on the `Host` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Host" DROP COLUMN "pictureUrl",
ADD COLUMN     "profilePicture" TEXT;
