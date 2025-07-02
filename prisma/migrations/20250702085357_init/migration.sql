/*
  Warnings:

  - You are about to drop the column `bookingStstaus` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `bookingStatus` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "bookingStstaus",
ADD COLUMN     "bookingStatus" TEXT NOT NULL;
