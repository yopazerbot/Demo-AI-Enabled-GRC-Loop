import { Server } from 'lucide-react';
import { PanelShell } from './PanelShell';
import type { DemoPhase } from '../types';

interface Props {
  phase: DemoPhase;
}

export function EnvironmentPanel({ phase }: Props) {
  const deployed = phase === 'deployment_complete';
  const deploying = phase === 'deployment_in_progress';

  return (
    <PanelShell
      title="Corporate Environment"
      icon={Server}
      accentColor="text-accent-emerald"
      badge={deployed ? 'UPDATED' : deploying ? 'DEPLOYING' : undefined}
      badgeColor={deployed ? 'bg-accent-emerald/15 text-accent-emerald' : 'bg-accent-blue/15 text-accent-blue'}
    >
      <div className="flex items-center justify-center h-full">
        {deploying ? (
          <div className="text-center space-y-2">
            <div className="w-8 h-8 mx-auto border-2 border-accent-blue/30 border-t-accent-blue rounded-full animate-spin" />
            <p className="text-sm text-slate-300">Deploying policy to environment…</p>
          </div>
        ) : deployed ? (
          <div className="w-full space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="panel-inner p-3 text-center">
                <p className="text-[10px] text-slate-400 uppercase">Group Score</p>
                <p className="text-lg font-semibold text-accent-emerald">89%</p>
              </div>
              <div className="panel-inner p-3 text-center">
                <p className="text-[10px] text-slate-400 uppercase">Subsidiary Score</p>
                <p className="text-lg font-semibold text-accent-emerald">86%</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 text-center">
              Full environment view — implemented in Phase 4
            </p>
          </div>
        ) : (
          <p className="text-xs text-slate-500">
            Awaiting approved deployment
          </p>
        )}
      </div>
    </PanelShell>
  );
}
