import { connection } from "next/server";

import { CollectionCard } from "@/components/dashboard/CollectionCard";
import { Skeleton } from "@/components/ui/skeleton";
import { getRecentCollections } from "@/lib/db/collections";
import { getCurrentUserId } from "@/lib/db/users";

const COLLECTION_GRID_CLASS = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3";
const SKELETON_CARD_COUNT = 6;

export async function RecentCollections() {
  await connection();
  const userId = await getCurrentUserId();
  const collections = userId ? await getRecentCollections(userId) : [];

  if (collections.length === 0) {
    return (
      <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
        No collections yet.
      </p>
    );
  }

  return (
    <div className={COLLECTION_GRID_CLASS}>
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  );
}

export function RecentCollectionsSkeleton() {
  return (
    <div className={COLLECTION_GRID_CLASS}>
      {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
        <Skeleton key={index} className="h-40 rounded-xl" />
      ))}
    </div>
  );
}
