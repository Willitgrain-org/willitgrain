import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { XIcon, Maximize2 } from 'lucide-react';

interface ExpandablePosterProps {
  src: string;
  alt: string;
}

export function ExpandablePoster({ src, alt }: ExpandablePosterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div 
        className="relative group cursor-pointer w-full h-full md:h-auto flex-shrink-0 md:flex-shrink rounded-none md:rounded-2xl overflow-hidden"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full md:h-auto object-cover md:object-contain md:rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] border-y border-white/5 md:border"
        />
        {/* Mobile Expand Indicator */}
        <div className="md:hidden absolute bottom-2 right-2 bg-black/60 p-1.5 rounded-full backdrop-blur-md border border-white/20">
          <Maximize2 className="w-3 h-3 text-white" />
        </div>
        {/* Desktop Expand Indicator (on hover) */}
        <div className="hidden md:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center rounded-2xl backdrop-blur-sm">
          <Maximize2 className="w-8 h-8 text-white drop-shadow-lg" />
        </div>
      </div>

      {isOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl max-h-full flex flex-col items-center justify-center backdrop-blur-3xl bg-white/5 border border-white/10 rounded-2xl p-2 md:p-4 shadow-2xl">
            <button 
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-white shrink-0 text-black p-3 md:p-4 rounded-full shadow-xl hover:scale-110 transition-transform z-10"
              onClick={() => setIsOpen(false)}
            >
              <XIcon className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <img 
              src={src} 
              alt={alt} 
              className="w-full max-h-[85vh] object-contain rounded-xl"
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
