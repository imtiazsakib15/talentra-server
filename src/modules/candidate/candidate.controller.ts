import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CandidateService } from "./candidate.service";

const createCandidate = catchAsync(async (req, res) => {
  const result = await CandidateService.createCandidate(req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Candidate profile created successfully",
    data: result,
  });
});

const getCandidateProfile = catchAsync(async (req, res) => {
  const result = await CandidateService.getCandidateProfile(req.user!.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Candidate profile retrieved successfully",
    data: result,
  });
});

const getCandidateProfileById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CandidateService.getCandidateProfileById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Candidate profile retrieved successfully",
    data: result,
  });
});

const updateVisibility = catchAsync(async (req, res) => {
  const result = await CandidateService.updateVisibility(
    req.user!.userId,
    req.body.isVisible
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Candidate profile visibility updated successfully",
    data: result,
  });
});

export const CandidateController = {
  createCandidate,
  getCandidateProfile,
  getCandidateProfileById,
  updateVisibility,
};
