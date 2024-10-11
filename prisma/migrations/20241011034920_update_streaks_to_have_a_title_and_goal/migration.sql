/*
  Warnings:

  - Added the required column `goal` to the `Streaks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Streaks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Streaks" ADD COLUMN     "goal" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
