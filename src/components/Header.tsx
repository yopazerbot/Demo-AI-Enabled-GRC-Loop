import { Shield, Zap } from 'lucide-react';
import type { DemoPhase } from '../types';

const phaseLabels: Record<DemoPhase, string> = {
  idle: 'Ready',
  new_event_received: 'Ingesting Threat',
  threat_analysis_in_progress: 'Analyzing',
  risk_mapped: 'Mapping Risk',
  policy_generated: 'Drafting Policy',
  awaiting_approval: 'Awaiting Approval',
  deployment_in_progress: 'Deploying',
  deployment_complete: 'Complete',
};

interface HeaderProps {
  phase: DemoPhase;
}

export function Header({ phase }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 py-2.5 border-b border-surface-border bg-surface-800/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20">
          <Shield className="w-5 h-5 text-accent-cyan" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-white tracking-tight leading-none flex items-center gap-2">
            GRC Control Loop
            <span className="text-[9px] font-medium text-slate-500 bg-surface-600 px-1.5 py-0.5 rounded">
              DEMO
            </span>
          </h1>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {phaseLabels[phase]}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-700/50 border border-surface-border">
          <Zap className="w-3 h-3 text-accent-amber" />
          <span className="text-[10px] text-slate-400">Powered by</span>
          <span className="text-[10px] text-slate-300 font-semibold">AI Orchestration</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-700/50 border border-surface-border">
          <span className="text-[10px] text-slate-300 font-medium">Verhelst Industries</span>
        </div>
      </div>
    </header>
  );
}
