"use client";

import { BatteryCharging, Sun, Zap, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PassportPage() {
  return (
    <div className="flex flex-col items-center pt-16 px-6 relative">
      {/* Background glow specific to this page */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-20 right-1/4 w-[30rem] h-[30rem] bg-[var(--color-success)]/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="max-w-[var(--content-width)] w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-[var(--dur-base)]">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4">
          <div className="space-y-4">
            <div className="inline-flex items-center text-[var(--text-xs)] font-medium text-[var(--color-accent)] px-3 py-1.5 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-full uppercase tracking-wider">
              KitaAI Generated
            </div>
            <h1 className="text-[var(--text-4xl)] font-display text-[var(--color-ink)] leading-tight">
              Energy Flexibility Passport
            </h1>
            <p className="text-[var(--text-lg)] text-[var(--color-ink-2)]">
              Aisyah Laundry Services
            </p>
          </div>
          <div className="inline-flex items-center text-[var(--text-sm)] font-medium text-[var(--color-ink-2)] px-4 py-2 bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] rounded-full shadow-sm">
            <AlertTriangle className="w-4 h-4 mr-2 text-[var(--color-accent)]" /> 
            Confidence: 76% (Inferred)
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-[var(--dur-base)] delay-100">
          
          <div className="col-span-1 lg:col-span-2 bg-[var(--glass-bg)] backdrop-blur-2xl rounded-[var(--radius-2xl)] border border-[var(--glass-border)] shadow-[var(--glass-shadow)] p-8 md:p-10 space-y-8 relative overflow-hidden group hover:shadow-[var(--glass-shadow-hover)] transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[var(--color-accent)]/5 to-transparent rounded-bl-full pointer-events-none"></div>
            
            <div>
              <h2 className="text-[var(--text-2xl)] font-display text-[var(--color-ink)]">Energy Profile</h2>
              <p className="text-[var(--text-base)] text-[var(--color-ink-2)] mt-2">Variable machine load with strong daytime correlation.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[var(--color-paper)]/60 backdrop-blur-md p-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] shadow-sm group-hover:-translate-y-1 transition-transform duration-[var(--dur-base)]">
                <div className="flex items-center text-[var(--color-ink)] mb-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mr-3">
                    <Zap className="w-5 h-5 text-[var(--color-accent)]" />
                  </div>
                  <span className="text-[var(--text-sm)] font-medium uppercase tracking-wider text-[var(--color-ink-3)]">Flexible Load</span>
                </div>
                <p className="text-[var(--text-3xl)] font-display text-[var(--color-ink)]">Washing Cycles</p>
                <p className="text-[var(--text-sm)] text-[var(--color-ink-2)] mt-2 font-medium">15-25 kWh available to shift</p>
              </div>

              <div className="bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-accent)]/5 p-6 rounded-[var(--radius-xl)] border border-[var(--color-accent)]/20 shadow-sm group-hover:-translate-y-1 transition-transform duration-[var(--dur-base)] delay-75">
                <div className="flex items-center text-[var(--color-accent)] mb-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-paper)]/80 flex items-center justify-center mr-3 shadow-sm">
                    <Sun className="w-5 h-5 text-[var(--color-accent)]" />
                  </div>
                  <span className="text-[var(--text-sm)] font-medium uppercase tracking-wider">Solar Window</span>
                </div>
                <p className="text-[var(--text-3xl)] font-display text-[var(--color-accent)]">11:00 – 16:00</p>
                <p className="text-[var(--text-sm)] text-[var(--color-accent)]/80 mt-2 font-medium">Best community solar alignment</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-[var(--glass-bg)] backdrop-blur-2xl rounded-[var(--radius-2xl)] border border-[var(--glass-border)] shadow-[var(--glass-shadow)] p-8 space-y-6 hover:shadow-[var(--glass-shadow-hover)] transition-all">
              <h3 className="text-[var(--text-xl)] font-display text-[var(--color-ink)]">Impact Potential</h3>
              
              <div>
                <p className="text-[var(--text-xs)] text-[var(--color-ink-3)] uppercase tracking-widest font-medium mb-2">Estimated Monthly Savings</p>
                <p className="text-[var(--text-4xl)] font-display text-[var(--color-success)] bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-success)] to-[#22c55e]">RM180 - 260</p>
              </div>
              
              <div className="pt-6 border-t border-[var(--color-border)]">
                <p className="text-[var(--text-xs)] text-[var(--color-ink-3)] uppercase tracking-widest font-medium mb-3">Solar Suitability</p>
                <div className="flex items-center text-[var(--color-success)] font-medium bg-[var(--color-success)]/10 px-4 py-2 rounded-lg border border-[var(--color-success)]/20">
                  <CheckCircle2 className="w-5 h-5 mr-3" /> Strong Match
                </div>
              </div>
            </div>

            <div className="flex-1 bg-[var(--color-ink)] text-[var(--color-paper)] rounded-[var(--radius-2xl)] p-8 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent)]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-[var(--dur-slow)]"></div>
              
              <div className="relative z-10">
                <h3 className="text-[var(--text-xl)] font-display mb-2">Next Steps</h3>
                <p className="text-[var(--text-sm)] text-[var(--color-paper)]/70">
                  To increase confidence to 87%, please upload interval data CSV or connect a smart meter API.
                </p>
              </div>
              
              <Link href="/community" className="relative z-10 inline-flex w-full items-center justify-center bg-[var(--color-paper)] text-[var(--color-ink)] px-6 py-4 rounded-xl font-medium hover:bg-[var(--color-accent)] hover:text-white transition-colors shadow-lg">
                Simulate Plan <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
