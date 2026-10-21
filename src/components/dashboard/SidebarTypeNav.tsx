import type { ReactNode } from "react";
import Link from "next/link";
import { connection } from "next/server";

import { ItemTypeIcon } from "@/components/dashboard/ItemTypeIcon";
import { SidebarNavSkeleton } from "@/components/dashboard/SidebarNavSkeleton";
import { Badge } from "@/components/ui/badge";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { formatTypeLabel, isProType } from "@/lib/dashboard-data";
import { getItemTypesWithCounts } from "@/lib/db/items";
import { getCurrentUserId } from "@/lib/db/users";

const LABEL = "Item types";
const SKELETON_ROW_COUNT = 7;

interface SidebarTypeGroupProps {
  children: ReactNode;
}

function SidebarTypeGroup({ children }: SidebarTypeGroupProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="tracking-wider uppercase">
        {LABEL}
      </SidebarGroupLabel>
      <SidebarMenu>{children}</SidebarMenu>
    </SidebarGroup>
  );
}

export async function SidebarTypeNav() {
  await connection();
  const userId = await getCurrentUserId();
  const itemTypes = userId ? await getItemTypesWithCounts(userId) : [];

  return (
    <SidebarTypeGroup>
      {itemTypes.map((type) => {
        const label = formatTypeLabel(type);

        return (
          <SidebarMenuItem key={type.id}>
            <SidebarMenuButton
              tooltip={label}
              render={<Link href={`/items/${type.slug}`} />}
            >
              <ItemTypeIcon icon={type.icon} color={type.color} />
              <span className="truncate">{label}</span>
              {isProType(type) && (
                <Badge
                  variant="outline"
                  className="h-4 rounded-sm px-1 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase group-data-[collapsible=icon]:hidden"
                >
                  Pro
                </Badge>
              )}
            </SidebarMenuButton>
            <SidebarMenuBadge className="text-muted-foreground">
              {type.itemCount}
            </SidebarMenuBadge>
          </SidebarMenuItem>
        );
      })}
    </SidebarTypeGroup>
  );
}

export function SidebarTypeNavSkeleton() {
  return <SidebarNavSkeleton label={LABEL} rows={SKELETON_ROW_COUNT} />;
}
