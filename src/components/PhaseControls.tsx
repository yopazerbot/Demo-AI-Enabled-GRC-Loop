import { ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';

function GithubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.082 3.293 9.388 7.863 10.91.575.106.785-.25.785-.554 0-.274-.01-1.002-.015-1.967-3.197.694-3.872-1.54-3.872-1.54-.523-1.328-1.278-1.682-1.278-1.682-1.044-.713.08-.699.08-.699 1.155.082 1.762 1.186 1.762 1.186 1.026 1.757 2.693 1.249 3.35.955.104-.744.402-1.25.73-1.538-2.552-.29-5.235-1.276-5.235-5.68 0-1.255.448-2.28 1.183-3.084-.118-.29-.513-1.46.112-3.043 0 0 .967-.31 3.17 1.178a11.02 11.02 0 0 1 2.886-.388c.98.005 1.967.133 2.886.388 2.2-1.488 3.166-1.178 3.166-1.178.627 1.583.232 2.753.114 3.043.737.804 1.182 1.83 1.182 3.084 0 4.415-2.687 5.386-5.247 5.67.413.355.78 1.055.78 2.127 0 1.536-.013 2.775-.013 3.152 0 .307.207.665.79.552C20.21 21.384 23.5 17.08 23.5 12 23.5 5.648 18.352.5 12 .5z"/>
    </svg>
  );
}
import type { DemoPhase } from '../types';

const NEXT_LABELS: Partial<Record<DemoPhase, string>> = {
  new_event_received: 'Analyse Threat',
  threat_analysis_in_progress: 'Assess Risk',
  risk_mapped: 'Generate Policy',
  policy_generated: 'Submit for Approval',
  deployment_in_progress: 'Confirm Target State',
  environment_updated: 'Refresh Board',
};

interface Props {
  phase: DemoPhase;
  onAdvance: () => void;
  onBack: () => void;
  onReset: () => void;
}

export function PhaseControls({ phase, onAdvance, onBack, onReset }: Props) {
  const canAdvance = phase !== 'idle' && phase !== 'awaiting_approval' && phase !== 'deployment_complete';
  const canGoBack = phase !== 'idle';
  const nextLabel = NEXT_LABELS[phase] ?? 'Next';

  return (
    <div className="flex items-center gap-2 px-4 py-2 border-t border-surface-border bg-surface-800/60 backdrop-blur-sm">
      <span className="text-[10px] text-slate-500 flex items-center gap-3">
        <span>
          Made by{' '}
          <a
            href="https://www.linkedin.com/in/yoshiparlevliet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-cyan/70 hover:text-accent-cyan transition-colors"
          >
            Yoshi Parlevliet
          </a>
        </span>
        <a
          href="https://github.com/yopazerbot/Demo-AI-Enabled-GRC-Loop"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-accent-cyan/70 hover:text-accent-cyan transition-colors"
          title="View source on GitHub"
        >
          <GithubMark className="w-3 h-3" />
          GitHub
        </a>
      </span>

      <div className="ml-auto flex items-center gap-2">
        <span className="text-[10px] text-slate-500 mr-1 hidden md:inline">
          Use <kbd className="px-1 py-0.5 rounded bg-surface-600 border border-surface-border text-slate-400 font-mono text-[9px]">←</kbd> <kbd className="px-1 py-0.5 rounded bg-surface-600 border border-surface-border text-slate-400 font-mono text-[9px]">→</kbd> to navigate
        </span>

        {canGoBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-2 bg-surface-600 hover:bg-surface-500 border border-surface-border rounded-lg text-slate-400 text-xs font-medium transition-all cursor-pointer"
            title="Previous step (←)"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Back
          </button>
        )}

        {canAdvance && (
          <button
            onClick={onAdvance}
            className="flex items-center gap-2 px-4 py-2 bg-accent-cyan/15 hover:bg-accent-cyan/25 border border-accent-cyan/40 rounded-lg text-accent-cyan text-sm font-semibold transition-all cursor-pointer"
            title="Next step (→)"
          >
            {nextLabel}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {phase !== 'idle' && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 bg-surface-600 hover:bg-surface-500 border border-surface-border rounded-lg text-slate-400 text-xs font-medium transition-all cursor-pointer"
            title="Reset (R)"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
