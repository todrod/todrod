export function createTemplateSlug(goalId: string, layoutId: string, paletteId: string, date = new Date()): string {
  const stamp = [
    date.getFullYear().toString(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
    String(date.getHours()).padStart(2, "0"),
    String(date.getMinutes()).padStart(2, "0"),
  ].join("");

  return `${goalId}-${layoutId}-${paletteId}-${stamp}`
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
