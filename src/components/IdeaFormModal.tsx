import React, { useState } from 'react';
import { X, Sparkles, Wand2, Lightbulb, AlertCircle } from 'lucide-react';
import { IdeaInput } from '../types/blueprint';
import { STARTER_PRESETS } from '../data/starterIdeas';

interface IdeaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IdeaInput) => void;
  initialValues?: Partial<IdeaInput>;
  isLoading: boolean;
}

const INDUSTRY_OPTIONS = [
  'B2B SaaS & Enterprise Tools',
  'EdTech & Learning Platforms',
  'FoodTech, Culinary & Hospitality',
  'FinTech & Freelance Economy',
  'HealthTech & Wellness',
  'ClimateTech, Energy & Sustainability',
  'E-Commerce & DTC Brands',
  'Consumer AI & Creator Tools',
  'GovTech & Civic Infrastructure',
  'Local Services & Micro-Enterprise',
  'Other / Emerging Sector',
];

const BUDGET_OPTIONS = [
  'Under $1,000 (Bootstrap / Student Budget)',
  '$1,000 - $5,000 (Micro-Grants / Savings)',
  '$5,000 - $15,000 (Early Angel / Competitions)',
  '$15,000 - $50,000 (Pre-Seed Accelerator)',
  '$50,000+ (Institutional Seed / Syndicate)',
];

const STAGE_OPTIONS = [
  'Raw Idea / Concept Spark',
  'Customer Problem Interviews Conducted',
  'Figma / Wireframe Prototype Ready',
  'Pre-Revenue with Active Alpha Users',
  'Early Paying Customers / Micro-Revenue',
];

export const IdeaFormModal: React.FC<IdeaFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  isLoading,
}) => {
  const [idea, setIdea] = useState(initialValues?.idea || '');
  const [industry, setIndustry] = useState(initialValues?.industry || INDUSTRY_OPTIONS[0]);
  const [targetMarket, setTargetMarket] = useState(initialValues?.targetMarket || 'North America & Remote English');
  const [targetCustomer, setTargetCustomer] = useState(initialValues?.targetCustomer || '');
  const [budget, setBudget] = useState(initialValues?.budget || BUDGET_OPTIONS[0]);
  const [stage, setStage] = useState(initialValues?.stage || STAGE_OPTIONS[0]);
  const [additionalNotes, setAdditionalNotes] = useState(initialValues?.additionalNotes || '');
  const [validationError, setValidationError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePresetSelect = (presetId: string) => {
    const found = STARTER_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setIdea(found.data.idea);
      setIndustry(found.data.industry);
      setTargetMarket(found.data.targetMarket);
      setTargetCustomer(found.data.targetCustomer);
      setBudget(found.data.budget);
      setStage(found.data.stage);
      setAdditionalNotes(found.data.additionalNotes || '');
      setValidationError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim() || idea.trim().length < 10) {
      setValidationError('Please describe your business idea with at least 10 characters.');
      return;
    }
    if (!targetCustomer.trim()) {
      setValidationError('Please specify who your intended customer group is.');
      return;
    }
    setValidationError(null);
    onSubmit({
      idea: idea.trim(),
      industry,
      targetMarket: targetMarket.trim(),
      targetCustomer: targetCustomer.trim(),
      budget,
      stage,
      additionalNotes: additionalNotes.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#080B14]/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#141B2D] border border-[rgba(148,163,184,0.16)] rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(148,163,184,0.16)] bg-[#0D1224]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7C3AED] via-[#8B5CF6] to-[#22D3EE] flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#F1F5F9]">Create Startup Blueprint</h2>
              <p className="text-xs text-[#94A3B8]">Powered by Gemini 3.8 Architecture Engine</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1A2238] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset suggestions bar */}
        <div className="px-6 py-3 border-b border-[rgba(148,163,184,0.16)] bg-[#1A2238]/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#F1F5F9] flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-[#22D3EE]" />
              Quick Inspiration Presets (1-Click Fill):
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {STARTER_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetSelect(preset.id)}
                className="text-left p-2 rounded-lg border border-[rgba(148,163,184,0.16)] bg-[#141B2D] hover:border-[#8B5CF6]/50 hover:bg-[#1A2238] transition-all text-[11px] cursor-pointer"
              >
                <p className="font-semibold text-[#F1F5F9] truncate">{preset.title.split(':')[0]}</p>
                <p className="text-[#94A3B8] truncate">{preset.badge}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {validationError && (
            <div className="flex items-center gap-2 p-3 text-xs text-[#EC4899] bg-[#EC4899]/10 border border-[#EC4899]/30 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* 1. Business Idea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="idea-desc" className="text-xs font-semibold text-[#F1F5F9]">
                1. What is your business idea? <span className="text-[#22D3EE]">*</span>
              </label>
              <span className="text-[11px] text-[#94A3B8]">{idea.length} chars</span>
            </div>
            <textarea
              id="idea-desc"
              rows={3}
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g. An AI-powered kitchen inventory forecasting app for university dining halls that predicts student meal counts based on weather and campus events to cut food waste by 18%..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#080B14] text-[#F1F5F9] placeholder:text-[#94A3B8]/60 text-xs focus:outline-none focus:border-[#8B5CF6] transition-all"
              required
            />
            <p className="text-[11px] text-[#94A3B8] mt-1">
              Be as specific or rough as you like. Mention the core problem, who you help, and your hunch on the mechanism.
            </p>
          </div>

          {/* 2-col inputs: Industry & Target Customer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="industry-select" className="block text-xs font-semibold text-[#F1F5F9] mb-1.5">
                2. Industry / Sector
              </label>
              <select
                id="industry-select"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#080B14] text-[#F1F5F9] text-xs focus:outline-none focus:border-[#8B5CF6]"
              >
                {INDUSTRY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#141B2D] text-[#F1F5F9]">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="target-customer" className="block text-xs font-semibold text-[#F1F5F9] mb-1.5">
                3. Intended Customer Group <span className="text-[#22D3EE]">*</span>
              </label>
              <input
                id="target-customer"
                type="text"
                value={targetCustomer}
                onChange={(e) => setTargetCustomer(e.target.value)}
                placeholder="e.g. Campus Executive Chefs, Freelance Designers, Solar CAD Engineers"
                className="w-full px-3 py-2 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#080B14] text-[#F1F5F9] placeholder:text-[#94A3B8]/60 text-xs focus:outline-none focus:border-[#8B5CF6]"
                required
              />
            </div>
          </div>

          {/* 2-col inputs: Target Market / Geo & Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="target-market" className="block text-xs font-semibold text-[#F1F5F9] mb-1.5">
                4. Target Location or Market
              </label>
              <input
                id="target-market"
                type="text"
                value={targetMarket}
                onChange={(e) => setTargetMarket(e.target.value)}
                placeholder="e.g. North America, Global Remote, Southeast Asia, Local City"
                className="w-full px-3 py-2 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#080B14] text-[#F1F5F9] placeholder:text-[#94A3B8]/60 text-xs focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>

            <div>
              <label htmlFor="budget-select" className="block text-xs font-semibold text-[#F1F5F9] mb-1.5">
                5. Available Budget Range
              </label>
              <select
                id="budget-select"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#080B14] text-[#F1F5F9] text-xs focus:outline-none focus:border-[#8B5CF6]"
              >
                {BUDGET_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#141B2D] text-[#F1F5F9]">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stage */}
          <div>
            <label htmlFor="stage-select" className="block text-xs font-semibold text-[#F1F5F9] mb-1.5">
              6. Current Business Stage
            </label>
            <select
              id="stage-select"
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#080B14] text-[#F1F5F9] text-xs focus:outline-none focus:border-[#8B5CF6]"
            >
              {STAGE_OPTIONS.map((opt) => (
                <option key={opt} value={opt} className="bg-[#141B2D] text-[#F1F5F9]">
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Optional context notes */}
          <div>
            <label htmlFor="notes" className="block text-xs font-semibold text-[#F1F5F9] mb-1.5">
              7. Additional Notes or Unfair Advantage (Optional)
            </label>
            <input
              id="notes"
              type="text"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="e.g. Founder has 5 years experience in commercial food prep; proprietary dataset of campus calendars"
              className="w-full px-3 py-2 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#080B14] text-[#F1F5F9] placeholder:text-[#94A3B8]/60 text-xs focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          {/* Submit CTA */}
          <div className="pt-3 border-t border-[rgba(148,163,184,0.16)] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-xs font-medium text-[#F1F5F9] hover:text-white bg-[#1A2238] hover:bg-[#0D1224] rounded-xl border border-[rgba(148,163,184,0.16)] transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#EC4899] rounded-xl hover:brightness-110 shadow-lg shadow-[#7C3AED]/25 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>{isLoading ? 'Synthesizing Blueprint...' : 'Generate Startup Blueprint'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
