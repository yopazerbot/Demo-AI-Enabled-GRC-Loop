import { motion } from 'framer-motion';
import { Rss, Bot, Search, FileCode, ShieldCheck, Server, CheckCircle2, BarChart3, Check } from 'lucide-react';
import type { DemoPhase } from '../types';

const STAGES = [
  { id: 'threat', label: 'Threat', icon: Rss, phases: ['new_event_received'] as DemoPhase[] },
  { id: 'agents', label: 'Agents', icon: Bot, phases: ['threat_analysis_in_progress'] as DemoPhase[] },
  { id: 'risk', label: 'Risk', icon: Search, phases: ['risk_mapped'] as DemoPhase[] },
  { id: 'policy', label: 'Policy', icon: FileCode, phases: ['policy_generated'] as DemoPhase[] },
  { id: 'approval', label: 'Approval', icon: ShieldCheck, phases: ['awaiting_approval'] as DemoPhase[] },
  { id: 'deploy', label: 'Deploy', icon: Server, phases: ['deployment_in_progress'] as DemoPhase[] },
  { id: 'target', label: 'Target State', icon: CheckCircle2, phases: ['environment_updated'] as DemoPhase[] },
  { id: 'board', label: 'Board', icon: BarChart3, phases: ['deployment_complete'] as DemoPhase[] },
];

function phaseToStageIdx(phase: DemoPhase): number {
  if (phase === 'idle') return -1;
  return STAGES.findIndex((s) => s.phases.includes(phase));
}

interface Props {
  phase: DemoPhase;
}

export function FlowTimeline({ phase }: Props) {
  const currentIdx = phaseToStageIdx(phase);

  return (
    <div className="flex items-center justify-center gap-0 px-3 py-3 border-b border-surface-border bg-surface-800/40">
      {STAGES.map((stage, i) => {
        const Icon = stage.icon;
        const isPast = i < currentIdx;
        const isCurrent = i === currentIdx;
        const isFuture = i > currentIdx;

        return (
          <div key={stage.id} className="flex items-center">
            {/* Stage node */}
            <motion.div
              animate={{ scale: isCurrent ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-1"
            >
              <div
                className={`
                  w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500
                  ${isPast
                    ? 'bg-accent-emerald/15 border border-accent-emerald/40'
                    : isCurrent
                      ? 'bg-accent-cyan/20 border border-accent-cyan/60 shadow-[0_0_20px_rgba(34,211,238,0.35)]'
                      : 'bg-surface-700 border border-surface-border'
                  }
                `}
              >
                {isPast ? (
                  <Check className="w-5 h-5 text-accent-emerald" />
                ) : (
                  <Icon
                    className={`w-5 h-5 transition-colors duration-500 ${
                      isCurrent ? 'text-accent-cyan' : isFuture ? 'text-slate-600' : 'text-slate-400'
                    } ${isCurrent ? 'animate-pulse' : ''}`}
                  />
                )}
              </div>
              <span
                className={`text-[11px] font-semibold transition-colors duration-500 ${
                  isPast ? 'text-accent-emerald/80' : isCurrent ? 'text-accent-cyan' : 'text-slate-600'
                }`}
              >
                {stage.label}
              </span>
            </motion.div>

            {/* Connector */}
            {i < STAGES.length - 1 && (
              <div className="relative w-10 h-px mx-1 mb-5 bg-surface-border overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-accent-emerald"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: i < currentIdx ? 1 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  style={{ transformOrigin: 'left' }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
