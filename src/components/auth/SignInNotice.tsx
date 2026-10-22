"use client";

import { useSearchParams } from "next/navigation";

import { FormAlert } from "@/components/auth/FormAlert";

// Auth.js redirects failed OAuth sign-ins back here with an `error` code.
const ERROR_MESSAGES: Record<string, string> = {
  OAuthAccountNotLinked:
    "This email is already registered with a different sign-in method.",
  CredentialsSignin: "Invalid email or password.",
  AccessDenied: "Access denied.",
};
const DEFAULT_ERROR = "Sign in failed. Please try again.";

// The verify-email route redirects here with the outcome of the link.
const VERIFY_ERRORS: Record<string, string> = {
  invalid: "This verification link is invalid or has already been used.",
  expired: "This verification link has expired. Sign in to get a new one.",
};
const VERIFY_DEFAULT_ERROR = "We couldn't verify your email. Please try again.";

export function SignInNotice() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const verify = searchParams.get("verify");

  if (error) {
    return <FormAlert variant="error">{ERROR_MESSAGES[error] ?? DEFAULT_ERROR}</FormAlert>;
  }
  if (verify === "verified") {
    return <FormAlert variant="success">Email verified. Sign in to continue.</FormAlert>;
  }
  if (verify) {
    return <FormAlert variant="error">{VERIFY_ERRORS[verify] ?? VERIFY_DEFAULT_ERROR}</FormAlert>;
  }
  return null;
}
