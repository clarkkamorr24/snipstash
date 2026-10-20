import {
  collections,
  items,
  itemTypes,
  type MockCollection,
  type MockItemType,
} from "@/lib/mock-data";

const RECENT_COLLECTIONS_LIMIT = 5;

export interface ItemTypeWithCount {
  type: MockItemType;
  count: number;
}

export function getItemTypesWithCounts(): ItemTypeWithCount[] {
  return itemTypes.map((type) => ({
    type,
    count: items.filter((item) => item.itemTypeId === type.id).length,
  }));
}

export function getFavoriteCollections(): MockCollection[] {
  return collections.filter((collection) => collection.isFavorite);
}

// Favorites already have their own section, so they are left out here.
export function getRecentCollections(): MockCollection[] {
  return collections
    .filter((collection) => !collection.isFavorite)
    .toSorted((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, RECENT_COLLECTIONS_LIMIT);
}

// The type a collection holds the most of; ties keep the default type.
export function getDominantItemType(
  collection: MockCollection
): MockItemType | undefined {
  const counts = new Map<string, number>();
  for (const item of items) {
    if (item.collectionIds.includes(collection.id)) {
      counts.set(item.itemTypeId, (counts.get(item.itemTypeId) ?? 0) + 1);
    }
  }

  let dominantTypeId = collection.defaultTypeId;
  let maxCount = dominantTypeId ? (counts.get(dominantTypeId) ?? 0) : 0;
  for (const [typeId, count] of counts) {
    if (count > maxCount) {
      dominantTypeId = typeId;
      maxCount = count;
    }
  }

  return itemTypes.find((type) => type.id === dominantTypeId);
}

export function formatTypeLabel(type: MockItemType): string {
  return type.slug.charAt(0).toUpperCase() + type.slug.slice(1);
}
