import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { XIcon } from 'lucide-react';

interface ImageGridWithLightboxProps {
  images: string[];
  title: string;
}

export function ImageGridWithLightbox({ images, title }: ImageGridWithLightboxProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="backdrop-blur-2xl bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
        <h3 className="font-mono text-sm uppercase tracking-widest text-white/50 mb-6 font-semibold">
          {title}
        </h3>
        
        {/* Mobile: Horizontal Scroll, Desktop: 3x3 Grid */}
        <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto snap-x pb-4 md:pb-0 scrollbar-hide">
          {images.map((src, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 w-64 md:w-auto snap-center aspect-video rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-white/20 transition-all hover:scale-[1.02]"
              onClick={() => setSelectedImage(src)}
            >
              <img src={src} alt={`Gallery image ${i}`} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Overlay */}
      {selectedImage && mounted && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-6xl max-h-full flex flex-col items-center justify-center backdrop-blur-3xl bg-white/5 border border-white/10 rounded-2xl p-2 md:p-4 shadow-2xl">
            <button 
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-white shrink-0 text-black p-3 md:p-4 rounded-full shadow-xl hover:scale-110 transition-transform z-10"
              onClick={() => setSelectedImage(null)}
            >
              <XIcon className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <img 
              src={selectedImage} 
              alt="Enlarged view" 
              className="w-full max-h-[85vh] object-contain rounded-xl"
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
