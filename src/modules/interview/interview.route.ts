import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";
import { InterviewController } from "./interview.controller";

const router = Router();

router.post("/", auth(UserRole.COMPANY), InterviewController.scheduleInterview);

export const InterviewRoute = router;
