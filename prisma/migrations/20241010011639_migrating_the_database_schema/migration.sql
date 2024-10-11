/*
  Warnings:

  - You are about to drop the `Check` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Count` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CountStreaks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quanity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuanityStreaks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Time` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TimeStreaks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `checkStreaks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CountStreaks" DROP CONSTRAINT "CountStreaks_checkId_fkey";

-- DropForeignKey
ALTER TABLE "CountStreaks" DROP CONSTRAINT "CountStreaks_countId_fkey";

-- DropForeignKey
ALTER TABLE "CountStreaks" DROP CONSTRAINT "CountStreaks_streakId_fkey";

-- DropForeignKey
ALTER TABLE "QuanityStreaks" DROP CONSTRAINT "QuanityStreaks_quanityId_fkey";

-- DropForeignKey
ALTER TABLE "QuanityStreaks" DROP CONSTRAINT "QuanityStreaks_streakId_fkey";

-- DropForeignKey
ALTER TABLE "Streaks" DROP CONSTRAINT "Streaks_userId_fkey";

-- DropForeignKey
ALTER TABLE "TimeStreaks" DROP CONSTRAINT "TimeStreaks_streakId_fkey";

-- DropForeignKey
ALTER TABLE "TimeStreaks" DROP CONSTRAINT "TimeStreaks_timeId_fkey";

-- DropForeignKey
ALTER TABLE "checkStreaks" DROP CONSTRAINT "checkStreaks_checkId_fkey";

-- DropForeignKey
ALTER TABLE "checkStreaks" DROP CONSTRAINT "checkStreaks_streakId_fkey";

-- AlterTable
ALTER TABLE "Streaks" ADD COLUMN     "isComplete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reportType" TEXT,
ADD COLUMN     "totalCount" INTEGER,
ADD COLUMN     "totalInputs" INTEGER,
ADD COLUMN     "totalQuantity" INTEGER,
ADD COLUMN     "totalTime" INTEGER,
ADD COLUMN     "unit" TEXT,
ALTER COLUMN "streak" SET DEFAULT 0,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "Check";

-- DropTable
DROP TABLE "Count";

-- DropTable
DROP TABLE "CountStreaks";

-- DropTable
DROP TABLE "Quanity";

-- DropTable
DROP TABLE "QuanityStreaks";

-- DropTable
DROP TABLE "Time";

-- DropTable
DROP TABLE "TimeStreaks";

-- DropTable
DROP TABLE "checkStreaks";

-- AddForeignKey
ALTER TABLE "Streaks" ADD CONSTRAINT "Streaks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
