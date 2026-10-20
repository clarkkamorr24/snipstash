import type { LucideProps } from "lucide-react";

import {
  DEFAULT_ITEM_TYPE_ICON,
  ITEM_TYPE_ICONS,
} from "@/lib/item-type-icons";

interface ItemTypeIconProps extends LucideProps {
  icon: string;
}

export function ItemTypeIcon({ icon, ...props }: ItemTypeIconProps) {
  const Icon = ITEM_TYPE_ICONS[icon] ?? DEFAULT_ITEM_TYPE_ICON;
  return <Icon {...props} />;
}
