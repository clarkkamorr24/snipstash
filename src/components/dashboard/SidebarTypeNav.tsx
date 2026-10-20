import Link from "next/link";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { formatTypeLabel, getItemTypesWithCounts } from "@/lib/dashboard-data";
import { getItemTypeIcon } from "@/lib/item-type-icons";

export function SidebarTypeNav() {
  const typesWithCounts = getItemTypesWithCounts();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="tracking-wider uppercase">
        Item types
      </SidebarGroupLabel>
      <SidebarMenu>
        {typesWithCounts.map(({ type, count }) => {
          const Icon = getItemTypeIcon(type.icon);
          const label = formatTypeLabel(type);

          return (
            <SidebarMenuItem key={type.id}>
              <SidebarMenuButton
                tooltip={label}
                render={<Link href={`/items/${type.slug}`} />}
              >
                <Icon color={type.color} />
                <span>{label}</span>
              </SidebarMenuButton>
              <SidebarMenuBadge className="text-muted-foreground">
                {count}
              </SidebarMenuBadge>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
