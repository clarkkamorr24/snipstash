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

export const DEFAULT_ITEM_TYPE_ICON: LucideIcon = FileIcon;

export const ITEM_TYPE_ICONS: Record<string, LucideIcon> = {
  Code: CodeIcon,
  Sparkles: SparklesIcon,
  StickyNote: StickyNoteIcon,
  Terminal: TerminalIcon,
  Link: LinkIcon,
  File: FileIcon,
  Image: ImageIcon,
};
