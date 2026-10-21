import Link from "next/link";
import { Suspense } from "react";

import {
  SidebarCollections,
  SidebarCollectionsSkeleton,
} from "@/components/dashboard/SidebarCollections";
import {
  SidebarTypeNav,
  SidebarTypeNavSkeleton,
} from "@/components/dashboard/SidebarTypeNav";
import {
  SidebarUser,
  SidebarUserSkeleton,
} from "@/components/dashboard/SidebarUser";
import { Logo } from "@/components/shared/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";

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
        <Suspense fallback={<SidebarTypeNavSkeleton />}>
          <SidebarTypeNav />
        </Suspense>
        <Suspense fallback={<SidebarCollectionsSkeleton />}>
          <SidebarCollections />
        </Suspense>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <Suspense fallback={<SidebarUserSkeleton />}>
          <SidebarUser />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
}
