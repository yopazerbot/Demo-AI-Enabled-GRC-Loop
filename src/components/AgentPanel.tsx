import { Bot, Check, Loader2, Circle, ArrowDown, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelShell } from './PanelShell';
import type { AgentState, AgentStatus } from '../types';

const statusConfig: Record<AgentStatus, { icon: typeof Circle; color: string; bg: string; label: string }> = {
  idle:       { icon: Circle,  color: 'text-slate-500',         bg: 'bg-surface-700 border-surface-border',               label: 'Waiting' },
  processing: { icon: Loader2, color: 'text-accent-blue',       bg: 'bg-accent-blue/10 border-accent-blue/40',            label: 'Working' },
  completed:  { icon: Check,   color: 'text-accent-emerald',    bg: 'bg-accent-emerald/5 border-accent-emerald/30',       label: 'Done' },
};

const AGENT_SHORT_LABELS: Record<string, string> = {
  'threat-intake': 'Threat Intake',
  'risk-mapping': 'Risk Mapping',
  'control-engineering': 'Policy Engineering',
};

interface Props {
  agents: AgentState[];
  isActive: boolean;
  isDimmed: boolean;
}

export function AgentPanel({ agents, isActive, isDimmed }: Props) {
  const completeCount = agents.filter((a) => a.status === 'completed').length;
  const hasStarted = agents.some((a) => a.status !== 'idle');

  return (
    <PanelShell
      title="Agent Orchestration"
      icon={Bot}
      accentColor="text-accent-blue"
      isActive={isActive}
      isDimmed={isDimmed}
      badge={hasStarted ? `${completeCount}/${agents.length}` : undefined}
      badgeColor={
        completeCount === agents.length
          ? 'bg-accent-emerald/15 text-accent-emerald'
          : 'bg-accent-blue/15 text-accent-blue'
      }
    >
      <div className="flex flex-col gap-1.5 h-full">
        {agents.map((agent, i) => {
          const cfg = statusConfig[agent.status];
          const StatusIcon = cfg.icon;
          const shortLabel = AGENT_SHORT_LABELS[agent.id] || agent.name;
          const isProcessing = agent.status === 'processing';
          const isCompleted = agent.status === 'completed';

          return (
            <div key={agent.id}>
              <motion.div
                layout
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`
                  rounded-lg border transition-all duration-300
                  ${cfg.bg}
                  ${isProcessing ? 'shadow-[0_0_20px_rgba(59,130,246,0.2)]' : ''}
                `}
              >
                {/* Agent header row */}
                <div className="flex items-center gap-2.5 p-2.5">
                  <div className="w-8 h-8 rounded-lg bg-surface-900/40 flex items-center justify-center shrink-0">
                    <StatusIcon
                      className={`w-4 h-4 ${cfg.color} ${isProcessing ? 'animate-spin' : ''}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-100">{shortLabel}</p>
                    <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{agent.role}</p>
                  </div>
                  <span className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded ${
                    isProcessing ? 'bg-accent-blue/20 text-accent-blue' :
                    isCompleted ? 'bg-accent-emerald/20 text-accent-emerald' :
                    'bg-surface-600 text-slate-500'
                  }`}>
                    {cfg.label}
                  </span>
                </div>

                {/* Processing / output message */}
                <AnimatePresence mode="wait">
                  {agent.outputSummary && (
                    <motion.div
                      key={`${agent.id}-${agent.status}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className={`mx-2.5 mb-2.5 p-2 rounded border-l-2 ${
                        isProcessing
                          ? 'bg-accent-blue/5 border-l-accent-blue/50'
                          : 'bg-accent-emerald/5 border-l-accent-emerald/50'
                      }`}>
                        <div className="flex items-start gap-1.5">
                          {isCompleted && <Quote className="w-2.5 h-2.5 text-accent-emerald shrink-0 mt-0.5 rotate-180" />}
                          <p className={`text-[10.5px] leading-relaxed ${
                            isProcessing ? 'text-accent-blue/90 italic' : 'text-slate-200'
                          }`}>
                            {isProcessing && (
                              <motion.span
                                animate={{ opacity: [1, 0.4, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="inline-block"
                              >
                                {agent.outputSummary}
                              </motion.span>
                            )}
                            {isCompleted && agent.outputSummary}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {i < agents.length - 1 && (
                <div className="flex justify-start pl-4 py-0.5">
                  <ArrowDown
                    className={`w-3 h-3 transition-colors duration-500 ${
                      agent.status === 'completed' ? 'text-accent-emerald' : 'text-surface-500'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </PanelShell>
  );
}
