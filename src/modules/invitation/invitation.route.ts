import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";
import { InvitationController } from "./invitation.controller";
import validateRequest from "../../middlewares/validateRequest";
import { InvitationSchema } from "./invitation.schema";

const router = Router();

// Send invitation to candidate
router.post(
  "/send-invitation",
  auth(UserRole.COMPANY),
  validateRequest(InvitationSchema.sendInvitation),
  InvitationController.sendInvitation
);

// Get my sent invitations (Company)
router.get(
  "/sent",
  auth(UserRole.COMPANY),
  InvitationController.getSentInvitations
);

// Get invitations I received (Candidate)
router.get(
  "/received",
  auth(UserRole.CANDIDATE),
  InvitationController.getReceivedInvitations
);

// Get specific invitation
router.get(
  "/:id",
  auth(UserRole.COMPANY, UserRole.CANDIDATE),
  InvitationController.getInvitationById
);

// Accept invitation (Candidate)
router.put(
  "/:id/accept",
  auth(UserRole.CANDIDATE),
  InvitationController.acceptInvitation
);

// Decline invitation (Candidate)
router.put(
  "/:id/decline",
  auth(UserRole.CANDIDATE),
  InvitationController.declineInvitation
);

export const InvitationRoute = router;
