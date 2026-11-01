import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { Dashboard } from './components/Dashboard';
import { IdeaFormModal } from './components/IdeaFormModal';
import { GenerationLoader } from './components/GenerationLoader';
import { ImproveIdeaModal } from './components/ImproveIdeaModal';
import { AlternativeIdeasModal } from './components/AlternativeIdeasModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import {
  StartupBlueprint,
  IdeaInput,
  BlueprintSectionKey,
  IdeaImprovement,
  AlternativeIdea,
} from './types/blueprint';
import { SAMPLE_BLUEPRINT } from './data/sampleBlueprint';

export default function App() {
  const [activeBlueprint, setActiveBlueprint] = useState<StartupBlueprint | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formInitialValues, setFormInitialValues] = useState<Partial<IdeaInput>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingTitle, setGeneratingTitle] = useState('');
  const [regeneratingSection, setRegeneratingSection] = useState<BlueprintSectionKey | null>(null);

  // Improve modal state
  const [isImproveModalOpen, setIsImproveModalOpen] = useState(false);
  const [improvementData, setImprovementData] = useState<IdeaImprovement | null>(null);
  const [isLoadingImprovement, setIsLoadingImprovement] = useState(false);

  // Alternative ideas modal state
  const [isAlternativesModalOpen, setIsAlternativesModalOpen] = useState(false);
  const [alternativesData, setAlternativesData] = useState<AlternativeIdea[] | null>(null);
  const [isLoadingAlternatives, setIsLoadingAlternatives] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (type: 'success' | 'error' | 'info', title: string, description?: string) => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      type,
      title,
      description,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Instant explore sample project
  const handleExploreSample = () => {
    setActiveBlueprint(SAMPLE_BLUEPRINT);
    setImprovementData(null);
    setAlternativesData(null);
    showToast(
      'info',
      'Sample Project Loaded',
      'Exploring "EcoBite Ops" - Campus Dining Kitchen Waste AI.'
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open form modal
  const handleStartBuilding = () => {
    setFormInitialValues(activeBlueprint ? activeBlueprint.input : {});
    setIsFormOpen(true);
  };

  // Generate full blueprint via server API
  const handleGenerateBlueprint = async (data: IdeaInput) => {
    setIsGenerating(true);
    setGeneratingTitle(data.idea);
    setIsFormOpen(false);

    try {
      const response = await fetch('/api/generate-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with ${response.status}`);
      }

      const res = await response.json();
      if (res.blueprint) {
        setActiveBlueprint(res.blueprint);
        setImprovementData(null);
        setAlternativesData(null);
        showToast(
          'success',
          'Blueprint Generated!',
          `Created "${res.blueprint.executiveSummary.projectName}" across 12 dimensions.`
        );
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('No blueprint returned.');
      }
    } catch (err: any) {
      console.error('Generation error:', err);
      showToast(
        'error',
        'Generation Encountered an Issue',
        err.message || 'Please check input parameters and try again.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Regenerate individual section via server API
  const handleRegenerateSection = async (
    sectionKey: BlueprintSectionKey,
    customInstruction?: string
  ) => {
    if (!activeBlueprint) return;
    setRegeneratingSection(sectionKey);

    try {
      const response = await fetch('/api/regenerate-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionKey,
          ideaInput: activeBlueprint.input,
          currentBlueprint: activeBlueprint,
          refinementInstruction: customInstruction,
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || 'Failed to regenerate section.');
      }

      const res = await response.json();
      if (res.updatedContent) {
        setActiveBlueprint((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            [sectionKey]: res.updatedContent,
          };
        });
        showToast('success', 'Section Regenerated', `Updated section: ${sectionKey}`);
      }
    } catch (err: any) {
      console.error('Section regeneration error:', err);
      showToast('error', 'Section Update Failed', err.message);
    } finally {
      setRegeneratingSection(null);
    }
  };

  // Open "Improve My Idea" modal
  const handleOpenImproveModal = async () => {
    if (!activeBlueprint) return;
    setIsImproveModalOpen(true);

    if (!improvementData) {
      await fetchImprovementData(activeBlueprint.input);
    }
  };

  const fetchImprovementData = async (input: IdeaInput) => {
    setIsLoadingImprovement(true);
    try {
      const response = await fetch('/api/improve-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ideaInput: input }),
      });
      if (response.ok) {
        const data = await response.json();
        setImprovementData(data);
      } else {
        showToast('error', 'Could not fetch critique', 'Please try again.');
      }
    } catch (err) {
      console.error(err);
      showToast('error', 'Critique failed', 'Network error');
    } finally {
      setIsLoadingImprovement(false);
    }
  };

  // Adopt enhanced pitch
  const handleAdoptPitch = (enhancedPitch: string) => {
    if (!activeBlueprint) return;
    setActiveBlueprint((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        executiveSummary: {
          ...prev.executiveSummary,
          elevatorPitch: enhancedPitch,
        },
      };
    });
    showToast('success', 'Pitch Updated', 'Enhanced pitch merged into Executive Summary.');
  };

  // Open "Generate Alternative Ideas" modal
  const handleOpenAlternativesModal = async () => {
    if (!activeBlueprint) return;
    setIsAlternativesModalOpen(true);

    if (!alternativesData) {
      await fetchAlternativesData(activeBlueprint.input);
    }
  };

  const fetchAlternativesData = async (input: IdeaInput) => {
    setIsLoadingAlternatives(true);
    try {
      const response = await fetch('/api/alternative-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ideaInput: input }),
      });
      if (response.ok) {
        const data = await response.json();
        setAlternativesData(data.alternatives || []);
      } else {
        showToast('error', 'Could not fetch alternative ideas', 'Please try again.');
      }
    } catch (err) {
      console.error(err);
      showToast('error', 'Alternatives generation failed', 'Network error');
    } finally {
      setIsLoadingAlternatives(false);
    }
  };

  // Build a selected alternative pivot
  const handleSelectPivot = (pivot: AlternativeIdea) => {
    setIsAlternativesModalOpen(false);
    const updatedInput: IdeaInput = {
      idea: `${pivot.conceptName}: ${pivot.overview}`,
      industry: activeBlueprint?.input.industry || 'Technology & Software',
      targetMarket: activeBlueprint?.input.targetMarket || 'Global',
      targetCustomer: pivot.targetAudience,
      budget: activeBlueprint?.input.budget || 'Bootstrapped',
      stage: 'Pivot Concept Phase',
      additionalNotes: `Pivoting to ${pivot.pivotType}. Strategic thesis: ${pivot.whyItMightBeEasierOrBetter}. Tradeoff: ${pivot.keyTradeoff}`,
    };
    handleGenerateBlueprint(updatedInput);
  };

  return (
    <div className="min-h-screen bg-[#080B14] text-[#F1F5F9] flex flex-col selection:bg-[#7C3AED]/30 selection:text-[#22D3EE]">
      {/* Top Bar Navigation */}
      <Navbar
        onStartBuilding={handleStartBuilding}
        onExploreSample={handleExploreSample}
        hasActiveBlueprint={!!activeBlueprint}
        onViewDashboard={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onViewOverview={() => {
          setActiveBlueprint(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeBlueprint ? (
          <Dashboard
            blueprint={activeBlueprint}
            onRegenerateSection={handleRegenerateSection}
            regeneratingSection={regeneratingSection}
            onOpenImproveModal={handleOpenImproveModal}
            onOpenAlternativesModal={handleOpenAlternativesModal}
            onNewBlueprint={handleStartBuilding}
            onShowToast={showToast}
          />
        ) : (
          <LandingHero
            onStartBuilding={handleStartBuilding}
            onExploreSample={handleExploreSample}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[rgba(148,163,184,0.16)] bg-[#0D1224] py-8 text-center text-xs text-[#94A3B8] no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#F1F5F9]">AI IdeaForge</span>
            <span>·</span>
            <span>From Idea to Impact</span>
            <span>·</span>
            <span className="text-[#22D3EE] font-mono text-[11px]">Gemini 3.8</span>
          </div>
          <p className="text-[#94A3B8]">
            Designed for students, aspiring entrepreneurs & small business builders.
          </p>
        </div>
      </footer>

      {/* Interactive Modals */}
      <IdeaFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleGenerateBlueprint}
        initialValues={formInitialValues}
        isLoading={isGenerating}
      />

      {isGenerating && <GenerationLoader ideaTitle={generatingTitle} />}

      <ImproveIdeaModal
        isOpen={isImproveModalOpen}
        onClose={() => setIsImproveModalOpen(false)}
        data={improvementData}
        isLoading={isLoadingImprovement}
        onAdoptPitch={handleAdoptPitch}
        onRefreshCritique={() => activeBlueprint && fetchImprovementData(activeBlueprint.input)}
      />

      <AlternativeIdeasModal
        isOpen={isAlternativesModalOpen}
        onClose={() => setIsAlternativesModalOpen(false)}
        alternatives={alternativesData}
        isLoading={isLoadingAlternatives}
        onSelectPivot={handleSelectPivot}
        onRefreshAlternatives={() =>
          activeBlueprint && fetchAlternativesData(activeBlueprint.input)
        }
      />

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
