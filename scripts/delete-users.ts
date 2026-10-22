import "dotenv/config";
import { prisma } from "../src/lib/prisma";

// Deletes every user except the demo user, along with their accounts,
// sessions, items, collections, tags, custom item types and verification
// tokens. Dry run by default; pass --confirm to actually delete.
//
//   npx tsx scripts/delete-users.ts            # preview
//   npx tsx scripts/delete-users.ts --confirm  # delete

const KEEP_EMAIL = "demo@devstash.io";
const CONFIRMED = process.argv.includes("--confirm");

async function getUsersToDelete() {
  return prisma.user.findMany({
    where: { NOT: { email: KEEP_EMAIL } },
    select: {
      id: true,
      email: true,
      name: true,
      _count: { select: { items: true, collections: true, tags: true, itemTypes: true } },
    },
    orderBy: { createdAt: "asc" },
  });
}

async function deleteUsers(userIds: string[], emails: string[]) {
  // Items go first: Item -> ItemType is ON DELETE RESTRICT, so cascading from
  // the user could fail on a custom type that still has items.
  return prisma.$transaction([
    prisma.verificationToken.deleteMany({ where: { identifier: { in: emails } } }),
    prisma.item.deleteMany({ where: { userId: { in: userIds } } }),
    prisma.user.deleteMany({ where: { id: { in: userIds } } }),
  ]);
}

async function main() {
  const keptUser = await prisma.user.findUnique({
    where: { email: KEEP_EMAIL },
    select: { id: true },
  });
  // Guards against running this against the wrong database
  if (!keptUser) {
    throw new Error(`${KEEP_EMAIL} not found. Run "npx prisma db seed" first; nothing was deleted.`);
  }

  const users = await getUsersToDelete();
  if (users.length === 0) {
    console.log(`No users to delete. Only ${KEEP_EMAIL} exists.`);
    return;
  }

  console.log(`Users to delete (${users.length}), keeping ${KEEP_EMAIL}:`);
  console.table(
    users.map(({ email, name, _count }) => ({ email, name, ..._count })),
  );

  if (!CONFIRMED) {
    console.log("\nDry run: nothing was deleted. Re-run with --confirm to delete these users.");
    return;
  }

  const emails = users.flatMap((user) => (user.email ? [user.email] : []));
  const [tokens, items, deletedUsers] = await deleteUsers(
    users.map((user) => user.id),
    emails,
  );
  console.log(
    `\nDeleted ${deletedUsers.count} users, ${items.count} items and ${tokens.count} verification tokens. ` +
      "Their accounts, sessions, collections, tags and custom item types were removed by cascade.",
  );
}

main()
  .catch((error: unknown) => {
    console.error("Deleting users failed:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
