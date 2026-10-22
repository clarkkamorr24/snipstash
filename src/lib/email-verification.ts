import {
  consumeEmailVerificationToken,
  createEmailVerificationToken,
  wasVerificationTokenIssuedWithin,
} from "@/lib/db/verification-tokens";
import { getUserByEmail, markEmailVerified } from "@/lib/db/users";
import { sendVerificationEmail } from "@/lib/email";
import type { EmailVerificationResult } from "@/types/auth";

// Links use a fixed base URL rather than the request's Host header, which a
// client could spoof to send verification tokens to another domain.
const APP_URL = process.env.APP_URL ?? "http://localhost:3000";
const RESEND_COOLDOWN_MS = 60 * 1000;

export async function sendEmailVerification(email: string) {
  const token = await createEmailVerificationToken(email);
  const verifyUrl = new URL("/api/auth/verify-email", APP_URL);
  verifyUrl.searchParams.set("token", token);
  await sendVerificationEmail(email, verifyUrl.toString());
}

// Only unverified email/password accounts get a new link, at most once a minute.
export async function resendEmailVerification(email: string) {
  const user = await getUserByEmail(email);
  if (!user?.password || user.emailVerified) return;
  if (await wasVerificationTokenIssuedWithin(email, RESEND_COOLDOWN_MS)) return;
  await sendEmailVerification(email);
}

export async function verifyEmail(rawToken: string): Promise<EmailVerificationResult> {
  const token = await consumeEmailVerificationToken(rawToken);
  if (!token) return "invalid";
  if (token.expires < new Date()) return "expired";
  await markEmailVerified(token.identifier);
  return "verified";
}
