/**
 * Fit project titles (font-heading = Rubik Dirt) to their column so a single
 * long word such as "KNÖLLCHEN" never wraps its last letter onto a new line.
 *
 * Advance widths in em, measured from the Rubik Dirt font file
 * (uppercase – titles are written in caps). Unknown characters fall back to
 * the widest common glyph so we rather shrink a bit too much than wrap.
 */
const GLYPH_EM: Record<string, number> = {"A": 0.755, "B": 0.734, "C": 0.733, "D": 0.740, "E": 0.667, "F": 0.646, "G": 0.753, "H": 0.772, "I": 0.368, "J": 0.702, "K": 0.715, "L": 0.626, "M": 0.856, "N": 0.740, "O": 0.742, "P": 0.705, "Q": 0.742, "R": 0.722, "S": 0.697, "T": 0.674, "U": 0.746, "V": 0.726, "W": 0.856, "X": 0.739, "Y": 0.710, "Z": 0.693, "Ä": 0.755, "Ö": 0.742, "Ü": 0.746, "0": 0.718, "1": 0.557, "2": 0.704, "3": 0.709, "4": 0.735, "5": 0.690, "6": 0.692, "7": 0.625, "8": 0.712, "9": 0.683, "-": 0.471, "'": 0.264, "’": 0.295, ".": 0.312, ",": 0.303, ":": 0.322, "!": 0.330, "?": 0.653, "&": 0.783}
const FALLBACK_EM = 0.86
/** Small safety margin for rendering differences and the drop shadow. */
const SAFETY = 1.06

function wordWidthEm(word: string): number {
  let w = 0
  for (const ch of word.toUpperCase()) w += GLYPH_EM[ch] ?? FALLBACK_EM
  return w
}

/** Width (in em) of the longest word of a title, incl. safety margin. */
export function longestWordEm(title: string): number {
  const words = title.split(/\s+/).filter(Boolean)
  const widest = Math.max(1, ...words.map(wordWidthEm))
  return Math.round(widest * SAFETY * 100) / 100
}
