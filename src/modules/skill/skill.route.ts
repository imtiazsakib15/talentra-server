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

router.get("/:id", SkillController.getSkillById);

router.put(
  "/:id",
  auth(UserRole.ADMIN),
  validateRequest(SkillSchema.createSkill),
  SkillController.updateSkill
);

router.delete("/:id", auth(UserRole.ADMIN), SkillController.deleteSkill);

export const SkillRoute = router;
