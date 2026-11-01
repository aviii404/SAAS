import React from 'react';
import { X, ArrowRight, Loader2, RefreshCw, Compass } from 'lucide-react';
import { AlternativeIdea } from '../types/blueprint';

interface AlternativeIdeasModalProps {
  isOpen: boolean;
  onClose: () => void;
  alternatives: AlternativeIdea[] | null;
  isLoading: boolean;
  onSelectPivot: (pivot: AlternativeIdea) => void;
  onRefreshAlternatives: () => void;
}

export const AlternativeIdeasModal: React.FC<AlternativeIdeasModalProps> = ({
  isOpen,
  onClose,
  alternatives,
  isLoading,
  onSelectPivot,
  onRefreshAlternatives,
}) => {
  if (!isOpen) return null;

  const list = alternatives ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#080B14]/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#141B2D] border border-[rgba(148,163,184,0.16)] rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(148,163,184,0.16)] bg-[#0D1224]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7C3AED] via-[#8B5CF6] to-[#22D3EE] flex items-center justify-center shadow-md">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#F1F5F9]">Alternative Pivot Angles</h2>
              <p className="text-xs text-[#94A3B8]">Pivoting the Core Insight with Gemini 3.8 Flash</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onRefreshAlternatives}
              disabled={isLoading}
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1A2238] transition-colors cursor-pointer"
              title="Generate new alternatives"
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
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
          {isLoading ? (
            <div className="py-16 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-[#22D3EE] animate-spin mx-auto" />
              <p className="text-sm font-semibold text-[#F1F5F9]">Generating Strategic Pivot Archetypes...</p>
              <p className="text-xs text-[#94A3B8]">Exploring vertical SaaS, micro-utilities, and marketplace models.</p>
            </div>
          ) : list.length > 0 ? (
            <div className="space-y-4">
              <p className="text-xs text-[#94A3B8]">
                Explore alternative ways to monetize and position your underlying premise. Click any angle to inspect or generate its blueprint.
              </p>

              {list.map((alt, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] hover:border-[#8B5CF6]/50 transition-all space-y-3 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono font-semibold text-[#22D3EE]">{alt.pivotType}</span>
                      <h3 className="text-base font-bold text-[#F1F5F9] mt-0.5">{alt.conceptName}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelectPivot(alt)}
                      className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#22D3EE] rounded-lg hover:brightness-110 shadow-sm transition-all cursor-pointer whitespace-nowrap"
                    >
                      <span>Build This Pivot</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-[#F1F5F9] leading-relaxed">{alt.overview}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[rgba(148,163,184,0.12)] text-[11px]">
                    <div>
                      <span className="text-[#94A3B8] block font-medium">Target Buyer</span>
                      <span className="text-[#F1F5F9]">{alt.targetAudience}</span>
                    </div>
                    <div>
                      <span className="text-[#34D399] block font-medium">Key Advantage</span>
                      <span className="text-[#F1F5F9]">{alt.whyItMightBeEasierOrBetter}</span>
                    </div>
                    <div>
                      <span className="text-[#EC4899] block font-medium">Main Trade-off</span>
                      <span className="text-[#F1F5F9]">{alt.keyTradeoff}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-[#94A3B8]">
              No alternatives generated yet. Click the refresh icon to explore pivots.
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
