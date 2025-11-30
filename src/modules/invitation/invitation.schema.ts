import z from "zod";
import { InvitationStatus } from "../../../generated/prisma";

const sendInvitation = z.object({
  companyId: z.string().min(1, "Company ID is required"),
  candidateId: z.string().min(1, "Candidate ID is required"),
  message: z.string().optional().default(""),
  status: z
    .enum([
      InvitationStatus.PENDING,
      InvitationStatus.ACCEPTED,
      InvitationStatus.DECLINED,
    ])
    .default(InvitationStatus.PENDING),
});

export const InvitationSchema = { sendInvitation };
