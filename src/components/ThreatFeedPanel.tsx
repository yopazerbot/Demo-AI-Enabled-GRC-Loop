import { Rss } from 'lucide-react';
import { PanelShell } from './PanelShell';
import type { DemoPhase } from '../types';

interface Props {
  phase: DemoPhase;
  onTrigger: () => void;
}

export function ThreatFeedPanel({ phase, onTrigger }: Props) {
  return (
    <PanelShell
      title="Threat Intelligence Feed"
      icon={Rss}
      accentColor="text-accent-red"
      badge={phase === 'idle' ? 'LIVE' : 'EVENT ACTIVE'}
      badgeColor={phase === 'idle' ? 'bg-accent-emerald/15 text-accent-emerald' : 'bg-accent-red/15 text-accent-red'}
    >
      <div className="flex flex-col gap-3 h-full">
        {/* Placeholder content */}
        <div className="flex-1 flex items-center justify-center">
          {phase === 'idle' ? (
            <div className="text-center">
              <p className="text-sm text-slate-400 mb-4">
                Monitoring Nordic CERT / MISP Community feed
              </p>
              <button
                onClick={onTrigger}
                className="px-5 py-2.5 bg-accent-cyan/10 hover:bg-accent-cyan/20 border border-accent-cyan/30 hover:border-accent-cyan/50 rounded-lg text-accent-cyan text-sm font-medium transition-all duration-200 cursor-pointer"
              >
                Simulate Incoming Threat Event
              </button>
            </div>
          ) : (
            <div className="w-full space-y-2">
              <div className="panel-inner p-3 animate-pulse">
                <div className="h-3 bg-surface-500 rounded w-3/4 mb-2" />
                <div className="h-2 bg-surface-500 rounded w-1/2" />
              </div>
              <p className="text-xs text-slate-500 text-center mt-2">
                Threat event feed — implemented in Phase 2
              </p>
            </div>
          )}
        </div>
      </div>
    </PanelShell>
  );
}
