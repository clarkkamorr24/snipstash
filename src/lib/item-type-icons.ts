import {
  CodeIcon,
  FileIcon,
  ImageIcon,
  LinkIcon,
  SparklesIcon,
  StickyNoteIcon,
  TerminalIcon,
  type LucideIcon,
} from "lucide-react";

const ITEM_TYPE_ICONS: Record<string, LucideIcon> = {
  Code: CodeIcon,
  Sparkles: SparklesIcon,
  StickyNote: StickyNoteIcon,
  Terminal: TerminalIcon,
  Link: LinkIcon,
  File: FileIcon,
  Image: ImageIcon,
};

export function getItemTypeIcon(iconName: string): LucideIcon {
  return ITEM_TYPE_ICONS[iconName] ?? FileIcon;
}
