import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface FormAlertProps {
  variant: "error" | "success";
  children: ReactNode;
}

export function FormAlert({ variant, children }: FormAlertProps) {
  return (
    <p
      role={variant === "error" ? "alert" : "status"}
      className={cn(
        "rounded-lg border px-3 py-2 text-sm",
        variant === "error"
          ? "border-destructive/30 bg-destructive/10 text-destructive"
          : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
      )}
    >
      {children}
    </p>
  );
}
