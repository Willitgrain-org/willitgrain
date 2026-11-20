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
  // The order is randomized on every page load. The server render keeps the
  // original order (so crawlers see all project links in the HTML) but stays
  // invisible until the client has shuffled, so visitors never see it jump.
  const isClient = useIsClient()

  const cards = useMemo(
    () =>
      (isClient ? shuffle(projects) : projects).map((p) => ({
        href: localizePath(`/${p.slug}`, lang),
        image: p.image?.src ?? "",
        srcSet: p.image?.srcset,
        sizes: p.image?.sizes,
        title: p.title,
        description: p.synopsis,
        label: p.genre,
        color: "#121212", // Dark fallback background
      })),
    [isClient, lang, projects]
  )

  return (
    <section
      className={`relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-6 py-12 transition-opacity duration-1000 md:px-12 ${isClient ? "opacity-100" : "opacity-0"}`}
    >
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
    </section>
  )
}
