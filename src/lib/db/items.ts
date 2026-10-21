import { prisma } from "@/lib/prisma";

const RECENT_ITEMS_LIMIT = 10;

// Sidebar order for the system types; any others are listed after them.
const SYSTEM_TYPE_ORDER = [
  "snippets",
  "prompts",
  "notes",
  "commands",
  "links",
  "files",
  "images",
];

// Most recently used first; never-used items fall back to newest first.
const ITEM_ORDER = [
  { lastUsedAt: { sort: "desc", nulls: "last" } },
  { createdAt: "desc" },
] as const;

const DASHBOARD_ITEM_SELECT = {
  id: true,
  title: true,
  description: true,
  language: true,
  url: true,
  isPinned: true,
  lastUsedAt: true,
  createdAt: true,
  itemType: { select: { id: true, name: true, icon: true, color: true } },
  tags: { select: { name: true }, orderBy: { name: "asc" } },
} as const;

export interface DashboardItemType {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface DashboardItem {
  id: string;
  title: string;
  description: string | null;
  language: string | null;
  url: string | null;
  isPinned: boolean;
  lastUsedAt: Date | null;
  createdAt: Date;
  itemType: DashboardItemType;
  tags: string[];
}

export interface ItemStats {
  totalItems: number;
  favoriteItems: number;
}

export interface SidebarItemType extends DashboardItemType {
  slug: string;
  itemCount: number;
}

type ItemRow = Omit<DashboardItem, "tags"> & { tags: { name: string }[] };

function getTypeOrder(slug: string): number {
  const index = SYSTEM_TYPE_ORDER.indexOf(slug);
  return index === -1 ? SYSTEM_TYPE_ORDER.length : index;
}

function toDashboardItem({ tags, ...item }: ItemRow): DashboardItem {
  return { ...item, tags: tags.map((tag) => tag.name) };
}

export async function getPinnedItems(
  userId: string
): Promise<DashboardItem[]> {
  const items = await prisma.item.findMany({
    where: { userId, isPinned: true },
    orderBy: [...ITEM_ORDER],
    select: DASHBOARD_ITEM_SELECT,
  });
  return items.map(toDashboardItem);
}

export async function getRecentItems(
  userId: string,
  limit = RECENT_ITEMS_LIMIT
): Promise<DashboardItem[]> {
  const items = await prisma.item.findMany({
    where: { userId },
    orderBy: [...ITEM_ORDER],
    take: limit,
    select: DASHBOARD_ITEM_SELECT,
  });
  return items.map(toDashboardItem);
}

export async function getItemStats(userId: string): Promise<ItemStats> {
  const [totalItems, favoriteItems] = await Promise.all([
    prisma.item.count({ where: { userId } }),
    prisma.item.count({ where: { userId, isFavorite: true } }),
  ]);
  return { totalItems, favoriteItems };
}

// System item types with the number of items the user has of each.
export async function getItemTypesWithCounts(
  userId: string
): Promise<SidebarItemType[]> {
  const types = await prisma.itemType.findMany({
    where: { isSystem: true },
    select: {
      id: true,
      name: true,
      slug: true,
      icon: true,
      color: true,
      _count: { select: { items: { where: { userId } } } },
    },
  });

  return types
    .map(({ _count, ...type }) => ({ ...type, itemCount: _count.items }))
    .toSorted((a, b) => getTypeOrder(a.slug) - getTypeOrder(b.slug));
}
