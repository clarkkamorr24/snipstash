import { connection } from "next/server";

import { ItemGrid, ItemGridSkeleton } from "@/components/dashboard/ItemGrid";
import { getRecentItems } from "@/lib/db/items";
import { getCurrentUserId } from "@/lib/db/users";

const SKELETON_CARD_COUNT = 6;

export async function RecentItems() {
  await connection();
  const userId = await getCurrentUserId();
  const items = userId ? await getRecentItems(userId) : [];

  return <ItemGrid items={items} emptyMessage="No recent items yet." />;
}

export function RecentItemsSkeleton() {
  return <ItemGridSkeleton count={SKELETON_CARD_COUNT} />;
}
