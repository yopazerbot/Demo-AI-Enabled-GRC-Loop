import { Bot, ArrowRight, Check, Loader2, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelShell } from './PanelShell';
import type { AgentState, AgentStatus } from '../types';

const statusConfig: Record<AgentStatus, { icon: typeof Circle; color: string; dotClass: string; label: string }> = {
  idle: {
    icon: Circle,
    color: 'text-status-idle',
    dotClass: 'bg-status-idle',
    label: 'Idle',
  },
  processing: {
    icon: Loader2,
    color: 'text-status-processing',
    dotClass: 'bg-status-processing',
    label: 'Processing',
  },
  completed: {
    icon: Check,
    color: 'text-status-complete',
    dotClass: 'bg-status-complete',
    label: 'Complete',
  },
};

function AgentCard({ agent, index }: { agent: AgentState; index: number }) {
  const cfg = statusConfig[agent.status];
  const StatusIcon = cfg.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className={`
        panel-inner p-3 transition-all duration-300
        ${agent.status === 'processing' ? 'glow-border-active' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Status indicator */}
        <div className={`
          w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-300
          ${agent.status === 'processing'
            ? 'bg-accent-blue/15 border border-accent-blue/30'
            : agent.status === 'completed'
              ? 'bg-accent-emerald/15 border border-accent-emerald/30'
              : 'bg-surface-600 border border-surface-border'
          }
        `}>
          <StatusIcon
            className={`w-4 h-4 ${cfg.color} ${agent.status === 'processing' ? 'animate-spin' : ''}`}
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-xs font-semibold text-slate-200">{agent.name}</p>
            <span className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded ${
              agent.status === 'processing'
                ? 'bg-accent-blue/15 text-accent-blue'
                : agent.status === 'completed'
                  ? 'bg-accent-emerald/15 text-accent-emerald'
                  : 'bg-surface-600 text-slate-500'
            }`}>
              {cfg.label}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed mb-1">
            {agent.role}
          </p>

          {/* Output summary */}
          <AnimatePresence>
            {agent.outputSummary && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className={`text-[11px] leading-relaxed mt-1.5 px-2.5 py-2 rounded border-l-2 ${
                  agent.status === 'processing'
                    ? 'bg-accent-blue/5 border-accent-blue/40 text-accent-blue/80'
                    : 'bg-accent-emerald/5 border-accent-emerald/40 text-accent-emerald/80'
                }`}>
                  {agent.outputSummary}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function SignalFlow({ agents }: { agents: AgentState[] }) {
  // Determine which connections are active
  const connections = [
    { from: 0, to: 1, active: agents[0].status === 'completed' },
    { from: 1, to: 2, active: agents[1].status === 'completed' },
  ];

  return (
    <div className="flex items-center justify-center gap-1 py-1">
      {agents.map((agent, i) => (
        <div key={agent.id} className="flex items-center gap-1">
          {/* Node dot */}
          <div
            className={`
              w-3 h-3 rounded-full transition-all duration-500 flex items-center justify-center
              ${agent.status === 'completed'
                ? 'bg-accent-emerald shadow-[0_0_8px_rgba(16,185,129,0.4)]'
                : agent.status === 'processing'
                  ? 'bg-accent-blue shadow-[0_0_8px_rgba(59,130,246,0.4)] animate-pulse'
                  : 'bg-surface-500'
              }
            `}
          >
            {agent.status === 'completed' && (
              <Check className="w-2 h-2 text-white" />
            )}
          </div>

          {/* Connection line */}
          {i < agents.length - 1 && (
            <div className="flex items-center gap-0.5">
              <div className={`h-px w-6 transition-colors duration-500 ${
                connections[i]?.active ? 'bg-accent-emerald' : 'bg-surface-500'
              }`} />
              <ArrowRight className={`w-3 h-3 transition-colors duration-500 ${
                connections[i]?.active ? 'text-accent-emerald' : 'text-surface-500'
              }`} />
              <div className={`h-px w-6 transition-colors duration-500 ${
                connections[i]?.active ? 'bg-accent-emerald' : 'bg-surface-500'
              }`} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

interface Props {
  agents: AgentState[];
}

export function AgentPanel({ agents }: Props) {
  const activeCount = agents.filter((a) => a.status !== 'idle').length;
  const completeCount = agents.filter((a) => a.status === 'completed').length;

  return (
    <PanelShell
      title="Agent Orchestration"
      icon={Bot}
      accentColor="text-accent-blue"
      badge={activeCount > 0 ? `${completeCount}/${agents.length}` : undefined}
      badgeColor={
        completeCount === agents.length
          ? 'bg-accent-emerald/15 text-accent-emerald'
          : 'bg-accent-blue/15 text-accent-blue'
      }
    >
      <div className="flex flex-col gap-2 h-full">
        {/* Signal flow visualization */}
        <SignalFlow agents={agents} />

        {/* Agent cards */}
        <div className="flex-1 space-y-2 overflow-auto">
          {agents.map((agent, i) => (
            <AgentCard key={agent.id} agent={agent} index={i} />
          ))}
        </div>
      </div>
    </PanelShell>
  );
}
