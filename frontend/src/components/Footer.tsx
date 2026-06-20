import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-paper-3)] opacity-50 z-0"></div>
      <div className="relative z-10 border-t border-[var(--color-border)] bg-[var(--glass-bg)] backdrop-blur-md">
        <div className="max-w-[var(--page-width)] mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-[var(--text-3xl)] font-display text-[var(--color-ink)] max-w-sm leading-tight">
              Turn every electricity bill into an <span className="text-[var(--color-accent)] bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-accent)] to-[#4B9FFF]">actionable asset.</span>
            </h2>
            <div className="flex gap-4">
              <Link href="/upload" className="inline-flex items-center justify-center rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] px-8 py-4 font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:bg-[var(--color-accent)] transition-all duration-[var(--dur-base)]">
                Launch SME Platform
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:items-end justify-between space-y-8">
            <div className="flex gap-8 text-[var(--text-sm)] font-medium text-[var(--color-ink-2)]">
              <Link href="/upload" className="hover:text-[var(--color-accent)] transition-colors">Upload Bill</Link>
              <Link href="/community" className="hover:text-[var(--color-accent)] transition-colors">Operator Dashboard</Link>
              <Link href="#" className="hover:text-[var(--color-accent)] transition-colors">API Docs</Link>
            </div>
            <div className="text-[var(--text-xs)] text-[var(--color-ink-3)] font-medium tracking-wide uppercase">
              &copy; 2026 EnergiKita. ImagineHack Track 3.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
