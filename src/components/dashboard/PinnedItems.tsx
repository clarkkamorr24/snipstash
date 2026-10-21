import type { ReactNode } from "react";
import { connection } from "next/server";

import { DashboardSection } from "@/components/dashboard/DashboardSection";
import { ItemGrid, ItemGridSkeleton } from "@/components/dashboard/ItemGrid";
import { getPinnedItems } from "@/lib/db/items";
import { getCurrentUserId } from "@/lib/db/users";

const SKELETON_CARD_COUNT = 3;

interface PinnedItemsSectionProps {
  children: ReactNode;
}

function PinnedItemsSection({ children }: PinnedItemsSectionProps) {
  return (
    <DashboardSection
      title="Pinned items"
      description="Your go-to items, always at the top."
    >
      {children}
    </DashboardSection>
  );
}

// The whole section is hidden when nothing is pinned.
export async function PinnedItems() {
  await connection();
  const userId = await getCurrentUserId();
  const items = userId ? await getPinnedItems(userId) : [];

  if (items.length === 0) return null;

  return (
    <PinnedItemsSection>
      <ItemGrid items={items} emptyMessage="No pinned items yet." />
    </PinnedItemsSection>
  );
}

export function PinnedItemsSkeleton() {
  return (
    <PinnedItemsSection>
      <ItemGridSkeleton count={SKELETON_CARD_COUNT} />
    </PinnedItemsSection>
  );
}
