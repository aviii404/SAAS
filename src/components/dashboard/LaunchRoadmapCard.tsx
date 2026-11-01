import React, { useState } from 'react';
import { Copy, RefreshCw, Check, Calendar, CheckSquare, Square } from 'lucide-react';
import { LaunchRoadmap } from '../../types/blueprint';

interface Props {
  data: LaunchRoadmap;
  onRegenerate: (customInstruction?: string) => void;
  isRegenerating: boolean;
  onCopy: (text: string) => void;
}

export const LaunchRoadmapCard: React.FC<Props> = ({
  data,
  onRegenerate,
  isRegenerating,
  onCopy,
}) => {
  const [copied, setCopied] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(false);
  const [promptText, setPromptText] = useState('');
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>({});

  const week1 = data.week1 ?? { focus: '', deliverables: [] };
  const week2 = data.week2 ?? { focus: '', deliverables: [] };
  const week3 = data.week3 ?? { focus: '', deliverables: [] };
  const week4 = data.week4 ?? { focus: '', deliverables: [] };

  const handleCopy = () => {
    const text = `30-DAY LAUNCH ROADMAP\n\nWeek 1 (${week1.focus}):\n${(week1.deliverables ?? []).map((d) => `- ${d}`).join('\n')}\n\nWeek 2 (${week2.focus}):\n${(week2.deliverables ?? []).map((d) => `- ${d}`).join('\n')}\n\nWeek 3 (${week3.focus}):\n${(week3.deliverables ?? []).map((d) => `- ${d}`).join('\n')}\n\nWeek 4 (${week4.focus}):\n${(week4.deliverables ?? []).map((d) => `- ${d}`).join('\n')}`;
    onCopy(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submitRegeneration = () => {
    onRegenerate(promptText.trim() || undefined);
    setShowPromptInput(false);
    setPromptText('');
  };

  const toggleMilestone = (key: string) => {
    setCompletedMilestones((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const weeks = [
    { num: 1, title: 'Week 1', plan: week1, color: 'text-[#22D3EE]', border: 'border-[#22D3EE]/30' },
    { num: 2, title: 'Week 2', plan: week2, color: 'text-[#8B5CF6]', border: 'border-[#8B5CF6]/30' },
    { num: 3, title: 'Week 3', plan: week3, color: 'text-[#EC4899]', border: 'border-[#EC4899]/30' },
    { num: 4, title: 'Week 4', plan: week4, color: 'text-[#34D399]', border: 'border-[#34D399]/30' },
  ];

  return (
    <div id="section-launchRoadmap" className="p-6 rounded-2xl border border-[rgba(148,163,184,0.16)] bg-[#141B2D] space-y-6 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(148,163,184,0.16)] pb-4">
        <div>
          <span className="text-xs font-mono font-semibold text-[#22D3EE] uppercase tracking-wider">
            Section K · 30-Day Execution Plan
          </span>
          <h2 className="text-xl font-bold text-[#F1F5F9] mt-0.5">30-Day Launch Roadmap</h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">Sequential weekly sprint milestones from customer discovery to live pilot deployment</p>
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
          <label htmlFor="regen-prompt-road" className="block text-xs font-medium text-[#22D3EE]">
            Customize regeneration prompt for Launch Roadmap (optional):
          </label>
          <div className="flex gap-2">
            <input
              id="regen-prompt-road"
              type="text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="e.g. Gear week 3 towards no-code prototype tools instead of custom backend code..."
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

      {/* 4-Week Sprint Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {weeks.map((w) => {
          const deliverables = w.plan?.deliverables ?? [];
          return (
            <div
              key={w.num}
              className={`p-4 rounded-xl border ${w.border} bg-[#1A2238] space-y-3 flex flex-col justify-between shadow-sm`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold ${w.color}`}>{w.title}</span>
                  <Calendar className="w-3.5 h-3.5 text-[#94A3B8]" />
                </div>
                <h3 className="text-xs font-bold text-[#F1F5F9] leading-snug">{w.plan?.focus}</h3>
              </div>

              <div className="space-y-2 pt-2 border-t border-[rgba(148,163,184,0.12)]">
                <span className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider block">
                  Deliverables & Milestones
                </span>
                <ul className="space-y-1.5 text-xs text-[#94A3B8]">
                  {deliverables.map((deliv, dIdx) => {
                    const mKey = `w${w.num}-d${dIdx}`;
                    const isChecked = !!completedMilestones[mKey];
                    return (
                      <li key={dIdx}>
                        <button
                          type="button"
                          onClick={() => toggleMilestone(mKey)}
                          className="w-full flex items-start gap-2 text-left cursor-pointer group select-none"
                          aria-pressed={isChecked}
                        >
                          <span className="mt-0.5 text-[#94A3B8] group-hover:text-[#22D3EE] transition-colors shrink-0">
                            {isChecked ? (
                              <CheckSquare className="w-3.5 h-3.5 text-[#34D399]" />
                            ) : (
                              <Square className="w-3.5 h-3.5" />
                            )}
                          </span>
                          <span
                            className={`text-xs leading-snug transition-all ${
                              isChecked ? 'line-through text-[#94A3B8]/50' : 'text-[#F1F5F9]'
                            }`}
                          >
                            {deliv}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
