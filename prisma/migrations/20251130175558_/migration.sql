/*
  Warnings:

  - The `status` column on the `interests` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('ACCEPTED', 'DECLINED', 'PENDING');

-- AlterTable
ALTER TABLE "interests" DROP COLUMN "status",
ADD COLUMN     "status" "InvitationStatus" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "InterestStatus";
