"use client";

import { useActionState } from "react";

import { resendVerificationEmail } from "@/actions/auth";
import { FormAlert } from "@/components/auth/FormAlert";
import { Button } from "@/components/ui/button";
import type { ResendVerificationState } from "@/types/auth";

const INITIAL_STATE: ResendVerificationState = { success: false };

interface ResendVerificationFormProps {
  email: string;
}

export function ResendVerificationForm({ email }: ResendVerificationFormProps) {
  const [state, formAction, pending] = useActionState(resendVerificationEmail, INITIAL_STATE);

  if (state.success) return <FormAlert variant="success">{state.message}</FormAlert>;

  return (
    <form action={formAction} className="grid gap-2">
      <input type="hidden" name="email" value={email} />
      {state.error && <FormAlert variant="error">{state.error}</FormAlert>}
      <Button type="submit" variant="outline" className="w-full" disabled={pending}>
        {pending ? "Sending..." : "Resend verification email"}
      </Button>
    </form>
  );
}
