import { Request, Response } from "express";
import { UserService } from "./user.service";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  res.json({ success: true, data: users });
};

export const getSingleUser = async (req: Request, res: Response) => {
  const user = await UserService.getSingleUser(req.params.id);
  res.json({ success: true, data: user });
};

export const updateUserStatus = async (req: Request, res: Response) => {
  const user = await UserService.updateUserStatus(
    req.params.id,
    req.body.status
  );
  res.json({ success: true, message: "Status updated", data: user });
};

export const UserController = {
  getAllUsers,
  getSingleUser,
  updateUserStatus,
};
