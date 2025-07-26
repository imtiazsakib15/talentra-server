/*
  Warnings:

  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.
  - Added the required column `image` to the `candidates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candidates" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "logo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "image";
