export type Lang = "en" | "de"

/** Ensure a trailing slash ("/about" → "/about/"), matching how Netlify serves the built pages (no 301 hop). */
export function withSlash(path: string): string {
  return path.endsWith("/") ? path : `${path}/`
}

/** Prefix a site path with the language ("/about" → "/de/about/"). Always returns a trailing slash. */
export function localizePath(path: string, lang: Lang): string {
  if (lang === "en") return withSlash(path)
  return path === "/" ? "/de/" : withSlash(`/de${path}`)
}
