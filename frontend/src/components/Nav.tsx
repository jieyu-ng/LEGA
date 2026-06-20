import Link from "next/link";

export function Nav() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] shadow-[var(--glass-shadow)] rounded-full px-6 py-3 flex items-center gap-8 transition-all hover:shadow-[var(--glass-shadow-hover)] hover:bg-[var(--glass-bg-hover)]">
        <Link href="/" className="font-display font-medium text-[var(--color-ink)] hover:text-[var(--color-accent)] text-[var(--text-lg)]">
          EnergiKita <span className="text-[var(--color-ink-3)] font-light">FlexOS</span>
        </Link>
        <div className="h-5 w-px bg-[var(--color-border)] hidden md:block"></div>
        <div className="hidden md:flex items-center gap-6 text-[var(--text-sm)] font-medium text-[var(--color-ink-2)]">
          <Link href="/upload" className="hover:text-[var(--color-ink)] transition-colors">SME Platform</Link>
          <Link href="/community" className="hover:text-[var(--color-ink)] transition-colors">Operator Hub</Link>
        </div>
      </nav>
    </div>
  );
}
