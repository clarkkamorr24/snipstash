import type { CSSProperties } from "react";

export const FALLBACK_TYPE_COLOR = "#6b7280";

// Type colors come from data, so they are exposed as a CSS variable for
// Tailwind classes such as `ring-(--type-color)/30` to read.
export function typeColorVars(
  color: string = FALLBACK_TYPE_COLOR
): CSSProperties {
  return { "--type-color": color } as CSSProperties;
}
