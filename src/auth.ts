import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig, { credentialsFields } from "@/auth.config";
import { EmailNotVerifiedError } from "@/lib/auth-errors";
import { signInSchema } from "@/lib/auth-schemas";
import { getUserByEmail } from "@/lib/db/users";
import { verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  ...authConfig,
  // Replaces the placeholder Credentials provider with database validation
  providers: [
    GitHub,
    Credentials({
      credentials: credentialsFields,
      async authorize(credentials) {
        const parsed = signInSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await getUserByEmail(parsed.data.email);
        // OAuth-only users have no password
        if (!user?.password) return null;

        const isValid = await verifyPassword(parsed.data.password, user.password);
        if (!isValid) return null;

        // Checked after the password, so it doesn't reveal which emails are registered
        if (!user.emailVerified) throw new EmailNotVerifiedError();

        return { id: user.id, name: user.name, email: user.email, image: user.image };
      },
    }),
  ],
});
