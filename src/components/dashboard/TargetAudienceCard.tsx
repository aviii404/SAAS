import React, { useState } from 'react';
import { Copy, RefreshCw, Check, UserCheck, DollarSign, Radio } from 'lucide-react';
import { TargetAudience } from '../../types/blueprint';

interface Props {
  data: TargetAudience;
  onRegenerate: (customInstruction?: string) => void;
  isRegenerating: boolean;
  onCopy: (text: string) => void;
}

export const TargetAudienceCard: React.FC<Props> = ({
  data,
  onRegenerate,
  isRegenerating,
  onCopy,
}) => {
  const [copied, setCopied] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(false);
  const [promptText, setPromptText] = useState('');

  const personas = data.personas ?? [];

  const handleCopy = () => {
    const text = `TARGET AUDIENCE & PERSONAS\nSegmentation: ${data.marketSegmentation}\n\n${personas
      .map(
        (p) =>
          `PERSONA: ${p.name} (${p.role})\nDemographics: ${p.demographics}\nPain Points:\n${(p.painPoints ?? [])
            .map((pp) => `  - ${pp}`)
            .join('\n')}\nMotivations:\n${(p.motivations ?? [])
            .map((m) => `  - ${m}`)
            .join('\n')}\nWillingness to Pay: ${p.willingnessToPay}\nChannels: ${(p.preferredChannels ?? []).join(
            ', '
          )}`
      )
      .join('\n\n')}`;
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
    <div id="section-targetAudience" className="p-6 rounded-2xl border border-[rgba(148,163,184,0.16)] bg-[#141B2D] space-y-5 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(148,163,184,0.16)] pb-4">
        <div>
          <span className="text-xs font-mono font-semibold text-[#8B5CF6] uppercase tracking-wider">
            Section D · Customer Profiles
          </span>
          <h2 className="text-xl font-bold text-[#F1F5F9] mt-0.5">Target Audience & Personas</h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">Beachhead segmentation, deep psychographics, and willingness to pay</p>
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
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#8B5CF6] hover:text-white bg-[#7C3AED]/15 hover:bg-[#7C3AED]/30 border border-[#8B5CF6]/30 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{isRegenerating ? 'Regenerating...' : 'Regenerate'}</span>
          </button>
        </div>
      </div>

      {showPromptInput && (
        <div className="p-3 rounded-xl border border-[#7C3AED]/30 bg-[#1A2238] space-y-2">
          <label htmlFor="regen-prompt-aud" className="block text-xs font-medium text-[#8B5CF6]">
            Customize regeneration prompt for Audience & Personas (optional):
          </label>
          <div className="flex gap-2">
            <input
              id="regen-prompt-aud"
              type="text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="e.g. Add a persona for high-frequency freelance designers with $500 monthly budget..."
              className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[rgba(148,163,184,0.16)] bg-[#080B14] text-[#F1F5F9] placeholder:text-[#94A3B8]/60 focus:outline-none focus:border-[#8B5CF6]"
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

      {/* Segmentation Overview */}
      <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-1">
        <span className="text-xs font-mono text-[#22D3EE] uppercase tracking-wider block">
          Market Segmentation & Beachhead Strategy
        </span>
        <p className="text-xs text-[#F1F5F9] leading-relaxed">{data.marketSegmentation}</p>
      </div>

      {/* Persona Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {personas.map((persona, idx) => {
          const painPoints = persona.painPoints ?? [];
          const motivations = persona.motivations ?? [];
          const channels = persona.preferredChannels ?? [];

          return (
            <div
              key={idx}
              className="p-5 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-4 hover:border-[#8B5CF6]/40 transition-colors shadow-sm"
            >
              {/* Persona Header with Unboxed Metadata */}
              <div className="border-b border-[rgba(148,163,184,0.16)] pb-3">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#8B5CF6]" />
                  <h3 className="text-sm font-bold text-[#F1F5F9]">{persona.name}</h3>
                </div>
                <p className="text-xs font-medium text-[#22D3EE] mt-0.5">{persona.role}</p>
                <p className="text-[11px] text-[#94A3B8] mt-1 leading-snug">{persona.demographics}</p>
              </div>

              {/* Pain Points */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-[#EC4899] uppercase tracking-wider block font-semibold">
                  Daily Friction Points
                </span>
                <ul className="space-y-1 text-xs text-[#94A3B8]">
                  {painPoints.map((pain, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-1.5">
                      <span className="text-[#EC4899] shrink-0">·</span>
                      <span className="leading-snug">{pain}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Motivations */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-[#34D399] uppercase tracking-wider block font-semibold">
                  Core Motivations & Triggers
                </span>
                <ul className="space-y-1 text-xs text-[#94A3B8]">
                  {motivations.map((mot, mIdx) => (
                    <li key={mIdx} className="flex items-start gap-1.5">
                      <span className="text-[#34D399] shrink-0">·</span>
                      <span className="leading-snug">{mot}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Willingness to pay & Channels */}
              <div className="pt-2 border-t border-[rgba(148,163,184,0.16)] space-y-2 text-xs">
                <div className="flex items-start gap-1.5 text-[#94A3B8]">
                  <DollarSign className="w-3.5 h-3.5 text-[#22D3EE] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#F1F5F9]">Willingness to Pay: </span>
                    <span className="text-[#94A3B8]">{persona.willingnessToPay}</span>
                  </div>
                </div>

                <div className="flex items-start gap-1.5 text-[#94A3B8]">
                  <Radio className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#F1F5F9]">Discovery Channels: </span>
                    <span className="text-[#94A3B8]">{channels.join(' · ')}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
