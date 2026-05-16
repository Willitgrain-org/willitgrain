import { useState, useEffect } from "react";
import MagicBento from "./MagicBento";

export function HomeGallery({ lang = 'en', projects = [] }: { lang?: 'en' | 'de', projects?: any[] }) {
  const [shuffledCards, setShuffledCards] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Randomize projects on page load
    const shuffled = [...projects].sort(() => Math.random() - 0.5);

    // Convert project data to Bento-compatible cards
    const mappedCards = shuffled.map((p) => {
      const data = p.data;
      return {
        href: lang === 'en' ? `/${p.id}` : `/de/${p.id}`,
        image: data.posterUrl || "",
        title: data.title || "",
        description: data[lang]?.synopsis || "",
        label: data[lang]?.genre || "",
        color: '#121212' // Dark fallback background
      };
    });

    setShuffledCards(mappedCards);
    setMounted(true);
  }, [lang, projects]);

  return (
    <section className={`px-6 py-12 md:px-12 flex-1 w-full max-w-[1600px] mx-auto z-10 relative flex flex-col justify-center transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {mounted && (
        <MagicBento
          cards={shuffledCards}
          textAutoHide={true}
          enableStars={false}
          enableSpotlight={false}
          enableBorderGlow={true}
          enableMagnetism={false}
          clickEffect
          spotlightRadius={540}
          particleCount={12}
          glowColor="255, 255, 255" // Change to white or silver glow since it's a film poster
          disableAnimations={false}
        />
      )}
    </section>
  );
}
