export function Footer({ lang = 'en' }: { lang?: 'en' | 'de' }) {
  return (
    <div className="mt-auto w-full relative z-10 w-full px-6 pt-12 pb-6 flex flex-col items-center justify-center animate-fade-up delay-1000">
      <div className="w-full max-w-sm h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

      <div className="flex flex-col items-center gap-6 mb-6">
         <img src="/logo.webp" alt="Will It Grain Logo" className="h-6 md:h-8 opacity-40 mix-blend-screen grayscale" />
         
         <nav className="flex flex-wrap justify-center gap-6 md:gap-12 text-[10px] md:text-sm uppercase tracking-[0.2em] text-white/40 font-medium">
           <a href="#" className="hover:text-white transition-colors">{lang === 'en' ? 'Imprint' : 'Impressum'}</a>
           <a href="#" className="hover:text-white transition-colors">{lang === 'en' ? 'Privacy' : 'Datenschutz'}</a>
         </nav>
      </div>

      <p className="text-[10px] font-mono opacity-20 uppercase tracking-[0.1em] text-center leading-relaxed">
        &copy; 2026 Willit Grain GmbH
      </p>
    </div>
  );
}
