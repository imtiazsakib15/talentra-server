import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { InterestService } from "./interest.service";

const sendInterest = catchAsync(async (req, res) => {
  const result = await InterestService.sendInterest(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Interest sent successfully",
    data: result,
  });
});

const getSentInterests = catchAsync(async (req, res) => {
  const result = await InterestService.getSentInterests(req.user!.userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Sent interests retrieved successfully",
    data: result,
  });
});

const getReceivedInterests = catchAsync(async (req, res) => {
  const result = await InterestService.getReceivedInterests(req.user!.userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Received interests retrieved successfully",
    data: result,
  });
});

export const InterestController = {
  sendInterest,
  getSentInterests,
  getReceivedInterests,
};
