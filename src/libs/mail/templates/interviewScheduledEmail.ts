export const interviewScheduledEmail = (params: {
  candidateName: string;
  companyName: string;
  meetingLink: string;
  scheduledAt: string;
}) => {
  const { candidateName, companyName, meetingLink, scheduledAt } = params;

  return `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b;">
    <h2 style="color: #4f46e5;">Interview Scheduled</h2>

    <p>Hello <strong>${candidateName}</strong>,</p>

    <p>
      We are pleased to inform you that <strong>${companyName}</strong> has scheduled your interview.
    </p>

    <p>
      <strong>Meeting Link:</strong><br/>
      <a href="${meetingLink}" style="color: #4f46e5; word-break: break-all;">
        ${meetingLink}
      </a>
    </p>

    <p>
      <strong>Scheduled Date & Time:</strong><br/>
      ${scheduledAt}
    </p>

    <p>
      Please make sure to join the meeting on time. Good luck!
    </p>

    <br/>
    <p style="font-size: 12px; color: #64748b;">
      This is an automated message. Please do not reply to this email.
    </p>
  </div>
  `;
};
