import { connection } from "next/server";

import { auth } from "@/auth";
import { SidebarUserMenu } from "@/components/dashboard/SidebarUserMenu";
import { Skeleton } from "@/components/ui/skeleton";

export async function SidebarUser() {
  // Auth.js uses crypto randomness before reading the request, which can't be prerendered
  await connection();
  const session = await auth();
  if (!session?.user) return null;

  const { name, email, image } = session.user;
  return (
    <SidebarUserMenu
      user={{ name: name ?? null, email: email ?? null, image: image ?? null }}
    />
  );
}

export function SidebarUserSkeleton() {
  return (
    <div className="flex h-12 items-center gap-2 px-2 group-data-[collapsible=icon]:px-0">
      <Skeleton className="size-8 shrink-0 rounded-full" />
      <div className="grid flex-1 gap-1.5 group-data-[collapsible=icon]:hidden">
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );
}
