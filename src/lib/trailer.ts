/**
 * Turn a YouTube or Vimeo link (as entered in Keystatic) into an embeddable
 * player URL. Returns undefined for empty or unsupported links, so the trailer
 * section can simply be hidden.
 */
export function getTrailerEmbedUrl(urlString?: string): string | undefined {
  if (!urlString?.trim()) return undefined

  try {
    const url = new URL(urlString.trim())
    const hostname = url.hostname.replace(/^www\./, "")

    // YouTube
    if (
      hostname === "youtube.com" ||
      hostname === "m.youtube.com" ||
      hostname === "youtu.be"
    ) {
      let videoId: string | null = null

      if (hostname === "youtu.be") {
        videoId = url.pathname.split("/").filter(Boolean)[0] || null
      } else if (url.pathname.startsWith("/embed/")) {
        videoId = url.pathname.split("/")[2] || null
      } else {
        videoId = url.searchParams.get("v")
      }

      if (!videoId) return undefined

      return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`
    }

    // Vimeo
    if (hostname === "vimeo.com" || hostname === "player.vimeo.com") {
      const pathParts = url.pathname.split("/").filter(Boolean)

      let videoId: string | undefined

      if (hostname === "player.vimeo.com" && pathParts[0] === "video") {
        videoId = pathParts[1]
      } else {
        videoId = [...pathParts].reverse().find((part) => /^\d+$/.test(part))
      }

      if (!videoId) return undefined

      return `https://player.vimeo.com/video/${encodeURIComponent(videoId)}`
    }

    return undefined
  } catch {
    return undefined
  }
}
