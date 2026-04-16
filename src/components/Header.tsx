import { Shield, Building2 } from 'lucide-react';
import type { DemoPhase } from '../types';

const phaseLabels: Record<DemoPhase, string> = {
  idle: 'Awaiting Threat Intelligence',
  new_event_received: 'New Event Received',
  threat_analysis_in_progress: 'Threat Analysis In Progress',
  risk_mapped: 'Risk Scenario Mapped',
  policy_generated: 'Policy Artifact Generated',
  awaiting_approval: 'Awaiting Governance Approval',
  deployment_in_progress: 'Deploying to Environment',
  deployment_complete: 'Control Loop Complete',
};

const phaseColors: Record<DemoPhase, string> = {
  idle: 'bg-surface-400',
  new_event_received: 'bg-accent-amber',
  threat_analysis_in_progress: 'bg-accent-blue',
  risk_mapped: 'bg-accent-indigo',
  policy_generated: 'bg-accent-purple',
  awaiting_approval: 'bg-accent-amber',
  deployment_in_progress: 'bg-accent-blue',
  deployment_complete: 'bg-accent-emerald',
};

interface HeaderProps {
  phase: DemoPhase;
}

export function Header({ phase }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-surface-border bg-surface-800/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20">
          <Shield className="w-5 h-5 text-accent-cyan" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-white tracking-tight leading-none">
            GRC Control Loop
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            AI-Driven Cyber Risk — Governance Engineering Demo
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-700 border border-surface-border">
          <Building2 className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-300 font-medium">Northstar Group</span>
          <span className="text-xs text-slate-500">+1 entity</span>
        </div>

        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${phaseColors[phase]} ${phase !== 'idle' && phase !== 'deployment_complete' ? 'animate-pulse' : ''}`} />
          <span className="text-xs text-slate-300 font-medium">
            {phaseLabels[phase]}
          </span>
        </div>
      </div>
    </header>
  );
}
