import z from "zod";
import { InterestStatus } from "../../../generated/prisma";

const sendInterest = z.object({
  companyId: z.string().min(1, "Company ID is required"),
  candidateId: z.string().min(1, "Candidate ID is required"),
  message: z.string().optional().default(""),
  status: z
    .enum([
      InterestStatus.PENDING,
      InterestStatus.ACCEPTED,
      InterestStatus.DECLINED,
    ])
    .default(InterestStatus.PENDING),
});

export const InterestSchema = { sendInterest };
