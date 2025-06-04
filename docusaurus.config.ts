import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";
// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "theSludge.report",
  tagline: "100% fiction, unless it sounds familiar",
  favicon: "img/sludge_grumpy.png",

  url: "https://thesludge.report",
  baseUrl: "/",
  trailingSlash: false,

  organizationName: "justinkowarsch",
  projectName: "indignant-chicken",
  deploymentBranch: "gh-pages",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],

  presets: [
    [
      "classic",
      {
        docs: false,
        blog: {
          routeBasePath: "/",
          showReadingTime: true,
          readingTime: ({ content, frontMatter, defaultReadingTime }) => {
            if (typeof frontMatter.readingTime === "number") {
              return frontMatter.readingTime;
            }
            return defaultReadingTime({
              content,
              locale: "en",
            });
          },
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },

          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
          showLastUpdateTime: true,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/sludge-social-card.png",
    navbar: {
      title: "theSludge.report",
      logo: {
        alt: "My Site Logo",
        src: "img/sludge_grumpy.png",
      },
      items: [{ to: "/blog", label: "Blog", position: "left" }],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Read",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ernest Sludge.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
