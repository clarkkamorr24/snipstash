import { prisma } from "@/lib/prisma";

const RECENT_COLLECTIONS_LIMIT = 6;
const SIDEBAR_RECENT_COLLECTIONS_LIMIT = 5;

const ITEM_TYPE_SELECT = {
  id: true,
  name: true,
  icon: true,
  color: true,
} as const;

export interface CollectionItemType {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface CollectionSummary {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  dominantType: CollectionItemType | null;
  // Distinct types in the collection, most common first.
  itemTypes: CollectionItemType[];
}

export interface SidebarCollections {
  favorites: CollectionSummary[];
  // Newest non-favorite collections; favorites already have their own list.
  recent: CollectionSummary[];
}

export interface CollectionStats {
  totalCollections: number;
  favoriteCollections: number;
}

interface ItemTypeCount {
  type: CollectionItemType;
  count: number;
}

function countItemTypes(types: CollectionItemType[]): ItemTypeCount[] {
  const counts = new Map<string, ItemTypeCount>();
  for (const type of types) {
    const entry = counts.get(type.id);
    if (entry) {
      entry.count += 1;
    } else {
      counts.set(type.id, { type, count: 1 });
    }
  }
  return [...counts.values()].toSorted((a, b) => b.count - a.count);
}

// The type a collection holds the most of; ties and empty collections keep
// the default type.
function getDominantType(
  typeCounts: ItemTypeCount[],
  defaultType: CollectionItemType | null
): CollectionItemType | null {
  const top = typeCounts[0];
  const defaultCount = typeCounts.find(
    ({ type }) => type.id === defaultType?.id
  )?.count;

  if (defaultType && defaultCount === top?.count) return defaultType;
  return top?.type ?? defaultType;
}

const COLLECTION_SUMMARY_SELECT = {
  id: true,
  name: true,
  description: true,
  isFavorite: true,
  defaultType: { select: ITEM_TYPE_SELECT },
  items: {
    select: { item: { select: { itemType: { select: ITEM_TYPE_SELECT } } } },
  },
} as const;

interface CollectionRow {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  defaultType: CollectionItemType | null;
  items: { item: { itemType: CollectionItemType } }[];
}

function toCollectionSummary({
  defaultType,
  items,
  ...collection
}: CollectionRow): CollectionSummary {
  const typeCounts = countItemTypes(items.map(({ item }) => item.itemType));
  return {
    ...collection,
    itemCount: items.length,
    dominantType: getDominantType(typeCounts, defaultType),
    itemTypes: typeCounts.map(({ type }) => type),
  };
}

export async function getRecentCollections(
  userId: string,
  limit = RECENT_COLLECTIONS_LIMIT
): Promise<CollectionSummary[]> {
  const collections = await prisma.collection.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: COLLECTION_SUMMARY_SELECT,
  });
  return collections.map(toCollectionSummary);
}

export async function getSidebarCollections(
  userId: string
): Promise<SidebarCollections> {
  const [favorites, recent] = await Promise.all([
    prisma.collection.findMany({
      where: { userId, isFavorite: true },
      orderBy: { name: "asc" },
      select: COLLECTION_SUMMARY_SELECT,
    }),
    prisma.collection.findMany({
      where: { userId, isFavorite: false },
      orderBy: { createdAt: "desc" },
      take: SIDEBAR_RECENT_COLLECTIONS_LIMIT,
      select: COLLECTION_SUMMARY_SELECT,
    }),
  ]);
  return {
    favorites: favorites.map(toCollectionSummary),
    recent: recent.map(toCollectionSummary),
  };
}

export async function getCollectionStats(
  userId: string
): Promise<CollectionStats> {
  const [totalCollections, favoriteCollections] = await Promise.all([
    prisma.collection.count({ where: { userId } }),
    prisma.collection.count({ where: { userId, isFavorite: true } }),
  ]);
  return { totalCollections, favoriteCollections };
}
