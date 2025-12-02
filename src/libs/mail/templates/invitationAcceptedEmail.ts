import config from "../../../config";

export const invitationAcceptedEmail = (
  companyName: string,
  candidateName: string
) => `
  <div style="
      font-family: Arial, sans-serif;
      background: #f9fafb;
      padding: 20px;
      color: #111827;
  ">
    <div style="
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        padding: 24px;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
    ">
      <h2 style="color: #4f46e5; margin-bottom: 16px;">
        Invitation Accepted 🎉
      </h2>

      <p style="font-size: 16px; line-height: 1.6;">
        Hello <strong>${companyName}</strong>,
      </p>

      <p style="font-size: 16px; line-height: 1.6;">
        Good news! <strong>${candidateName}</strong> has accepted your invitation.
      </p>

      <p style="font-size: 16px; line-height: 1.6;">
        You can now proceed to the next step, such as scheduling an interview or contacting the candidate directly.
      </p>

      <a href={${config.CLIENT_URL}/company/sent-invitations} target="_blank" rel="noopener noreferrer"
         style="
            display: inline-block;
            margin-top: 20px;
            background: #4f46e5;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 15px;
         ">
        View Candidate Profile
      </a>

      <p style="margin-top: 24px; font-size: 14px; color: #6b7280;">
        Thank you for using Talentra.
      </p>
    </div>
  </div>
`;
