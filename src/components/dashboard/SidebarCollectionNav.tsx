import Link from "next/link";
import { CircleIcon, FolderOpenIcon, StarIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { CollectionSummary } from "@/lib/db/collections";
import { FALLBACK_TYPE_COLOR } from "@/lib/type-color";

interface SidebarCollectionNavProps {
  label: string;
  collections: CollectionSummary[];
  showViewAll?: boolean;
}

export function SidebarCollectionNav({
  label,
  collections,
  showViewAll = false,
}: SidebarCollectionNavProps) {
  if (collections.length === 0 && !showViewAll) {
    return null;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="tracking-wider uppercase">
        {label}
      </SidebarGroupLabel>
      <SidebarMenu>
        {collections.map((collection) => (
          <SidebarMenuItem key={collection.id}>
            <SidebarMenuButton
              tooltip={collection.name}
              render={<Link href={`/collections/${collection.id}`} />}
            >
              {collection.isFavorite ? (
                <StarIcon className="fill-amber-400 text-amber-400" />
              ) : (
                <CircleIcon
                  fill={collection.dominantType?.color ?? FALLBACK_TYPE_COLOR}
                  stroke="none"
                  className="scale-50"
                />
              )}
              <span>{collection.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        {showViewAll && (
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="View all collections"
              className="text-muted-foreground"
              render={<Link href="/collections" />}
            >
              <FolderOpenIcon />
              <span>View all collections</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
