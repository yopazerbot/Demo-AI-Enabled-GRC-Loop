import { FileCode } from 'lucide-react';
import { PanelShell } from './PanelShell';
import type { DemoPhase } from '../types';

interface Props {
  phase: DemoPhase;
}

export function PolicyPanel({ phase }: Props) {
  const active = ['policy_generated', 'awaiting_approval', 'deployment_in_progress', 'deployment_complete'].includes(phase);

  return (
    <PanelShell
      title="Policy Studio"
      icon={FileCode}
      accentColor="text-accent-purple"
      badge={active ? 'DRAFT READY' : undefined}
      badgeColor="bg-accent-purple/15 text-accent-purple"
    >
      <div className="flex items-center justify-center h-full">
        {active ? (
          <div className="w-full grid grid-cols-2 gap-2">
            <div className="panel-inner p-3">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">Human-Readable</p>
              <div className="space-y-1.5">
                <div className="h-2 bg-surface-500/50 rounded w-full" />
                <div className="h-2 bg-surface-500/50 rounded w-5/6" />
                <div className="h-2 bg-surface-500/50 rounded w-3/4" />
              </div>
            </div>
            <div className="panel-inner p-3">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">Policy-as-Code</p>
              <div className="space-y-1.5">
                <div className="h-2 bg-accent-cyan/10 rounded w-full" />
                <div className="h-2 bg-accent-cyan/10 rounded w-4/5" />
                <div className="h-2 bg-accent-cyan/10 rounded w-2/3" />
              </div>
            </div>
            <p className="col-span-2 text-xs text-slate-500 text-center">
              Policy details — implemented in Phase 3
            </p>
          </div>
        ) : (
          <p className="text-xs text-slate-500">
            Awaiting risk mapping completion
          </p>
        )}
      </div>
    </PanelShell>
  );
}
