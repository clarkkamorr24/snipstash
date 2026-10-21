"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { FormAlert } from "@/components/auth/FormAlert";
import { FormField } from "@/components/auth/FormField";
import { Button } from "@/components/ui/button";
import { registerSchema } from "@/lib/auth-schemas";
import type { FieldErrors } from "@/types/auth";

type RegisterField = "name" | "email" | "password" | "confirmPassword";

interface RegisterResponse {
  success: boolean;
  error?: string;
  fieldErrors?: FieldErrors<RegisterField>;
}

const DEFAULT_ERROR = "Registration failed. Please try again.";

async function registerUser(values: Record<string, FormDataEntryValue>): Promise<RegisterResponse> {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    return (await response.json()) as RegisterResponse;
  } catch {
    return { success: false, error: DEFAULT_ERROR };
  }
}

export function RegisterForm() {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<RegisterField>>({});
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = registerSchema.safeParse(values);
    setError(null);
    if (!parsed.success) {
      setFieldErrors(z.flattenError(parsed.error).fieldErrors);
      return;
    }

    setFieldErrors({});
    setPending(true);
    const result = await registerUser(values);
    if (!result.success) {
      setError(result.error ?? DEFAULT_ERROR);
      setFieldErrors(result.fieldErrors ?? {});
      setPending(false);
      return;
    }
    // Stays pending while navigating away
    router.push("/sign-in?registered=1");
  }

  return (
    <form method="post" onSubmit={handleSubmit} noValidate className="grid gap-4">
      {error && <FormAlert variant="error">{error}</FormAlert>}
      <FormField name="name" label="Name" autoComplete="name" errors={fieldErrors.name} />
      <FormField
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        errors={fieldErrors.email}
      />
      <FormField
        name="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        errors={fieldErrors.password}
      />
      <FormField
        name="confirmPassword"
        label="Confirm password"
        type="password"
        autoComplete="new-password"
        errors={fieldErrors.confirmPassword}
      />
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
