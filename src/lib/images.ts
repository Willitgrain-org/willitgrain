import { getImage } from "astro:assets"

/**
 * A responsive image ready to be passed to <img> (also from React islands).
 *
 * The originals stay in public/ (so Finn's upload workflow via GitHub /
 * Keystatic is unchanged). Astro's getImage() is routed through the Netlify
 * Image CDN by @astrojs/netlify, which resizes on demand, negotiates
 * AVIF/WebP per browser and caches the result at the edge. In `astro dev` the
 * same endpoint is emulated locally by the Netlify Vite plugin.
 */
export interface ResponsiveImage {
  /** Fallback src (middle width) */
  src: string
  srcset: string
  sizes: string
  /** Large version for lightboxes / fullscreen views */
  full: string
}

interface Preset {
  widths: number[]
  sizes: string
  fullWidth?: number
}

export const IMAGE_PRESETS = {
  /** Stills / BTS grid: 16rem on mobile, ~1/3 of the right column on desktop */
  grid: {
    widths: [320, 480, 640, 960],
    sizes: "(min-width: 768px) 30vw, 16rem",
    fullWidth: 2400,
  },
  /** Project poster: 40% width on mobile, left column on desktop */
  poster: {
    widths: [320, 480, 640, 960],
    sizes: "(min-width: 1024px) 28vw, 40vw",
    fullWidth: 1800,
  },
  /** Wide images in the right column, e.g. the trailer placeholder */
  wide: {
    widths: [640, 960, 1280, 1600],
    sizes: "(min-width: 768px) 55vw, 100vw",
  },
  /** Homepage bento cards */
  card: {
    widths: [400, 640, 960, 1280],
    sizes: "(min-width: 1600px) 800px, (min-width: 600px) 50vw, 100vw",
  },
  /** About page portraits */
  portrait: {
    widths: [400, 600, 900],
    sizes: "(min-width: 768px) 560px, 100vw",
  },
} satisfies Record<string, Preset>

const QUALITY = 80

export async function getResponsiveImage(
  src: string,
  preset: Preset
): Promise<ResponsiveImage> {
  const { widths, sizes, fullWidth } = preset
  const mid = widths[Math.floor(widths.length / 2)]

  const [responsive, full] = await Promise.all([
    getImage({ src, width: mid, widths, sizes, quality: QUALITY }),
    fullWidth
      ? getImage({ src, width: fullWidth, quality: QUALITY })
      : Promise.resolve(null),
  ])

  return {
    src: responsive.src,
    srcset: responsive.srcSet.attribute,
    sizes,
    full: full?.src ?? responsive.src,
  }
}

export function getResponsiveImages(
  srcs: string[],
  preset: Preset
): Promise<ResponsiveImage[]> {
  return Promise.all(srcs.map((src) => getResponsiveImage(src, preset)))
}
