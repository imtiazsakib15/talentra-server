import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";
import { InterestController } from "./interest.controller";
import validateRequest from "../../middlewares/validateRequest";
import { InterestSchema } from "./interest.schema";

const router = Router();

router.post(
  "/",
  auth(UserRole.COMPANY),
  validateRequest(InterestSchema.sendInterest),
  InterestController.sendInterest
);

export const InterestRoute = router;
