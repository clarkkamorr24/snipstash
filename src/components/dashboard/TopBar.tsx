import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function TopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-4 md:px-6">
      <SidebarTrigger className="-ml-1 text-muted-foreground md:hidden" />
      <div className="relative min-w-0 flex-1 md:max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search anything..."
          aria-label="Search"
          className="h-9 pr-12 pl-8"
        />
        <Kbd className="absolute top-1/2 right-2 -translate-y-1/2">⌘K</Kbd>
      </div>
      <div className="ml-auto shrink-0">
        <Button size="lg" aria-label="New item">
          <Plus data-icon="inline-start" />
          <span className="hidden sm:inline">New item</span>
        </Button>
      </div>
    </header>
  );
}
