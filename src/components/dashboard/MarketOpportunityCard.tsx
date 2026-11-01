import React, { useState } from 'react';
import { Copy, RefreshCw, Check, TrendingUp, HelpCircle } from 'lucide-react';
import { MarketOpportunity } from '../../types/blueprint';

interface Props {
  data: MarketOpportunity;
  onRegenerate: (customInstruction?: string) => void;
  isRegenerating: boolean;
  onCopy: (text: string) => void;
}

export const MarketOpportunityCard: React.FC<Props> = ({
  data,
  onRegenerate,
  isRegenerating,
  onCopy,
}) => {
  const [copied, setCopied] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(false);
  const [promptText, setPromptText] = useState('');

  const trends = data.industryTrends ?? [];
  const competitors = data.competitorLandscape ?? [];
  const questions = data.validationInterviewQuestions ?? [];
  const tamSamSom = data.tamSamSomAnalysis ?? { tam: 'N/A', sam: 'N/A', som: 'N/A', assumptionsNote: '' };

  const handleCopy = () => {
    const text = `MARKET OPPORTUNITY & RESEARCH\nTAM: ${tamSamSom.tam}\nSAM: ${tamSamSom.sam}\nSOM: ${tamSamSom.som}\n\nTrends:\n${trends.map((t) => `- ${t}`).join('\n')}\n\nCompetitors:\n${competitors.map((c) => `- ${c.competitorType} (${c.typicalPlayers}): ${c.ourAdvantage}`).join('\n')}\n\nValidation Questions:\n${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}`;
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
    <div id="section-marketOpportunity" className="p-6 rounded-2xl border border-[rgba(148,163,184,0.16)] bg-[#141B2D] space-y-6 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(148,163,184,0.16)] pb-4">
        <div>
          <span className="text-xs font-mono font-semibold text-[#22D3EE] uppercase tracking-wider">
            Section E · Market Sizing & Competitive Research
          </span>
          <h2 className="text-xl font-bold text-[#F1F5F9] mt-0.5">Market Opportunity & Validation</h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">TAM/SAM/SOM hypotheses, incumbent alternatives, and customer interview questions</p>
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
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#22D3EE] hover:text-white bg-[#22D3EE]/15 hover:bg-[#22D3EE]/30 border border-[#22D3EE]/30 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{isRegenerating ? 'Regenerating...' : 'Regenerate'}</span>
          </button>
        </div>
      </div>

      {showPromptInput && (
        <div className="p-3 rounded-xl border border-[#22D3EE]/30 bg-[#1A2238] space-y-2">
          <label htmlFor="regen-prompt-mkt" className="block text-xs font-medium text-[#22D3EE]">
            Customize regeneration prompt for Market Opportunity (optional):
          </label>
          <div className="flex gap-2">
            <input
              id="regen-prompt-mkt"
              type="text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="e.g. Dig deeper into legacy spreadsheet alternatives and DIY workarounds..."
              className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[rgba(148,163,184,0.16)] bg-[#080B14] text-[#F1F5F9] placeholder:text-[#94A3B8]/60 focus:outline-none focus:border-[#22D3EE]"
            />
            <button
              type="button"
              onClick={submitRegeneration}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#22D3EE] to-[#7C3AED] hover:brightness-110 rounded-lg"
            >
              Run
            </button>
          </div>
        </div>
      )}

      {/* TAM / SAM / SOM 3-Card Strip */}
      <div className="space-y-2">
        <span className="text-xs font-mono text-[#22D3EE] uppercase tracking-wider block">
          Market Sizing Framework (Working Hypotheses)
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-1">
            <span className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider">
              TAM · Total Addressable
            </span>
            <p className="text-sm font-semibold text-[#F1F5F9]">{tamSamSom.tam}</p>
          </div>

          <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-1">
            <span className="text-[11px] font-mono text-[#22D3EE] uppercase tracking-wider">
              SAM · Serviceable Addressable
            </span>
            <p className="text-sm font-semibold text-[#F1F5F9]">{tamSamSom.sam}</p>
          </div>

          <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-1">
            <span className="text-[11px] font-mono text-[#8B5CF6] uppercase tracking-wider">
              SOM · 18-Month Beachhead Target
            </span>
            <p className="text-sm font-semibold text-[#F1F5F9]">{tamSamSom.som}</p>
          </div>
        </div>

        <p className="text-[11px] text-[#94A3B8] italic pt-1">
          * {tamSamSom.assumptionsNote}
        </p>
      </div>

      {/* Industry Trends */}
      <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-2">
        <span className="text-xs font-mono text-[#22D3EE] uppercase tracking-wider flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-[#22D3EE]" />
          Industry Macro Tailwinds & Trends
        </span>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-[#94A3B8]">
          {trends.map((trend, idx) => (
            <li key={idx} className="p-3 rounded-lg border border-[rgba(148,163,184,0.16)] bg-[#141B2D] leading-relaxed">
              <span className="text-[#22D3EE] font-mono block mb-1">0{idx + 1}.</span>
              <span className="text-[#F1F5F9]">{trend}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Competitor Differentiation Matrix Table */}
      <div className="space-y-2.5">
        <span className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider block">
          Competitive Alternatives & Strategic Wedge
        </span>
        <div className="overflow-x-auto rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238]">
          <table className="w-full text-left text-xs text-[#94A3B8]">
            <thead className="border-b border-[rgba(148,163,184,0.16)] bg-[#141B2D] font-mono text-[11px] text-[#94A3B8] uppercase">
              <tr>
                <th className="px-4 py-3 font-semibold text-[#F1F5F9]">Competitor Category</th>
                <th className="px-4 py-3 font-semibold">Typical Incumbents</th>
                <th className="px-4 py-3 font-semibold text-[#EC4899]">Key Shortcomings</th>
                <th className="px-4 py-3 font-semibold text-[#34D399]">Our Strategic Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(148,163,184,0.12)]">
              {competitors.map((comp, idx) => (
                <tr key={idx} className="hover:bg-[#141B2D]/60 transition-colors">
                  <td className="px-4 py-3 font-medium text-[#F1F5F9] whitespace-nowrap">{comp.competitorType}</td>
                  <td className="px-4 py-3 text-[#94A3B8]">{comp.typicalPlayers}</td>
                  <td className="px-4 py-3 text-[#EC4899]/90">{comp.theirShortcomings}</td>
                  <td className="px-4 py-3 text-[#34D399] font-medium">{comp.ourAdvantage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Validation Interview Questions */}
      <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-mono text-[#8B5CF6] uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5 text-[#8B5CF6]" />
          <span>Customer Discovery Interview Questions (Unbiased Testing)</span>
        </div>
        <p className="text-[11px] text-[#94A3B8]">
          Ask these questions during primary discovery calls without pitching your solution to reveal genuine friction.
        </p>
        <div className="space-y-2 pt-1 text-xs text-[#F1F5F9]">
          {questions.map((q, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#141B2D] border border-[rgba(148,163,184,0.16)]">
              <span className="font-mono text-[#8B5CF6] font-semibold shrink-0">Q{idx + 1}.</span>
              <span className="leading-relaxed text-[#94A3B8]">{q}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
