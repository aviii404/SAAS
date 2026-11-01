import React, { useState } from 'react';
import { Copy, RefreshCw, Check, Zap, Target } from 'lucide-react';
import { ProposedSolution } from '../../types/blueprint';

interface Props {
  data: ProposedSolution;
  onRegenerate: (customInstruction?: string) => void;
  isRegenerating: boolean;
  onCopy: (text: string) => void;
}

export const ProposedSolutionCard: React.FC<Props> = ({
  data,
  onRegenerate,
  isRegenerating,
  onCopy,
}) => {
  const [copied, setCopied] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(false);
  const [promptText, setPromptText] = useState('');

  const handleCopy = () => {
    const text = `PROPOSED SOLUTION\nSummary: ${data.summary}\nCore Mechanism: ${data.coreMechanism}\nWhy Now: ${data.whyNow}\nKey Differentiator: ${data.keyDifferentiator}\nTarget Outcome: ${data.userOutcome}`;
    onCopy(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submitRegeneration = () => {
    onRegenerate(promptText.trim() || undefined);
    setShowPromptInput(false);
    setPromptText('');
  };

  return (
    <div id="section-proposedSolution" className="p-6 rounded-2xl border border-[rgba(148,163,184,0.16)] bg-[#141B2D] space-y-5 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(148,163,184,0.16)] pb-4">
        <div>
          <span className="text-xs font-mono font-semibold text-[#34D399] uppercase tracking-wider">
            Section C · Product Architecture
          </span>
          <h2 className="text-xl font-bold text-[#F1F5F9] mt-0.5">Proposed Solution</h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">Operating mechanism, timing catalysts, and defensibility</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#F1F5F9] hover:text-white bg-[#1A2238] hover:bg-[#0D1224] border border-[rgba(148,163,184,0.16)] rounded-lg transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#34D399]" /> : <Copy className="w-3.5 h-3.5 text-[#94A3B8]" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPromptInput(!showPromptInput)}
            disabled={isRegenerating}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#34D399] hover:text-white bg-[#34D399]/15 hover:bg-[#34D399]/30 border border-[#34D399]/30 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{isRegenerating ? 'Regenerating...' : 'Regenerate'}</span>
          </button>
        </div>
      </div>

      {showPromptInput && (
        <div className="p-3 rounded-xl border border-[#34D399]/30 bg-[#1A2238] space-y-2">
          <label htmlFor="regen-prompt-sol" className="block text-xs font-medium text-[#34D399]">
            Customize regeneration prompt for Solution (optional):
          </label>
          <div className="flex gap-2">
            <input
              id="regen-prompt-sol"
              type="text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="e.g. Highlight lightweight mobile tablet integration without hardware sensors..."
              className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[rgba(148,163,184,0.16)] bg-[#080B14] text-[#F1F5F9] placeholder:text-[#94A3B8]/60 focus:outline-none focus:border-[#34D399]"
            />
            <button
              type="button"
              onClick={submitRegeneration}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#34D399] hover:brightness-110 rounded-lg"
            >
              Run
            </button>
          </div>
        </div>
      )}

      {/* High-level summary */}
      <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238]">
        <p className="text-sm text-[#F1F5F9] leading-relaxed">{data.summary}</p>
      </div>

      {/* Mechanism & Why Now */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-1.5">
          <span className="text-xs font-mono text-[#22D3EE] uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#22D3EE]" />
            Core Operating Mechanism
          </span>
          <p className="text-xs text-[#94A3B8] leading-relaxed">{data.coreMechanism}</p>
        </div>

        <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-1.5">
          <span className="text-xs font-mono text-[#8B5CF6] uppercase tracking-wider">
            Why Now (Market Catalyst)
          </span>
          <p className="text-xs text-[#94A3B8] leading-relaxed">{data.whyNow}</p>
        </div>
      </div>

      {/* Differentiator & End User Outcome */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-1.5">
          <span className="text-xs font-mono text-[#EC4899] uppercase tracking-wider">
            Key Unfair Differentiator
          </span>
          <p className="text-xs text-[#94A3B8] leading-relaxed">{data.keyDifferentiator}</p>
        </div>

        <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-1.5">
          <span className="text-xs font-mono text-[#34D399] uppercase tracking-wider flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-[#34D399]" />
            Tangible User Outcome
          </span>
          <p className="text-xs text-[#94A3B8] leading-relaxed">{data.userOutcome}</p>
        </div>
      </div>
    </div>
  );
};
