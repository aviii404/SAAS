import React from 'react';
import { Sparkles, Menu, X, Rocket, ArrowRight, LayoutDashboard, Compass } from 'lucide-react';

interface NavbarProps {
  onStartBuilding: () => void;
  onExploreSample: () => void;
  hasActiveBlueprint: boolean;
  onViewDashboard: () => void;
  onViewOverview: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onStartBuilding,
  onExploreSample,
  hasActiveBlueprint,
  onViewDashboard,
  onViewOverview,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[rgba(148,163,184,0.16)] bg-[#0D1224]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Brand Wordmark with subtle violet/cyan icon */}
          <button
            type="button"
            onClick={onViewOverview}
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-[#F1F5F9] whitespace-nowrap shrink-0 group text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7C3AED] via-[#8B5CF6] to-[#22D3EE] p-0.5 flex items-center justify-center shadow-lg shadow-[#7C3AED]/25 group-hover:shadow-[#22D3EE]/30 transition-all">
              <div className="w-full h-full bg-[#080B14] rounded-[7px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#22D3EE] group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="leading-tight">AI IdeaForge</span>
              <span className="text-[10px] font-normal text-[#94A3B8] tracking-wider uppercase -mt-0.5">
                From Idea to Impact
              </span>
            </div>
          </button>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#94A3B8]">
            <button
              type="button"
              onClick={onViewOverview}
              className="hover:text-[#F1F5F9] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Overview
            </button>
            <a
              href="#framework"
              onClick={(e) => {
                if (hasActiveBlueprint) {
                  onViewOverview();
                  setTimeout(() => {
                    document.getElementById('framework')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="hover:text-[#F1F5F9] transition-colors whitespace-nowrap shrink-0"
            >
              The 12 Blueprint Sections
            </a>
            <button
              type="button"
              onClick={onExploreSample}
              className="flex items-center gap-1.5 hover:text-[#22D3EE] transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>Sample Project (EcoBite)</span>
            </button>
            {hasActiveBlueprint && (
              <button
                type="button"
                onClick={onViewDashboard}
                className="flex items-center gap-1.5 text-[#22D3EE] font-semibold hover:text-[#38bdf8] transition-colors whitespace-nowrap shrink-0 cursor-pointer px-2.5 py-1 rounded-md bg-[#22D3EE]/10 border border-[#22D3EE]/30"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Active Blueprint</span>
              </button>
            )}
          </nav>

          {/* Primary Action Button */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onStartBuilding}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#EC4899] rounded-lg hover:brightness-110 shadow-md shadow-[#7C3AED]/25 transition-all active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>{hasActiveBlueprint ? 'New Blueprint' : 'Start Building'}</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#94A3B8] hover:text-[#F1F5F9]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[rgba(148,163,184,0.16)] bg-[#0D1224]/95 backdrop-blur-lg px-4 pt-2 pb-4 space-y-2">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onViewOverview();
            }}
            className="block w-full text-left px-3 py-2 text-sm text-[#94A3B8] hover:text-[#F1F5F9]"
          >
            Overview
          </button>
          <a
            href="#framework"
            onClick={() => {
              setMobileMenuOpen(false);
              if (hasActiveBlueprint) {
                onViewOverview();
                setTimeout(() => {
                  document.getElementById('framework')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="block px-3 py-2 text-sm text-[#94A3B8] hover:text-[#F1F5F9]"
          >
            The 12 Blueprint Sections
          </a>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onExploreSample();
            }}
            className="block w-full text-left px-3 py-2 text-sm text-[#94A3B8] hover:text-[#22D3EE]"
          >
            Sample Project (EcoBite)
          </button>
          {hasActiveBlueprint && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onViewDashboard();
              }}
              className="block w-full text-left px-3 py-2 text-sm font-semibold text-[#22D3EE] hover:text-[#38bdf8]"
            >
              View Active Blueprint
            </button>
          )}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onStartBuilding();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#EC4899] rounded-lg shadow-md transition-all cursor-pointer"
            >
              <span>{hasActiveBlueprint ? 'New Blueprint' : 'Start Building'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
