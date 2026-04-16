import { ChevronRight, RotateCcw } from 'lucide-react';
import type { DemoPhase } from '../types';

const PHASE_ORDER: DemoPhase[] = [
  'idle',
  'new_event_received',
  'threat_analysis_in_progress',
  'risk_mapped',
  'policy_generated',
  'awaiting_approval',
  'deployment_in_progress',
  'deployment_complete',
];

const phaseStepLabels: Record<DemoPhase, string> = {
  idle: 'Start',
  new_event_received: 'Ingest',
  threat_analysis_in_progress: 'Analyze',
  risk_mapped: 'Map Risk',
  policy_generated: 'Generate Policy',
  awaiting_approval: 'Approve',
  deployment_in_progress: 'Deploy',
  deployment_complete: 'Complete',
};

interface Props {
  phase: DemoPhase;
  onAdvance: () => void;
  onReset: () => void;
}

export function PhaseControls({ phase, onAdvance, onReset }: Props) {
  const currentIdx = PHASE_ORDER.indexOf(phase);
  const canAdvance = phase !== 'idle' && phase !== 'awaiting_approval' && phase !== 'deployment_complete';

  return (
    <div className="flex items-center gap-3 px-6 py-2.5 border-t border-surface-border bg-surface-800/60 backdrop-blur-sm">
      {/* Phase progress dots */}
      <div className="flex items-center gap-1.5">
        {PHASE_ORDER.map((p, i) => (
          <div key={p} className="flex items-center gap-1.5">
            <div
              className={`
                w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold transition-all duration-300
                ${i < currentIdx
                  ? 'bg-accent-emerald/20 text-accent-emerald border border-accent-emerald/30'
                  : i === currentIdx
                    ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/40 ring-2 ring-accent-cyan/10'
                    : 'bg-surface-600 text-slate-500 border border-surface-border'
                }
              `}
              title={phaseStepLabels[p]}
            >
              {i + 1}
            </div>
            {i < PHASE_ORDER.length - 1 && (
              <div
                className={`w-4 h-px transition-colors duration-300 ${
                  i < currentIdx ? 'bg-accent-emerald/40' : 'bg-surface-border'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <span className="text-xs text-slate-400 ml-2">
        {phaseStepLabels[phase]}
      </span>

      <div className="ml-auto flex items-center gap-2">
        {canAdvance && (
          <button
            onClick={onAdvance}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-accent-cyan/10 hover:bg-accent-cyan/20 border border-accent-cyan/30 rounded-lg text-accent-cyan text-xs font-medium transition-all cursor-pointer"
          >
            Next Step
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
    </div>
  );
}
