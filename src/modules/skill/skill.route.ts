import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";
import validateRequest from "../../middlewares/validateRequest";
import { SkillSchema } from "./skill.schema";
import { SkillController } from "./skill.controller";

const router = Router();

router.post(
  "/",
  auth(UserRole.ADMIN),
  validateRequest(SkillSchema.createSkill),
  SkillController.createSkill
);

router.get("/", SkillController.getAllSkills);

export const SkillRoute = router;
