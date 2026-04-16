import { ChevronRight, RotateCcw, Check } from 'lucide-react';
import { motion } from 'framer-motion';
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
  idle: 'Ready',
  new_event_received: 'Ingest',
  threat_analysis_in_progress: 'Analyze',
  risk_mapped: 'Map Risk',
  policy_generated: 'Policy',
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
    <div className="flex items-center gap-3 px-6 py-2 border-t border-surface-border bg-surface-800/60 backdrop-blur-sm">
      {/* Phase progress steps */}
      <div className="flex items-center gap-0.5 flex-1">
        {PHASE_ORDER.map((p, i) => {
          const isPast = i < currentIdx;
          const isCurrent = i === currentIdx;

          return (
            <div key={p} className="flex items-center gap-0.5">
              <div className="flex flex-col items-center gap-0.5">
                <motion.div
                  animate={{
                    scale: isCurrent ? 1 : 1,
                    backgroundColor: isPast
                      ? 'rgba(16, 185, 129, 0.2)'
                      : isCurrent
                        ? 'rgba(34, 211, 238, 0.2)'
                        : 'rgba(51, 69, 99, 0.5)',
                  }}
                  transition={{ duration: 0.3 }}
                  className={`
                    w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold transition-all duration-300
                    ${isPast
                      ? 'text-accent-emerald border border-accent-emerald/30'
                      : isCurrent
                        ? 'text-accent-cyan border border-accent-cyan/40 shadow-[0_0_8px_rgba(34,211,238,0.2)]'
                        : 'text-slate-500 border border-surface-border'
                    }
                  `}
                >
                  {isPast ? <Check className="w-3 h-3" /> : i + 1}
                </motion.div>
                <span className={`text-[8px] font-medium transition-colors duration-300 ${
                  isPast ? 'text-accent-emerald/70' : isCurrent ? 'text-accent-cyan' : 'text-slate-600'
                }`}>
                  {phaseStepLabels[p]}
                </span>
              </div>
              {i < PHASE_ORDER.length - 1 && (
                <div
                  className={`w-3 h-px transition-colors duration-300 mb-3 ${
                    isPast ? 'bg-accent-emerald/40' : 'bg-surface-border'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
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
    </div>
  );
}
