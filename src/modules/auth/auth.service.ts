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
      lastLogin: new Date(),
    },
  });

  if (!user)
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "User registration failed"
    );

  const payload = { userId: user.id, email: user.email, role: user.role };
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

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      role: true,
      password: true,
      status: true,
    },
  });
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");

  const isPasswordMatched = await BcryptHelper.comparePassword(
    password,
    user.password
  );
  if (!isPasswordMatched)
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid password");

  if (user.status !== UserStatus.ACTIVE && user.status !== UserStatus.PENDING)
    throw new AppError(httpStatus.UNAUTHORIZED, "User is not active");

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });

  const payload = { userId: user.id, email: user.email, role: user.role };
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

export const AuthService = { register, login };
