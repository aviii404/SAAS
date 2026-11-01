import React, { useState } from 'react';
import { Copy, RefreshCw, Check, FlaskConical } from 'lucide-react';
import { RiskAnalysis } from '../../types/blueprint';

interface Props {
  data: RiskAnalysis;
  onRegenerate: (customInstruction?: string) => void;
  isRegenerating: boolean;
  onCopy: (text: string) => void;
}

export const RiskAnalysisCard: React.FC<Props> = ({
  data,
  onRegenerate,
  isRegenerating,
  onCopy,
}) => {
  const [copied, setCopied] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(false);
  const [promptText, setPromptText] = useState('');

  const risks = data.risks ?? [];
  const validationExperiments = data.validationExperiments ?? [];

  const handleCopy = () => {
    const text = `RISK ANALYSIS & RAPID EXPERIMENTS\n\nRisks:\n${risks
      .map((r) => `- [${r.category} | ${r.severity}] ${r.description}\n  Mitigation: ${r.mitigationPlan}`)
      .join('\n\n')}\n\nValidation Experiments:\n${validationExperiments
      .map(
        (e) =>
          `- ${e.experimentName} (Budget: ${e.budgetRequired})\n  Hypothesis: ${e.hypothesis}\n  Method: ${e.method}\n  Metric: ${e.successMetric}`
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

  const getSeverityStyle = (severity: string) => {
    if (severity === 'High') return 'text-[#EC4899] font-mono text-[11px] font-semibold';
    if (severity === 'Medium') return 'text-[#22D3EE] font-mono text-[11px] font-semibold';
    return 'text-[#34D399] font-mono text-[11px] font-semibold';
  };

  return (
    <div id="section-riskAnalysis" className="p-6 rounded-2xl border border-[rgba(148,163,184,0.16)] bg-[#141B2D] space-y-6 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(148,163,184,0.16)] pb-4">
        <div>
          <span className="text-xs font-mono font-semibold text-[#EC4899] uppercase tracking-wider">
            Section J · Risk Mitigation & De-risking
          </span>
          <h2 className="text-xl font-bold text-[#F1F5F9] mt-0.5">Risk Analysis & Validation Experiments</h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">Top venture hurdles paired with low-cost rapid tests ($0-$100) before writing code</p>
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
          <label htmlFor="regen-prompt-risk" className="block text-xs font-medium text-[#EC4899]">
            Customize regeneration prompt for Risk Analysis (optional):
          </label>
          <div className="flex gap-2">
            <input
              id="regen-prompt-risk"
              type="text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="e.g. Focus on regulatory data privacy laws and enterprise security hurdles..."
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

      {/* Critical Risks Grid */}
      <div className="space-y-3">
        <span className="text-xs font-mono text-[#EC4899] uppercase tracking-wider block">
          Key Venture Risks & Actionable Mitigations
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {risks.map((risk, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-2 hover:border-[#EC4899]/40 transition-colors shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-[#F1F5F9]">{risk.category}</span>
                <span className={getSeverityStyle(risk.severity)}>{risk.severity} Severity</span>
              </div>
              <p className="text-xs text-[#F1F5F9] leading-relaxed font-medium">{risk.description}</p>
              <div className="border-t border-[rgba(148,163,184,0.12)] pt-2">
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  <span className="text-[#22D3EE] font-medium">Mitigation Plan: </span>
                  {risk.mitigationPlan}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Validation Experiments (<$100) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-[#22D3EE] uppercase tracking-wider flex items-center gap-1.5">
            <FlaskConical className="w-3.5 h-3.5 text-[#22D3EE]" />
            Rapid Validation Experiments (Budget &lt; $100)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {validationExperiments.map((exp, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-2 hover:border-[#22D3EE]/40 transition-colors shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#F1F5F9]">
                  0{idx + 1}. {exp.experimentName}
                </h4>
                <span className="text-[11px] font-mono text-[#34D399] font-semibold">
                  {exp.budgetRequired}
                </span>
              </div>
              <div className="text-xs text-[#94A3B8] space-y-1.5">
                <p>
                  <span className="text-[#F1F5F9] font-medium">Hypothesis: </span>
                  {exp.hypothesis}
                </p>
                <p>
                  <span className="text-[#F1F5F9] font-medium">Method: </span>
                  {exp.method}
                </p>
                <p>
                  <span className="text-[#22D3EE] font-medium">Success Threshold: </span>
                  {exp.successMetric}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
