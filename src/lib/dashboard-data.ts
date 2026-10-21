function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

// Plural label, e.g. "Snippets".
export function formatTypeLabel(type: { slug: string }): string {
  return capitalize(type.slug);
}

// Singular name, e.g. "Snippet".
export function formatTypeName(type: { name: string }): string {
  return capitalize(type.name);
}
