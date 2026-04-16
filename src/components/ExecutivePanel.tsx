import { BarChart3 } from 'lucide-react';
import { PanelShell } from './PanelShell';
import type { DemoPhase } from '../types';

interface Props {
  phase: DemoPhase;
}

export function ExecutivePanel({ phase }: Props) {
  const complete = phase === 'deployment_complete';

  return (
    <PanelShell
      title="Executive / Board Summary"
      icon={BarChart3}
      accentColor="text-accent-cyan"
      badge={complete ? 'REFRESHED' : undefined}
      badgeColor="bg-accent-cyan/15 text-accent-cyan"
    >
      <div className="flex items-center justify-center h-full">
        {complete ? (
          <div className="w-full space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="panel-inner p-3 text-center">
                <p className="text-[10px] text-slate-400 uppercase">Group Risk</p>
                <p className="text-lg font-semibold text-accent-emerald">18</p>
                <p className="text-[10px] text-slate-500">↓ from 34</p>
              </div>
              <div className="panel-inner p-3 text-center">
                <p className="text-[10px] text-slate-400 uppercase">Subsidiary Risk</p>
                <p className="text-lg font-semibold text-accent-emerald">22</p>
                <p className="text-[10px] text-slate-500">↓ from 42</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 text-center">
              Full executive dashboard — implemented in Phase 5
            </p>
          </div>
        ) : (
          <p className="text-xs text-slate-500">
            Metrics refresh after deployment
          </p>
        )}
      </div>
    </PanelShell>
  );
}
