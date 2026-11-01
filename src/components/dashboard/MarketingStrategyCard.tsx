import React, { useState } from 'react';
import { Copy, RefreshCw, Check, Users, Share2 } from 'lucide-react';
import { MarketingStrategy } from '../../types/blueprint';

interface Props {
  data: MarketingStrategy;
  onRegenerate: (customInstruction?: string) => void;
  isRegenerating: boolean;
  onCopy: (text: string) => void;
}

export const MarketingStrategyCard: React.FC<Props> = ({
  data,
  onRegenerate,
  isRegenerating,
  onCopy,
}) => {
  const [copied, setCopied] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(false);
  const [promptText, setPromptText] = useState('');

  const primaryChannels = data.primaryChannels ?? [];

  const handleCopy = () => {
    const text = `MARKETING & GTM STRATEGY\nInitial 100 Customers: ${data.initial100CustomersTactic}\n\nChannels:\n${primaryChannels
      .map((c) => `- ${c.channel} (${c.costLevel} | ${c.expectedTimeline}): ${c.tactics}`)
      .join('\n')}\n\nFlywheel: ${data.contentAndViralityFlywheel}`;
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
    <div id="section-marketingStrategy" className="p-6 rounded-2xl border border-[rgba(148,163,184,0.16)] bg-[#141B2D] space-y-6 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(148,163,184,0.16)] pb-4">
        <div>
          <span className="text-xs font-mono font-semibold text-[#EC4899] uppercase tracking-wider">
            Section I · Go-To-Market
          </span>
          <h2 className="text-xl font-bold text-[#F1F5F9] mt-0.5">Marketing & Acquisition Strategy</h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">Founder-led zero-to-one playbook, acquisition channels, and virality</p>
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
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#EC4899] hover:text-white bg-[#EC4899]/15 hover:bg-[#EC4899]/30 border border-[#EC4899]/30 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{isRegenerating ? 'Regenerating...' : 'Regenerate'}</span>
          </button>
        </div>
      </div>

      {showPromptInput && (
        <div className="p-3 rounded-xl border border-[#EC4899]/30 bg-[#1A2238] space-y-2">
          <label htmlFor="regen-prompt-mktg" className="block text-xs font-medium text-[#EC4899]">
            Customize regeneration prompt for Marketing Strategy (optional):
          </label>
          <div className="flex gap-2">
            <input
              id="regen-prompt-mktg"
              type="text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="e.g. Focus on organic campus ambassador programs and student Reddit groups..."
              className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[rgba(148,163,184,0.16)] bg-[#080B14] text-[#F1F5F9] placeholder:text-[#94A3B8]/60 focus:outline-none focus:border-[#EC4899]"
            />
            <button
              type="button"
              onClick={submitRegeneration}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#EC4899] to-[#7C3AED] hover:brightness-110 rounded-lg"
            >
              Run
            </button>
          </div>
        </div>
      )}

      {/* Initial 100 Customers Playbook */}
      <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-mono text-[#EC4899] uppercase tracking-wider">
          <Users className="w-3.5 h-3.5 text-[#EC4899]" />
          <span>The First 100 Customers Playbook (Founder-Led)</span>
        </div>
        <p className="text-xs text-[#F1F5F9] leading-relaxed pt-1">
          {data.initial100CustomersTactic}
        </p>
      </div>

      {/* Primary Channels */}
      <div className="space-y-3">
        <span className="text-xs font-mono text-[#22D3EE] uppercase tracking-wider block">
          Core Acquisition Channels
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {primaryChannels.map((ch, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-2 hover:border-[#EC4899]/40 transition-colors shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#F1F5F9]">{ch.channel}</span>
                <span className="text-[11px] font-mono text-[#22D3EE]">{ch.costLevel}</span>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{ch.tactics}</p>
              <p className="text-[11px] font-mono text-[#94A3B8]/80 border-t border-[rgba(148,163,184,0.12)] pt-2">
                Timeline: {ch.expectedTimeline}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Content & Virality Flywheel */}
      <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8B5CF6] uppercase tracking-wider">
          <Share2 className="w-3.5 h-3.5 text-[#8B5CF6]" />
          <span>Organic Flywheel & Content Strategy</span>
        </div>
        <p className="text-xs text-[#94A3B8] leading-relaxed">
          {data.contentAndViralityFlywheel}
        </p>
      </div>
    </div>
  );
};
