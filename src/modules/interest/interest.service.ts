import prisma from "../../prisma/client";

const sendInterest = async ({
  companyId,
  candidateId,
}: {
  companyId: string;
  candidateId: string;
}) => {
  return await prisma.interest.create({
    data: { companyId, candidateId },
  });
};

export const InterestService = { sendInterest };
