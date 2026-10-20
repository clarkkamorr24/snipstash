import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function testConnection() {
  const [{ now }] = await prisma.$queryRaw<{ now: Date }[]>`SELECT NOW() AS now`;
  console.log(`Connected to database (server time: ${now.toISOString()})`);
}

async function logTableCounts() {
  const counts = {
    users: await prisma.user.count(),
    itemTypes: await prisma.itemType.count(),
    items: await prisma.item.count(),
    collections: await prisma.collection.count(),
    tags: await prisma.tag.count(),
  };

  console.log("\nRow counts:");
  console.table(counts);
}

async function logSystemItemTypes() {
  const systemTypes = await prisma.itemType.findMany({
    where: { userId: null, isSystem: true },
    select: { name: true, slug: true, icon: true, color: true },
    orderBy: { name: "asc" },
  });

  console.log(`\nSystem item types (${systemTypes.length}):`);
  console.table(systemTypes);
}

async function testDb() {
  await testConnection();
  await logTableCounts();
  await logSystemItemTypes();
}

testDb()
  .catch((error: unknown) => {
    console.error("Database test failed:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
