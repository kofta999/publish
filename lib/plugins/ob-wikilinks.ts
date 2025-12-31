// Highly inspired by https://github.com/alexjv89/markdown-it-obsidian
import type MarkdownIt from "markdown-it";
import fs from "fs";
import path from "node:path";
import StateInline from "markdown-it/lib/rules_inline/state_inline.mjs";

export interface WikiLinksOptions {
  baseURL?: string;
  relativeBaseURL?: string;
  makeAllLinksAbsolute?: boolean;
  uriSuffix?: string;
  htmlAttributes?: Record<string, string>;
  generatePageNameFromLabel?: (label: string) => string;
  postProcessPageName?: (pageName: string) => string;
  postProcessLabel?: (label: string) => string;
  includeFolder?: string;
  excludeFolders?: string[];
}

const defaultOptions: WikiLinksOptions = {
  baseURL: "/",
  relativeBaseURL: "./",
  makeAllLinksAbsolute: false,
  uriSuffix: "",
  htmlAttributes: {},
  generatePageNameFromLabel: (label: string) => label,
  postProcessPageName: (pageName: string) => {
    return pageName.trim().replace(/\s+/g, "_");
  },
  postProcessLabel: (label: string) => label.trim(),
  includeFolder: process.cwd(),
  excludeFolders: [".git", "_site", "node_modules", ".obsidian", "assets"],
};

function getAllFiles(dirPath: string, excludeFolders: string[]): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dirPath)) return results;

  const list = fs.readdirSync(dirPath);
  for (const file of list) {
    if (excludeFolders.includes(file)) continue;
    const fullPath = path.join(dirPath, file);
    let stat;
    try {
      stat = fs.statSync(fullPath);
    } catch (e) {
      continue;
    }
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, excludeFolders));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

const wikiLinksPlugin = (md: MarkdownIt, options?: WikiLinksOptions) => {
  const opts = { ...defaultOptions, ...options };
  const rootDir = opts.includeFolder || process.cwd();

  // Cache file list for resolution to match original behavior efficiently
  let allFiles: string[] = [];
  try {
    allFiles = getAllFiles(rootDir, opts.excludeFolders || []);
  } catch (e) {
    console.error("WikiLinks: Failed to scan directory", rootDir, e);
  }

  // Regex for [[page]], [[page|label]], [[page#anchor]], [[page#anchor|label]]
  // And supports ![[image]] for embeds
  const WIKILINK_RE = /(!?)\[\[(([^\]|#]+)(#[^\]|]*)?(\|[^\]]+)??)\]\]/;

  md.inline.ruler.after(
    "link",
    "wiki_link",
    (state: StateInline, silent: boolean) => {
      const start = state.pos;

      // Quick check for [[ or ![[
      let isEmbed = false;
      if (state.src[start] === "!") {
        if (state.src[start + 1] !== "[" || state.src[start + 2] !== "[")
          return false;
        isEmbed = true;
      } else if (state.src[start] === "[") {
        if (state.src[start + 1] !== "[") return false;
      } else {
        return false;
      }

      const match = WIKILINK_RE.exec(state.src.slice(start));
      if (!match) return false;

      if (silent) return true;

      // Group mapping:
      // 1: ! (if embed)
      // 2: Content inside [[ ]]
      // 3: Page name
      // 4: Anchor (includes #)
      // 5: Label (includes |)

      const rawTarget = match[3];
      const anchor = match[4] || "";
      const rawLabel = match[5] ? match[5].substring(1) : "";

      let pageName = rawTarget;
      let label = rawLabel || (match[4] ? match[3] + match[4] : match[3]);

      if (opts.postProcessPageName) {
        pageName = opts.postProcessPageName(pageName);
      }
      if (opts.postProcessLabel) {
        label = opts.postProcessLabel(label);
      }

      if (!label || !pageName) return false;

      // File resolution logic matching the original behavior
      let href = "";
      const shortlists: string[] = [];

      allFiles.forEach((file) => {
        const relativePath = path
          .relative(rootDir, file)
          .split(path.sep)
          .join("/");

        // Skip assets as per original plugin logic
        if (relativePath.includes("/assets/")) return;

        if (relativePath.includes(rawTarget)) {
          const urlPath = "/" + relativePath.replace(/\.md$/, "");
          const idx = urlPath.indexOf(rawTarget);
          // Original behavior check: preceded by a slash or is the start
          if (idx === 0 || urlPath[idx - 1] === "/") {
            shortlists.push(urlPath);
          }
        }
      });

      if (shortlists.length === 1) {
        href = shortlists[0];
      } else if (shortlists.length > 1) {
        // Look for exact match if multiple found
        const exact = shortlists.find(
          (h) => h.endsWith("/" + rawTarget) || h === "/" + rawTarget,
        );
        href = exact || shortlists[0];
      }

      // Fallback if no file found on disk
      if (!href) {
        if (opts.makeAllLinksAbsolute) {
          href = (opts.baseURL || "/") + pageName + (opts.uriSuffix || "");
        } else {
          href =
            (opts.relativeBaseURL || "./") + pageName + (opts.uriSuffix || "");
        }
      }

      // Append anchor if present
      if (anchor) {
        href += anchor;
      }

      state.pos += match[0].length;

      if (isEmbed) {
        const token = state.push("image", "img", 0);
        token.attrs = [
          ["src", md.utils.escapeHtml(href)],
          ["alt", label],
        ];
        if (opts.htmlAttributes) {
          Object.entries(opts.htmlAttributes).forEach(([key, val]) => {
            token.attrs?.push([key, val]);
          });
        }
        token.content = label;

        token.children = [];
        const token_text = new state.Token("text", "", 0);
        token_text.content = label;
        token.children.push(token_text);
      } else {
        const token_o = state.push("link_open", "a", 1);
        const attrs: [string, string][] = [["href", md.utils.escapeHtml(href)]];
        if (opts.htmlAttributes) {
          Object.entries(opts.htmlAttributes).forEach(([key, val]) => {
            attrs.push([key, val]);
          });
        }
        token_o.attrs = attrs;

        const token_t = state.push("text", "", 0);
        token_t.content = label;

        state.push("link_close", "a", -1);
      }

      return true;
    },
  );
};

export default wikiLinksPlugin;
