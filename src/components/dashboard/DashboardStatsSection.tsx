import { connection } from "next/server";

import { StatsCards } from "@/components/dashboard/StatsCards";
import { getDashboardStats } from "@/lib/dashboard-data";
import { getCollectionStats, type CollectionStats } from "@/lib/db/collections";
import { getCurrentUserId } from "@/lib/db/users";

const EMPTY_COLLECTION_STATS: CollectionStats = {
  totalCollections: 0,
  favoriteCollections: 0,
};

export async function DashboardStatsSection() {
  await connection();
  const userId = await getCurrentUserId();
  const collectionStats = userId
    ? await getCollectionStats(userId)
    : EMPTY_COLLECTION_STATS;

  // Item stats stay on mock data until items move to the database.
  return <StatsCards stats={{ ...getDashboardStats(), ...collectionStats }} />;
}
