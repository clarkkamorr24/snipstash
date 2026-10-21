import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

// Edge-safe config shared with the proxy: no adapter or database access here
export default {
  providers: [GitHub],
} satisfies NextAuthConfig;
