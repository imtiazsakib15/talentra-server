/*
  Warnings:

  - The values [REJECTED] on the enum `InterestStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `fromId` on the `interests` table. All the data in the column will be lost.
  - You are about to drop the column `toId` on the `interests` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyId,candidateId]` on the table `interests` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `candidateId` to the `interests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `interests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InterestStatus_new" AS ENUM ('ACCEPTED', 'DECLINED', 'PENDING');
ALTER TABLE "interests" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "interests" ALTER COLUMN "status" TYPE "InterestStatus_new" USING ("status"::text::"InterestStatus_new");
ALTER TYPE "InterestStatus" RENAME TO "InterestStatus_old";
ALTER TYPE "InterestStatus_new" RENAME TO "InterestStatus";
DROP TYPE "InterestStatus_old";
ALTER TABLE "interests" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "interests" DROP CONSTRAINT "interests_fromId_fkey";

-- DropForeignKey
ALTER TABLE "interests" DROP CONSTRAINT "interests_toId_fkey";

-- DropIndex
DROP INDEX "interests_fromId_toId_key";

-- AlterTable
ALTER TABLE "interests" DROP COLUMN "fromId",
DROP COLUMN "toId",
ADD COLUMN     "candidateId" TEXT NOT NULL,
ADD COLUMN     "companyId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "interests_companyId_candidateId_key" ON "interests"("companyId", "candidateId");

-- AddForeignKey
ALTER TABLE "interests" ADD CONSTRAINT "interests_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interests" ADD CONSTRAINT "interests_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
