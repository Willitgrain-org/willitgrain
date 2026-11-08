export function Header({
  lang = 'en',
  currentProjectSlug,
  isAboutPage = false,
}: {
  lang?: 'en' | 'de';
  currentProjectSlug?: string;
  isAboutPage?: boolean;
}) {
  const enLink = isAboutPage
    ? '/about'
    : currentProjectSlug
      ? `/${currentProjectSlug}`
      : '/';

  const deLink = isAboutPage
    ? '/de/about'
    : currentProjectSlug
      ? `/de/${currentProjectSlug}`
      : '/de';

  return (
    <header className="relative z-10 flex flex-col justify-between p-6 px-10 text-foreground animate-fade-up delay-100 md:flex-row md:items-center">
      {/* Left side / Language switcher */}
      <div className="mb-4 flex flex-1 items-center justify-center gap-3 font-mono text-sm uppercase md:mb-0 md:justify-start md:text-base">
        <a
          href={enLink}
          className={`transition-all duration-300 ${
            lang === 'en'
              ? 'scale-110 font-bold text-white opacity-100'
              : 'opacity-40 hover:opacity-70'
          }`}
        >
          EN
        </a>

        <span className="text-[10px] opacity-30">●</span>

        <a
          href={deLink}
          className={`transition-all duration-300 ${
            lang === 'de'
              ? 'scale-110 font-bold text-white opacity-100'
              : 'opacity-40 hover:opacity-70'
          }`}
        >
          DE
        </a>
      </div>

      {/* Center / Logo */}
      <div className="my-4 flex flex-1 justify-center text-center md:my-0">
        <a
          href={lang === 'en' ? '/' : '/de'}
          className="inline-block transition-transform hover:scale-105"
        >
          <img
            src="/logo.webp"
            alt="Will It Grain Logo"
            className="h-16 mix-blend-screen md:h-16"
          />
        </a>
      </div>

      {/* Right side / Navigation */}
      <div className="flex flex-1 items-center justify-center gap-6 md:justify-end md:gap-8">
        <nav className="flex items-center gap-6 text-sm font-medium uppercase tracking-[0.1em] md:gap-8 md:text-base">
          <a
            href={lang === 'en' ? '/about' : '/de/about'}
            className="opacity-70 transition-opacity hover:opacity-100"
          >
            {lang === 'en' ? 'About' : 'Über uns'}
          </a>

          <a
            href="https://www.instagram.com/willitgrain/"
            target="_blank"
            rel="noreferrer"
            className="opacity-70 transition-opacity hover:opacity-100"
            aria-label="Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}
