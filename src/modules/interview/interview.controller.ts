import httpStatus from "http-status";
import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { InterviewService } from "./interview.service";
import prisma from "../../prisma/client";
import { AppError } from "../../errors/AppError";

const scheduleInterview = catchAsync(async (req: Request, res: Response) => {
  const result = await InterviewService.scheduleInterview(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Interview scheduled and candidate notified.",
    data: result,
  });
});

const getCandidateInterviews = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    const result = await InterviewService.getCandidateInterviews(userId!);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Candidate interviews retrieved successfully",
      data: result,
    });
  }
);

export const InterviewController = {
  scheduleInterview,
  getCandidateInterviews,
};
