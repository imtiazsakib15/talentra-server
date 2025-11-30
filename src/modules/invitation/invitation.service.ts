import httpStatus from "http-status";
import prisma from "../../prisma/client";
import { AppError } from "../../errors/AppError";
import { InvitationStatus } from "../../../generated/prisma";
import { invitationEmailTemplate } from "../../libs/mail/templates/invitationEmailTemplate";
import { sendEmail } from "../../libs/mail/transporter";

const sendInvitation = async (payload: {
  companyId: string;
  candidateId: string;
  message: string;
}) => {
  const existing = await prisma.invitation.findUnique({
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
      "You have already sent invitation to this candidate."
    );
  }
  console.log(existing, payload);
  const invitation = await prisma.invitation.create({
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

  const candidateEmail = invitation.candidate.user.email;

  try {
    await sendEmail({
      to: candidateEmail,
      subject: "You received a new invitation",
      html: invitationEmailTemplate(
        invitation.company.companyName,
        payload.message
      ),
    });
  } catch (err) {
    console.error("EMAIL SEND FAILED:", err);
  }

  return invitation;
};

const getSentInvitations = async (userId: string) => {
  const company = await prisma.company.findUnique({
    where: { userId },
    select: { id: true },
  });
  if (!company) throw new AppError(httpStatus.NOT_FOUND, "Company not found");

  const result = await prisma.invitation.findMany({
    where: {
      companyId: company.id,
    },
    include: {
      candidate: true,
    },
  });
  return result;
};

const getReceivedInvitations = async (userId: string) => {
  const candidate = await prisma.candidate.findUnique({
    where: { userId },
    select: { id: true },
  });
  if (!candidate)
    throw new AppError(httpStatus.NOT_FOUND, "Candidate not found");

  const result = await prisma.invitation.findMany({
    where: {
      candidateId: candidate.id,
    },
  });
  return result;
};

const getInvitationById = async (id: string) => {
  const result = await prisma.invitation.findUnique({ where: { id } });
  return result;
};

const acceptInvitation = async (id: string) => {
  const result = await prisma.invitation.update({
    where: { id },
    data: { status: InvitationStatus.ACCEPTED },
  });
  return result;
};

const declineInvitation = async (id: string) => {
  const result = await prisma.invitation.update({
    where: { id },
    data: { status: InvitationStatus.DECLINED },
  });
  return result;
};

export const InvitationService = {
  sendInvitation,
  getSentInvitations,
  getReceivedInvitations,
  getInvitationById,
  acceptInvitation,
  declineInvitation,
};
