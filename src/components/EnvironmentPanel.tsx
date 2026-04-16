import { Server, CheckCircle2, XCircle, Loader2, TrendingUp } from 'lucide-react';
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

export function EnvironmentPanel({ phase, scenario, isActive, isDimmed }: Props) {
  const deployed = phase === 'deployment_complete';
  const deploying = phase === 'deployment_in_progress';
  const env = deployed ? scenario.envAfter : scenario.envBefore;
  const showData = phase !== 'idle' && !deploying;
  const delta = scenario.envAfter.complianceScore - scenario.envBefore.complianceScore;
  const compliantCount = env.affectedAssets.filter((a) => a.compliant).length;

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
            {/* Big compliance score */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-end gap-1.5">
                  <motion.span key={env.complianceScore} initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} className={`text-4xl font-bold ${deployed ? 'text-accent-emerald' : 'text-slate-200'}`}>
                    {env.complianceScore}
                  </motion.span>
                  <span className="text-lg text-slate-500 mb-1">%</span>
                  <span className="text-[11px] text-slate-500 mb-2 uppercase tracking-wider">compliant</span>
                </div>
                <div className="w-48 h-2 bg-surface-600 rounded-full overflow-hidden mt-1.5">
                  <motion.div
                    className={deployed ? 'h-full bg-gradient-to-r from-accent-emerald/80 to-accent-emerald' : 'h-full bg-gradient-to-r from-accent-amber/80 to-accent-amber'}
                    initial={{ width: 0 }} animate={{ width: `${env.complianceScore}%` }} transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                  />
                </div>
              </div>
              {deployed && delta > 0 && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
                  className="flex items-center gap-1 text-accent-emerald bg-accent-emerald/10 px-3 py-1.5 rounded-lg border border-accent-emerald/25">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-bold">+{delta}%</span>
                </motion.div>
              )}
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

            {/* Summary */}
            <div className="mt-auto flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald" />
                {compliantCount} compliant
              </span>
              <span className="flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5 text-slate-500" />
                {env.affectedAssets.length - compliantCount} non-compliant
              </span>
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
