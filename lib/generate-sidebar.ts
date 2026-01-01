import fs from "node:fs";
import path from "node:path";
import type { DefaultTheme } from "vitepress";

export function generateSidebar(
  index: string,
  basePath: string,
): DefaultTheme.SidebarItem[] {
  // 1. Resolve path to your index file
  const indexPath = path.resolve(__dirname, "..", index);
  if (!fs.existsSync(indexPath)) return [];

  const content = fs.readFileSync(indexPath, "utf-8");

  // 2. Extract content between the first and last '---'
  const sections = content.split("---");
  if (sections.length < 3) return [];

  const mainContent = sections.slice(1, -1).join("\n");
  const lines = mainContent.split("\n");

  const sidebar: DefaultTheme.SidebarItem[] = [];
  let currentGroup: DefaultTheme.SidebarItem | null = null;

  lines.forEach((line) => {
    const trimmed = line.trim();

    // Match ## Headers as Group Titles
    if (trimmed.startsWith("## ")) {
      currentGroup = {
        text: trimmed.replace("## ", ""),
        collapsed: true,
        items: [],
      };
      sidebar.push(currentGroup);
    }

    // Match [[wikilinks]]
    // We capture the exact string inside [[ ]] to preserve your plugin's expectations
    const wikiMatch = trimmed.match(/\[\[(.*?)\]\]/);
    if (wikiMatch && currentGroup) {
      const linkTarget = wikiMatch[1];

      currentGroup.items?.push({
        text: linkTarget,
        // Prepend the custom basePath and ensure leading/trailing slashes are handled
        link: `${basePath.replace(/\/$/, "")}/${linkTarget}`,
      });
    }
  });

  return sidebar;
}
