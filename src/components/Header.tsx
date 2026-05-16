export function Header({ lang = 'en', currentProjectSlug, isShopPage = false }: { lang?: 'en' | 'de', currentProjectSlug?: string, isShopPage?: boolean }) {
  const enLink = isShopPage ? '/shop' : currentProjectSlug ? `/${currentProjectSlug}` : '/';
  const deLink = isShopPage ? '/de/shop' : currentProjectSlug ? `/de/${currentProjectSlug}` : '/de';

  return (
    <header className="relative z-10 flex flex-col md:flex-row md:items-center justify-between p-6 px-10 text-foreground animate-fade-up delay-100">
      {/* Left side / Lang Switcher */}
      <div className="flex-1 flex justify-center md:justify-start items-center gap-3 text-sm md:text-base font-mono uppercase mb-4 md:mb-0">
        <a 
          href={enLink} 
          className={`transition-all duration-300 ${lang === 'en' ? 'opacity-100 text-white font-bold scale-110' : 'opacity-40 hover:opacity-70'}`}
        >
          EN
        </a>
        <span className="opacity-30 text-[10px]">●</span>
        <a 
          href={deLink} 
          className={`transition-all duration-300 ${lang === 'de' ? 'opacity-100 text-white font-bold scale-110' : 'opacity-40 hover:opacity-70'}`}
        >
          DE
        </a>
      </div>

      {/* Center / Logo Image */}
      <div className="flex-1 flex justify-center text-center my-4 md:my-0">
        <a href={lang === 'en' ? '/' : '/de'} className="inline-block transition-transform hover:scale-105">
          <img src="/logo.webp" alt="Will It Grain Logo" className="h-16 md:h-16 mix-blend-screen" />
        </a>
      </div>

      {/* Right side / Nav */}
      <div className="flex-1 flex justify-center md:justify-end items-center gap-6 md:gap-8">
        <nav className="flex items-center gap-6 md:gap-8 text-sm md:text-base font-medium uppercase tracking-[0.1em]">
          <a href={lang === 'en' ? '/shop' : '/de/shop'} className="opacity-70 hover:opacity-100 transition-opacity">
            {lang === 'en' ? 'Shop' : 'Shop'}
          </a>
          {isShopPage && (
            <button className="snipcart-checkout opacity-70 hover:opacity-100 transition-opacity" aria-label="Cart">
              {lang === 'en' ? 'Cart' : 'Warenkorb'} <span className="snipcart-items-count text-xs ml-1 bg-white/20 px-2 py-0.5 rounded-full">0</span>
            </button>
          )}
          <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
            {lang === 'en' ? 'About' : 'Über uns'}
          </a>
          <a href="https://www.instagram.com/willitgrain/" target="_blank" rel="noreferrer" className="opacity-70 hover:opacity-100 transition-opacity" aria-label="Instagram">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" height="20" viewBox="0 0 24 24" fill="none" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}
