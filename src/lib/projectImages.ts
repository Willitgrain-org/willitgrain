import { existsSync, readdirSync } from "node:fs"
import { join } from "node:path"

const IMAGE_RE = /\.(avif|gif|jpe?g|png|webp)$/i
// A still whose filename ends in "-preview" (or "_preview") is the homepage
// preview card image. e.g. "still-3-preview.webp"
const PREVIEW_RE = /[-_]preview\.(avif|gif|jpe?g|png|webp)$/i

// Numeric-aware sort so "stills/2.webp" comes before "stills/10.webp"
// and "Still (2)" before "Still (10)".
const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" })

function readImageFiles(slug: string, kind: "stills" | "bts"): string[] {
  const dir = join(process.cwd(), "public", "projects", slug, kind)
  if (!existsSync(dir)) return []

  try {
    return readdirSync(dir)
      .filter((name) => IMAGE_RE.test(name))
      .sort(collator.compare)
  } catch {
    return []
  }
}

/**
 * Auto-discover images for a project's "stills" or "bts" folder.
 *
 * The folder is the single source of truth: the content team can bulk-upload
 * images to GitHub (public/projects/<slug>/stills|bts/) without also having to
 * edit the project's YAML file. Keystatic uploads land in the same folder, so
 * both workflows keep working.
 */
export function getProjectImages(
  slug: string,
  kind: "stills" | "bts"
): string[] {
  return readImageFiles(slug, kind).map(
    (name) => `/projects/${slug}/${kind}/${encodeURIComponent(name)}`
  )
}

/**
 * Find the still used as the homepage preview card image.
 *
 * Convention: the content team marks the chosen still by appending "-preview"
 * to its filename (e.g. "still-3-preview.webp"). Returns null when no preview
 * still is set — the caller should fall back to the poster.
 */
export function getProjectPreview(slug: string): string | null {
  const name = readImageFiles(slug, "stills").find((n) => PREVIEW_RE.test(n))
  return name ? `/projects/${slug}/stills/${encodeURIComponent(name)}` : null
}
