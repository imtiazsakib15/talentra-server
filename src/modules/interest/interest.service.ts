import httpStatus from "http-status";
import prisma from "../../prisma/client";
import { AppError } from "../../errors/AppError";
import { InterestStatus } from "../../../generated/prisma";
import { invitationEmailTemplate } from "../../libs/mail/templates/invitationEmailTemplate";
import { sendEmail } from "../../libs/mail/transporter";

const sendInterest = async (payload: {
  companyId: string;
  candidateId: string;
  message: string;
}) => {
  const existing = await prisma.interest.findUnique({
    where: {
      companyId_candidateId: {
        companyId: payload.companyId,
        candidateId: payload.candidateId,
      },
    },
  });

  if (existing) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have already sent interest to this candidate."
    );
  }

  const interest = await prisma.interest.create({
    data: payload,
    include: {
      company: {
        include: { user: true },
      },
      candidate: {
        include: { user: true },
      },
    },
  });

  const candidateEmail = interest.candidate.user.email;

  try {
    await sendEmail({
      to: candidateEmail,
      subject: "You received a new invitation",
      html: invitationEmailTemplate(
        interest.company.companyName,
        payload.message
      ),
    });
  } catch (err) {
    console.error("EMAIL SEND FAILED:", err);
  }

  return interest;
};

const getSentInterests = async (userId: string) => {
  const company = await prisma.company.findUnique({
    where: { userId },
    select: { id: true },
  });
  if (!company) throw new AppError(httpStatus.NOT_FOUND, "Company not found");

  const result = await prisma.interest.findMany({
    where: {
      companyId: company.id,
    },
    include: {
      candidate: true,
    },
  });
  return result;
};

const getReceivedInterests = async (userId: string) => {
  const candidate = await prisma.candidate.findUnique({
    where: { userId },
    select: { id: true },
  });
  if (!candidate)
    throw new AppError(httpStatus.NOT_FOUND, "Candidate not found");

  const result = await prisma.interest.findMany({
    where: {
      candidateId: candidate.id,
    },
  });
  return result;
};

const getInterestById = async (id: string) => {
  const result = await prisma.interest.findUnique({ where: { id } });
  return result;
};

const acceptInterest = async (id: string) => {
  const result = await prisma.interest.update({
    where: { id },
    data: { status: InterestStatus.ACCEPTED },
  });
  return result;
};

const declineInterest = async (id: string) => {
  const result = await prisma.interest.update({
    where: { id },
    data: { status: InterestStatus.DECLINED },
  });
  return result;
};

export const InterestService = {
  sendInterest,
  getSentInterests,
  getReceivedInterests,
  getInterestById,
  acceptInterest,
  declineInterest,
};
