import { Router } from "express";

import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";
import { UserController } from "./user.controller";

const router = Router();

router.get("/", auth(UserRole.ADMIN), UserController.getAllUsers);
router.get("/:id", auth(UserRole.ADMIN), UserController.getSingleUser);
router.put(
  "/:id/status",
  auth(UserRole.ADMIN),
  UserController.updateUserStatus
);

export const UserRoute = router;
