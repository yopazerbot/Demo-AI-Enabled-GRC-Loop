import { Bot } from 'lucide-react';
import { PanelShell } from './PanelShell';
import type { AgentState } from '../types';

const statusDot: Record<string, string> = {
  idle: 'bg-status-idle',
  processing: 'bg-status-processing animate-pulse',
  completed: 'bg-status-complete',
};

interface Props {
  agents: AgentState[];
}

export function AgentPanel({ agents }: Props) {
  return (
    <PanelShell
      title="Agent Orchestration"
      icon={Bot}
      accentColor="text-accent-blue"
    >
      <div className="space-y-2">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="panel-inner p-3 flex items-start gap-3"
          >
            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${statusDot[agent.status]}`} />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-200">{agent.name}</p>
              <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                {agent.outputSummary || agent.description}
              </p>
            </div>
            <span className="ml-auto text-[10px] uppercase tracking-wider text-slate-500 shrink-0">
              {agent.status}
            </span>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}
