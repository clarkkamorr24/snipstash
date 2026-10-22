"use client";

import { Suspense, startTransition, useActionState, useState } from "react";
import type { FormEvent } from "react";
import { z } from "zod";

import { signInWithCredentials } from "@/actions/auth";
import { CallbackUrlInput } from "@/components/auth/CallbackUrlInput";
import { FormAlert } from "@/components/auth/FormAlert";
import { FormField } from "@/components/auth/FormField";
import { ResendVerificationForm } from "@/components/auth/ResendVerificationForm";
import { Button } from "@/components/ui/button";
import { signInSchema } from "@/lib/auth-schemas";
import type { FieldErrors, SignInState } from "@/types/auth";

const INITIAL_STATE: SignInState = { success: false };

export function SignInForm() {
  const [state, formAction, pending] = useActionState(signInWithCredentials, INITIAL_STATE);
  const [clientErrors, setClientErrors] = useState<FieldErrors<"email" | "password">>();

  // Validates on the client first, and submits through a transition so the
  // form isn't reset after a failed attempt.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const parsed = signInSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) {
      setClientErrors(z.flattenError(parsed.error).fieldErrors);
      return;
    }
    setClientErrors(undefined);
    startTransition(() => formAction(formData));
  }

  const fieldErrors = clientErrors ?? state.fieldErrors;

  const showServerError = !clientErrors && state.error;

  // The resend form sits outside the sign-in form, since forms can't be nested.
  return (
    <div className="grid gap-4">
      {showServerError && <FormAlert variant="error">{state.error}</FormAlert>}
      {showServerError && state.unverifiedEmail && (
        <ResendVerificationForm key={state.unverifiedEmail} email={state.unverifiedEmail} />
      )}
      <form method="post" onSubmit={handleSubmit} noValidate className="grid gap-4">
        <Suspense fallback={null}>
          <CallbackUrlInput />
        </Suspense>
        <FormField
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          errors={fieldErrors?.email}
        />
        <FormField
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          errors={fieldErrors?.password}
        />
        <Button type="submit" size="lg" className="w-full" disabled={pending}>
          {pending ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
