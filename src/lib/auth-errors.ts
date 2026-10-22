import { CredentialsSignin } from "next-auth";

export const EMAIL_NOT_VERIFIED = "email_not_verified";

// Thrown by the Credentials provider after a correct password, so the
// sign-in action can tell an unverified account from bad credentials.
export class EmailNotVerifiedError extends CredentialsSignin {
  code = EMAIL_NOT_VERIFIED;
}
