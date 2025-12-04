import { UserStatus } from "../../../generated/prisma";
import prisma from "../../prisma/client";

const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    include: {
      candidate: true,
      company: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return result;
};

const getSingleUser = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: { id },
    include: {
      candidate: true,
      company: true,
    },
  });

  return result;
};

const updateUserStatus = async (id: string, status: UserStatus) => {
  const result = await prisma.user.update({
    where: { id },
    data: { status },
  });

  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUserStatus,
};
