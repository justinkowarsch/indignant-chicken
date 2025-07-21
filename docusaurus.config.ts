import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
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
  scripts: [
    {
      src: "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js",
      async: false,
      "data-name": "BMC-Widget",
      "data-cfasync": "false",
      "data-id": "ernestsludge",
      "data-description": "Support me on Buy me a coffee!",
      "data-message":
        "Fund Ernest's caffeine-powered corporate espionage. Every tip fuels more absurdity documentation.",
      "data-color": "#40DCA5",
      "data-position": "Right",
      "data-x_margin": "18",
      "data-y_margin": "18",
    },
  ],
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
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],
  plugins: [
    "./src/plugins/tailwind-plugin.js",
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-F1KHRG5529',
        anonymizeIP: true,
      },
    ],
  ],
  themeConfig: {
    image: "img/sludge-social-card.png",
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "theSludge.report",
      logo: {
        alt: "My Site Logo",
        src: "img/sludge_grumpy.png",
      },
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Read",
          items: [
            {
              label: "Blog",
              to: "/",
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
