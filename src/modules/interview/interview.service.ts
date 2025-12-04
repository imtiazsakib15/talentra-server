import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { interviewScheduledEmail } from "../../libs/mail/templates/interviewScheduledEmail";
import { sendEmail } from "../../libs/mail/transporter";
import prisma from "../../prisma/client";
import catchAsync from "../../utils/catchAsync";

const scheduleInterview = async (payload: {
  invitationId: string;
  candidateId: string;
  companyId: string;
  meetingLink: string;
  scheduledAt: Date;
}) => {
  const existing = await prisma.interview.findUnique({
    where: { invitationId: payload.invitationId },
  });
  if (existing) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have already scheduled an interview for this candidate"
    );
  }
  const result = await prisma.interview.create({
    data: {
      invitationId: payload.invitationId,
      candidateId: payload.candidateId,
      companyId: payload.companyId,
      meetingLink: payload.meetingLink,
      scheduledAt: new Date(payload.scheduledAt),
    },
    include: {
      candidate: {
        select: { user: { select: { email: true } }, fullName: true },
      },
      company: {
        select: { companyName: true },
      },
    },
  });

  try {
    await sendEmail({
      to: result.candidate.user.email,
      subject: "Your Interview is Scheduled",
      html: interviewScheduledEmail({
        candidateName: result.candidate.fullName,
        companyName: result.company.companyName,
        meetingLink: result.meetingLink,
        scheduledAt: new Date(result.scheduledAt).toLocaleString(),
      }),
    });
  } catch (err) {
    console.error("EMAIL SEND FAILED:", err);
  }

  return result;
};

const getCandidateInterviews = async (userId: string) => {
  const candidate = await prisma.candidate.findUnique({
    where: { userId },
  });
  const candidateId = candidate?.id;

  if (!candidateId) {
    throw new AppError(httpStatus.NOT_FOUND, "Candidate not found");
  }

  const result = await prisma.interview.findMany({
    where: { candidateId },
    include: { company: true },
  });

  return result;
};

export const InterviewService = { scheduleInterview, getCandidateInterviews };
