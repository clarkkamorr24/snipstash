"use client";

import { useSearchParams } from "next/navigation";

// Reads the URL on the client, so render it inside <Suspense> to keep the
// surrounding form in the prerendered shell.
export function CallbackUrlInput() {
  const callbackUrl = useSearchParams().get("callbackUrl");
  if (!callbackUrl) return null;
  return <input type="hidden" name="callbackUrl" value={callbackUrl} />;
}
