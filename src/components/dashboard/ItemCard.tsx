import { PinIcon } from "lucide-react";

import { ItemTypeIcon } from "@/components/dashboard/ItemTypeIcon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatTypeName } from "@/lib/dashboard-data";
import type { DashboardItem } from "@/lib/db/items";
import { formatShortDate } from "@/lib/format";
import { typeColorVars } from "@/lib/type-color";

interface ItemCardProps {
  item: DashboardItem;
}

function getItemMeta(item: DashboardItem): string {
  const source =
    item.url && URL.canParse(item.url)
      ? new URL(item.url).hostname
      : item.language;
  const date = formatShortDate(item.lastUsedAt ?? item.createdAt);
  return source ? `${source} · ${date}` : date;
}

export function ItemCard({ item }: ItemCardProps) {
  const type = item.itemType;

  return (
    <Card
      style={typeColorVars(type.color)}
      className="h-full ring-(--type-color)/30 transition-shadow hover:ring-(--type-color)/60"
    >
      <CardContent className="flex h-full flex-col gap-3">
        <div className="flex items-center justify-between">
          <Badge className="rounded-md bg-(--type-color)/15 text-(--type-color)">
            <ItemTypeIcon icon={type.icon} data-icon="inline-start" />
            {formatTypeName(type)}
          </Badge>
          {item.isPinned && (
            <PinIcon aria-label="Pinned" className="size-4 text-amber-400" />
          )}
        </div>
        <div className="space-y-1">
          <h3 className="truncate font-semibold">{item.title}</h3>
          {item.description && (
            <p className="line-clamp-2 text-xs text-muted-foreground">
              {item.description}
            </p>
          )}
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 text-xs">
          <span className="truncate text-muted-foreground">
            {getItemMeta(item)}
          </span>
          <span className="truncate text-(--type-color)">
            {item.tags.map((tag) => `#${tag}`).join(" ")}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
