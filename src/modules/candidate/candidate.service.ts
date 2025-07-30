import { fileUploader } from "./../../utils/fileUploader";
import httpStatus from "http-status";
import { UserStatus } from "../../../generated/prisma";
import { AppError } from "../../errors/AppError";
import prisma from "../../prisma/client";
import { Request } from "express";

const createCandidate = async (req: Request) => {
  const userId = req.user!.userId;
  const existingCandidate = await prisma.candidate.findUnique({
    where: {
      userId,
    },
  });
  if (existingCandidate)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Candidate profile already exists"
    );

  const data = req.body;
  const files: any = req.files;
  if (!files?.image || !files?.resume) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Image and resume files are required"
    );
  }

  const image = await fileUploader.uploadIntoCloudinary(files.image[0].path);
  const resume = await fileUploader.uploadIntoCloudinary(files.resume[0].path);
  if (!image || !resume) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "File upload failed");
  }

  data.image = image.secure_url;
  data.resume = resume.secure_url;
  data.userId = userId;

  const result = await prisma.$transaction((tx) => {
    const candidateProfile = tx.candidate.create({
      data,
    });
    const user = tx.user.update({
      where: { id: userId },
      data: { status: UserStatus.ACTIVE },
    });
    return candidateProfile;
  });
  return result;
};

export const CandidateService = { createCandidate };
