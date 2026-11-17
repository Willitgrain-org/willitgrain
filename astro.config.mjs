// @ts-check

import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import keystatic from "@keystatic/astro"
import netlify from "@astrojs/netlify"
import { SHOP_ENABLED } from "./src/lib/features"

/**
 * The shop pages live outside src/pages (in src/shop/) and are only added as
 * routes while the shop is enabled – see src/lib/features.ts.
 * @returns {import("astro").AstroIntegration}
 */
function shop() {
  return {
    name: "willitgrain:shop",
    hooks: {
      "astro:config:setup": ({ injectRoute }) => {
        if (!SHOP_ENABLED) return
        injectRoute({ pattern: "/shop", entrypoint: "./src/shop/en.astro" })
        injectRoute({ pattern: "/de/shop", entrypoint: "./src/shop/de.astro" })
      },
    },
  }
}

// https://astro.build/config
export default defineConfig({
  site: "https://willitgrain.com",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), keystatic(), shop()],
  adapter: netlify(),
})
