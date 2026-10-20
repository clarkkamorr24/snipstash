import Link from "next/link";
import {
  ChevronRightIcon,
  CircleIcon,
  FolderIcon,
  StarIcon,
} from "lucide-react";

import { ItemTypeIcon } from "@/components/dashboard/ItemTypeIcon";
import { Card, CardContent } from "@/components/ui/card";
import {
  getCollectionItems,
  getCollectionItemTypes,
  getDominantItemType,
} from "@/lib/dashboard-data";
import type { MockCollection } from "@/lib/mock-data";
import { typeColorVars } from "@/lib/type-color";

const MAX_TYPE_DOTS = 3;

interface CollectionCardProps {
  collection: MockCollection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const dominantType = getDominantItemType(collection);
  const itemTypes = getCollectionItemTypes(collection).slice(0, MAX_TYPE_DOTS);
  const itemCount = getCollectionItems(collection).length;

  return (
    <Link
      href={`/collections/${collection.id}`}
      style={typeColorVars(dominantType?.color)}
      className="group/collection rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Card className="h-full bg-linear-to-br from-(--type-color)/15 to-card transition-shadow group-hover/collection:ring-(--type-color)/40">
        <CardContent className="flex h-full flex-col gap-4">
          <div className="flex items-start justify-between">
            <span className="flex size-9 items-center justify-center rounded-lg bg-(--type-color)/15 text-(--type-color)">
              {dominantType ? (
                <ItemTypeIcon icon={dominantType.icon} className="size-4" />
              ) : (
                <FolderIcon className="size-4" />
              )}
            </span>
            {collection.isFavorite && (
              <StarIcon
                aria-label="Favorite"
                className="size-4 fill-amber-400 text-amber-400"
              />
            )}
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate font-semibold">{collection.name}</h3>
              <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-hover/collection:translate-x-0.5" />
            </div>
            {collection.description && (
              <p className="line-clamp-1 text-xs text-muted-foreground">
                {collection.description}
              </p>
            )}
          </div>
          <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
            <div className="flex gap-1">
              {itemTypes.map((type) => (
                <CircleIcon
                  key={type.id}
                  fill={type.color}
                  stroke="none"
                  className="size-2.5"
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
