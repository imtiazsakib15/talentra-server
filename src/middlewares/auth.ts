import { JwtHelper } from "./../utils/jwt";
import httpStatus from "http-status";
import { AppError } from "../errors/AppError";
import config from "../config";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { TDecodedUser } from "../types";
import { UserRole, UserStatus } from "../../generated/prisma";
import prisma from "../prisma/client";

const auth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers?.authorization;

      if (!authHeader)
        return next(new AppError(httpStatus.FORBIDDEN, "No token provided"));
      if (!authHeader.startsWith("Bearer "))
        return next(new AppError(httpStatus.FORBIDDEN, "Invalid token format"));

      const token = authHeader.split(" ")[1] as string | undefined;

      if (!token)
        return next(new AppError(httpStatus.FORBIDDEN, "No token provided"));

      const user = JwtHelper.verifyToken(token, config.ACCESS_TOKEN_SECRET!);
      if (!roles.includes(user.role)) {
        return next(
          new AppError(httpStatus.FORBIDDEN, "You are not authorized")
        );
      }
      const userInfo = await prisma.user.findUnique({
        where: { id: user.userId },
        select: {
          id: true,
          email: true,
          role: true,
          status: true,
        },
      });
      console.log(authHeader);
      if (!userInfo)
        return next(new AppError(httpStatus.UNAUTHORIZED, "User not found"));

      if (
        userInfo.status !== UserStatus.ACTIVE &&
        userInfo.status !== UserStatus.PENDING
      )
        return next(
          new AppError(httpStatus.UNAUTHORIZED, "User is not active")
        );

      if (userInfo.role !== user.role)
        return next(new AppError(httpStatus.FORBIDDEN, "Role mismatch"));

      req.user = user as TDecodedUser;
      next();
    } catch (error) {
      return next(error);
    }
  };
};

export default auth;
