"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Settings, Building2, Zap, LayoutDashboard, Target, AlertTriangle } from "lucide-react";
import demoOptimisation from "@/data/demo_optimisation.json";

export default function OptimisationHubPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [branchCount, setBranchCount] = useState<number>(3);
  const [allocationGoal, setAllocationGoal] = useState("highest_bill");
  const [hasCriticalConstraints, setHasCriticalConstraints] = useState(false);

  return (
    <div className="max-w-[var(--page-width)] mx-auto px-6 pt-12 pb-24 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/passport" className="text-[var(--color-ink-2)] hover:text-[var(--color-ink)] transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-[var(--text-3xl)] font-bold text-[var(--color-ink)] tracking-tight">
          Optimisation Hub
        </h1>
      </div>

      {step === 1 ? (
        <section className="bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] p-8 shadow-sm max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center mb-6">
            <Building2 className="w-6 h-6 text-[var(--color-accent)] mr-3" />
            <div>
              <h2 className="text-[var(--text-xl)] font-bold text-[var(--color-ink)]">Multi-Branch Context</h2>
              <p className="text-[var(--text-sm)] text-[var(--color-ink-2)] mt-1">
                Before generating the final allocation, we need some details about your branch network.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <label className="block text-[var(--text-base)] font-semibold text-[var(--color-ink)]">
                1. How many business branches or properties do you operate?
              </label>
              <input 
                type="number" 
                value={branchCount}
                onChange={(e) => setBranchCount(Number(e.target.value))}
                min={1}
                className="w-full max-w-xs bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-3 text-[var(--text-base)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-[var(--text-base)] font-semibold text-[var(--color-ink)]">
                2. What is your primary goal for surplus allocation?
              </label>
              <select 
                value={allocationGoal} 
                onChange={(e) => setAllocationGoal(e.target.value)}
                className="w-full bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-3 text-[var(--text-base)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
              >
                <option value="highest_bill">Prioritize branches with the highest commercial tariff rates</option>
                <option value="even">Distribute surplus evenly across all branches</option>
                <option value="lowest_solar">Prioritize branches with no existing solar capacity</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="block text-[var(--text-base)] font-semibold text-[var(--color-ink)]">
                3. Do any of your branches have critical load constraints (e.g. cold storage, 24/7 server rooms)?
              </label>
              <div className="flex gap-4">
                <button 
                  onClick={() => setHasCriticalConstraints(true)}
                  className={`px-6 py-3 rounded-[var(--radius-md)] border font-medium transition-all flex-1 md:flex-none ${hasCriticalConstraints ? 'bg-[#fee2e2] border-[#ef4444] text-[#b91c1c]' : 'bg-white border-[var(--color-border)] text-[var(--color-ink-2)] hover:border-[var(--color-ink-3)]'}`}
                >
                  Yes, critical loads exist
                </button>
                <button 
                  onClick={() => setHasCriticalConstraints(false)}
                  className={`px-6 py-3 rounded-[var(--radius-md)] border font-medium transition-all flex-1 md:flex-none ${!hasCriticalConstraints ? 'bg-[var(--color-success-bg)] border-[var(--color-success)] text-[var(--color-success)]' : 'bg-white border-[var(--color-border)] text-[var(--color-ink-2)] hover:border-[var(--color-ink-3)]'}`}
                >
                  No critical loads
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--color-border)] flex justify-end">
              <button 
                onClick={() => setStep(2)}
                className="bg-[var(--color-ink)] hover:bg-[var(--color-ink-2)] text-white px-8 py-3 rounded-[var(--radius-md)] text-[var(--text-base)] font-bold shadow-sm transition-colors flex items-center"
              >
                Generate Allocation Dashboard <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="space-y-8 animate-in slide-in-from-right-4 duration-500">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[var(--color-ink)] text-white border border-[var(--color-border)] rounded-[var(--radius-lg)] p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <LayoutDashboard className="w-6 h-6 text-[var(--color-accent)] mr-3" />
                <h2 className="text-[var(--text-xl)] font-bold">Network Virtual Allocation (NOVA)</h2>
              </div>
              <p className="text-[var(--text-base)] text-white/80 leading-relaxed mb-6">
                {demoOptimisation.advisory_summary}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-[var(--radius-md)] p-4">
                  <span className="block text-[var(--text-xs)] font-medium text-white/50 uppercase tracking-wider mb-1">Total Network Surplus</span>
                  <span className="text-[var(--text-3xl)] font-bold text-white">{demoOptimisation.total_surplus_kwh} kWh</span>
                </div>
                <div className="bg-[var(--color-success)]/20 rounded-[var(--radius-md)] p-4">
                  <span className="block text-[var(--text-xs)] font-medium text-[var(--color-success)] uppercase tracking-wider mb-1">Total Net Savings</span>
                  <span className="text-[var(--text-3xl)] font-bold text-[var(--color-success)]">RM {demoOptimisation.total_savings_rm.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-[var(--text-sm)] font-bold text-[var(--color-ink-3)] uppercase tracking-wider mb-4">Optimisation Impact</h3>
                <div className="space-y-6">
                  <div>
                    <span className="block text-[var(--text-xs)] text-[var(--color-ink-2)] mb-1">Carbon Reduction Offset</span>
                    <div className="flex items-baseline">
                      <span className="text-[var(--text-2xl)] font-bold text-[var(--color-ink)]">{demoOptimisation.environmental_impact_co2_kg}</span>
                      <span className="text-[var(--text-sm)] font-medium text-[var(--color-ink-2)] ml-2">kg CO₂</span>
                    </div>
                  </div>
                  <div>
                    <span className="block text-[var(--text-xs)] text-[var(--color-ink-2)] mb-1">Target Branches Analyzed</span>
                    <span className="text-[var(--text-xl)] font-bold text-[var(--color-ink)]">{branchCount} Branches</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-paper-2)]">
              <h3 className="font-bold text-[var(--color-ink)]">Branch Allocation Breakdown</h3>
            </div>
            <div className="divide-y divide-[var(--color-border)]">
              {demoOptimisation.branches.map((branch) => (
                <div key={branch.id} className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-center hover:bg-[#fafafa] transition-colors">
                  <div className="col-span-1">
                    <h4 className="font-bold text-[var(--text-base)] text-[var(--color-ink)]">{branch.name}</h4>
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mt-2 ${branch.status === 'Priority Offset' ? 'bg-[#fee2e2] text-[#b91c1c]' : branch.status === 'Partial Offset' ? 'bg-[#fffbeb] text-[#b45309]' : 'bg-[var(--color-success-bg)] text-[var(--color-success)]'}`}>
                      {branch.status}
                    </span>
                  </div>
                  
                  <div className="col-span-2 grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[var(--text-xs)] text-[var(--color-ink-3)] uppercase tracking-wider mb-1">Base Load</span>
                      <span className="font-medium text-[var(--color-ink)]">{branch.current_load_kwh} kWh</span>
                    </div>
                    <div>
                      <span className="block text-[var(--text-xs)] text-[var(--color-accent)] uppercase tracking-wider mb-1 font-bold">Injected Surplus</span>
                      <span className="font-bold text-[var(--color-accent)]">+{branch.allocated_surplus_kwh.toFixed(1)} kWh</span>
                    </div>
                  </div>

                  <div className="col-span-1 text-right">
                    <span className="block text-[var(--text-xs)] text-[var(--color-ink-3)] uppercase tracking-wider mb-1">Estimated Savings</span>
                    <span className="font-bold text-[var(--text-lg)] text-[var(--color-success)]">RM {branch.savings_rm.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <Link href="/wallet">
              <button className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-6 py-3 rounded-[var(--radius-md)] text-[var(--text-base)] font-bold shadow-sm transition-colors flex items-center">
                Finalize & Proceed to Wallet <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
          </div>
          
        </section>
      )}

    </div>
  );
}
