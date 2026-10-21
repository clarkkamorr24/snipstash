import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

type SystemTypeName = "snippet" | "prompt" | "note" | "command" | "link" | "file" | "image";

interface SeedItem {
  type: SystemTypeName;
  title: string;
  description: string;
  content?: string;
  language?: string;
  url?: string;
  isFavorite?: boolean;
  isPinned?: boolean;
  lastUsedDaysAgo?: number;
}

interface SeedCollection {
  name: string;
  description: string;
  defaultType: SystemTypeName;
  isFavorite?: boolean;
  items: SeedItem[];
}

const SYSTEM_ITEM_TYPES: { name: SystemTypeName; slug: string; icon: string; color: string }[] = [
  { name: "snippet", slug: "snippets", icon: "Code", color: "#3b82f6" },
  { name: "prompt", slug: "prompts", icon: "Sparkles", color: "#8b5cf6" },
  { name: "note", slug: "notes", icon: "StickyNote", color: "#fde047" },
  { name: "command", slug: "commands", icon: "Terminal", color: "#f97316" },
  { name: "link", slug: "links", icon: "Link", color: "#10b981" },
  { name: "file", slug: "files", icon: "File", color: "#6b7280" },
  { name: "image", slug: "images", icon: "Image", color: "#ec4899" },
];

const DEMO_USER = {
  email: "demo@devstash.io",
  name: "Demo User",
  password: "12345678",
};

const BCRYPT_ROUNDS = 12;

const COLLECTIONS: SeedCollection[] = [
  {
    name: "React Patterns",
    description: "Reusable React patterns and hooks",
    defaultType: "snippet",
    isFavorite: true,
    items: [
      {
        type: "snippet",
        title: "useDebounce and useLocalStorage hooks",
        description: "Debounce a fast-changing value and persist state to localStorage",
        language: "typescript",
        isFavorite: true,
        isPinned: true,
        lastUsedDaysAgo: 0,
        content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}`,
      },
      {
        type: "snippet",
        title: "Compound components with context",
        description: "Tabs built as a compound component sharing state through a context provider",
        language: "typescript",
        lastUsedDaysAgo: 2,
        content: `import { createContext, useContext, useState, type ReactNode } from "react";

interface TabsContextValue {
  active: string;
  setActive: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs components must be used inside <Tabs>");
  return context;
}

export function Tabs({ defaultValue, children }: { defaultValue: string; children: ReactNode }) {
  const [active, setActive] = useState(defaultValue);
  return <TabsContext.Provider value={{ active, setActive }}>{children}</TabsContext.Provider>;
}

Tabs.Trigger = function TabsTrigger({ value, children }: { value: string; children: ReactNode }) {
  const { active, setActive } = useTabs();
  return (
    <button aria-selected={active === value} onClick={() => setActive(value)}>
      {children}
    </button>
  );
};

Tabs.Panel = function TabsPanel({ value, children }: { value: string; children: ReactNode }) {
  const { active } = useTabs();
  return active === value ? <div>{children}</div> : null;
};`,
      },
      {
        type: "snippet",
        title: "Everyday utility functions",
        description: "Small typed helpers: groupBy, clamp and sleep",
        language: "typescript",
        content: `export function groupBy<T, K extends PropertyKey>(items: T[], getKey: (item: T) => K) {
  return items.reduce(
    (groups, item) => {
      const key = getKey(item);
      (groups[key] ??= []).push(item);
      return groups;
    },
    {} as Record<K, T[]>,
  );
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}`,
      },
    ],
  },
  {
    name: "AI Workflows",
    description: "AI prompts and workflow automations",
    defaultType: "prompt",
    isFavorite: true,
    items: [
      {
        type: "prompt",
        title: "Code review prompt",
        description: "Thorough review focused on bugs, security and readability",
        isFavorite: true,
        isPinned: true,
        lastUsedDaysAgo: 1,
        content: `You are a senior software engineer reviewing a pull request.

Review the code below and report:
1. Bugs and logic errors, including unhandled edge cases
2. Security issues (input validation, auth checks, injection, secrets)
3. Performance problems (unnecessary work, N+1 queries, re-renders)
4. Readability and naming improvements

For each finding, give the line, the problem, why it matters and a concrete fix.
List the most severe findings first. If the code looks good, say so briefly.

Code:
{{code}}`,
      },
      {
        type: "prompt",
        title: "Documentation generator",
        description: "Turn a module into clear README-style documentation",
        lastUsedDaysAgo: 4,
        content: `Write developer documentation for the code below.

Include:
- A one-paragraph overview of what it does and when to use it
- Installation or setup steps, if any
- The public API: each function or component with its parameters, return value and an example
- Common pitfalls or limitations

Use Markdown with headings and fenced code blocks. Keep the tone concise and practical.

Code:
{{code}}`,
      },
      {
        type: "prompt",
        title: "Refactoring assistant",
        description: "Refactor code for clarity without changing behavior",
        content: `Refactor the code below to make it easier to read and maintain.

Rules:
- Do not change its behavior or public API
- Prefer small, focused functions and descriptive names
- Remove duplication and dead code
- Keep the existing style and conventions

Return the refactored code, then a short bullet list explaining each change and why it helps.

Code:
{{code}}`,
      },
    ],
  },
  {
    name: "DevOps",
    description: "Infrastructure and deployment resources",
    defaultType: "snippet",
    items: [
      {
        type: "snippet",
        title: "Multi-stage Dockerfile for Next.js",
        description: "Small production image using Next.js standalone output",
        language: "dockerfile",
        lastUsedDaysAgo: 3,
        content: `FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]`,
      },
      {
        type: "command",
        title: "Build, push and deploy a Docker image",
        description: "Tag the image with the current commit and roll it out",
        language: "bash",
        content: `TAG=$(git rev-parse --short HEAD)
docker build -t registry.example.com/snipstash:$TAG .
docker push registry.example.com/snipstash:$TAG
npx prisma migrate deploy
kubectl set image deployment/snipstash app=registry.example.com/snipstash:$TAG`,
      },
      {
        type: "link",
        title: "Docker documentation",
        description: "Official guides and reference for Docker and Compose",
        url: "https://docs.docker.com/",
      },
      {
        type: "link",
        title: "GitHub Actions documentation",
        description: "Workflows, runners and CI/CD with GitHub Actions",
        url: "https://docs.github.com/en/actions",
      },
    ],
  },
  {
    name: "Terminal Commands",
    description: "Useful shell commands for everyday development",
    defaultType: "command",
    items: [
      {
        type: "command",
        title: "Git: undo and clean up",
        description: "Undo the last commit, discard changes and prune merged branches",
        language: "bash",
        isPinned: true,
        lastUsedDaysAgo: 0,
        content: `# Undo the last commit but keep its changes staged
git reset --soft HEAD~1

# Discard all unstaged changes in the working tree
git restore .

# Delete local branches already merged into main
git branch --merged main | grep -v "main" | xargs git branch -d`,
      },
      {
        type: "command",
        title: "Docker: clean up unused resources",
        description: "Remove stopped containers, dangling images and unused volumes",
        language: "bash",
        lastUsedDaysAgo: 5,
        content: `# Show disk usage by images, containers and volumes
docker system df

# Remove stopped containers, unused networks and dangling images
docker system prune

# Also remove unused volumes (careful: deletes data)
docker system prune --volumes`,
      },
      {
        type: "command",
        title: "Kill the process on a port",
        description: "Free up a port held by a stuck dev server",
        language: "bash",
        isFavorite: true,
        content: `# macOS / Linux
lsof -ti :3000 | xargs kill -9

# Windows (PowerShell)
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force`,
      },
      {
        type: "command",
        title: "npm: audit and update dependencies",
        description: "Find outdated packages and upgrade them safely",
        language: "bash",
        content: `# List outdated packages
npm outdated

# Upgrade within the semver ranges in package.json
npm update

# Check for known vulnerabilities and apply safe fixes
npm audit
npm audit fix`,
      },
    ],
  },
  {
    name: "Design Resources",
    description: "UI/UX resources and references",
    defaultType: "link",
    items: [
      {
        type: "link",
        title: "Tailwind CSS documentation",
        description: "Utility classes, theming and v4 configuration reference",
        url: "https://tailwindcss.com/docs",
        isFavorite: true,
        lastUsedDaysAgo: 1,
      },
      {
        type: "link",
        title: "shadcn/ui",
        description: "Accessible, copy-paste React components built on Tailwind",
        url: "https://ui.shadcn.com",
      },
      {
        type: "link",
        title: "Material Design 3",
        description: "Google's design system: foundations, styles and components",
        url: "https://m3.material.io",
      },
      {
        type: "link",
        title: "Lucide icons",
        description: "Open-source icon library used across the app",
        url: "https://lucide.dev/icons",
      },
    ],
  },
];

// Postgres treats NULLs as distinct, so @@unique([userId, slug]) can't be used
// to upsert system types. Look them up by slug where userId IS NULL instead.
async function seedSystemItemTypes() {
  const typeIds = new Map<SystemTypeName, string>();

  for (const type of SYSTEM_ITEM_TYPES) {
    const existing = await prisma.itemType.findFirst({
      where: { slug: type.slug, userId: null },
      select: { id: true },
    });

    const { id } = existing
      ? await prisma.itemType.update({
          where: { id: existing.id },
          data: { ...type, isSystem: true },
        })
      : await prisma.itemType.create({ data: { ...type, isSystem: true } });

    typeIds.set(type.name, id);
  }

  console.log(`Seeded ${SYSTEM_ITEM_TYPES.length} system item types`);
  return typeIds;
}

async function seedDemoUser() {
  const password = await bcrypt.hash(DEMO_USER.password, BCRYPT_ROUNDS);
  const data = { name: DEMO_USER.name, password, isPro: false, emailVerified: new Date() };

  const user = await prisma.user.upsert({
    where: { email: DEMO_USER.email },
    update: data,
    create: { email: DEMO_USER.email, ...data },
  });

  console.log(`Seeded demo user ${user.email}`);
  return user.id;
}

// Item collection join rows cascade, so this leaves no orphans behind
async function resetDemoContent(userId: string) {
  await prisma.item.deleteMany({ where: { userId } });
  await prisma.collection.deleteMany({ where: { userId } });
}

function daysAgo(days: number) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

function toItemData(item: SeedItem, userId: string, typeIds: Map<SystemTypeName, string>) {
  return {
    title: item.title,
    description: item.description,
    contentType: item.type === "link" ? ("URL" as const) : ("TEXT" as const),
    content: item.content,
    language: item.language,
    url: item.url,
    isFavorite: item.isFavorite ?? false,
    isPinned: item.isPinned ?? false,
    lastUsedAt: item.lastUsedDaysAgo === undefined ? null : daysAgo(item.lastUsedDaysAgo),
    userId,
    itemTypeId: typeIds.get(item.type)!,
  };
}

async function seedCollections(userId: string, typeIds: Map<SystemTypeName, string>) {
  for (const collection of COLLECTIONS) {
    await prisma.collection.create({
      data: {
        name: collection.name,
        description: collection.description,
        isFavorite: collection.isFavorite ?? false,
        userId,
        defaultTypeId: typeIds.get(collection.defaultType),
        items: {
          create: collection.items.map((item) => ({
            item: { create: toItemData(item, userId, typeIds) },
          })),
        },
      },
    });
  }

  const itemCount = COLLECTIONS.reduce((total, collection) => total + collection.items.length, 0);
  console.log(`Seeded ${COLLECTIONS.length} collections with ${itemCount} items`);
}

async function seed() {
  const typeIds = await seedSystemItemTypes();
  const userId = await seedDemoUser();
  await resetDemoContent(userId);
  await seedCollections(userId, typeIds);
}

seed()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
