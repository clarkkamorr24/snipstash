import type { ReactNode } from "react";
import Link from "next/link";

import { Logo } from "@/components/shared/Logo";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-12">
      <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
        <Logo />
        SnipStash
      </Link>
      <div className="w-full max-w-sm">{children}</div>
    </main>
  );
}
