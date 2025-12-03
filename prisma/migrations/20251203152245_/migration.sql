/*
  Warnings:

  - A unique constraint covering the columns `[invitationId]` on the table `Interview` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Interview_invitationId_key" ON "Interview"("invitationId");
