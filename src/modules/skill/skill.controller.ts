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

const getAllSkills = catchAsync(async (req, res) => {
  const result = await SkillService.getAllSkills();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All skills retrieved successfully",
    data: result,
  });
});

const getSkillById = catchAsync(async (req, res) => {
  const skillId = req.params.id;
  const result = await SkillService.getSkillById(skillId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skill retrieved successfully",
    data: result,
  });
});

const updateSkill = catchAsync(async (req, res) => {
  const skillId = req.params.id;
  const result = await SkillService.updateSkill(skillId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skill updated successfully",
    data: result,
  });
});

const deleteSkill = catchAsync(async (req, res) => {
  const skillId = req.params.id;
  const result = await SkillService.deleteSkill(skillId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skill deleted successfully",
    data: result,
  });
});

export const SkillController = {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
};
