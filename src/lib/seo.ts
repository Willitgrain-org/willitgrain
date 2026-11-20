/**
 * SEO helpers: social preview images, meta descriptions and JSON-LD
 * (structured data Google uses for rich results).
 */
import type { Lang } from "@/lib/i18n"

export const SITE_NAME = "WILLIT GRAIN"
export const DEFAULT_OG_IMAGE = "/og-default.jpg"

export const SOCIAL_LINKS = [
  "https://www.instagram.com/willitgrain/",
  "https://www.crew-united.com/de/Willit-Grain-Schraudolph-Gaudenz-Leopold-Walter-Finn-Oliver-GbR-de_740708.html",
]

/** Default descriptions (homepage, fallback), taken from the About text. */
export const SITE_DESCRIPTION: Record<Lang, string> = {
  en: "Willit Grain develops feature films with a European perspective: character-driven genre and specialty cinema that both entertains and moves audiences.",
  de: "Willit Grain entwickelt Kinofilme mit europäischer Perspektive: charakterorientiertes Genre- und Nischenkino, das das Publikum sowohl unterhält als auch bewegt.",
}

/**
 * 1200×630 social preview of a project image, cropped via the Netlify Image CDN.
 * Images from public/ only; the file name may already be URI-encoded.
 */
export function socialImagePath(src: string): string {
  const url = encodeURIComponent(decodeURI(src))
  return `/.netlify/images?url=${url}&w=1200&h=630&fit=cover&fm=jpg&q=80`
}

/** Shorten to ~160 characters at a word boundary (search snippet length). */
export function truncate(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:–-]$/, "")}…`
}

/** "5 Min." / "90 min" / "1h 30min" → ISO 8601 duration ("PT5M"), else undefined. */
export function runtimeToIso(runtime?: string): string | undefined {
  if (!runtime) return undefined
  const h = runtime.match(/(\d+)\s*(h|std)/i)
  const m = runtime.match(/(\d+)\s*m/i)
  if (!h && !m) return undefined
  return `PT${h ? `${h[1]}H` : ""}${m ? `${m[1]}M` : ""}`
}

export function organizationJsonLd(site: URL) {
  return {
    "@type": "Organization",
    "@id": new URL("/#organization", site).href,
    name: "Willit Grain GmbH",
    alternateName: SITE_NAME,
    url: new URL("/", site).href,
    logo: new URL("/logo.webp", site).href,
    email: "info@willitgrain.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ringstraße 11b",
      postalCode: "85247",
      addressLocality: "Schwabhausen",
      addressCountry: "DE",
    },
    founder: [
      { "@type": "Person", name: "Leopold Schraudolph" },
      { "@type": "Person", name: "Finn-Oliver Walter" },
    ],
    sameAs: SOCIAL_LINKS,
  }
}
