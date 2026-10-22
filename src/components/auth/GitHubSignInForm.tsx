"use client";

import { Suspense } from "react";
import { useFormStatus } from "react-dom";

import { signInWithGitHub } from "@/actions/auth";
import { CallbackUrlInput } from "@/components/auth/CallbackUrlInput";
import { GitHubIcon } from "@/components/auth/GitHubIcon";
import { Button } from "@/components/ui/button";

function GitHubSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="outline" size="lg" className="w-full" disabled={pending}>
      <GitHubIcon data-icon="inline-start" />
      {pending ? "Redirecting..." : "Sign in with GitHub"}
    </Button>
  );
}

export function GitHubSignInForm() {
  return (
    <form action={signInWithGitHub}>
      <Suspense fallback={null}>
        <CallbackUrlInput />
      </Suspense>
      <GitHubSubmitButton />
    </form>
  );
}
