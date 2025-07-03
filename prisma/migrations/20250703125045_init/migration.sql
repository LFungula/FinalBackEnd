-- DropIndex
DROP INDEX "Host_pictureUrl_key";

-- DropIndex
DROP INDEX "User_pictureUrl_key";

-- AlterTable
ALTER TABLE "Host" ALTER COLUMN "pictureUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "pictureUrl" DROP NOT NULL;
