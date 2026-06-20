import Link from "next/link";
import { ArrowRight, Zap, Settings } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center pt-32 pb-32 px-6">
      <div className="max-w-[var(--content-width)] w-full text-center space-y-8">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-[var(--text-sm)] font-medium border border-[var(--color-accent)]/20 animate-in fade-in slide-in-from-bottom-4 duration-[var(--dur-base)]">
          <Zap className="w-4 h-4 mr-2" />
          Track 3: Smarter Resource Management
        </div>
        
        <h1 className="text-[var(--text-display-s)] md:text-[var(--text-display)] font-display text-[var(--color-ink)] leading-[1.05] tracking-tight max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-[var(--dur-slow)] delay-100">
          Turn your <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-ink)] to-[var(--color-accent)]">electricity bill</span> into an actionable asset.
        </h1>
        
        <p className="text-[var(--text-xl)] text-[var(--color-ink-2)] max-w-2xl mx-auto font-body animate-in fade-in slide-in-from-bottom-4 duration-[var(--dur-slow)] delay-200">
          KitaAI extracts your consumption profile, applies operational context, and generates a dynamic Energy Flexibility Passport.
        </p>
        
        <div className="pt-16 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-[var(--dur-slow)] delay-300">
          
          <Link href="/upload" className="group text-left block">
            <div className="h-full bg-[var(--glass-bg)] backdrop-blur-xl p-8 rounded-[var(--radius-2xl)] border border-[var(--glass-border)] shadow-[var(--glass-shadow)] flex flex-col items-start space-y-6 hover:shadow-[var(--glass-shadow-hover)] hover:-translate-y-1 transition-all duration-[var(--dur-base)] relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 bg-[var(--color-accent)]/20 rounded-full blur-3xl group-hover:bg-[var(--color-accent)]/30 transition-colors"></div>
              
              <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-2 relative z-10">
                <h3 className="text-[var(--text-2xl)] font-display text-[var(--color-ink)]">SME Platform</h3>
                <p className="text-[var(--text-base)] text-[var(--color-ink-2)]">
                  Analyse your bill, discover flexible loads, and find out how much you can save with community solar matching.
                </p>
              </div>
              <div className="inline-flex items-center text-[var(--color-accent)] font-medium group-hover:translate-x-1 transition-transform">
                Get your Passport <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>
          
          <Link href="/community" className="group text-left block">
            <div className="h-full bg-[var(--glass-bg)] backdrop-blur-xl p-8 rounded-[var(--radius-2xl)] border border-[var(--glass-border)] shadow-[var(--glass-shadow)] flex flex-col items-start space-y-6 hover:shadow-[var(--glass-shadow-hover)] hover:-translate-y-1 transition-all duration-[var(--dur-base)] relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 bg-[var(--color-ink)]/5 rounded-full blur-3xl group-hover:bg-[var(--color-ink)]/10 transition-colors"></div>
              
              <div className="w-12 h-12 rounded-full bg-[var(--color-paper-3)] text-[var(--color-ink)] flex items-center justify-center border border-[var(--color-border)]">
                <Settings className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-2 relative z-10">
                <h3 className="text-[var(--text-2xl)] font-display text-[var(--color-ink)]">Operator Hub</h3>
                <p className="text-[var(--text-base)] text-[var(--color-ink-2)]">
                  Verify SME flexibility passports, simulate solar availability, and run deterministic scheduling optimisations.
                </p>
              </div>
              <div className="inline-flex items-center text-[var(--color-ink)] font-medium group-hover:translate-x-1 transition-transform">
                Open Dashboard <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
