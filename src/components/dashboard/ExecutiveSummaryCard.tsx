import React, { useState } from 'react';
import { Copy, RefreshCw, Check, Sparkles } from 'lucide-react';
import { ExecutiveSummary } from '../../types/blueprint';

interface Props {
  data: ExecutiveSummary;
  onRegenerate: (customInstruction?: string) => void;
  isRegenerating: boolean;
  onCopy: (text: string) => void;
}

export const ExecutiveSummaryCard: React.FC<Props> = ({
  data,
  onRegenerate,
  isRegenerating,
  onCopy,
}) => {
  const [copied, setCopied] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(false);
  const [promptText, setPromptText] = useState('');

  const handleCopy = () => {
    const text = `EXECUTIVE SUMMARY\nProject: ${data.projectName}\nTagline: ${data.tagline}\nElevator Pitch: ${data.elevatorPitch}\nValue Proposition: ${data.valueProposition}\nStrategic Edge: ${data.coreStrategicEdge}`;
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
    <div id="section-executiveSummary" className="p-6 rounded-2xl border border-[rgba(148,163,184,0.16)] bg-[#141B2D] space-y-5 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(148,163,184,0.16)] pb-4">
        <div>
          <span className="text-xs font-mono font-semibold text-[#22D3EE] uppercase tracking-wider">
            Section A · Executive Strategy
          </span>
          <h2 className="text-xl font-bold text-[#F1F5F9] mt-0.5">
            {data.projectName}
          </h2>
          <p className="text-xs text-[#94A3B8] italic mt-0.5">{data.tagline}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#F1F5F9] hover:text-white bg-[#1A2238] hover:bg-[#0D1224] border border-[rgba(148,163,184,0.16)] rounded-lg transition-colors cursor-pointer"
            title="Copy section"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#34D399]" /> : <Copy className="w-3.5 h-3.5 text-[#94A3B8]" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPromptInput(!showPromptInput)}
            disabled={isRegenerating}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#8B5CF6] hover:text-white bg-[#7C3AED]/15 hover:bg-[#7C3AED]/30 border border-[#8B5CF6]/30 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{isRegenerating ? 'Regenerating...' : 'Regenerate'}</span>
          </button>
        </div>
      </div>

      {/* Optional regeneration instruction box */}
      {showPromptInput && (
        <div className="p-3 rounded-xl border border-[#7C3AED]/30 bg-[#1A2238] space-y-2">
          <label htmlFor="regen-prompt-exec" className="block text-xs font-medium text-[#8B5CF6]">
            Customize regeneration prompt for Executive Summary (optional):
          </label>
          <div className="flex gap-2">
            <input
              id="regen-prompt-exec"
              type="text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="e.g. Make the elevator pitch more aggressive on ROI for enterprise clients..."
              className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[rgba(148,163,184,0.16)] bg-[#080B14] text-[#F1F5F9] placeholder:text-[#94A3B8]/60 focus:outline-none focus:border-[#22D3EE]"
            />
            <button
              type="button"
              onClick={submitRegeneration}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] hover:brightness-110 rounded-lg"
            >
              Run
            </button>
          </div>
        </div>
      )}

      {/* Main Pitch */}
      <div className="space-y-3">
        <div>
          <span className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider block mb-1">
            Elevator Pitch
          </span>
          <p className="text-sm text-[#F1F5F9] leading-relaxed bg-[#1A2238] p-4 rounded-xl border border-[rgba(148,163,184,0.16)]">
            {data.elevatorPitch}
          </p>
        </div>

        {/* 2-col Value Proposition & Strategic Edge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-1.5">
            <span className="text-xs font-mono text-[#22D3EE] uppercase tracking-wider">
              Primary Value Proposition
            </span>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              {data.valueProposition}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-1.5">
            <span className="text-xs font-mono text-[#8B5CF6] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
              Core Strategic Edge
            </span>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              {data.coreStrategicEdge}
            </p>
          </div>
        </div>

        {/* Strategic disclaimer note */}
        {data.strategicDisclaimer && (
          <div className="text-[11px] text-[#94A3B8] italic pt-1">
            * {data.strategicDisclaimer}
          </div>
        )}
      </div>
    </div>
  );
};
