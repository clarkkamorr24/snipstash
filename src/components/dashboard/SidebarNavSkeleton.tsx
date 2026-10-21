import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// Fixed widths, since the shadcn skeleton's random width can't be prerendered.
const ROW_WIDTHS = ["w-3/5", "w-4/5", "w-1/2", "w-2/3", "w-3/4"];

interface SidebarNavSkeletonProps {
  label: string;
  rows: number;
}

export function SidebarNavSkeleton({ label, rows }: SidebarNavSkeletonProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="tracking-wider uppercase">
        {label}
      </SidebarGroupLabel>
      <SidebarMenu>
        {Array.from({ length: rows }, (_, index) => (
          <SidebarMenuItem
            key={index}
            className="flex h-8 items-center gap-2 px-2"
          >
            <Skeleton className="size-4 shrink-0 rounded-md" />
            <Skeleton
              className={cn(
                "h-4 group-data-[collapsible=icon]:hidden",
                ROW_WIDTHS[index % ROW_WIDTHS.length]
              )}
            />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
