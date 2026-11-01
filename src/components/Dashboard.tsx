import React, { useState } from 'react';
import {
  Download,
  Copy,
  Sparkles,
  Compass,
  FileText,
  FileCode,
  Printer,
  ChevronDown,
  ArrowLeft,
  Check,
  ShieldCheck,
  Wand2,
} from 'lucide-react';
import { StartupBlueprint, BlueprintSectionKey } from '../types/blueprint';
import { ExecutiveSummaryCard } from './dashboard/ExecutiveSummaryCard';
import { ProblemStatementCard } from './dashboard/ProblemStatementCard';
import { ProposedSolutionCard } from './dashboard/ProposedSolutionCard';
import { TargetAudienceCard } from './dashboard/TargetAudienceCard';
import { MarketOpportunityCard } from './dashboard/MarketOpportunityCard';
import { BusinessModelCard } from './dashboard/BusinessModelCard';
import { MvpFeaturesCard } from './dashboard/MvpFeaturesCard';
import { TechStackCard } from './dashboard/TechStackCard';
import { MarketingStrategyCard } from './dashboard/MarketingStrategyCard';
import { RiskAnalysisCard } from './dashboard/RiskAnalysisCard';
import { LaunchRoadmapCard } from './dashboard/LaunchRoadmapCard';
import { KpisCard } from './dashboard/KpisCard';
import { blueprintToMarkdown, downloadFile } from '../utils/exportUtils';

interface DashboardProps {
  blueprint: StartupBlueprint;
  onRegenerateSection: (sectionKey: BlueprintSectionKey, customInstruction?: string) => Promise<void>;
  regeneratingSection: BlueprintSectionKey | null;
  onOpenImproveModal: () => void;
  onOpenAlternativesModal: () => void;
  onNewBlueprint: () => void;
  onShowToast: (type: 'success' | 'error' | 'info', title: string, description?: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  blueprint,
  onRegenerateSection,
  regeneratingSection,
  onOpenImproveModal,
  onOpenAlternativesModal,
  onNewBlueprint,
  onShowToast,
}) => {
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false);
  const [copiedFull, setCopiedFull] = useState(false);

  const handleCopyFull = () => {
    const md = blueprintToMarkdown(blueprint);
    navigator.clipboard.writeText(md);
    setCopiedFull(true);
    onShowToast('success', 'Blueprint Copied', 'Full Markdown copied to your clipboard.');
    setTimeout(() => setCopiedFull(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    const md = blueprintToMarkdown(blueprint);
    const filename = `${blueprint.executiveSummary.projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-blueprint.md`;
    downloadFile(md, filename, 'text/markdown;charset=utf-8');
    setDownloadDropdownOpen(false);
    onShowToast('success', 'Markdown Exported', `Saved as ${filename}`);
  };

  const handleDownloadJSON = () => {
    const jsonStr = JSON.stringify(blueprint, null, 2);
    const filename = `${blueprint.executiveSummary.projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-data.json`;
    downloadFile(jsonStr, filename, 'application/json;charset=utf-8');
    setDownloadDropdownOpen(false);
    onShowToast('success', 'JSON Exported', `Saved as ${filename}`);
  };

  const handlePrintPDF = () => {
    setDownloadDropdownOpen(false);
    window.print();
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navSections = [
    { id: 'section-executiveSummary', label: 'A. Executive Summary' },
    { id: 'section-problemStatement', label: 'B. Problem' },
    { id: 'section-proposedSolution', label: 'C. Solution' },
    { id: 'section-targetAudience', label: 'D. Audience' },
    { id: 'section-marketOpportunity', label: 'E. Market & TAM' },
    { id: 'section-businessModel', label: 'F. Business Model' },
    { id: 'section-mvpFeaturePrioritization', label: 'G. MVP MoSCoW' },
    { id: 'section-techStack', label: 'H. Tech Stack' },
    { id: 'section-marketingStrategy', label: 'I. Marketing & GTM' },
    { id: 'section-riskAnalysis', label: 'J. Risk & Tests' },
    { id: 'section-launchRoadmap', label: 'K. 30-Day Sprint' },
    { id: 'section-kpis', label: 'L. KPIs' },
  ];

  return (
    <div className="min-h-screen pb-24 bg-[#080B14]">
      {/* Top Context Toolbar */}
      <div className="sticky top-16 z-30 border-b border-[rgba(148,163,184,0.16)] bg-[#0D1224]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Left: Project title & metadata */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={onNewBlueprint}
                className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1A2238] transition-colors cursor-pointer border border-[rgba(148,163,184,0.16)]"
                title="Edit inputs or start new blueprint"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="text-sm sm:text-base font-bold text-[#F1F5F9] truncate">
                    {blueprint.executiveSummary.projectName}
                  </h1>
                  <span className="text-xs text-[#22D3EE] font-mono hidden sm:inline">
                    · {blueprint.input.industry}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#94A3B8] truncate">
                  <span>{blueprint.input.targetCustomer}</span>
                  <span aria-hidden="true">·</span>
                  <span>{blueprint.input.budget}</span>
                  <span aria-hidden="true">·</span>
                  <span>{blueprint.input.stage}</span>
                </div>
              </div>
            </div>

            {/* Right: Global Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap shrink-0">
              {/* Improve My Idea button */}
              <button
                type="button"
                onClick={onOpenImproveModal}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#EC4899] hover:text-white bg-[#EC4899]/10 hover:bg-[#EC4899]/25 border border-[#EC4899]/30 rounded-lg transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Improve My Idea</span>
              </button>

              {/* Generate Alternative Ideas */}
              <button
                type="button"
                onClick={onOpenAlternativesModal}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#8B5CF6] hover:text-white bg-[#7C3AED]/15 hover:bg-[#7C3AED]/30 border border-[#8B5CF6]/30 rounded-lg transition-colors cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Alternative Pivots</span>
              </button>

              {/* Copy Full Blueprint */}
              <button
                type="button"
                onClick={handleCopyFull}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#F1F5F9] hover:text-white bg-[#141B2D] hover:bg-[#1A2238] border border-[rgba(148,163,184,0.16)] rounded-lg transition-colors cursor-pointer"
              >
                {copiedFull ? <Check className="w-3.5 h-3.5 text-[#34D399]" /> : <Copy className="w-3.5 h-3.5 text-[#94A3B8]" />}
                <span>{copiedFull ? 'Copied All' : 'Copy All'}</span>
              </button>

              {/* Download Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#EC4899] rounded-lg hover:brightness-110 shadow-sm transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Plan</span>
                  <ChevronDown className="w-3 h-3 ml-0.5" />
                </button>

                {downloadDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#141B2D] backdrop-blur-md shadow-2xl py-1 z-40">
                    <button
                      type="button"
                      onClick={handleDownloadMarkdown}
                      className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-[#F1F5F9] hover:bg-[#1A2238] transition-colors text-left"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#22D3EE]" />
                      <span>Markdown (.md)</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadJSON}
                      className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-[#F1F5F9] hover:bg-[#1A2238] transition-colors text-left"
                    >
                      <FileCode className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      <span>Structured Data (.json)</span>
                    </button>
                    <button
                      type="button"
                      onClick={handlePrintPDF}
                      className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-[#F1F5F9] hover:bg-[#1A2238] transition-colors text-left"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#34D399]" />
                      <span>Print / Save as PDF</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick jump horizontal navigation pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2.5 pb-1 no-scrollbar text-xs">
            {navSections.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollToSection(sec.id)}
                className="px-2.5 py-1 rounded-md text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1A2238] border border-transparent hover:border-[rgba(148,163,184,0.16)] whitespace-nowrap shrink-0 transition-colors cursor-pointer text-[11px]"
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Sections A through L */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Section A: Executive Summary */}
        <ExecutiveSummaryCard
          data={blueprint.executiveSummary}
          onRegenerate={(instruction) => onRegenerateSection('executiveSummary', instruction)}
          isRegenerating={regeneratingSection === 'executiveSummary'}
          onCopy={(text) => {
            navigator.clipboard.writeText(text);
            onShowToast('success', 'Copied Section', 'Executive Summary copied.');
          }}
        />

        {/* Section B: Problem Statement */}
        <ProblemStatementCard
          data={blueprint.problemStatement}
          onRegenerate={(instruction) => onRegenerateSection('problemStatement', instruction)}
          isRegenerating={regeneratingSection === 'problemStatement'}
          onCopy={(text) => {
            navigator.clipboard.writeText(text);
            onShowToast('success', 'Copied Section', 'Problem Statement copied.');
          }}
        />

        {/* Section C: Proposed Solution */}
        <ProposedSolutionCard
          data={blueprint.proposedSolution}
          onRegenerate={(instruction) => onRegenerateSection('proposedSolution', instruction)}
          isRegenerating={regeneratingSection === 'proposedSolution'}
          onCopy={(text) => {
            navigator.clipboard.writeText(text);
            onShowToast('success', 'Copied Section', 'Proposed Solution copied.');
          }}
        />

        {/* Section D: Target Audience & Personas */}
        <TargetAudienceCard
          data={blueprint.targetAudience}
          onRegenerate={(instruction) => onRegenerateSection('targetAudience', instruction)}
          isRegenerating={regeneratingSection === 'targetAudience'}
          onCopy={(text) => {
            navigator.clipboard.writeText(text);
            onShowToast('success', 'Copied Section', 'Target Audience & Personas copied.');
          }}
        />

        {/* Section E: Market Opportunity & Competitor Research */}
        <MarketOpportunityCard
          data={blueprint.marketOpportunity}
          onRegenerate={(instruction) => onRegenerateSection('marketOpportunity', instruction)}
          isRegenerating={regeneratingSection === 'marketOpportunity'}
          onCopy={(text) => {
            navigator.clipboard.writeText(text);
            onShowToast('success', 'Copied Section', 'Market Opportunity copied.');
          }}
        />

        {/* Section F: Business Model & Revenue Streams */}
        <BusinessModelCard
          data={blueprint.businessModel}
          onRegenerate={(instruction) => onRegenerateSection('businessModel', instruction)}
          isRegenerating={regeneratingSection === 'businessModel'}
          onCopy={(text) => {
            navigator.clipboard.writeText(text);
            onShowToast('success', 'Copied Section', 'Business Model copied.');
          }}
        />

        {/* Section G: MVP Feature Prioritization (MoSCoW) */}
        <MvpFeaturesCard
          data={blueprint.mvpFeaturePrioritization}
          onRegenerate={(instruction) => onRegenerateSection('mvpFeaturePrioritization', instruction)}
          isRegenerating={regeneratingSection === 'mvpFeaturePrioritization'}
          onCopy={(text) => {
            navigator.clipboard.writeText(text);
            onShowToast('success', 'Copied Section', 'MVP Feature Prioritization copied.');
          }}
        />

        {/* Section H: Technology Stack Suggestions */}
        <TechStackCard
          data={blueprint.techStack}
          onRegenerate={(instruction) => onRegenerateSection('techStack', instruction)}
          isRegenerating={regeneratingSection === 'techStack'}
          onCopy={(text) => {
            navigator.clipboard.writeText(text);
            onShowToast('success', 'Copied Section', 'Technology Stack copied.');
          }}
        />

        {/* Section I: Marketing & Customer Acquisition Strategy */}
        <MarketingStrategyCard
          data={blueprint.marketingStrategy}
          onRegenerate={(instruction) => onRegenerateSection('marketingStrategy', instruction)}
          isRegenerating={regeneratingSection === 'marketingStrategy'}
          onCopy={(text) => {
            navigator.clipboard.writeText(text);
            onShowToast('success', 'Copied Section', 'Marketing Strategy copied.');
          }}
        />

        {/* Section J: Risk Analysis & Validation Experiments */}
        <RiskAnalysisCard
          data={blueprint.riskAnalysis}
          onRegenerate={(instruction) => onRegenerateSection('riskAnalysis', instruction)}
          isRegenerating={regeneratingSection === 'riskAnalysis'}
          onCopy={(text) => {
            navigator.clipboard.writeText(text);
            onShowToast('success', 'Copied Section', 'Risk Analysis & Experiments copied.');
          }}
        />

        {/* Section K: A 30-Day Launch Roadmap */}
        <LaunchRoadmapCard
          data={blueprint.launchRoadmap}
          onRegenerate={(instruction) => onRegenerateSection('launchRoadmap', instruction)}
          isRegenerating={regeneratingSection === 'launchRoadmap'}
          onCopy={(text) => {
            navigator.clipboard.writeText(text);
            onShowToast('success', 'Copied Section', '30-Day Launch Roadmap copied.');
          }}
        />

        {/* Section L: Key Performance Indicators (KPIs) */}
        <KpisCard
          data={blueprint.kpis}
          onRegenerate={(instruction) => onRegenerateSection('kpis', instruction)}
          isRegenerating={regeneratingSection === 'kpis'}
          onCopy={(text) => {
            navigator.clipboard.writeText(text);
            onShowToast('success', 'Copied Section', 'KPI Framework copied.');
          }}
        />

        {/* Bottom Research Ethics & Next Steps Card */}
        <div className="p-6 rounded-2xl border border-[rgba(148,163,184,0.16)] bg-[#141B2D] text-center space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#22D3EE] uppercase">
            <ShieldCheck className="w-4 h-4 text-[#34D399]" />
            <span>Ready for Primary Validation</span>
          </div>
          <h3 className="text-xl font-bold text-[#F1F5F9]">Your blueprint is ready for user interviews</h3>
          <p className="text-xs text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
            Begin with Week 1 of your 30-day roadmap. Remember: Treat every section of this blueprint as an informed hypothesis to be verified directly with your target customers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#F1F5F9] bg-[#1A2238] hover:bg-[#141B2D] border border-[rgba(148,163,184,0.16)] rounded-lg transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>Download Markdown</span>
            </button>
            <button
              type="button"
              onClick={onNewBlueprint}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] hover:brightness-110 rounded-lg transition-all cursor-pointer shadow-md shadow-[#7C3AED]/20"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Forge Another Idea</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
