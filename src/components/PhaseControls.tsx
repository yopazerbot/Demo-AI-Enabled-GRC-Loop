import { ChevronRight, RotateCcw } from 'lucide-react';
import type { DemoPhase } from '../types';

const NEXT_LABELS: Partial<Record<DemoPhase, string>> = {
  new_event_received: 'Analyse Threat',
  threat_analysis_in_progress: 'Map Risk',
  risk_mapped: 'Generate Policy',
  policy_generated: 'Submit for Approval',
  deployment_in_progress: 'Complete',
};

interface Props {
  phase: DemoPhase;
  onAdvance: () => void;
  onReset: () => void;
}

export function PhaseControls({ phase, onAdvance, onReset }: Props) {
  const canAdvance = phase !== 'idle' && phase !== 'awaiting_approval' && phase !== 'deployment_complete';
  const nextLabel = NEXT_LABELS[phase] ?? 'Next';

  return (
    <div className="flex items-center gap-2 px-4 py-2 border-t border-surface-border bg-surface-800/60 backdrop-blur-sm">
      <span className="text-[10px] text-slate-500">
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

      <div className="ml-auto flex items-center gap-2">
        {canAdvance && (
          <button
            onClick={onAdvance}
            className="flex items-center gap-2 px-4 py-2 bg-accent-cyan/15 hover:bg-accent-cyan/25 border border-accent-cyan/40 rounded-lg text-accent-cyan text-sm font-semibold transition-all cursor-pointer"
          >
            {nextLabel}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {phase !== 'idle' && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 bg-surface-600 hover:bg-surface-500 border border-surface-border rounded-lg text-slate-400 text-xs font-medium transition-all cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
