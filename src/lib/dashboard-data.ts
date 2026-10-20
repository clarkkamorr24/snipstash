import {
  collections,
  items,
  itemTypes,
  type MockCollection,
  type MockItem,
  type MockItemType,
} from "@/lib/mock-data";

const RECENT_COLLECTIONS_LIMIT = 5;
const RECENT_ITEMS_LIMIT = 10;

export interface ItemTypeWithCount {
  type: MockItemType;
  count: number;
}

export interface DashboardStats {
  totalItems: number;
  totalCollections: number;
  favoriteItems: number;
  favoriteCollections: number;
}

interface RecentCollectionsOptions {
  excludeFavorites?: boolean;
  limit?: number;
}

export function getItemType(itemTypeId: string): MockItemType | undefined {
  return itemTypes.find((type) => type.id === itemTypeId);
}

export function getItemTypesWithCounts(): ItemTypeWithCount[] {
  return itemTypes.map((type) => ({
    type,
    count: items.filter((item) => item.itemTypeId === type.id).length,
  }));
}

export function getDashboardStats(): DashboardStats {
  return {
    totalItems: items.length,
    totalCollections: collections.length,
    favoriteItems: items.filter((item) => item.isFavorite).length,
    favoriteCollections: collections.filter((c) => c.isFavorite).length,
  };
}

export function getFavoriteCollections(): MockCollection[] {
  return collections.filter((collection) => collection.isFavorite);
}

export function getRecentCollections({
  excludeFavorites = false,
  limit = RECENT_COLLECTIONS_LIMIT,
}: RecentCollectionsOptions = {}): MockCollection[] {
  return collections
    .filter((collection) => !excludeFavorites || !collection.isFavorite)
    .toSorted((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

function byLastUsedDesc(a: MockItem, b: MockItem): number {
  return (b.lastUsedAt ?? "").localeCompare(a.lastUsedAt ?? "");
}

export function getPinnedItems(): MockItem[] {
  return items.filter((item) => item.isPinned).toSorted(byLastUsedDesc);
}

export function getRecentItems(limit = RECENT_ITEMS_LIMIT): MockItem[] {
  return items.toSorted(byLastUsedDesc).slice(0, limit);
}

export function getCollectionItems(collection: MockCollection): MockItem[] {
  return items.filter((item) => item.collectionIds.includes(collection.id));
}

function countCollectionItemTypes(
  collection: MockCollection
): Map<string, number> {
  const counts = new Map<string, number>();
  for (const item of getCollectionItems(collection)) {
    counts.set(item.itemTypeId, (counts.get(item.itemTypeId) ?? 0) + 1);
  }
  return counts;
}

// Distinct types in a collection, most common first.
export function getCollectionItemTypes(
  collection: MockCollection
): MockItemType[] {
  return [...countCollectionItemTypes(collection).entries()]
    .toSorted(([, a], [, b]) => b - a)
    .map(([typeId]) => getItemType(typeId))
    .filter((type): type is MockItemType => type !== undefined);
}

// The type a collection holds the most of; ties keep the default type.
export function getDominantItemType(
  collection: MockCollection
): MockItemType | undefined {
  const counts = countCollectionItemTypes(collection);

  let dominantTypeId = collection.defaultTypeId;
  let maxCount = dominantTypeId ? (counts.get(dominantTypeId) ?? 0) : 0;
  for (const [typeId, count] of counts) {
    if (count > maxCount) {
      dominantTypeId = typeId;
      maxCount = count;
    }
  }

  return dominantTypeId ? getItemType(dominantTypeId) : undefined;
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

// Plural label, e.g. "Snippets".
export function formatTypeLabel(type: MockItemType): string {
  return capitalize(type.slug);
}

// Singular name, e.g. "Snippet".
export function formatTypeName(type: MockItemType): string {
  return capitalize(type.name);
}
