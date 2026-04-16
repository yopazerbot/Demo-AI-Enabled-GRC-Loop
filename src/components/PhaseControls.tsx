import { ChevronRight, RotateCcw } from 'lucide-react';
import type { DemoPhase } from '../types';

interface Props {
  phase: DemoPhase;
  onAdvance: () => void;
  onReset: () => void;
}

export function PhaseControls({ phase, onAdvance, onReset }: Props) {
  const canAdvance = phase !== 'idle' && phase !== 'awaiting_approval' && phase !== 'deployment_complete';

  return (
    <div className="flex items-center justify-end gap-2 px-4 py-2 border-t border-surface-border bg-surface-800/60 backdrop-blur-sm">
      {canAdvance && (
        <button
          onClick={onAdvance}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-accent-cyan/10 hover:bg-accent-cyan/20 border border-accent-cyan/30 rounded-lg text-accent-cyan text-xs font-medium transition-all cursor-pointer"
        >
          Skip
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      )}

      {phase !== 'idle' && (
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-600 hover:bg-surface-500 border border-surface-border rounded-lg text-slate-400 text-xs font-medium transition-all cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      )}
    </div>
  );
}
