import config from "../../../config";

export const invitationEmailTemplate = (
  companyName: string,
  message: string
) => `
    <h2>New Invitation Received</h2>
    <p>You have received a new invitation from <strong>${companyName}</strong>.</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
    <br/>
    <a href="${config.CLIENT_URL}/candidate/dashboard/invitations/received" 
       style="display:inline-block;padding:10px 16px;background:#4f46e5;color:#fff;border-radius:6px;text-decoration:none;">
       View Invitation
    </a>
  `;
