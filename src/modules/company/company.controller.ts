import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CompanyService } from "../company/company.service";

const createCompany = catchAsync(async (req, res) => {
  const result = await CompanyService.createCompany(req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Company profile created successfully",
    data: result,
  });
});

const getCompanyProfile = catchAsync(async (req, res) => {
  const result = await CompanyService.getCompanyProfile(req.user!.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Company profile retrieved successfully",
    data: result,
  });
});

export const CompanyController = {
  createCompany,
  getCompanyProfile,
};
