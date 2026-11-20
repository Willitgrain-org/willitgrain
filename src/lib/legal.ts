import type { Lang } from "@/lib/i18n"

/** URLs of the legal pages per language (German URLs use German words). */
export const LEGAL_PATHS = {
  imprint: { en: "/imprint/", de: "/de/impressum/" },
  privacy: { en: "/privacy/", de: "/de/datenschutz/" },
} as const satisfies Record<string, Record<Lang, string>>

export type LegalPageKind = keyof typeof LEGAL_PATHS
