import {
  FolderHeartIcon,
  FolderIcon,
  LayersIcon,
  StarIcon,
  type LucideIcon,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { CollectionStats } from "@/lib/db/collections";
import type { ItemStats } from "@/lib/db/items";

export type DashboardStats = ItemStats & CollectionStats;

interface StatCardConfig {
  key: keyof DashboardStats;
  label: string;
  icon: LucideIcon;
}

const STAT_CARDS: StatCardConfig[] = [
  { key: "totalItems", label: "Items", icon: LayersIcon },
  { key: "totalCollections", label: "Collections", icon: FolderIcon },
  { key: "favoriteItems", label: "Favorite items", icon: StarIcon },
  {
    key: "favoriteCollections",
    label: "Favorite collections",
    icon: FolderHeartIcon,
  },
];

const STATS_GRID_CLASS = "grid grid-cols-2 gap-4 lg:grid-cols-4";

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCardsSkeleton() {
  return (
    <div className={STATS_GRID_CLASS}>
      {STAT_CARDS.map(({ key }) => (
        <Skeleton key={key} className="h-20 rounded-xl" />
      ))}
    </div>
  );
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className={STATS_GRID_CLASS}>
      {STAT_CARDS.map(({ key, label, icon: Icon }) => (
        <Card key={key} className="flex-row items-center gap-3 px-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Icon className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs text-muted-foreground">{label}</p>
            <p className="text-2xl font-semibold tabular-nums">{stats[key]}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
