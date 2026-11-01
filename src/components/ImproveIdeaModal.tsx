import React from 'react';
import { X, Check, ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import { IdeaImprovement } from '../types/blueprint';

interface ImproveIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: IdeaImprovement | null;
  isLoading: boolean;
  onAdoptPitch: (enhancedPitch: string) => void;
  onRefreshCritique: () => void;
}

export const ImproveIdeaModal: React.FC<ImproveIdeaModalProps> = ({
  isOpen,
  onClose,
  data,
  isLoading,
  onAdoptPitch,
  onRefreshCritique,
}) => {
  const [pitchAdopted, setPitchAdopted] = React.useState(false);

  if (!isOpen) return null;

  const strengths = data?.strengths ?? [];
  const blindSpots = data?.blindSpots ?? [];
  const recommendations = data?.strategicRecommendations ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#080B14]/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#141B2D] border border-[rgba(148,163,184,0.16)] rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(148,163,184,0.16)] bg-[#0D1224]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7C3AED] via-[#8B5CF6] to-[#EC4899] flex items-center justify-center shadow-md">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <div>
              <h2 className="text-base font-bold text-[#F1F5F9]">Strategic Idea Critique & Upgrades</h2>
              <p className="text-xs text-[#94A3B8]">Venture Architect Review via Gemini 3.8 Flash</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onRefreshCritique}
              disabled={isLoading}
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1A2238] transition-colors cursor-pointer"
              title="Refresh critique"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1A2238] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {isLoading ? (
            <div className="py-16 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-[#22D3EE] animate-spin mx-auto" />
              <p className="text-sm font-semibold text-[#F1F5F9]">Analyzing Venture Assumptions & Blind Spots...</p>
              <p className="text-xs text-[#94A3B8]">Evaluating unit economics, market friction, and positioning.</p>
            </div>
          ) : data ? (
            <>
              {/* Strengths & Blind Spots 2-col */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-2">
                  <span className="text-xs font-semibold text-[#34D399] uppercase tracking-wider">
                    Core Strengths Identified
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#94A3B8]">
                    {strengths.map((str, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#34D399] shrink-0 mt-0.5" />
                        <span className="text-[#F1F5F9]">{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-2">
                  <span className="text-xs font-semibold text-[#EC4899] uppercase tracking-wider">
                    Critical Blind Spots & Vulnerabilities
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#94A3B8]">
                    {blindSpots.map((bs, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#EC4899] font-bold shrink-0">!</span>
                        <span className="text-[#F1F5F9]">{bs}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 3 Strategic Recommendations */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-semibold text-[#22D3EE] tracking-wider uppercase">
                  Actionable Strategic Upgrades
                </h3>

                <div className="space-y-3">
                  {recommendations.map((rec, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-2 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-[#F1F5F9]">
                          {i + 1}. {rec.title}
                        </h4>
                      </div>
                      <div className="text-xs text-[#94A3B8] space-y-1">
                        <p>
                          <span className="text-[#F1F5F9] font-medium">Problem: </span>
                          {rec.problemIdentified}
                        </p>
                        <p>
                          <span className="text-[#22D3EE] font-medium">Refinement: </span>
                          {rec.recommendedRefinement}
                        </p>
                        <p>
                          <span className="text-[#8B5CF6] font-medium">Expected Impact: </span>
                          {rec.expectedImpact}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Pitch with 1-click adoption */}
              <div className="p-4 rounded-xl border border-[#7C3AED]/30 bg-gradient-to-r from-[#7C3AED]/15 via-[#8B5CF6]/10 to-[#EC4899]/15 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider">
                    Recommended Upgraded Pitch
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onAdoptPitch(data.enhancedPitch);
                      setPitchAdopted(true);
                      setTimeout(() => setPitchAdopted(false), 3000);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] hover:brightness-110 rounded-lg transition-all cursor-pointer shadow-sm"
                  >
                    {pitchAdopted ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#34D399]" />
                        <span>Pitch Adopted!</span>
                      </>
                    ) : (
                      <>
                        <span>Adopt This Pitch</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-[#F1F5F9] leading-relaxed italic bg-[#080B14]/60 p-3 rounded-lg border border-[rgba(148,163,184,0.12)]">
                  "{data.enhancedPitch}"
                </p>
              </div>
            </>
          ) : (
            <div className="py-8 text-center text-xs text-[#94A3B8]">
              No critique available yet. Click refresh to run analysis.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[rgba(148,163,184,0.16)] bg-[#0D1224] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-[#F1F5F9] hover:text-white bg-[#1A2238] hover:bg-[#141B2D] border border-[rgba(148,163,184,0.16)] rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
