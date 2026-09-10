import { useState, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import { XIcon, ChevronLeft, ChevronRight } from "lucide-react"

interface ImageGridWithLightboxProps {
  images: string[]
  title: string
}

function shuffle<T>(items: T[]): T[] {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function ImageGridWithLightbox({
  images,
  title,
}: ImageGridWithLightboxProps) {
  const [displayImages, setDisplayImages] = useState<string[]>(images)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  // Shuffle client-side so the order changes on every page load.
  useEffect(() => {
    setDisplayImages(shuffle(images))
    setMounted(true)
  }, [images])

  const close = useCallback(() => setSelectedIndex(null), [])
  const prev = useCallback(() => {
    setSelectedIndex((i) =>
      i === null ? i : (i - 1 + displayImages.length) % displayImages.length
    )
  }, [displayImages.length])
  const next = useCallback(() => {
    setSelectedIndex((i) =>
      i === null ? i : (i + 1) % displayImages.length
    )
  }, [displayImages.length])

  // Keyboard: Escape closes, arrows navigate.
  useEffect(() => {
    if (selectedIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      else if (e.key === "ArrowRight") next()
      else if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selectedIndex, close, next, prev])

  if (!displayImages.length) return null

  return (
    <>
      <div className="backdrop-blur-2xl bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
        <h3 className="font-mono text-sm uppercase tracking-widest text-white/50 mb-6 font-semibold">
          {title}
        </h3>

        {/* Mobile: Horizontal Scroll, Desktop: 3x3 Grid */}
        <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto snap-x pb-4 md:pb-0 scrollbar-hide">
          {displayImages.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="flex-shrink-0 w-64 md:w-auto snap-center aspect-video rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-white/20 transition-all hover:scale-[1.02]"
              onClick={() => setSelectedIndex(i)}
            >
              <img
                src={src}
                alt={`${title} ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Overlay */}
      {selectedIndex !== null &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={close}
          >
            <div
              className="relative w-full max-w-6xl max-h-full flex flex-col items-center justify-center backdrop-blur-3xl bg-white/5 border border-white/10 rounded-2xl p-2 md:p-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-white shrink-0 text-black p-3 md:p-4 rounded-full shadow-xl hover:scale-110 transition-transform z-10"
                onClick={close}
                aria-label="Close"
              >
                <XIcon className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <button
                className="absolute left-2 md:-left-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 md:p-3 rounded-full backdrop-blur-md border border-white/10 transition-all z-10"
                onClick={prev}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                className="absolute right-2 md:-right-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 md:p-3 rounded-full backdrop-blur-md border border-white/10 transition-all z-10"
                onClick={next}
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <img
                src={displayImages[selectedIndex]}
                alt={`${title} ${selectedIndex + 1}`}
                className="w-full max-h-[85vh] object-contain rounded-xl"
              />
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
