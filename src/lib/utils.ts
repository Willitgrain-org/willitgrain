import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface CrewMember {
  role: string
  name: string
}

/**
 * Parse a crew list given as one "Role: Name" (or "Role<TAB>Name") per line.
 * Lets the content team paste the whole crew at once instead of entering each
 * member individually in Keystatic.
 */
export function parseCrew(text?: string): CrewMember[] {
  if (!text) return []
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^(.*?)[:\t]\s*(.+)$/)
      return match
        ? { role: match[1].trim(), name: match[2].trim() }
        : { role: "", name: line }
    })
    .filter((member) => member.name.length > 0)
}
