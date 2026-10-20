import Link from "next/link";

import { SidebarCollectionNav } from "@/components/dashboard/SidebarCollectionNav";
import { SidebarTypeNav } from "@/components/dashboard/SidebarTypeNav";
import { SidebarUserMenu } from "@/components/dashboard/SidebarUserMenu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  getFavoriteCollections,
  getRecentCollections,
} from "@/lib/dashboard-data";
import { currentUser } from "@/lib/mock-data";

function Logo() {
  return (
    <span aria-hidden className="grid size-6 grid-cols-2 gap-0.5">
      <span className="rounded-sm bg-blue-500" />
      <span className="rounded-sm bg-violet-500" />
      <span className="rounded-sm bg-amber-300" />
      <span className="rounded-sm bg-emerald-500" />
    </span>
  );
}

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-14 flex-row items-center justify-between border-b border-sidebar-border px-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold group-data-[collapsible=icon]:hidden"
        >
          <Logo />
          SnipStash
        </Link>
        <SidebarTrigger className="text-muted-foreground" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarTypeNav />
        <SidebarCollectionNav
          label="Favorite collections"
          collections={getFavoriteCollections()}
        />
        <SidebarCollectionNav
          label="Recent collections"
          collections={getRecentCollections()}
          showViewAll
        />
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarUserMenu user={currentUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
