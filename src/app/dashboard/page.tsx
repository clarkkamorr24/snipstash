import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronRightIcon } from "lucide-react";

import { DashboardSection } from "@/components/dashboard/DashboardSection";
import { DashboardStatsSection } from "@/components/dashboard/DashboardStatsSection";
import {
  RecentCollections,
  RecentCollectionsSkeleton,
} from "@/components/dashboard/RecentCollections";
import {
  PinnedItems,
  PinnedItemsSkeleton,
} from "@/components/dashboard/PinnedItems";
import {
  RecentItems,
  RecentItemsSkeleton,
} from "@/components/dashboard/RecentItems";
import { StatsCardsSkeleton } from "@/components/dashboard/StatsCards";
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

      <Suspense fallback={<PinnedItemsSkeleton />}>
        <PinnedItems />
      </Suspense>

      <DashboardSection
        title="Recent items"
        description="Pick up where you left off."
      >
        <Suspense fallback={<RecentItemsSkeleton />}>
          <RecentItems />
        </Suspense>
      </DashboardSection>
    </div>
  );
}
