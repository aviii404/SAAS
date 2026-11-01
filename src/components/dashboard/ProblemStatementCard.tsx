import React, { useState } from 'react';
import { Copy, RefreshCw, Check, AlertTriangle, Clock } from 'lucide-react';
import { ProblemStatement } from '../../types/blueprint';

interface Props {
  data: ProblemStatement;
  onRegenerate: (customInstruction?: string) => void;
  isRegenerating: boolean;
  onCopy: (text: string) => void;
}

export const ProblemStatementCard: React.FC<Props> = ({
  data,
  onRegenerate,
  isRegenerating,
  onCopy,
}) => {
  const [copied, setCopied] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(false);
  const [promptText, setPromptText] = useState('');

  const rootCauses = data.rootCauses ?? [];
  const affectedGroups = data.affectedGroups ?? [];

  const handleCopy = () => {
    const text = `PROBLEM STATEMENT\nSummary: ${data.summary}\nRoot Causes:\n${rootCauses.map((r) => `- ${r}`).join('\n')}\nAffected Groups:\n${affectedGroups.map((g) => `- ${g}`).join('\n')}\nCost of Inaction: ${data.costOfInaction}\nUrgency: ${data.urgencyFactor}`;
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
    <div id="section-problemStatement" className="p-6 rounded-2xl border border-[rgba(148,163,184,0.16)] bg-[#141B2D] space-y-5 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(148,163,184,0.16)] pb-4">
        <div>
          <span className="text-xs font-mono font-semibold text-[#EC4899] uppercase tracking-wider">
            Section B · Market Friction
          </span>
          <h2 className="text-xl font-bold text-[#F1F5F9] mt-0.5">Problem Statement</h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">Root cause breakdown, affected stakeholders, and urgency</p>
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
          <label htmlFor="regen-prompt-prob" className="block text-xs font-medium text-[#EC4899]">
            Customize regeneration prompt for Problem Statement (optional):
          </label>
          <div className="flex gap-2">
            <input
              id="regen-prompt-prob"
              type="text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="e.g. Focus on regulatory compliance costs and administrative burnout..."
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

      {/* Summary */}
      <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238]">
        <p className="text-sm text-[#F1F5F9] leading-relaxed">{data.summary}</p>
      </div>

      {/* Root causes & Affected groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Root causes */}
        <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-2.5">
          <span className="text-xs font-mono text-[#EC4899] uppercase tracking-wider block">
            Underlying Root Causes
          </span>
          <ul className="space-y-2 text-xs text-[#F1F5F9]">
            {rootCauses.map((cause, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#EC4899] font-mono font-semibold shrink-0 mt-0.5">
                  {(idx + 1).toString().padStart(2, '0')}.
                </span>
                <span className="leading-relaxed text-[#94A3B8]">{cause}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Affected groups */}
        <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-2.5">
          <span className="text-xs font-mono text-[#22D3EE] uppercase tracking-wider block">
            Directly Impacted Stakeholders
          </span>
          <ul className="space-y-2 text-xs text-[#F1F5F9]">
            {affectedGroups.map((group, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#22D3EE] font-mono shrink-0 mt-0.5">·</span>
                <span className="leading-relaxed text-[#94A3B8]">{group}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Cost of Inaction & Urgency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#EC4899] uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Cost of Inaction</span>
          </div>
          <p className="text-xs text-[#94A3B8] leading-relaxed pt-1">
            {data.costOfInaction}
          </p>
        </div>

        <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#22D3EE] uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Urgency Trigger (Why Act Now)</span>
          </div>
          <p className="text-xs text-[#94A3B8] leading-relaxed pt-1">
            {data.urgencyFactor}
          </p>
        </div>
      </div>
    </div>
  );
};
