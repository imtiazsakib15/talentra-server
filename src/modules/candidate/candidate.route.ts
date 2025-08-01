import { Router } from "express";
import { CandidateController } from "./candidate.controller";
import { CandidateSchema } from "./candidate.schema";
import { fileUploader } from "../../utils/fileUploader";
import validateRequestWithFormData from "../../middlewares/validateRequestWithFormData";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";

const router = Router();

router.post(
  "/",
  auth(UserRole.CANDIDATE),
  fileUploader.upload.fields([
    { name: "image", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  validateRequestWithFormData(CandidateSchema.createCandidate),
  CandidateController.createCandidate
);

router.get(
  "/me",
  auth(UserRole.CANDIDATE),
  CandidateController.getCandidateProfile
);

router.get("/:id", CandidateController.getCandidateProfileById);

export const CandidateRoute = router;
