import { createHash, randomBytes } from "node:crypto";

import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

// Only the hash is stored, so a leaked database row can't verify an email.
function hashToken(rawToken: string) {
  return createHash("sha256").update(rawToken).digest("hex");
}

// Replaces any earlier token for the email and returns the raw token for the link.
export async function createEmailVerificationToken(email: string): Promise<string> {
  const rawToken = randomBytes(32).toString("base64url");
  await prisma.$transaction([
    prisma.verificationToken.deleteMany({ where: { identifier: email } }),
    prisma.verificationToken.create({
      data: {
        identifier: email,
        token: hashToken(rawToken),
        expires: new Date(Date.now() + TOKEN_TTL_MS),
      },
    }),
  ]);
  return rawToken;
}

// Deletes the token so it works only once. Returns null if it doesn't exist
// or was already used.
export async function consumeEmailVerificationToken(rawToken: string) {
  try {
    return await prisma.verificationToken.delete({
      where: { token: hashToken(rawToken) },
      select: { identifier: true, expires: true },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return null;
    }
    throw error;
  }
}

export async function wasVerificationTokenIssuedWithin(email: string, ms: number) {
  const token = await prisma.verificationToken.findFirst({
    where: { identifier: email },
    select: { expires: true },
  });
  if (!token) return false;
  const issuedAt = token.expires.getTime() - TOKEN_TTL_MS;
  return Date.now() - issuedAt < ms;
}
