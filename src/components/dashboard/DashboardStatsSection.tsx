import { connection } from "next/server";

import {
  StatsCards,
  type DashboardStats,
} from "@/components/dashboard/StatsCards";
import { getCollectionStats } from "@/lib/db/collections";
import { getItemStats } from "@/lib/db/items";
import { getCurrentUserId } from "@/lib/db/users";

const EMPTY_STATS: DashboardStats = {
  totalItems: 0,
  favoriteItems: 0,
  totalCollections: 0,
  favoriteCollections: 0,
};

export async function DashboardStatsSection() {
  await connection();
  const userId = await getCurrentUserId();
  if (!userId) return <StatsCards stats={EMPTY_STATS} />;

  const [itemStats, collectionStats] = await Promise.all([
    getItemStats(userId),
    getCollectionStats(userId),
  ]);

  return <StatsCards stats={{ ...itemStats, ...collectionStats }} />;
}
