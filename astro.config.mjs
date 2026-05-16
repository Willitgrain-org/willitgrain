// @ts-check

import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import keystatic from "@keystatic/astro"
import netlify from "@astrojs/netlify"

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), keystatic()],
  adapter: netlify(),
})
