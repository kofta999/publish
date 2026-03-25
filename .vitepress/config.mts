import { defineConfig, MarkdownOptions } from "vitepress";
import WikiLinksPlugin from "../lib/plugins/ob-wikilinks";
import { tasklist } from "@mdit/plugin-tasklist";
import transformMarkdownMetadata from "../lib/plugins/transform-markdown-metadata";
import { generateSidebar } from "../lib/generate-sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Mostafa's Website",
  description:
    "Mostafa Mahmoud | Software Engineer. Deep dives into Backend Systems, Cloud Architecture, and Technical Notes.",
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
      { text: "Study Notes", link: "/notes" },
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
      "/notes/aws": [
        {
          text: "AWS Cloud Practitioner",
          link: "/notes/aws/AWS%20Cloud%20Practitioner%20Knowledge%20Index",
          items: generateSidebar(
            "./notes/aws/AWS Cloud Practitioner Knowledge Index.md",
            "/notes/aws",
          ),
        },
      ],
      "/notes/aws-saa": [
        {
          text: "AWS Solutions Architect",
          link: "/notes/aws-saa/AWS%20Solutions%20Architect%20Associate%20Knowledge%20Index",
          items: generateSidebar(
            "./notes/aws-saa/AWS Solutions Architect Associate Knowledge Index.md",
            "/notes/aws-saa",
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
