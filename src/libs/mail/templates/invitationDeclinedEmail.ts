import config from "../../../config";

export const invitationDeclinedEmail = (
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
      <h2 style="color: #dc2626; margin-bottom: 16px;">
        Invitation Declined ❌
      </h2>

      <p style="font-size: 16px; line-height: 1.6;">
        Hello <strong>${companyName}</strong>,
      </p>

      <p style="font-size: 16px; line-height: 1.6;">
        We wanted to inform you that <strong>${candidateName}</strong> has declined your invitation.
      </p>

      <p style="font-size: 16px; line-height: 1.6;">
        You may explore other candidates in the Talentra platform who may be a great fit for your company.
      </p>

      <a href="${config.CLIENT_URL}/company/search-candidates" target="_blank" rel="noopener noreferrer"
         style="
            display: inline-block;
            margin-top: 20px;
            background: #dc2626;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 15px;
         ">
        Browse Candidates
      </a>

      <p style="margin-top: 24px; font-size: 14px; color: #6b7280;">
        Thank you for using Talentra.
      </p>
    </div>
  </div>
`;
