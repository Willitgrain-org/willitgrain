import { useMemo } from "react"
import MagicBento from "./MagicBento"
import type { ResponsiveImage } from "@/lib/images"
import type { Lang } from "@/lib/i18n"
import { localizePath } from "@/lib/i18n"
import { shuffle } from "@/lib/shuffle"
import { useIsClient } from "@/lib/useIsClient"

/** What the homepage needs per project (prepared in HomePage.astro). */
export interface HomeProject {
  slug: string
  title: string
  synopsis: string
  genre: string
  image: ResponsiveImage | null
}

export function HomeGallery({
  lang = "en",
  projects = [],
}: {
  lang?: Lang
  projects?: HomeProject[]
}) {
  // The order is randomized on every page load, so the gallery is only shown
  // once we are on the client (the server render has no meaningful order).
  const isClient = useIsClient()

  const cards = useMemo(
    () =>
      isClient
        ? shuffle(projects).map((p) => ({
            href: localizePath(`/${p.slug}`, lang),
            image: p.image?.src ?? "",
            srcSet: p.image?.srcset,
            sizes: p.image?.sizes,
            title: p.title,
            description: p.synopsis,
            label: p.genre,
            color: "#121212", // Dark fallback background
          }))
        : [],
    [isClient, lang, projects]
  )

  return (
    <section
      className={`px-6 py-12 md:px-12 flex-1 w-full max-w-[1600px] mx-auto z-10 relative flex flex-col justify-center transition-opacity duration-1000 ${isClient ? "opacity-100" : "opacity-0"}`}
    >
      {isClient && (
        <MagicBento
          cards={cards}
          textAutoHide={true}
          enableStars={false}
          enableSpotlight={false}
          enableBorderGlow={true}
          enableMagnetism={false}
          clickEffect
          spotlightRadius={540}
          particleCount={12}
          glowColor="255, 255, 255" // White/silver glow suits film posters
          disableAnimations={false}
        />
      )}
    </section>
  )
}
