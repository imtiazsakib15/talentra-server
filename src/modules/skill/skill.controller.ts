import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SkillService } from "./skill.service";

const createSkill = catchAsync(async (req, res) => {
  const result = await SkillService.createSkill(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "New skill added successfully",
    data: result,
  });
});

export const SkillController = { createSkill };
