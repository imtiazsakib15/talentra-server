import { Router } from "express";
import { CompanyController } from "./company.controller";
import { CompanySchema } from "./company.schema";
import { fileUploader } from "../../utils/fileUploader";
import validateRequestWithFormData from "../../middlewares/validateRequestWithFormData";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";

const router = Router();

router.post(
  "/",
  auth(UserRole.COMPANY),
  fileUploader.upload.single("logo"),
  validateRequestWithFormData(CompanySchema.createCompany),
  CompanyController.createCompany
);

router.get("/me", auth(UserRole.COMPANY), CompanyController.getCompanyProfile);

router.get("/:id", CompanyController.getCompanyProfileById);

export const CompanyRoute = router;
