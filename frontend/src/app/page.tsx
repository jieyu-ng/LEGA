"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, Check, AlertTriangle, FileJson, TrendingUp } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [extractedData, setExtractedData] = useState<any>(null);

  const handleUpload = async () => {
    setStep(2);
    setTimeout(() => {
      setExtractedData({
        billing_month: "May 2026",
        consumption_kwh: 1420,
        total_amount_rm: 980.00,
        confidence: 0.94,
        source: "pdf_extracted"
      });
      setStep(3);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center pt-24 pb-32 px-6">
      <div className="max-w-[var(--content-width)] w-full text-center space-y-8">
        
        <h1 className="text-[var(--text-4xl)] md:text-5xl lg:text-6xl font-bold text-[var(--color-ink)] leading-tight tracking-tight max-w-3xl mx-auto">
          Energy flexibility infrastructure for modern businesses.
        </h1>
        
        <p className="text-[var(--text-lg)] text-[var(--color-ink-2)] max-w-2xl mx-auto font-body">
          Turn your operational data into an actionable asset. Extract profiles, run deterministic optimisations, and connect to community solar.
        </p>

        <div className="pt-16 max-w-2xl mx-auto text-left">
          {step === 1 && (
            <div 
              onClick={handleUpload}
              className="border border-[var(--color-border)] rounded-[var(--radius-lg)] p-12 bg-white flex flex-col items-center justify-center cursor-pointer hover:border-[var(--color-accent)] transition-colors shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--color-paper-3)] flex items-center justify-center mb-4">
                <UploadCloud className="w-6 h-6 text-[var(--color-ink-2)]" />
              </div>
              <p className="text-[var(--text-sm)] font-medium text-[var(--color-ink)]">Click to upload electricity bill or drag and drop</p>
              <p className="text-[var(--text-xs)] text-[var(--color-ink-3)] mt-1">PDF, PNG, JPG up to 10MB</p>
            </div>
          )}

          {step === 2 && (
            <div className="border border-[var(--color-border)] rounded-[var(--radius-lg)] p-16 bg-white flex flex-col items-center justify-center shadow-sm">
              <div className="w-8 h-8 border-2 border-[var(--color-border)] border-t-[var(--color-accent)] rounded-full animate-spin mb-4"></div>
              <p className="text-[var(--text-sm)] font-medium text-[var(--color-ink)]">
                Bill Intelligence Layer running...
              </p>
            </div>
          )}

          {step === 3 && extractedData && (
            <div className="space-y-6">
              
              {/* Structured JSON Output Card */}
              <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-paper-2)] flex items-center justify-between">
                  <h3 className="font-semibold text-[var(--text-sm)] text-[var(--color-ink)] flex items-center">
                    <FileJson className="w-4 h-4 mr-2 text-[var(--color-ink-3)]" />
                    Structured Bill Output
                  </h3>
                  <div className="flex items-center text-[var(--text-xs)] font-medium text-[var(--color-success)] px-2 py-1 bg-[var(--color-success-bg)] rounded-md">
                    <Check className="w-3 h-3 mr-1" /> Confidence High
                  </div>
                </div>
                
                <div className="p-6 bg-[#0d1117] text-[#c9d1d9] font-mono text-[var(--text-sm)] overflow-x-auto">
                  <pre>
{`{
  "billing_month": "${extractedData.billing_month}",
  "consumption_kwh": ${extractedData.consumption_kwh},
  "total_amount_rm": ${extractedData.total_amount_rm},
  "confidence": ${extractedData.confidence},
  "source": "${extractedData.source}"
}`}
                  </pre>
                </div>
              </div>

              {/* Anomaly Detection Card */}
              <div className="bg-white rounded-[var(--radius-lg)] border border-[#fca5a5] shadow-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#ef4444]"></div>
                <div className="p-6 pl-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-[var(--text-base)] text-[var(--color-ink)] flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-[#ef4444]" />
                        Usage Anomaly Detected
                      </h3>
                      <p className="text-[var(--text-sm)] text-[var(--color-ink-2)] mt-1">
                        Current usage is significantly above recent monthly baseline.
                      </p>
                    </div>
                    <span className="inline-flex items-center text-[var(--text-xs)] font-bold text-[#b91c1c] bg-[#fee2e2] px-2.5 py-1 rounded-md uppercase tracking-wider">
                      Medium Severity
                    </span>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-[var(--color-paper-2)] p-3 rounded-[var(--radius-md)] border border-[var(--color-border)]">
                      <p className="text-[var(--text-xs)] text-[var(--color-ink-3)] font-medium uppercase tracking-wider">Deviation</p>
                      <p className="text-[var(--text-lg)] font-bold text-[var(--color-ink)]">+18.6%</p>
                    </div>
                    <div className="bg-[var(--color-paper-2)] p-3 rounded-[var(--radius-md)] border border-[var(--color-border)]">
                      <p className="text-[var(--text-xs)] text-[var(--color-ink-3)] font-medium uppercase tracking-wider">Baseline (3-mo avg)</p>
                      <p className="text-[var(--text-lg)] font-bold text-[var(--color-ink)]">1197 kWh</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button 
                  onClick={() => router.push("/onboard")}
                  className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-6 py-2.5 rounded-[var(--radius-md)] text-[var(--text-sm)] font-medium shadow-sm transition-colors flex items-center"
                >
                  Proceed to Equipment Inference
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
