import { Resend } from "resend";

const EMAIL_FROM = "SnipStash <onboarding@resend.dev>";

let resend: Resend | undefined;

// Created on first use, since the constructor throws without an API key.
function getResend() {
  resend ??= new Resend(process.env.RESEND_API_KEY);
  return resend;
}

export async function sendVerificationEmail(to: string, verifyUrl: string) {
  const { error } = await getResend().emails.send({
    from: EMAIL_FROM,
    to,
    subject: "Verify your SnipStash email",
    text: `Confirm your email to finish setting up your SnipStash account:\n\n${verifyUrl}\n\nThis link expires in 24 hours. If you didn't create an account, you can ignore this email.`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;color:#111">
        <h1 style="font-size:20px">Verify your email</h1>
        <p>Confirm your email to finish setting up your SnipStash account.</p>
        <p>
          <a href="${verifyUrl}" style="display:inline-block;padding:10px 16px;background:#111;color:#fff;border-radius:6px;text-decoration:none">
            Verify email
          </a>
        </p>
        <p style="font-size:13px;color:#666">
          This link expires in 24 hours. If you didn't create an account, you can ignore this email.
        </p>
      </div>
    `,
  });
  if (error) throw new Error(`Failed to send verification email: ${error.message}`);
}
