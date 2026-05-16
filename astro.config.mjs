import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

const SITE = "https://getsmartcooking.com";

export default defineConfig({
  site: SITE,
  output: "static",
  trailingSlash: "always",

  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "pt"],
    routing: {
      prefixDefaultLocale: true,
    },
  },

  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-US",
          es: "es-US",
          pt: "pt-BR",
        },
      },
      filter: (page) => !page.includes("/admin/"),
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],

  build: {
    inlineStylesheets: "auto",
    assets: "_assets",
  },

  vite: {
    server: {
      fs: {
        allow: [".."],
      },
    },
  },

  image: {
    domains: ["assets.tina.io"],
  },
});
