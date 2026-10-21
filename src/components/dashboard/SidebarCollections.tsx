import { connection } from "next/server";

import { SidebarCollectionNav } from "@/components/dashboard/SidebarCollectionNav";
import { SidebarNavSkeleton } from "@/components/dashboard/SidebarNavSkeleton";
import { getSidebarCollections } from "@/lib/db/collections";
import { getCurrentUserId } from "@/lib/db/users";

const SKELETON_ROW_COUNT = 4;

export async function SidebarCollections() {
  await connection();
  const userId = await getCurrentUserId();
  const { favorites, recent } = userId
    ? await getSidebarCollections(userId)
    : { favorites: [], recent: [] };

  return (
    <>
      <SidebarCollectionNav
        label="Favorite collections"
        collections={favorites}
      />
      <SidebarCollectionNav
        label="Recent collections"
        collections={recent}
        showViewAll
      />
    </>
  );
}

export function SidebarCollectionsSkeleton() {
  return <SidebarNavSkeleton label="Collections" rows={SKELETON_ROW_COUNT} />;
}
