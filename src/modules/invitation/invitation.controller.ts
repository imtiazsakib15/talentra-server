import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { InvitationService } from "./invitation.service";

const sendInvitation = catchAsync(async (req, res) => {
  const result = await InvitationService.sendInvitation(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Invitation sent successfully",
    data: result,
  });
});

const getSentInvitations = catchAsync(async (req, res) => {
  const result = await InvitationService.getSentInvitations(req.user!.userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Sent invitations retrieved successfully",
    data: result,
  });
});

const getReceivedInvitations = catchAsync(async (req, res) => {
  const result = await InvitationService.getReceivedInvitations(
    req.user!.userId
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Received invitations retrieved successfully",
    data: result,
  });
});

const getInvitationById = catchAsync(async (req, res) => {
  const result = await InvitationService.getInvitationById(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Invitation retrieved successfully",
    data: result,
  });
});

const acceptInvitation = catchAsync(async (req, res) => {
  const result = await InvitationService.acceptInvitation(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Invitation accepted successfully",
    data: result,
  });
});

const declineInvitation = catchAsync(async (req, res) => {
  const result = await InvitationService.declineInvitation(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Invitation declined successfully",
    data: result,
  });
});

export const InvitationController = {
  sendInvitation,
  getSentInvitations,
  getReceivedInvitations,
  getInvitationById,
  acceptInvitation,
  declineInvitation,
};
