import React, { useState } from 'react';
import { Copy, RefreshCw, Check, Code2, Database, Cpu, Cloud, Server } from 'lucide-react';
import { TechStack } from '../../types/blueprint';

interface Props {
  data: TechStack;
  onRegenerate: (customInstruction?: string) => void;
  isRegenerating: boolean;
  onCopy: (text: string) => void;
}

export const TechStackCard: React.FC<Props> = ({
  data,
  onRegenerate,
  isRegenerating,
  onCopy,
}) => {
  const [copied, setCopied] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(false);
  const [promptText, setPromptText] = useState('');

  const frontend = data.frontend ?? { choices: [], justification: '' };
  const backend = data.backend ?? { choices: [], justification: '' };
  const database = data.database ?? { choices: [], justification: '' };
  const aiTools = data.aiTools ?? { choices: [], justification: '' };
  const infrastructure = data.infrastructure ?? { choices: [], justification: '' };

  const handleCopy = () => {
    const text = `TECHNOLOGY STACK SUGGESTIONS\nFrontend: ${(frontend.choices ?? []).join(', ')} (${frontend.justification})\nBackend: ${(backend.choices ?? []).join(', ')} (${backend.justification})\nDatabase: ${(database.choices ?? []).join(', ')} (${database.justification})\nAI / ML: ${(aiTools.choices ?? []).join(', ')} (${aiTools.justification})\nInfra: ${(infrastructure.choices ?? []).join(', ')} (${infrastructure.justification})\nMonthly Cost: ${data.monthlyCostEstimateInitial}`;
    onCopy(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submitRegeneration = () => {
    onRegenerate(promptText.trim() || undefined);
    setShowPromptInput(false);
    setPromptText('');
  };

  const stackRows = [
    { label: 'Frontend Client', icon: Code2, data: frontend, color: 'text-[#22D3EE]' },
    { label: 'Backend API & Logic', icon: Server, data: backend, color: 'text-[#8B5CF6]' },
    { label: 'Database & Storage', icon: Database, data: database, color: 'text-[#34D399]' },
    { label: 'AI Inference & Orchestration', icon: Cpu, data: aiTools, color: 'text-[#EC4899]' },
    { label: 'Cloud Hosting & CI/CD', icon: Cloud, data: infrastructure, color: 'text-[#22D3EE]' },
  ];

  return (
    <div id="section-techStack" className="p-6 rounded-2xl border border-[rgba(148,163,184,0.16)] bg-[#141B2D] space-y-6 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(148,163,184,0.16)] pb-4">
        <div>
          <span className="text-xs font-mono font-semibold text-[#8B5CF6] uppercase tracking-wider">
            Section H · System Architecture
          </span>
          <h2 className="text-xl font-bold text-[#F1F5F9] mt-0.5">Technology Stack Suggestions</h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">Optimized for velocity, low operational overhead, and developer ergonomics</p>
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
          <label htmlFor="regen-prompt-tech" className="block text-xs font-medium text-[#8B5CF6]">
            Customize regeneration prompt for Tech Stack (optional):
          </label>
          <div className="flex gap-2">
            <input
              id="regen-prompt-tech"
              type="text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="e.g. Optimize strictly for low-cost serverless Edge deployment with PostgreSQL..."
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

      {/* Monthly infrastructure estimate banner */}
      <div className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-xs text-[#94A3B8] font-medium">Estimated Monthly Cloud Cost for First 1,000 Active Users:</span>
        <span className="text-xs font-mono font-bold text-[#22D3EE] tabular-nums">
          {data.monthlyCostEstimateInitial}
        </span>
      </div>

      {/* Tech Stack Layers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stackRows.map((layer, idx) => {
          const Icon = layer.icon;
          const choices = layer.data?.choices ?? [];

          return (
            <div
              key={idx}
              className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#1A2238] space-y-2 hover:border-[#8B5CF6]/40 transition-colors shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${layer.color}`} />
                <span className="text-xs font-mono font-semibold text-[#F1F5F9]">{layer.label}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                {choices.map((choice, cIdx) => (
                  <span key={cIdx} className="px-2 py-0.5 rounded bg-[#141B2D] border border-[rgba(148,163,184,0.16)] text-[#22D3EE]">
                    {choice}
                  </span>
                ))}
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed pt-1">
                {layer.data?.justification}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
