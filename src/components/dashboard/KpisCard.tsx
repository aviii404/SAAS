import React, { useState } from 'react';
import { Copy, RefreshCw, Check } from 'lucide-react';
import { KpiFramework } from '../../types/blueprint';

interface Props {
  data: KpiFramework;
  onRegenerate: (customInstruction?: string) => void;
  isRegenerating: boolean;
  onCopy: (text: string) => void;
}

export const KpisCard: React.FC<Props> = ({
  data,
  onRegenerate,
  isRegenerating,
  onCopy,
}) => {
  const [copied, setCopied] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(false);
  const [promptText, setPromptText] = useState('');

  const metrics = data.metrics ?? [];

  const handleCopy = () => {
    const text = `KEY PERFORMANCE INDICATORS (${data.framework})\n\n${metrics
      .map(
        (m) =>
          `[${m.category}] ${m.metricName}\n  30-Day: ${m.target30Days}\n  90-Day: ${m.target90Days}\n  Tool: ${m.trackingToolSuggestion}`
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
    <div id="section-kpis" className="p-6 rounded-2xl border border-[rgba(148,163,184,0.16)] bg-[#141B2D] space-y-6 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(148,163,184,0.16)] pb-4">
        <div>
          <span className="text-xs font-mono font-semibold text-[#34D399] uppercase tracking-wider">
            Section L · Performance Telemetry
          </span>
          <h2 className="text-xl font-bold text-[#F1F5F9] mt-0.5">Key Performance Indicators</h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Structured via {data.framework} with realistic 30-day and 90-day benchmarks
          </p>
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
          <label htmlFor="regen-prompt-kpi" className="block text-xs font-medium text-[#34D399]">
            Customize regeneration prompt for KPIs (optional):
          </label>
          <div className="flex gap-2">
            <input
              id="regen-prompt-kpi"
              type="text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="e.g. Focus on product-led growth viral referral loops and activation speed..."
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

      {/* KPI Table with Tabular figures */}
      <div className="overflow-x-auto rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238]">
        <table className="w-full text-left text-xs text-[#94A3B8]">
          <thead className="border-b border-[rgba(148,163,184,0.16)] bg-[#141B2D] font-mono text-[11px] text-[#94A3B8] uppercase">
            <tr>
              <th className="px-4 py-3 font-semibold text-[#F1F5F9]">Funnel Stage</th>
              <th className="px-4 py-3 font-semibold text-[#F1F5F9]">Target Metric</th>
              <th className="px-4 py-3 font-semibold text-[#22D3EE]">30-Day Benchmark</th>
              <th className="px-4 py-3 font-semibold text-[#34D399]">90-Day Benchmark</th>
              <th className="px-4 py-3 font-semibold">Recommended Tool</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(148,163,184,0.12)] tabular-nums">
            {metrics.map((kpi, idx) => (
              <tr key={idx} className="hover:bg-[#141B2D]/50 transition-colors">
                <td className="px-4 py-3 font-mono font-medium text-[#F1F5F9] whitespace-nowrap">
                  {kpi.category}
                </td>
                <td className="px-4 py-3 text-[#F1F5F9] font-medium">{kpi.metricName}</td>
                <td className="px-4 py-3 text-[#22D3EE] font-mono font-semibold">{kpi.target30Days}</td>
                <td className="px-4 py-3 text-[#34D399] font-mono font-semibold">{kpi.target90Days}</td>
                <td className="px-4 py-3 text-[#94A3B8] font-mono text-[11px]">{kpi.trackingToolSuggestion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
