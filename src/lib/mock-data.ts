export type ContentType = "TEXT" | "URL" | "FILE";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  isPro: boolean;
}

export interface MockItemType {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  isSystem: boolean;
}

export interface MockCollection {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  defaultTypeId: string | null;
  createdAt: string;
}

export interface MockItem {
  id: string;
  title: string;
  description: string | null;
  contentType: ContentType;
  content: string | null;
  language: string | null;
  url: string | null;
  fileUrl: string | null;
  fileName: string | null;
  fileSize: number | null;
  isFavorite: boolean;
  isPinned: boolean;
  lastUsedAt: string | null;
  itemTypeId: string;
  collectionIds: string[];
  tags: string[];
  createdAt: string;
}

export const currentUser: MockUser = {
  id: "user_1",
  name: "Alex Kim",
  email: "alex@snipstash.dev",
  image: null,
  isPro: false,
};

export const itemTypes: MockItemType[] = [
  { id: "type_snippet", name: "snippet", slug: "snippets", icon: "Code", color: "#3b82f6", isSystem: true },
  { id: "type_prompt", name: "prompt", slug: "prompts", icon: "Sparkles", color: "#8b5cf6", isSystem: true },
  { id: "type_note", name: "note", slug: "notes", icon: "StickyNote", color: "#fde047", isSystem: true },
  { id: "type_command", name: "command", slug: "commands", icon: "Terminal", color: "#f97316", isSystem: true },
  { id: "type_link", name: "link", slug: "links", icon: "Link", color: "#10b981", isSystem: true },
  { id: "type_file", name: "file", slug: "files", icon: "File", color: "#6b7280", isSystem: true },
  { id: "type_image", name: "image", slug: "images", icon: "Image", color: "#ec4899", isSystem: true },
];

export const collections: MockCollection[] = [
  {
    id: "col_react",
    name: "React Patterns",
    description: "Reusable patterns & architecture",
    isFavorite: true,
    defaultTypeId: "type_snippet",
    createdAt: "2026-09-01T10:00:00.000Z",
  },
  {
    id: "col_ai",
    name: "AI Workflows",
    description: "Prompts that make you faster",
    isFavorite: true,
    defaultTypeId: "type_prompt",
    createdAt: "2026-09-05T10:00:00.000Z",
  },
  {
    id: "col_interview",
    name: "Interview Prep",
    description: "Algorithms, concepts & notes",
    isFavorite: false,
    defaultTypeId: "type_note",
    createdAt: "2026-09-10T10:00:00.000Z",
  },
  {
    id: "col_dev_env",
    name: "Dev Environment",
    description: "Tools, setup & shell commands",
    isFavorite: false,
    defaultTypeId: "type_command",
    createdAt: "2026-09-15T10:00:00.000Z",
  },
];

export const items: MockItem[] = [
  {
    id: "item_1",
    title: "useDebounce hook",
    description: "A tiny, reusable debounce hook for React inputs.",
    contentType: "TEXT",
    content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}`,
    language: "typescript",
    url: null,
    fileUrl: null,
    fileName: null,
    fileSize: null,
    isFavorite: true,
    isPinned: true,
    lastUsedAt: "2026-10-20T09:58:00.000Z",
    itemTypeId: "type_snippet",
    collectionIds: ["col_react", "col_interview"],
    tags: ["react", "hooks"],
    createdAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "item_2",
    title: "Senior engineer system prompt",
    description: "A practical system prompt for reviewing architecture decisions.",
    contentType: "TEXT",
    content:
      "You are a senior software engineer. Review the proposed architecture for scalability, maintainability and hidden complexity. Point out risks and suggest simpler alternatives.",
    language: null,
    url: null,
    fileUrl: null,
    fileName: null,
    fileSize: null,
    isFavorite: true,
    isPinned: false,
    lastUsedAt: "2026-10-20T09:42:00.000Z",
    itemTypeId: "type_prompt",
    collectionIds: ["col_ai"],
    tags: ["ai", "review"],
    createdAt: "2026-09-06T10:00:00.000Z",
  },
  {
    id: "item_3",
    title: "Notes on optimistic UI",
    description: "Keep interactions feeling instant while mutations resolve.",
    contentType: "TEXT",
    content:
      "## Optimistic UI\n\n- Update local state before the server responds\n- Roll back on error and show a toast\n- Use `useOptimistic` in React 19",
    language: "markdown",
    url: null,
    fileUrl: null,
    fileName: null,
    fileSize: null,
    isFavorite: false,
    isPinned: false,
    lastUsedAt: "2026-10-20T09:00:00.000Z",
    itemTypeId: "type_note",
    collectionIds: ["col_react"],
    tags: ["ux", "performance"],
    createdAt: "2026-09-12T10:00:00.000Z",
  },
  {
    id: "item_4",
    title: "git clean branches",
    description: "Safely remove local branches that are no longer on origin.",
    contentType: "TEXT",
    content: "git fetch -p && git branch -vv | grep ': gone]' | awk '{print $1}' | xargs git branch -d",
    language: "bash",
    url: null,
    fileUrl: null,
    fileName: null,
    fileSize: null,
    isFavorite: false,
    isPinned: true,
    lastUsedAt: "2026-10-20T07:00:00.000Z",
    itemTypeId: "type_command",
    collectionIds: ["col_dev_env"],
    tags: ["git", "cli"],
    createdAt: "2026-09-16T10:00:00.000Z",
  },
  {
    id: "item_5",
    title: "Linear design principles",
    description: "Product thinking and interface inspiration.",
    contentType: "URL",
    content: null,
    language: null,
    url: "https://linear.app/method",
    fileUrl: null,
    fileName: null,
    fileSize: null,
    isFavorite: false,
    isPinned: false,
    lastUsedAt: "2026-10-19T15:00:00.000Z",
    itemTypeId: "type_link",
    collectionIds: [],
    tags: ["design"],
    createdAt: "2026-09-20T10:00:00.000Z",
  },
  {
    id: "item_6",
    title: "API checklist.md",
    description: "A pre-flight checklist for shipping a production API.",
    contentType: "FILE",
    content: null,
    language: null,
    url: null,
    fileUrl: "/mock/api-checklist.md",
    fileName: "api-checklist.md",
    fileSize: 4096,
    isFavorite: false,
    isPinned: false,
    lastUsedAt: "2026-10-19T12:00:00.000Z",
    itemTypeId: "type_file",
    collectionIds: ["col_interview"],
    tags: ["api", "backend"],
    createdAt: "2026-09-22T10:00:00.000Z",
  },
  {
    id: "item_7",
    title: "Compound component pattern",
    description: "Share implicit state between parent and child components.",
    contentType: "TEXT",
    content: `const TabsContext = createContext<TabsContextValue | null>(null);

export function Tabs({ children, defaultValue }: TabsProps) {
  const [value, setValue] = useState(defaultValue);
  return <TabsContext value={{ value, setValue }}>{children}</TabsContext>;
}`,
    language: "tsx",
    url: null,
    fileUrl: null,
    fileName: null,
    fileSize: null,
    isFavorite: false,
    isPinned: false,
    lastUsedAt: "2026-10-18T10:00:00.000Z",
    itemTypeId: "type_snippet",
    collectionIds: ["col_react"],
    tags: ["react", "patterns"],
    createdAt: "2026-09-03T10:00:00.000Z",
  },
  {
    id: "item_8",
    title: "Commit message writer",
    description: "Turn a diff into a conventional commit message.",
    contentType: "TEXT",
    content:
      "Read the following diff and write a concise conventional commit message (feat, fix, chore...). Keep the subject under 72 characters.",
    language: null,
    url: null,
    fileUrl: null,
    fileName: null,
    fileSize: null,
    isFavorite: false,
    isPinned: false,
    lastUsedAt: "2026-10-17T10:00:00.000Z",
    itemTypeId: "type_prompt",
    collectionIds: ["col_ai", "col_dev_env"],
    tags: ["ai", "git"],
    createdAt: "2026-09-07T10:00:00.000Z",
  },
  {
    id: "item_9",
    title: "Big O cheat sheet",
    description: "Time and space complexity for common data structures.",
    contentType: "TEXT",
    content:
      "| Structure | Access | Search | Insert |\n| --- | --- | --- | --- |\n| Array | O(1) | O(n) | O(n) |\n| Hash map | - | O(1) | O(1) |\n| BST | O(log n) | O(log n) | O(log n) |",
    language: "markdown",
    url: null,
    fileUrl: null,
    fileName: null,
    fileSize: null,
    isFavorite: true,
    isPinned: false,
    lastUsedAt: "2026-10-16T10:00:00.000Z",
    itemTypeId: "type_note",
    collectionIds: ["col_interview"],
    tags: ["algorithms"],
    createdAt: "2026-09-11T10:00:00.000Z",
  },
  {
    id: "item_10",
    title: "Kill process on port",
    description: "Free up a port that a stuck dev server is holding.",
    contentType: "TEXT",
    content: "npx kill-port 3000",
    language: "bash",
    url: null,
    fileUrl: null,
    fileName: null,
    fileSize: null,
    isFavorite: false,
    isPinned: false,
    lastUsedAt: "2026-10-15T10:00:00.000Z",
    itemTypeId: "type_command",
    collectionIds: ["col_dev_env"],
    tags: ["cli", "node"],
    createdAt: "2026-09-17T10:00:00.000Z",
  },
];
