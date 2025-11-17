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

  const { skills, ...data } = req.body;

  const uniqueSkillIds = [...new Set(skills)] as string[];
  const validSkills = await prisma.skill.findMany({
    where: { id: { in: uniqueSkillIds } },
  });
  if (validSkills.length !== uniqueSkillIds.length)
    throw new Error("Invalid skill IDs");

  const file: any = req.file;
  if (!file) {
    throw new AppError(httpStatus.BAD_REQUEST, "Image file are required");
  }

  const image = await fileUploader.uploadIntoCloudinary(file.path);
  if (!image) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "File upload failed");
  }

  data.image = image.secure_url;
  data.userId = userId;

  const result = await prisma.$transaction(async (tx) => {
    const candidateProfile = await tx.candidate.create({
      data: {
        ...data,
        skills: {
          create: uniqueSkillIds.map((skillId) => ({ skillId })),
        },
      },
      include: {
        skills: {
          include: { skill: true },
        },
      },
    });
    await tx.user.update({
      where: { id: userId },
      data: { status: UserStatus.ACTIVE },
    });

    return candidateProfile;
  });
  return result;
};

const getAllCandidatesProfile = async (query: any) => {
  const {
    skills,
    experienceMin,
    location,
    country,
    available,
    visible = "true",
    page = "1",
    limit = "20",
  } = query;

  // Pagination
  const pageNum = parseInt(page as string) || 1;
  const pageSize = parseInt(limit as string) || 20;

  // Prisma filter object
  const filter: any = {
    user: { status: UserStatus.ACTIVE },
  };

  // Skill filtering (skills=react,nextjs)
  if (skills) {
    const skillArray = (skills as string).split(",").map((s) => s.trim());

    filter.skills = {
      some: {
        skill: {
          name: { in: skillArray },
        },
      },
    };
  }

  // Experience filter
  if (experienceMin) {
    filter.experience = {
      gte: Number(experienceMin),
    };
  }

  // Location filter
  if (location) {
    filter.city = {
      contains: location as string,
      mode: "insensitive",
    };
  }

  // Country filter
  if (country) {
    filter.country = {
      contains: country as string,
      mode: "insensitive",
    };
  }

  // Availability
  if (available) {
    filter.isAvailable = available === "true";
  }

  // Visibility
  filter.isVisible = visible === "true";

  // Fetch candidates
  const candidates = await prisma.candidate.findMany({
    where: filter,
    include: {
      skills: {
        include: {
          skill: true,
        },
      },
      user: {
        select: {
          email: true,
          status: true,
        },
      },
    },
    skip: (pageNum - 1) * pageSize,
    take: pageSize,
    orderBy: {
      createdAt: "desc",
    },
  });

  const total = await prisma.candidate.count({ where: filter });

  const meta = {
    total,
    page: pageNum,
    limit: pageSize,
    totalPages: Math.ceil(total / pageSize),
  };

  return { data: candidates, meta };
};

const getCandidateProfile = async (userId: string) => {
  const candidateProfile = await prisma.candidate.findUnique({
    where: {
      userId,
    },
    include: {
      user: true,
      skills: {
        include: { skill: true },
      },
    },
  });
  if (!candidateProfile)
    throw new AppError(httpStatus.NOT_FOUND, "Candidate profile not found");

  return candidateProfile;
};

const getCandidateProfileById = async (id: string) => {
  const candidateProfile = await prisma.candidate.findUnique({
    where: { id },
    include: {
      user: true,
      skills: {
        include: { skill: true },
      },
    },
  });
  if (!candidateProfile)
    throw new AppError(httpStatus.NOT_FOUND, "Candidate profile not found");

  return candidateProfile;
};

const updateVisibility = async (userId: string, isVisible: boolean) => {
  const updatedProfile = await prisma.candidate.update({
    where: {
      userId,
    },
    data: {
      isVisible,
    },
  });

  return updatedProfile;
};

export const CandidateService = {
  createCandidate,
  getAllCandidatesProfile,
  getCandidateProfile,
  getCandidateProfileById,
  updateVisibility,
};
