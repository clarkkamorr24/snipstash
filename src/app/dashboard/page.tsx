import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronRightIcon } from "lucide-react";

import { DashboardSection } from "@/components/dashboard/DashboardSection";
import { DashboardStatsSection } from "@/components/dashboard/DashboardStatsSection";
import { ItemGrid } from "@/components/dashboard/ItemGrid";
import {
  RecentCollections,
  RecentCollectionsSkeleton,
} from "@/components/dashboard/RecentCollections";
import { StatsCardsSkeleton } from "@/components/dashboard/StatsCards";
import { getPinnedItems, getRecentItems } from "@/lib/dashboard-data";
import { currentUser } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  const firstName = currentUser.name.split(" ")[0];

  return (
    <div className="mx-auto max-w-6xl space-y-10 pb-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back, {firstName}
        </h1>
        <p className="text-sm text-muted-foreground">
          Keep your best ideas close at hand.
        </p>
      </header>

      <Suspense fallback={<StatsCardsSkeleton />}>
        <DashboardStatsSection />
      </Suspense>

      <DashboardSection
        title="Recent collections"
        description="Your knowledge, organized your way."
        action={
          <Link
            href="/collections"
            className="flex shrink-0 items-center gap-1 text-sm text-primary hover:underline"
          >
            View all
            <ChevronRightIcon className="size-4" />
          </Link>
        }
      >
        <Suspense fallback={<RecentCollectionsSkeleton />}>
          <RecentCollections />
        </Suspense>
      </DashboardSection>

      <DashboardSection
        title="Pinned items"
        description="Your go-to items, always at the top."
      >
        <ItemGrid items={getPinnedItems()} emptyMessage="No pinned items yet." />
      </DashboardSection>

      <DashboardSection
        title="Recent items"
        description="Pick up where you left off."
      >
        <ItemGrid items={getRecentItems()} emptyMessage="No recent items yet." />
      </DashboardSection>
    </div>
  );
}
