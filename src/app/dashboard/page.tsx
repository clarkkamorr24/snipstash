import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return <h2 className="text-lg font-semibold">Main</h2>;
}
