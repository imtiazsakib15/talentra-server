import { BcryptHelper } from "./../../utils/bcrypt";
import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import prisma from "../../prisma/client";
import { UserRole, UserStatus } from "../../../generated/prisma";
import { JwtHelper } from "../../utils/jwt";
import config from "../../config";

const register = async ({
  email,
  password,
  role,
}: {
  email: string;
  password: string;
  role: UserRole;
}) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser)
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");

  const hashedPassword = await BcryptHelper.hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
      status: UserStatus.PENDING,
    },
  });

  if (!user)
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "User registration failed"
    );

  const payload = { id: user.id, email: user.email, role: user.role };
  const accessToken = JwtHelper.generateToken(
    payload,
    config.ACCESS_TOKEN_SECRET!,
    config.ACCESS_TOKEN_EXPIRY!
  );
  const refreshToken = JwtHelper.generateToken(
    payload,
    config.REFRESH_TOKEN_SECRET!,
    config.REFRESH_TOKEN_EXPIRY!
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = { register };
