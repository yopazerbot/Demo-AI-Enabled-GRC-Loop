import { Search } from 'lucide-react';
import { PanelShell } from './PanelShell';
import type { DemoPhase } from '../types';

interface Props {
  phase: DemoPhase;
}

export function AnalysisPanel({ phase }: Props) {
  const active = ['risk_mapped', 'policy_generated', 'awaiting_approval', 'deployment_in_progress', 'deployment_complete'].includes(phase);

  return (
    <PanelShell
      title="Analysis & Mapping"
      icon={Search}
      accentColor="text-accent-indigo"
      badge={active ? 'MAPPED' : undefined}
      badgeColor="bg-accent-indigo/15 text-accent-indigo"
    >
      <div className="flex items-center justify-center h-full">
        {active ? (
          <div className="w-full space-y-2">
            <div className="panel-inner p-3">
              <div className="h-3 bg-surface-500/60 rounded w-full mb-2" />
              <div className="h-2 bg-surface-500/40 rounded w-2/3 mb-2" />
              <div className="h-2 bg-surface-500/40 rounded w-1/2" />
            </div>
            <p className="text-xs text-slate-500 text-center">
              Risk mapping details — implemented in Phase 3
            </p>
          </div>
        ) : (
          <p className="text-xs text-slate-500">
            Awaiting threat analysis completion
          </p>
        )}
      </div>
    </PanelShell>
  );
}
