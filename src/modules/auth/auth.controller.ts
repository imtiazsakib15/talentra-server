import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import config from "../../config";

const register = catchAsync(async (req, res) => {
  const { email, password, role } = req.body;
  const user = await AuthService.register({ email, password, role });

  res.cookie("refreshToken", user.refreshToken, {
    httpOnly: !(config.NODE_ENV === "development"),
    secure: !(config.NODE_ENV === "development"),
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: { accessToken: user.accessToken },
  });
});

export const AuthController = { register };
