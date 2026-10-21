import type { ReactNode } from "react";
import Link from "next/link";
import { connection } from "next/server";

import { ItemTypeIcon } from "@/components/dashboard/ItemTypeIcon";
import { SidebarNavSkeleton } from "@/components/dashboard/SidebarNavSkeleton";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { formatTypeLabel } from "@/lib/dashboard-data";
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
              <span>{label}</span>
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
