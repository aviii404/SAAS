import React, { useState } from 'react';
import { Copy, RefreshCw, Check, Clock } from 'lucide-react';
import { MvpFeaturePrioritization } from '../../types/blueprint';

interface Props {
  data: MvpFeaturePrioritization;
  onRegenerate: (customInstruction?: string) => void;
  isRegenerating: boolean;
  onCopy: (text: string) => void;
}

export const MvpFeaturesCard: React.FC<Props> = ({
  data,
  onRegenerate,
  isRegenerating,
  onCopy,
}) => {
  const [copied, setCopied] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(false);
  const [promptText, setPromptText] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'must' | 'should' | 'could' | 'wont'>('all');

  const mustHave = data.mustHave ?? [];
  const shouldHave = data.shouldHave ?? [];
  const couldHave = data.couldHave ?? [];
  const wontHaveMVP = data.wontHaveMVP ?? [];

  const handleCopy = () => {
    const text = `MVP FEATURE PRIORITIZATION (MoSCoW)\nTimeline: ${data.launchTimelineEstimate}\n\nMUST HAVE:\n${mustHave
      .map((f) => `- ${f.feature} (${f.complexity}): ${f.purpose}`)
      .join('\n')}\n\nSHOULD HAVE:\n${shouldHave
      .map((f) => `- ${f.feature} (${f.complexity}): ${f.purpose}`)
      .join('\n')}\n\nCOULD HAVE:\n${couldHave
      .map((f) => `- ${f.feature} (${f.complexity}): ${f.purpose}`)
      .join('\n')}\n\nWON'T HAVE FOR MVP:\n${wontHaveMVP
      .map((f) => `- ${f.feature}: ${f.reasonToOmit}`)
      .join('\n')}`;
    onCopy(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submitRegeneration = () => {
    onRegenerate(promptText.trim() || undefined);
    setShowPromptInput(false);
    setPromptText('');
  };

  const getComplexityColor = (comp: string) => {
    if (comp === 'Low') return 'text-[#34D399] font-mono text-[11px]';
    if (comp === 'Medium') return 'text-[#22D3EE] font-mono text-[11px]';
    return 'text-[#EC4899] font-mono text-[11px]';
  };

  return (
    <div id="section-mvpFeaturePrioritization" className="p-6 rounded-2xl border border-[rgba(148,163,184,0.16)] bg-[#141B2D] space-y-6 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(148,163,184,0.16)] pb-4">
        <div>
          <span className="text-xs font-mono font-semibold text-[#22D3EE] uppercase tracking-wider">
            Section G · Product Scope & MoSCoW
          </span>
          <h2 className="text-xl font-bold text-[#F1F5F9] mt-0.5">MVP Feature Prioritization</h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">Scoping essentials vs. deferred features to prevent initial over-engineering</p>
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
          <label htmlFor="regen-prompt-mvp" className="block text-xs font-medium text-[#22D3EE]">
            Customize regeneration prompt for MVP Features (optional):
          </label>
          <div className="flex gap-2">
            <input
              id="regen-prompt-mvp"
              type="text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="e.g. Cut MVP scope strictly to a single core workflow executable in 2 weeks..."
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

      {/* Timeline banner */}
      <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#22D3EE] shrink-0" />
          <span className="text-xs text-[#94A3B8]">Estimated Target MVP Launch Window:</span>
        </div>
        <span className="text-xs font-mono font-bold text-[#F1F5F9] whitespace-nowrap">
          {data.launchTimelineEstimate}
        </span>
      </div>

      {/* Interactive Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#080B14] rounded-xl border border-[rgba(148,163,184,0.16)]">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            activeTab === 'all' ? 'bg-[#1A2238] text-[#F1F5F9] shadow-sm' : 'text-[#94A3B8] hover:text-[#F1F5F9]'
          }`}
        >
          All Categories
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('must')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            activeTab === 'must' ? 'bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/40' : 'text-[#94A3B8] hover:text-[#F1F5F9]'
          }`}
        >
          Must-Have ({mustHave.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('should')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            activeTab === 'should' ? 'bg-[#22D3EE]/20 text-[#22D3EE] border border-[#22D3EE]/40' : 'text-[#94A3B8] hover:text-[#F1F5F9]'
          }`}
        >
          Should-Have ({shouldHave.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('could')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            activeTab === 'could' ? 'bg-[#7C3AED]/20 text-[#8B5CF6] border border-[#8B5CF6]/40' : 'text-[#94A3B8] hover:text-[#F1F5F9]'
          }`}
        >
          Could-Have ({couldHave.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('wont')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            activeTab === 'wont' ? 'bg-[#EC4899]/20 text-[#EC4899] border border-[#EC4899]/40' : 'text-[#94A3B8] hover:text-[#F1F5F9]'
          }`}
        >
          Won't-Have MVP ({wontHaveMVP.length})
        </button>
      </div>

      {/* Feature Groups */}
      <div className="space-y-4">
        {/* Must Have */}
        {(activeTab === 'all' || activeTab === 'must') && (
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold text-[#34D399] uppercase tracking-wider block">
              Must-Have Features (Non-Negotiable Core)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {mustHave.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-1.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#F1F5F9]">{item.feature}</span>
                    <span className={getComplexityColor(item.complexity)}>{item.complexity} Dev</span>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{item.purpose}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Should Have */}
        {(activeTab === 'all' || activeTab === 'should') && (
          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono font-semibold text-[#22D3EE] uppercase tracking-wider block">
              Should-Have Features (High Impact Follow-ups)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {shouldHave.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-1.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#F1F5F9]">{item.feature}</span>
                    <span className={getComplexityColor(item.complexity)}>{item.complexity} Dev</span>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{item.purpose}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Could Have */}
        {(activeTab === 'all' || activeTab === 'could') && (
          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono font-semibold text-[#8B5CF6] uppercase tracking-wider block">
              Could-Have Features (Delight & Retention Add-ons)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {couldHave.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-1.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#F1F5F9]">{item.feature}</span>
                    <span className={getComplexityColor(item.complexity)}>{item.complexity} Dev</span>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{item.purpose}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Won't Have for MVP */}
        {(activeTab === 'all' || activeTab === 'wont') && (
          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono font-semibold text-[#EC4899] uppercase tracking-wider block">
              Explicitly Omitted from MVP (Scope Defense)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {wontHaveMVP.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-1 shadow-sm">
                  <span className="text-xs font-bold text-[#F1F5F9] block">{item.feature}</span>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    <span className="text-[#EC4899] font-medium">Why deferred: </span>
                    {item.reasonToOmit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
