import { defineConfig, MarkdownOptions } from "vitepress";
import WikiLinksPlugin from "../lib/plugins/ob-wikilinks";
import { tasklist } from "@mdit/plugin-tasklist";
import transformMarkdownMetadata from "../lib/plugins/transform-markdown-metadata";
import { generateSidebar } from "../lib/generate-sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Kofta's Docs",
  description: "My published notes and docs",
  base: "/publish/",

  markdown: {
    config: (md) => {
      md.use(WikiLinksPlugin, {
        baseURL: "/src",
        relativeBaseURL: "./src",
      }).use(tasklist);
    },
  } satisfies MarkdownOptions,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Notes", link: "/notes-index" },
    ],

    sidebar: {
      "/notes/azure": [
        {
          text: "Azure Administrator",
          link: "/notes/azure/Azure%20Administrator%20Knowledge%20Index",
          items: generateSidebar(
            "./notes/azure/Azure Administrator Knowledge Index.md",
            "/notes/azure",
          ),
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/kofta999" }],
    search: {
      provider: "local",
    },
  },

  vite: {
    plugins: [transformMarkdownMetadata()],
  },
});
