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

export function SignInNotice() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  if (error) {
    return <FormAlert variant="error">{ERROR_MESSAGES[error] ?? DEFAULT_ERROR}</FormAlert>;
  }
  if (searchParams.get("registered")) {
    return <FormAlert variant="success">Account created. Sign in to continue.</FormAlert>;
  }
  return null;
}
