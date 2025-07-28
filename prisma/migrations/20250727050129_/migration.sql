/*
  Warnings:

  - You are about to drop the column `location` on the `companies` table. All the data in the column will be lost.
  - Made the column `experience` on table `candidates` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `candidates` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `candidates` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `candidates` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `candidates` required. This step will fail if there are existing NULL values in that column.
  - Made the column `resume` on table `candidates` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `address` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Made the column `website` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `industry` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `companies` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "candidates" ALTER COLUMN "experience" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "resume" SET NOT NULL;

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "location",
ADD COLUMN     "address" TEXT NOT NULL,
ALTER COLUMN "website" SET NOT NULL,
ALTER COLUMN "industry" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
