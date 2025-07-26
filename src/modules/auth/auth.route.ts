import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthSchema } from "./auth.schema";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/register",
  validateRequest(AuthSchema.register),
  AuthController.register
);
router.post("/login", AuthController.login);

export const AuthRoute = router;
