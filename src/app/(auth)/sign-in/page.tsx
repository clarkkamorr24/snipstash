import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { GitHubSignInForm } from "@/components/auth/GitHubSignInForm";
import { SignInForm } from "@/components/auth/SignInForm";
import { SignInNotice } from "@/components/auth/SignInNotice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Sign in",
};

function OrDivider() {
  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase">
      <span className="h-px flex-1 bg-border" />
      or
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

export default function SignInPage() {
  return (
    <Card className="[--card-spacing:--spacing(6)]">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>Sign in to your SnipStash account</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Suspense fallback={null}>
          <SignInNotice />
        </Suspense>
        <GitHubSignInForm />
        <OrDivider />
        <SignInForm />
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
