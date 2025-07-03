/*
  Warnings:

  - You are about to drop the `_AmenitiesToProperty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_userId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_hostId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "_AmenitiesToProperty" DROP CONSTRAINT "_AmenitiesToProperty_A_fkey";

-- DropForeignKey
ALTER TABLE "_AmenitiesToProperty" DROP CONSTRAINT "_AmenitiesToProperty_B_fkey";

-- DropTable
DROP TABLE "_AmenitiesToProperty";
