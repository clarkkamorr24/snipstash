import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { verifyEmail } from "@/lib/email-verification";

// The link in the verification email lands here, then redirects to the
// sign-in page, which shows the outcome.
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const signInUrl = new URL("/sign-in", request.url);

  try {
    signInUrl.searchParams.set("verify", token ? await verifyEmail(token) : "invalid");
  } catch (error) {
    console.error("Email verification failed:", error);
    signInUrl.searchParams.set("verify", "error");
  }
  return NextResponse.redirect(signInUrl);
}
