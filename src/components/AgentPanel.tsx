import { Bot, Check, Loader2, Circle, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { PanelShell } from './PanelShell';
import type { AgentState, AgentStatus } from '../types';

const statusConfig: Record<AgentStatus, { icon: typeof Circle; color: string; bg: string; label: string }> = {
  idle: {
    icon: Circle,
    color: 'text-slate-500',
    bg: 'bg-surface-600 border-surface-border',
    label: 'Waiting',
  },
  processing: {
    icon: Loader2,
    color: 'text-accent-blue',
    bg: 'bg-accent-blue/15 border-accent-blue/40',
    label: 'Working',
  },
  completed: {
    icon: Check,
    color: 'text-accent-emerald',
    bg: 'bg-accent-emerald/15 border-accent-emerald/40',
    label: 'Done',
  },
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
      <div className="flex flex-col gap-3 h-full justify-center">
        {agents.map((agent, i) => {
          const cfg = statusConfig[agent.status];
          const StatusIcon = cfg.icon;
          const shortLabel = AGENT_SHORT_LABELS[agent.id] || agent.name;

          return (
            <div key={agent.id}>
              <motion.div
                layout
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`
                  flex items-center gap-3 p-3 rounded-lg border transition-all duration-500
                  ${cfg.bg}
                  ${agent.status === 'processing' ? 'shadow-[0_0_20px_rgba(59,130,246,0.2)]' : ''}
                `}
              >
                {/* Status icon */}
                <div className="w-10 h-10 rounded-lg bg-surface-900/40 flex items-center justify-center shrink-0">
                  <StatusIcon
                    className={`w-5 h-5 ${cfg.color} ${agent.status === 'processing' ? 'animate-spin' : ''}`}
                  />
                </div>

                {/* Label */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-100">{shortLabel}</p>
                  <p className={`text-[11px] font-medium ${cfg.color}`}>
                    {cfg.label}
                  </p>
                </div>
              </motion.div>

              {/* Connector arrow */}
              {i < agents.length - 1 && (
                <div className="flex justify-start pl-[1.25rem] py-1">
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
