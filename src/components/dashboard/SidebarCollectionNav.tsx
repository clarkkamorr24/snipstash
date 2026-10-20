import Link from "next/link";
import { CircleIcon, FolderOpenIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getDominantItemType } from "@/lib/dashboard-data";
import type { MockCollection } from "@/lib/mock-data";

const FALLBACK_COLLECTION_COLOR = "#6b7280";

interface SidebarCollectionNavProps {
  label: string;
  collections: MockCollection[];
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
        {collections.map((collection) => {
          const color =
            getDominantItemType(collection)?.color ?? FALLBACK_COLLECTION_COLOR;

          return (
            <SidebarMenuItem key={collection.id}>
              <SidebarMenuButton
                tooltip={collection.name}
                render={<Link href={`/collections/${collection.id}`} />}
              >
                <CircleIcon fill={color} stroke="none" className="scale-50" />
                <span>{collection.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
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
