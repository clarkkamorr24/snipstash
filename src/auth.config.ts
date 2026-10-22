import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

// Edge-safe config shared with the proxy: no adapter or database access here.
// The Credentials provider is a placeholder; auth.ts supplies the real authorize.
export const credentialsFields = {
  email: { label: "Email", type: "email" },
  password: { label: "Password", type: "password" },
};

// Edge-safe config shared with the proxy: no adapter or database access here.
// The Credentials provider is a placeholder; auth.ts supplies the real authorize.
export default {
  pages: { signIn: "/sign-in" },
  providers: [
    GitHub,
    Credentials({ credentials: credentialsFields, authorize: () => null }),
  ],
} satisfies NextAuthConfig;
