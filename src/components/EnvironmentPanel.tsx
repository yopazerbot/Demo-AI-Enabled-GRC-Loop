import { Server, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelShell } from './PanelShell';
import type { DemoPhase } from '../types';
import type { ScenarioData } from '../data/scenarioTypes';

interface Props {
  phase: DemoPhase;
  scenario: ScenarioData;
  isActive: boolean;
  isDimmed: boolean;
}

function percentCompliant(assets: { compliant: boolean }[]): number {
  if (assets.length === 0) return 0;
  return Math.round((assets.filter((a) => a.compliant).length / assets.length) * 100);
}

export function EnvironmentPanel({ phase, scenario, isActive, isDimmed }: Props) {
  const deployed = phase === 'deployment_complete';
  const deploying = phase === 'deployment_in_progress';
  const env = deployed ? scenario.envAfter : scenario.envBefore;
  const showData = phase !== 'idle' && !deploying;

  const pct = percentCompliant(env.affectedAssets);
  const compliantCount = env.affectedAssets.filter((a) => a.compliant).length;
  const total = env.affectedAssets.length;

  return (
    <PanelShell title="Corporate Environment" icon={Server} accentColor="text-accent-emerald" isActive={isActive} isDimmed={isDimmed}
      badge={deployed ? 'UPDATED' : deploying ? 'DEPLOYING' : undefined}
      badgeColor={deployed ? 'bg-accent-emerald/15 text-accent-emerald' : 'bg-accent-blue/15 text-accent-blue'}
    >
      <AnimatePresence mode="wait">
        {deploying && (
          <motion.div key="deploying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center h-full gap-4">
            <Loader2 className="w-12 h-12 text-accent-blue animate-spin" />
            <p className="text-sm font-semibold text-white">Deploying policy…</p>
          </motion.div>
        )}
        {showData && (
          <motion.div key={`env-${scenario.id}-${deployed}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col gap-4">
            {/* Headline: assets compliant */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">Critical Assets Compliant</p>
                <div className="flex items-end gap-2">
                  <motion.span key={compliantCount} initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} className={`text-4xl font-bold ${deployed ? 'text-accent-emerald' : 'text-slate-200'}`}>
                    {compliantCount}
                  </motion.span>
                  <span className="text-xl text-slate-500 mb-1">of {total}</span>
                  <span className={`text-sm font-semibold mb-1.5 ${deployed ? 'text-accent-emerald' : 'text-slate-400'}`}>
                    ({pct}%)
                  </span>
                </div>
                <div className="w-56 h-2 bg-surface-600 rounded-full overflow-hidden mt-2">
                  <motion.div
                    className={deployed ? 'h-full bg-gradient-to-r from-accent-emerald/80 to-accent-emerald' : 'h-full bg-gradient-to-r from-accent-amber/80 to-accent-amber'}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>

            {/* Asset grid */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Assets</p>
              <div className="grid grid-cols-2 gap-1.5">
                {env.affectedAssets.map((asset, i) => (
                  <motion.div
                    key={asset.id}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="flex items-center gap-2 p-2 rounded-lg bg-surface-700/50 border border-surface-border"
                  >
                    {asset.compliant
                      ? <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald shrink-0" />
                      : <XCircle className="w-3.5 h-3.5 text-severity-high shrink-0" />
                    }
                    <div className="min-w-0">
                      <p className="text-[11px] text-slate-200 truncate">{asset.name}</p>
                      <p className="text-[9px] text-slate-500">{asset.type}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        {phase === 'idle' && (
          <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center h-full">
            <p className="text-sm text-slate-600">Awaiting deployment</p>
          </motion.div>
        )}
      </AnimatePresence>
    </PanelShell>
  );
}
