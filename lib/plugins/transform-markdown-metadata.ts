import { Plugin } from "vitepress";

export default function transformMarkdownMetadata(): Plugin {
  return {
    name: "transform-markdown-metadata",
    enforce: "pre", // Run this before VitePress parsers
    transform(code, id) {
      if (!id.endsWith(".md")) return;

      const lines = code.split("\n");
      const dateLine = lines[0].trim();
      const tagLine = lines[1].trim();

      // Check if it matches your specific pattern (YYYY-MM-DD)
      if (/^\d{4}-\d{2}-\d{2}/.test(dateLine)) {
        const date = dateLine;
        const tags = tagLine.startsWith("Tags:")
          ? tagLine.replace("Tags: #", "").split(" #")
          : [];

        // Construct frontmatter and remove the first 3 lines (date, tags and Content header)
        const contentWithoutMeta = lines.slice(3).join("\n");

        // Inject real YAML frontmatter
        const frontmatter = `---
date: ${date}
tags: ${JSON.stringify(tags)}
---

${contentWithoutMeta}`;

        return frontmatter;
      }
    },
  };
}
