import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";
import { InterestController } from "./interest.controller";
import validateRequest from "../../middlewares/validateRequest";
import { InterestSchema } from "./interest.schema";

const router = Router();

// Send interest to candidate
router.post(
  "/",
  auth(UserRole.COMPANY),
  validateRequest(InterestSchema.sendInterest),
  InterestController.sendInterest
);

// Get my sent interests (Company)
router.get(
  "/sent",
  auth(UserRole.COMPANY),
  InterestController.getSentInterests
);

// Get interests I received (Candidate)
router.get(
  "/received",
  auth(UserRole.CANDIDATE),
  InterestController.getReceivedInterests
);

// Get specific interest
router.get(
  "/:id",
  auth(UserRole.COMPANY, UserRole.CANDIDATE),
  InterestController.getInterestById
);

export const InterestRoute = router;
