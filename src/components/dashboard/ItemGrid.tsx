import { ItemCard } from "@/components/dashboard/ItemCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { DashboardItem } from "@/lib/db/items";

const ITEM_GRID_CLASS = "grid gap-4 md:grid-cols-2 xl:grid-cols-3";

interface ItemGridProps {
  items: DashboardItem[];
  emptyMessage: string;
}

interface ItemGridSkeletonProps {
  count: number;
}

export function ItemGrid({ items, emptyMessage }: ItemGridProps) {
  if (items.length === 0) {
    return (
      <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className={ITEM_GRID_CLASS}>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export function ItemGridSkeleton({ count }: ItemGridSkeletonProps) {
  return (
    <div className={ITEM_GRID_CLASS}>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} className="h-36 rounded-xl" />
      ))}
    </div>
  );
}
