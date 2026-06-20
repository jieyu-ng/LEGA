"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Box,
  ChevronRight,
  Cpu,
  RefreshCw,
  Settings,
  Sliders,
  Zap,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const demoAiAdvice = {
  acConsumptionPercentage: 45,
  baseBillRm: 320,
  peakLoadTime: "evening",
  advices: [
    "Your cooling equipment is the biggest driver of your bill. Before buying new ACs, simply raising the thermostat by 1-2 degrees can drastically cut costs.",
    "Shift your heavy washing or drying cycles to the middle of the day to take advantage of the cheapest energy hours when solar generation peaks.",
    "Small changes add up. Turning off standby equipment at night can effortlessly reduce your wasted baseload energy."
  ],
};

export default function PassportPage() {
  const { accountType } = useUser();
  const isBusiness = accountType === "business";
  const [step, setStep] = useState<1 | 2>(1);
  const [hasCompletedQuestionnaire, setHasCompletedQuestionnaire] = useState(false);
  const [willingToDelay, setWillingToDelay] = useState(true);
  const [hasSmartPlugs, setHasSmartPlugs] = useState(false);
  const [optimizationGoal, setOptimizationGoal] = useState("cost");

  const profileName = isBusiness ? "Aisyah Laundry" : "Your Household";
  const shiftStrategyCopy = isBusiness
    ? "Move flexible washing cycles into peak solar hours (11am - 2pm)."
    : "Shift the most flexible loads into peak solar hours so more of your usage is covered directly.";
  const configuredShiftCopy = willingToDelay
    ? hasSmartPlugs
      ? "EnergiKita can coordinate smart devices to push flexible loads into lower-cost hours automatically."
      : "Delay flexible equipment into lower-cost hours manually to improve direct usage and reduce wasted surplus."
    : shiftStrategyCopy;
  const optimizationLabel =
    optimizationGoal === "carbon"
      ? "Carbon-first"
      : optimizationGoal === "balanced"
        ? "Balanced"
        : "Cost-first";

  return (
    <div className="max-w-[var(--page-width)] mx-auto px-6 pt-12 pb-24">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex-shrink-0 space-y-6">
          <div>
            <h1 className="text-[var(--text-2xl)] font-bold text-[var(--color-ink)] leading-tight">
              {profileName}
            </h1>
            <p className="text-[var(--text-sm)] text-[var(--color-ink-2)] mt-1">
              {isBusiness ? "Business Energy Passport" : "Home Energy Passport"}
            </p>
          </div>

          <div className="pt-4 border-t border-[var(--color-border)]">
            <h3 className="text-[var(--text-sm)] font-bold text-[var(--color-ink)] mb-3">
              Energy Snapshot
            </h3>
            <ul className="text-[var(--text-sm)] text-[var(--color-ink-2)] space-y-3">
              <li className="flex justify-between border-b border-[var(--color-border)] pb-2">
                <span>{isBusiness ? "Daily generation:" : "Daily usage offset:"}</span>
                <span className="font-medium text-[var(--color-ink)]">30.4 kWh</span>
              </li>
              <li className="flex justify-between border-b border-[var(--color-border)] pb-2">
                <span>{isBusiness ? "Self-consumed:" : "Self-used energy:"}</span>
                <span className="font-medium text-[var(--color-ink)]">22.1 kWh</span>
              </li>
              <li className="flex justify-between border-b border-[var(--color-border)] pb-2">
                <span>{isBusiness ? "Surplus energy:" : "Flexible savings potential:"}</span>
                <span className="font-medium text-[var(--color-accent)]">8.3 kWh</span>
              </li>
            </ul>
          </div>

          {hasCompletedQuestionnaire && (
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 shadow-sm">
              <p className="text-[10px] uppercase tracking-wider text-[var(--color-ink-3)]">Flexibility Preferences</p>
              <p className="mt-2 text-[var(--text-sm)] text-[var(--color-ink-2)]">
                Delay loads: <span className="font-medium text-[var(--color-ink)]">{willingToDelay ? "Yes" : "No"}</span>
              </p>
              <p className="mt-1 text-[var(--text-sm)] text-[var(--color-ink-2)]">
                Smart devices: <span className="font-medium text-[var(--color-ink)]">{hasSmartPlugs ? "Available" : "Manual only"}</span>
              </p>
              <p className="mt-1 text-[var(--text-sm)] text-[var(--color-ink-2)]">
                Goal: <span className="font-medium text-[var(--color-ink)]">{optimizationLabel}</span>
              </p>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-8">
          <div className="bg-white border-2 border-[var(--color-success)] rounded-[var(--radius-lg)] p-8 shadow-sm">
            <h3 className="text-[var(--text-2xl)] font-bold text-[var(--color-ink)] mb-4 flex items-center">
              <Cpu className="w-8 h-8 mr-3 text-[var(--color-success)]" />
              Analysis Complete
            </h3>
            <div className="text-[var(--text-lg)] text-[var(--color-ink-2)] space-y-6">
              <p className="leading-relaxed">
                Your AC-related load is estimated to account for about{" "}
                <strong>{demoAiAdvice.acConsumptionPercentage}% of a RM {demoAiAdvice.baseBillRm} monthly bill</strong>.
                {" "}Right now, your highest demand still clusters around the {demoAiAdvice.peakLoadTime}, which creates the clearest savings opportunity.
              </p>
              <div className="p-5 bg-[#ecfdf5] border border-[#a7f3d0] rounded-[var(--radius-md)]">
                <p className="text-[var(--text-base)] font-bold text-[#065f46] mb-3">
                  AI Actionable Advice:
                </p>
                <ul className="space-y-3">
                  {demoAiAdvice.advices.map((advice, idx) => (
                    <li key={idx} className="flex items-start text-[var(--text-base)] text-[#065f46]">
                      <span className="mr-2 mt-1 text-[#059669]">•</span>
                      <span>{advice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex border-b border-[var(--color-border)] mb-6">
            <button className="px-4 py-2 text-[var(--text-sm)] font-medium text-[var(--color-accent)] border-b-2 border-[var(--color-accent)] -mb-px">
              Recommended Next Moves
            </button>
          </div>

          <div className="space-y-8">
            {step === 1 ? (
              <section className="animate-in fade-in duration-500">
                <h2 className="text-[var(--text-base)] font-bold text-[var(--color-ink)] mb-4">Available Strategies</h2>
                <p className="text-[var(--text-sm)] text-[var(--color-ink-2)] mb-6">
                  EnergiKita has ranked the best ways to use or redirect your remaining 8.3 kWh of value.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => {
                      if (!hasCompletedQuestionnaire) {
                        setStep(2);
                      }
                    }}
                    className={`border rounded-[var(--radius-md)] p-4 shadow-sm flex flex-col justify-between relative overflow-hidden transition-all ${
                      hasCompletedQuestionnaire
                        ? "border-[var(--color-accent)] bg-white"
                        : "cursor-pointer border-dashed border-[var(--color-accent)] bg-[var(--color-accent)]/5 hover:bg-[var(--color-accent)]/10 group"
                    }`}
                  >
                    {hasCompletedQuestionnaire && (
                      <div className="absolute top-0 right-0 bg-[var(--color-accent)] text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-bl-md">
                        Optimal
                      </div>
                    )}
                    <div>
                      <div className="flex items-center mb-1 justify-between">
                        <div className="flex items-center">
                          <RefreshCw className="w-4 h-4 text-[var(--color-accent)] mr-2" />
                          <h3 className="font-bold text-[var(--text-xs)] text-[var(--color-ink)]">1. Shift Equipment</h3>
                        </div>
                        {!hasCompletedQuestionnaire && (
                          <ChevronRight className="w-3 h-3 text-[var(--color-accent)] group-hover:translate-x-1 transition-transform" />
                        )}
                      </div>
                      <p className={`text-[var(--text-xs)] mt-1 ${hasCompletedQuestionnaire ? "text-[var(--color-ink-2)]" : "text-[var(--color-accent)] font-medium"}`}>
                        {hasCompletedQuestionnaire
                          ? configuredShiftCopy
                          : "Tell us how flexible your load really is so we can tune this strategy to your actual routine."}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-[var(--color-border)]">
                      <span className="text-[9px] font-medium text-[var(--color-ink-3)] uppercase tracking-wider">Result:</span>
                      <p className="text-[var(--text-xs)] font-bold text-[var(--color-accent)] mt-0.5">
                        {hasCompletedQuestionnaire && willingToDelay ? "Absorbs 5.2 kWh/day" : "Absorbs 4.5 kWh/day"}
                      </p>
                    </div>
                  </div>

                  <Link href="/wallet" className="border border-[var(--color-border)] rounded-[var(--radius-md)] p-4 bg-white shadow-sm flex flex-col justify-between hover:border-[var(--color-success)] hover:bg-[#ecfdf5]/50 transition-all cursor-pointer group">
                    <div>
                      <div className="flex items-center mb-1 justify-between">
                        <div className="flex items-center">
                          <Zap className="w-4 h-4 text-[var(--color-success)] mr-2" />
                          <h3 className="font-bold text-[var(--text-xs)] text-[var(--color-ink)]">2. Export Surplus</h3>
                        </div>
                        <ChevronRight className="w-3 h-3 text-[var(--color-success)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-[var(--text-xs)] text-[var(--color-ink-2)] mt-1">
                        Send inflexible surplus to the TNB grid and review credit options.
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-[var(--color-border)]">
                      <span className="text-[9px] font-medium text-[var(--color-ink-3)] uppercase tracking-wider">Result:</span>
                      <p className="text-[var(--text-xs)] font-medium text-[var(--color-ink)] mt-0.5">Earns RM 0.25/kWh</p>
                    </div>
                  </Link>

                  {isBusiness && (
                    <div className="border border-[var(--color-border)] rounded-[var(--radius-md)] p-4 bg-[var(--color-paper-2)] shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center mb-1">
                          <Box className="w-4 h-4 text-[var(--color-ink-2)] mr-2" />
                          <h3 className="font-bold text-[var(--text-xs)] text-[var(--color-ink)]">3. Branch Allocation (NOVA)</h3>
                        </div>
                        <p className="text-[var(--text-xs)] text-[var(--color-ink-2)] mt-1">
                          Route export credits to designated branches via virtual allocation.
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-[var(--color-border)]">
                        <span className="text-[9px] font-medium text-[var(--color-ink-3)] uppercase tracking-wider">Result:</span>
                        <p className="text-[var(--text-xs)] font-medium text-[var(--color-ink)] mt-0.5">Offsets high-bill branches</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-[var(--color-border)] flex items-center justify-between">
                  <div className="text-[var(--text-sm)] text-[var(--color-ink-2)]">
                    Use these recommendations to build a practical schedule inside the optimisation workspace.
                  </div>
                  <Link href="/optimisation">
                    <button className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-6 py-2.5 rounded-[var(--radius-md)] text-[var(--text-sm)] font-medium shadow-sm transition-colors flex items-center">
                      Open Optimisation Hub <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </Link>
                </div>
              </section>
            ) : (
              <section className="bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] p-8 shadow-sm animate-in slide-in-from-right-4 duration-300">
                <div className="flex items-center mb-6">
                  <Sliders className="w-6 h-6 text-[var(--color-accent)] mr-3" />
                  <div>
                    <h2 className="text-[var(--text-xl)] font-bold text-[var(--color-ink)]">Determine Your Flexibility</h2>
                    <p className="text-[var(--text-sm)] text-[var(--color-ink-2)] mt-1">
                      Tune the load-shifting recommendation so it fits how your home or business actually operates.
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="block text-[var(--text-base)] font-semibold text-[var(--color-ink)]">
                      1. Are you willing to delay heavy equipment to lower-cost hours if that improves savings?
                    </label>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setWillingToDelay(true)}
                        className={`px-6 py-3 rounded-[var(--radius-md)] border font-medium transition-all ${
                          willingToDelay
                            ? "bg-[var(--color-success-bg)] border-[var(--color-success)] text-[var(--color-success)]"
                            : "bg-white border-[var(--color-border)] text-[var(--color-ink-2)] hover:border-[var(--color-ink-3)]"
                        }`}
                      >
                        Yes, I can delay
                      </button>
                      <button
                        onClick={() => setWillingToDelay(false)}
                        className={`px-6 py-3 rounded-[var(--radius-md)] border font-medium transition-all ${
                          !willingToDelay
                            ? "bg-[var(--color-paper-2)] border-[var(--color-ink)] text-[var(--color-ink)]"
                            : "bg-white border-[var(--color-border)] text-[var(--color-ink-2)] hover:border-[var(--color-ink-3)]"
                        }`}
                      >
                        No, need it immediately
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-[var(--text-base)] font-semibold text-[var(--color-ink)]">
                      2. Do you have smart plugs or controllable devices EnergiKita can coordinate?
                    </label>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setHasSmartPlugs(true)}
                        className={`px-6 py-3 rounded-[var(--radius-md)] border font-medium transition-all ${
                          hasSmartPlugs
                            ? "bg-[var(--color-accent)]/10 border-[var(--color-accent)] text-[var(--color-accent)]"
                            : "bg-white border-[var(--color-border)] text-[var(--color-ink-2)] hover:border-[var(--color-ink-3)]"
                        }`}
                      >
                        Yes, smart devices available
                      </button>
                      <button
                        onClick={() => setHasSmartPlugs(false)}
                        className={`px-6 py-3 rounded-[var(--radius-md)] border font-medium transition-all ${
                          !hasSmartPlugs
                            ? "bg-[var(--color-paper-2)] border-[var(--color-ink)] text-[var(--color-ink)]"
                            : "bg-white border-[var(--color-border)] text-[var(--color-ink-2)] hover:border-[var(--color-ink-3)]"
                        }`}
                      >
                        No, manual only
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-[var(--text-base)] font-semibold text-[var(--color-ink)]">
                      3. What matters most right now?
                    </label>
                    <select
                      value={optimizationGoal}
                      onChange={(e) => setOptimizationGoal(e.target.value)}
                      className="w-full max-w-md bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-3 text-[var(--text-base)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
                    >
                      <option value="cost">Maximum cost savings</option>
                      <option value="carbon">Maximum carbon reduction</option>
                      <option value="balanced">Balanced approach</option>
                    </select>
                  </div>

                  <div className="pt-6 border-t border-[var(--color-border)] flex justify-end gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="text-[var(--text-sm)] text-[var(--color-ink-2)] hover:text-[var(--color-ink)] font-medium transition-colors px-4 py-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setHasCompletedQuestionnaire(true);
                        setStep(1);
                      }}
                      className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-8 py-3 rounded-[var(--radius-md)] text-[var(--text-base)] font-bold shadow-sm transition-colors flex items-center"
                    >
                      Save & Update Strategy <Settings className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
