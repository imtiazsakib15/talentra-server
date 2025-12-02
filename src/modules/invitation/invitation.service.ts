import httpStatus from "http-status";
import prisma from "../../prisma/client";
import { AppError } from "../../errors/AppError";
import { InvitationStatus } from "../../../generated/prisma";
import { invitationEmail } from "../../libs/mail/templates/invitationEmail";
import { sendEmail } from "../../libs/mail/transporter";
import { invitationAcceptedEmail } from "../../libs/mail/templates/invitationAcceptedEmail";
import { invitationDeclinedEmail } from "../../libs/mail/templates/invitationDeclinedEmail";

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
      html: invitationEmail(invitation.company.companyName, payload.message),
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
    orderBy: { createdAt: "desc" },
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
    include: {
      company: true,
    },
    orderBy: { createdAt: "desc" },
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
    select: {
      company: {
        select: { user: { select: { email: true } }, companyName: true },
      },
      candidate: {
        select: { fullName: true },
      },
    },
  });

  try {
    await sendEmail({
      to: result.company.user.email,
      subject: "Your invitation has been accepted",
      html: invitationAcceptedEmail(
        result.company.companyName,
        result.candidate.fullName
      ),
    });
  } catch (err) {
    console.error("EMAIL SEND FAILED:", err);
  }

  return result;
};

const declineInvitation = async (id: string) => {
  const result = await prisma.invitation.update({
    where: { id },
    data: { status: InvitationStatus.DECLINED },
    select: {
      company: {
        select: { user: { select: { email: true } }, companyName: true },
      },
      candidate: {
        select: { fullName: true },
      },
    },
  });

  try {
    await sendEmail({
      to: result.company.user.email,
      subject: "Your invitation has been declined",
      html: invitationDeclinedEmail(
        result.company.companyName,
        result.candidate.fullName
      ),
    });
  } catch (err) {
    console.error("EMAIL SEND FAILED:", err);
  }

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
