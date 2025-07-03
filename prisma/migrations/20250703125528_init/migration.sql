/*
  Warnings:

  - You are about to drop the column `bathroomCount` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "bathroomCount",
ADD COLUMN     "bathRoomCount" INTEGER,
ALTER COLUMN "bedroomCount" DROP NOT NULL,
ALTER COLUMN "maxGuestCount" DROP NOT NULL,
ALTER COLUMN "rating" DROP NOT NULL;
