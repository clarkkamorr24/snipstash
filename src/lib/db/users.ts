import { cache } from "react";

import { prisma } from "@/lib/prisma";

// Until auth is added, the dashboard shows the seeded demo user's data.
const DEMO_USER_EMAIL = "demo@devstash.io";

// Cached per request, so several dashboard sections share one lookup.
export const getCurrentUserId = cache(async (): Promise<string | null> => {
  const user = await prisma.user.findUnique({
    where: { email: DEMO_USER_EMAIL },
    select: { id: true },
  });
  return user?.id ?? null;
});

export function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    select: { id: true, name: true, email: true, image: true, password: true },
  });
}

export function createUser(data: { name: string; email: string; password: string }) {
  return prisma.user.create({
    data,
    select: { id: true, name: true, email: true },
  });
}
