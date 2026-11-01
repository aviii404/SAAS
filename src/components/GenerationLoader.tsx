import React, { useEffect, useState } from 'react';
import { Sparkles, Loader2, CheckCircle2 } from 'lucide-react';

interface GenerationLoaderProps {
  ideaTitle?: string;
}

const STEPS = [
  'Ingesting idea premise & market constraints...',
  'Synthesizing executive vision & value proposition...',
  'Constructing deep customer personas & willingness-to-pay...',
  'Formulating TAM/SAM/SOM hypotheses & interview questions...',
  'Architecting MVP MoSCoW matrix & tech stack...',
  'Drafting 30-day sprint roadmap & pirate metrics (AARRR)...',
  'Finalizing structured startup blueprint...',
];

export const GenerationLoader: React.FC<GenerationLoaderProps> = ({ ideaTitle }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080B14]/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-2xl border border-[rgba(148,163,184,0.16)] bg-[#141B2D] shadow-2xl text-center space-y-6">
        {/* Animated icon orb */}
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#7C3AED] via-[#8B5CF6] to-[#22D3EE] blur-md opacity-60 animate-pulse" />
          <div className="relative w-full h-full rounded-full bg-[#080B14] border border-[#22D3EE]/50 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-[#22D3EE] animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-1.5">
          <h3 className="text-xl font-bold text-[#F1F5F9] tracking-tight">
            Forging Your Startup Blueprint
          </h3>
          <p className="text-xs text-[#94A3B8]">
            {ideaTitle ? `"${ideaTitle.slice(0, 65)}..."` : 'Synthesizing with Gemini 3.8 Flash'}
          </p>
        </div>

        {/* Step-by-step progress checklist */}
        <div className="space-y-2.5 text-left border-y border-[rgba(148,163,184,0.16)] py-4 max-h-56 overflow-hidden">
          {STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            return (
              <div
                key={step}
                className={`flex items-center gap-2.5 text-xs transition-opacity duration-300 ${
                  isCurrent
                    ? 'text-[#22D3EE] font-semibold opacity-100'
                    : isCompleted
                    ? 'text-[#94A3B8] opacity-80'
                    : 'text-[#94A3B8]/40 opacity-40'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-[#22D3EE] animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-[rgba(148,163,184,0.3)] shrink-0" />
                )}
                <span className="truncate">{step}</span>
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-[#94A3B8] italic">
          Every blueprint dimension is tailored to your target customer, budget range, and industry constraints.
        </p>
      </div>
    </div>
  );
};
