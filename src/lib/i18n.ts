export type Lang = "en" | "de"

/** Prefix a site path with the language ("/about" → "/de/about"). */
export function localizePath(path: string, lang: Lang): string {
  if (lang === "en") return path
  return path === "/" ? "/de" : `/de${path}`
}
