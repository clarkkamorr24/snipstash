import "dotenv/config";
import { prisma } from "../src/lib/prisma";

const SYSTEM_ITEM_TYPES = [
  { name: "snippet", slug: "snippets", icon: "Code", color: "#3b82f6" },
  { name: "prompt", slug: "prompts", icon: "Sparkles", color: "#8b5cf6" },
  { name: "note", slug: "notes", icon: "StickyNote", color: "#fde047" },
  { name: "command", slug: "commands", icon: "Terminal", color: "#f97316" },
  { name: "link", slug: "links", icon: "Link", color: "#10b981" },
  { name: "file", slug: "files", icon: "File", color: "#6b7280" },
  { name: "image", slug: "images", icon: "Image", color: "#ec4899" },
];

// Postgres treats NULLs as distinct, so @@unique([userId, slug]) can't be used
// to upsert system types. Look them up by slug where userId IS NULL instead.
async function seedSystemItemTypes() {
  for (const type of SYSTEM_ITEM_TYPES) {
    const existing = await prisma.itemType.findFirst({
      where: { slug: type.slug, userId: null },
      select: { id: true },
    });

    if (existing) {
      await prisma.itemType.update({
        where: { id: existing.id },
        data: { ...type, isSystem: true },
      });
    } else {
      await prisma.itemType.create({ data: { ...type, isSystem: true } });
    }
  }

  console.log(`Seeded ${SYSTEM_ITEM_TYPES.length} system item types`);
}

seedSystemItemTypes()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
