import Link from "next/link";

import { ItemTypeIcon } from "@/components/dashboard/ItemTypeIcon";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { formatTypeLabel, getItemTypesWithCounts } from "@/lib/dashboard-data";

export function SidebarTypeNav() {
  const typesWithCounts = getItemTypesWithCounts();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="tracking-wider uppercase">
        Item types
      </SidebarGroupLabel>
      <SidebarMenu>
        {typesWithCounts.map(({ type, count }) => {
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
                {count}
              </SidebarMenuBadge>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
