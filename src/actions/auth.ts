"use server";

import { AuthError, CredentialsSignin } from "next-auth";
import { z } from "zod";

import { signIn, signOut } from "@/auth";
import { EMAIL_NOT_VERIFIED } from "@/lib/auth-errors";
import { resendVerificationSchema, signInSchema } from "@/lib/auth-schemas";
import { resendEmailVerification } from "@/lib/email-verification";
import type { ResendVerificationState, SignInState } from "@/types/auth";

const DEFAULT_REDIRECT = "/dashboard";

// Only same-origin paths, so a crafted callbackUrl can't redirect off-site.
function getSafeRedirect(callbackUrl: FormDataEntryValue | null): string {
  if (typeof callbackUrl !== "string") return DEFAULT_REDIRECT;
  if (!callbackUrl.startsWith("/") || callbackUrl.startsWith("//")) return DEFAULT_REDIRECT;
  return callbackUrl;
}

export async function signInWithCredentials(
  _prevState: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return {
      success: false,
      error: "Check the highlighted fields",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    await signIn("credentials", {
      ...parsed.data,
      redirectTo: getSafeRedirect(formData.get("callbackUrl")),
    });
    return { success: true };
  } catch (error) {
    if (error instanceof CredentialsSignin && error.code === EMAIL_NOT_VERIFIED) {
      return {
        success: false,
        error: "Please verify your email before signing in. Check your inbox for the link.",
        unverifiedEmail: parsed.data.email,
      };
    }
    if (error instanceof AuthError) {
      return {
        success: false,
        error:
          error.type === "CredentialsSignin"
            ? "Invalid email or password"
            : "Something went wrong. Please try again.",
      };
    }
    // signIn throws a redirect on success, which Next.js handles
    throw error;
  }
}

// Always answers the same way, so it can't be used to check which emails exist.
export async function resendVerificationEmail(
  _prevState: ResendVerificationState,
  formData: FormData,
): Promise<ResendVerificationState> {
  const parsed = resendVerificationSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) return { success: false, error: "Invalid email" };

  try {
    await resendEmailVerification(parsed.data.email);
    return {
      success: true,
      message: "If your account still needs verifying, a new link is on its way.",
    };
  } catch (error) {
    console.error("Resending verification email failed:", error);
    return { success: false, error: "Couldn't send the email. Please try again." };
  }
}

export async function signInWithGitHub(formData: FormData) {
  await signIn("github", { redirectTo: getSafeRedirect(formData.get("callbackUrl")) });
}

export async function signOutUser() {
  await signOut({ redirectTo: "/sign-in" });
}
