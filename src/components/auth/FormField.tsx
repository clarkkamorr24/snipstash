import { useId } from "react";
import type { ComponentProps } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldProps extends ComponentProps<"input"> {
  name: string;
  label: string;
  errors?: string[];
}

export function FormField({ name, label, errors, ...inputProps }: FormFieldProps) {
  // Unique ids, since Next.js keeps the previous auth page mounted (hidden)
  // after navigating between /sign-in and /register
  const id = useId();
  const errorId = `${id}-error`;
  const error = errors?.[0];

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="h-9"
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
