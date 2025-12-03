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
  fileUploader.upload.single("image"),
  validateRequestWithFormData(CandidateSchema.createCandidate),
  CandidateController.createCandidate
);

router.get("/", CandidateController.getAllCandidatesProfile);

router.get(
  "/me",
  auth(UserRole.CANDIDATE),
  CandidateController.getCandidateProfile
);

router.get("/:id", CandidateController.getCandidateProfileById);

router.put(
  "/visibility",
  auth(UserRole.CANDIDATE),
  CandidateController.updateVisibility
);

export const CandidateRoute = router;
