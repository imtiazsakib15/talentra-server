import httpStatus from "http-status";
import prisma from "../../prisma/client";
import { AppError } from "../../errors/AppError";

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

const getSentInterests = async (userId: string) => {
  const company = await prisma.company.findUnique({ where: { userId } });
  if (!company) throw new AppError(httpStatus.NOT_FOUND, "Company not found");

  const result = await prisma.interest.findMany({
    where: {
      companyId: company.id,
    },
  });
  return result;
};

export const InterestService = { sendInterest, getSentInterests };
