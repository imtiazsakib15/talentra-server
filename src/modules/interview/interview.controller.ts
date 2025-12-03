import httpStatus from "http-status";
import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { InterviewService } from "./interview.service";

export const scheduleInterview = catchAsync(
  async (req: Request, res: Response) => {
    const result = await InterviewService.scheduleInterview(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Interview scheduled and candidate notified.",
      data: result,
    });
  }
);

export const InterviewController = { scheduleInterview };
