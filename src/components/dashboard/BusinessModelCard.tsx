import React, { useState } from 'react';
import { Copy, RefreshCw, Check } from 'lucide-react';
import { BusinessModel } from '../../types/blueprint';

interface Props {
  data: BusinessModel;
  onRegenerate: (customInstruction?: string) => void;
  isRegenerating: boolean;
  onCopy: (text: string) => void;
}

export const BusinessModelCard: React.FC<Props> = ({
  data,
  onRegenerate,
  isRegenerating,
  onCopy,
}) => {
  const [copied, setCopied] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(false);
  const [promptText, setPromptText] = useState('');

  const revenueStreams = data.revenueStreams ?? [];
  const unitEconomics = data.unitEconomicsHypothesis ?? {
    estimatedCAC: 'N/A',
    estimatedLTV: 'N/A',
    targetPaybackPeriod: 'N/A',
    assumptionsDisclaimer: '',
  };

  const handleCopy = () => {
    const text = `BUSINESS MODEL & REVENUE STREAMS\nType: ${data.primaryModelType}\n\nStreams:\n${revenueStreams
      .map(
        (s) =>
          `- ${s.streamName} (${s.targetContribution}): ${s.pricingStructure}\n  Rationale: ${s.rationale}`
      )
      .join('\n')}\n\nUnit Economics:\nCAC: ${unitEconomics.estimatedCAC}\nLTV: ${unitEconomics.estimatedLTV}\nPayback: ${unitEconomics.targetPaybackPeriod}`;
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
    <div id="section-businessModel" className="p-6 rounded-2xl border border-[rgba(148,163,184,0.16)] bg-[#141B2D] space-y-6 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(148,163,184,0.16)] pb-4">
        <div>
          <span className="text-xs font-mono font-semibold text-[#34D399] uppercase tracking-wider">
            Section F · Monetization Mechanics
          </span>
          <h2 className="text-xl font-bold text-[#F1F5F9] mt-0.5">Business Model & Revenue Streams</h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">Pricing tiers, contribution mix, and unit economics hypotheses</p>
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
          <label htmlFor="regen-prompt-biz" className="block text-xs font-medium text-[#34D399]">
            Customize regeneration prompt for Business Model (optional):
          </label>
          <div className="flex gap-2">
            <input
              id="regen-prompt-biz"
              type="text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="e.g. Include a high-margin enterprise compliance add-on module..."
              className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[rgba(148,163,184,0.16)] bg-[#080B14] text-[#F1F5F9] placeholder:text-[#94A3B8]/60 focus:outline-none focus:border-[#34D399]"
            />
            <button
              type="button"
              onClick={submitRegeneration}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#34D399] to-[#7C3AED] hover:brightness-110 rounded-lg"
            >
              Run
            </button>
          </div>
        </div>
      )}

      {/* Model Type */}
      <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider block">
            Primary Monetization Structure
          </span>
          <span className="text-sm font-bold text-[#F1F5F9] mt-0.5 block">{data.primaryModelType}</span>
        </div>
      </div>

      {/* Revenue Streams Grid */}
      <div className="space-y-3">
        <span className="text-xs font-mono text-[#22D3EE] uppercase tracking-wider block">
          Revenue Stream Breakdown
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {revenueStreams.map((stream, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-2 hover:border-[#34D399]/40 transition-colors shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#F1F5F9] leading-tight">{stream.streamName}</span>
                <span className="text-[11px] font-mono font-semibold text-[#22D3EE] whitespace-nowrap">
                  {stream.targetContribution}
                </span>
              </div>
              <p className="text-xs font-mono text-[#34D399] font-medium">
                {stream.pricingStructure}
              </p>
              <p className="text-xs text-[#94A3B8] leading-relaxed border-t border-[rgba(148,163,184,0.12)] pt-2">
                {stream.rationale}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Unit Economics Hypotheses */}
      <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-3">
        <span className="text-xs font-mono text-[#34D399] uppercase tracking-wider block">
          Unit Economics & Payback Hypotheses
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 rounded-lg border border-[rgba(148,163,184,0.16)] bg-[#141B2D] space-y-1">
            <span className="text-[11px] text-[#94A3B8] font-mono">Target CAC</span>
            <p className="text-xs font-mono font-semibold text-[#F1F5F9] tabular-nums">
              {unitEconomics.estimatedCAC}
            </p>
          </div>

          <div className="p-3 rounded-lg border border-[rgba(148,163,184,0.16)] bg-[#141B2D] space-y-1">
            <span className="text-[11px] text-[#94A3B8] font-mono">Projected LTV</span>
            <p className="text-xs font-mono font-semibold text-[#F1F5F9] tabular-nums">
              {unitEconomics.estimatedLTV}
            </p>
          </div>

          <div className="p-3 rounded-lg border border-[rgba(148,163,184,0.16)] bg-[#141B2D] space-y-1">
            <span className="text-[11px] text-[#94A3B8] font-mono">CAC Payback Window</span>
            <p className="text-xs font-mono font-semibold text-[#22D3EE] tabular-nums">
              {unitEconomics.targetPaybackPeriod}
            </p>
          </div>
        </div>

        <p className="text-[11px] text-[#94A3B8] italic pt-1">
          * {unitEconomics.assumptionsDisclaimer}
        </p>
      </div>
    </div>
  );
};
