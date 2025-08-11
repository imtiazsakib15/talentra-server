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

const getInterestById = catchAsync(async (req, res) => {
  const result = await InterestService.getInterestById(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Interest retrieved successfully",
    data: result,
  });
});

const acceptInterest = catchAsync(async (req, res) => {
  const result = await InterestService.acceptInterest(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Interest accepted successfully",
    data: result,
  });
});

const declineInterest = catchAsync(async (req, res) => {
  const result = await InterestService.declineInterest(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Interest declined successfully",
    data: result,
  });
});

export const InterestController = {
  sendInterest,
  getSentInterests,
  getReceivedInterests,
  getInterestById,
  acceptInterest,
  declineInterest,
};
