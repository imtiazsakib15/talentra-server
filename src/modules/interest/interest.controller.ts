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

export const InterestController = { sendInterest };
