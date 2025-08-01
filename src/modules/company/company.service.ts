import { Request } from "express";
import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import prisma from "../../prisma/client";
import { fileUploader } from "../../utils/fileUploader";
import { UserStatus } from "../../../generated/prisma";

const createCompany = async (req: Request) => {
  const userId = req.user!.userId;
  const existingCompany = await prisma.company.findUnique({
    where: {
      userId,
    },
  });
  if (existingCompany)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Company profile already exists"
    );

  const data = req.body;
  const file: any = req.file;
  if (!file) {
    throw new AppError(httpStatus.BAD_REQUEST, "Logo is required");
  }

  const logo = await fileUploader.uploadIntoCloudinary(file.path);
  if (!logo) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "File upload failed");
  }

  data.logo = logo.secure_url;
  data.userId = userId;

  const result = await prisma.$transaction(async (tx) => {
    const companyProfile = await tx.company.create({
      data,
    });
    await tx.user.update({
      where: { id: userId },
      data: { status: UserStatus.ACTIVE },
    });

    return companyProfile;
  });
  return result;
};

const getCompanyProfile = async (userId: string) => {
  const companyProfile = await prisma.company.findUnique({
    where: {
      userId,
    },
    include: {
      user: true,
    },
  });
  if (!companyProfile)
    throw new AppError(httpStatus.NOT_FOUND, "Company profile not found");

  return companyProfile;
};

export const CompanyService = {
  createCompany,
  getCompanyProfile,
};
