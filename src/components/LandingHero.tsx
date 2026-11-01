import React from 'react';
import { ArrowRight, Compass, Layers, CheckCircle2, ShieldAlert, Sparkles, TrendingUp, Cpu, Target } from 'lucide-react';
import heroBlueprintImage from '../assets/images/ideaforge_blueprint_hero_1793552450940.jpg';

interface LandingHeroProps {
  onStartBuilding: () => void;
  onExploreSample: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartBuilding,
  onExploreSample,
}) => {
  return (
    <section id="overview" className="relative overflow-hidden pt-10 pb-20 lg:pt-14 lg:pb-28">
      {/* Refined ambient lighting gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-[#7C3AED]/15 via-[#8B5CF6]/10 to-[#22D3EE]/15 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-10 w-[400px] h-[300px] bg-[#EC4899]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Header Area */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(148,163,184,0.16)] bg-[#141B2D]/80 backdrop-blur-sm text-xs font-medium text-[#22D3EE]">
            <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span className="font-semibold">AI IdeaForge</span>
            <span aria-hidden="true" className="text-[#94A3B8]/40">·</span>
            <span className="text-[#F1F5F9]">From Idea to Impact</span>
            <span aria-hidden="true" className="text-[#94A3B8]/40">·</span>
            <span className="text-[#94A3B8] font-mono text-[11px]">Gemini 3.8 Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F1F5F9] leading-[1.12] text-balance">
            Transform rough ideas into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#22D3EE]">
              structured startup blueprints
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed text-balance">
            AI IdeaForge helps students, aspiring entrepreneurs, and small business owners pressure-test
            unrefined business ideas into a comprehensive 12-section execution blueprint with customer personas,
            MVP priorities, unit economics, and a 30-day launch roadmap.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              type="button"
              onClick={onStartBuilding}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#EC4899] rounded-xl hover:brightness-110 shadow-xl shadow-[#7C3AED]/25 transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Start Building Blueprint</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onExploreSample}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-[#F1F5F9] bg-[#141B2D] hover:bg-[#1A2238] border border-[rgba(148,163,184,0.16)] rounded-xl transition-all cursor-pointer shadow-sm hover:border-[#22D3EE]/40"
            >
              <Compass className="w-4 h-4 text-[#22D3EE]" />
              <span>Explore Sample (EcoBite Ops)</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#94A3B8] pt-2">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
              <span>12 Rigorous Dimensions</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Export Markdown, JSON & PDF</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Single-Section AI Regeneration</span>
            </div>
          </div>
        </div>

        {/* Visual Hero Showcase with Generated Blueprint Asset */}
        <div className="mt-12 lg:mt-16 relative">
          <div className="rounded-2xl border border-[rgba(148,163,184,0.16)] bg-[#141B2D]/80 p-2 sm:p-3 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#080B14] flex items-center justify-center">
              <img
                src={heroBlueprintImage}
                alt="AI IdeaForge interactive startup blueprint dashboard visualization"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.parentElement?.querySelector('.img-fallback');
                  if (fallback) (fallback as HTMLElement).style.display = 'flex';
                }}
              />
              <div className="img-fallback hidden absolute inset-0 bg-gradient-to-br from-[#080B14] via-[#141B2D] to-[#1A2238] items-center justify-center p-8 text-center">
                <div>
                  <Layers className="w-12 h-12 text-[#22D3EE] mx-auto mb-3" />
                  <p className="text-lg font-semibold text-[#F1F5F9]">From Idea to Impact</p>
                  <p className="text-xs text-[#94A3B8] mt-1 max-w-md">
                    Structured 12-dimension venture modeling powered by Gemini 3.8.
                  </p>
                </div>
              </div>

              {/* Floating feature callouts on the showcase */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md p-3.5 rounded-xl bg-[#080B14]/90 backdrop-blur-md border border-[rgba(148,163,184,0.2)] shadow-xl">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                  <p className="text-xs font-semibold text-[#22D3EE]">Venture Architecture Engine</p>
                </div>
                <p className="text-xs text-[#F1F5F9] leading-snug">
                  Customer Personas · TAM/SAM/SOM Hypotheses · MoSCoW Prioritization · 30-Day Launch Sprint
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Step Venture Acceleration Framework */}
        <div className="mt-20 lg:mt-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-semibold text-[#8B5CF6] uppercase tracking-wider">
              Execution Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F5F9] mt-1">
              How AI IdeaForge turns sparks into execution
            </h2>
            <p className="text-sm text-[#94A3B8] mt-2">
              A structured venture-building framework designed to eliminate guesswork, vanity metrics, and premature scaling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-[rgba(148,163,184,0.16)] bg-[#141B2D] backdrop-blur-sm space-y-3 hover:border-[#8B5CF6]/50 transition-all shadow-lg hover:shadow-[#7C3AED]/5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#8B5CF6]">01. ARTICULATE</span>
                <Target className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <h3 className="text-lg font-semibold text-[#F1F5F9]">Submit Core Concept & Constraints</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Provide your rough idea, industry, intended audience, target location, and early budget. No polished pitch deck required.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-[rgba(148,163,184,0.16)] bg-[#141B2D] backdrop-blur-sm space-y-3 hover:border-[#22D3EE]/50 transition-all shadow-lg hover:shadow-[#22D3EE]/5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#22D3EE]">02. SYNTHESIZE</span>
                <Cpu className="w-4 h-4 text-[#22D3EE]" />
              </div>
              <h3 className="text-lg font-semibold text-[#F1F5F9]">Gemini Architecture Engine</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Gemini structures customer personas, problem root causes, market sizing hypotheses, tech stack choices, and unit economics.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-[rgba(148,163,184,0.16)] bg-[#141B2D] backdrop-blur-sm space-y-3 hover:border-[#34D399]/50 transition-all shadow-lg hover:shadow-[#34D399]/5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#34D399]">03. EXECUTE</span>
                <TrendingUp className="w-4 h-4 text-[#34D399]" />
              </div>
              <h3 className="text-lg font-semibold text-[#F1F5F9]">Validate & 30-Day Sprint</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Follow a week-by-week sprint, rapid validation experiments under $100, and export clean documentation for your team.
              </p>
            </div>
          </div>
        </div>

        {/* The 12 Blueprint Sections Grid */}
        <div id="framework" className="mt-20 lg:mt-24 pt-8 border-t border-[rgba(148,163,184,0.16)]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-mono text-[#22D3EE] tracking-wider uppercase">Comprehensive Venture Matrix</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F1F5F9] mt-1">
                The 12 Blueprint Dimensions
              </h2>
            </div>
            <p className="text-xs text-[#94A3B8] max-w-sm">
              Every generated blueprint covers both high-level investor strategy and granular day-to-day tactical execution.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {[
              { id: 'A', name: 'Executive Summary', desc: 'Vision, pitch, strategic edge' },
              { id: 'B', name: 'Problem Statement', desc: 'Root causes & cost of inaction' },
              { id: 'C', name: 'Proposed Solution', desc: 'Mechanisms & why now' },
              { id: 'D', name: 'Audience & Personas', desc: 'Pain points & willingness to pay' },
              { id: 'E', name: 'Market Opportunity', desc: 'TAM/SAM/SOM & interview questions' },
              { id: 'F', name: 'Business Model', desc: 'Pricing tiers & unit economics' },
              { id: 'G', name: 'MVP MoSCoW Matrix', desc: 'Must-have vs. deferred features' },
              { id: 'H', name: 'Tech Stack Engine', desc: 'Frontend, DB, AI, cost estimate' },
              { id: 'I', name: 'Marketing & GTM', desc: 'First 100 users playbook' },
              { id: 'J', name: 'Risk & Experiments', desc: 'Rapid validation tests (<$100)' },
              { id: 'K', name: '30-Day Launch Sprint', desc: 'Week 1-4 milestone deliverables' },
              { id: 'L', name: 'AARRR Key Metrics', desc: '30-day and 90-day targets' },
            ].map((sec) => (
              <div
                key={sec.id}
                className="p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#141B2D] hover:bg-[#1A2238] transition-colors shadow-sm"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-xs font-bold text-[#22D3EE]">{sec.id}.</span>
                  <span className="text-xs font-semibold text-[#F1F5F9] truncate">{sec.name}</span>
                </div>
                <p className="text-[11px] text-[#94A3B8] line-clamp-1">{sec.desc}</p>
              </div>
            ))}
          </div>

          {/* Research & Ethical Verification Notice */}
          <div className="mt-8 p-4 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#141B2D] flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-[#EC4899] shrink-0 mt-0.5" />
            <div className="text-xs text-[#94A3B8] leading-relaxed">
              <span className="font-semibold text-[#F1F5F9]">Ethical AI Validation Policy: </span>
              AI IdeaForge uses Gemini to synthesize structured venture hypotheses. Market sizing (TAM/SAM/SOM),
              competitive assumptions, and financial projections are working models rather than audited empirical records.
              All claims should be confirmed through primary customer discovery interviews.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
