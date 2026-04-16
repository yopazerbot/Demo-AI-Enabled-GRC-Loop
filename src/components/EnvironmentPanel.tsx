import { Server, Building2, GitBranch, CheckCircle2, XCircle, Loader2, TrendingUp } from 'lucide-react';
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
  const envData = deployed ? scenario.envAfter : scenario.envBefore;
  const showData = phase !== 'idle' && !deploying;

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
            <div className="flex flex-col gap-1.5">
              {scenario.envBefore.map((env, i) => (
                <motion.div key={env.entityId} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.3 }} className="flex items-center gap-2 text-xs text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
                  {env.entityName}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        {showData && (
          <motion.div key={`env-${scenario.id}-${deployed}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col gap-2.5">
            {envData.map((env, i) => {
              const isGroup = env.entityId === 'northstar-group';
              const prevScore = scenario.envBefore.find((e) => e.entityId === env.entityId)?.complianceScore ?? 0;
              const delta = env.complianceScore - prevScore;
              const compliantCount = env.affectedAssets.filter((a) => a.compliant).length;
              return (
                <motion.div key={env.entityId} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex-1 p-3 rounded-lg bg-surface-700/50 border border-surface-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {isGroup ? <Building2 className="w-4 h-4 text-accent-indigo" /> : <GitBranch className="w-4 h-4 text-accent-purple" />}
                      <span className="text-xs font-semibold text-slate-200">{isGroup ? 'Northstar Group' : 'Northstar Health'}</span>
                    </div>
                    {deployed && delta > 0 && (
                      <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.15 }} className="flex items-center gap-0.5 text-[10px] font-bold text-accent-emerald bg-accent-emerald/10 px-1.5 py-0.5 rounded">
                        <TrendingUp className="w-3 h-3" /> +{delta}%
                      </motion.span>
                    )}
                  </div>
                  <div className="flex items-end gap-1 mb-2">
                    <motion.span key={env.complianceScore} initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} className={`text-3xl font-bold ${deployed ? 'text-accent-emerald' : 'text-slate-200'}`}>{env.complianceScore}</motion.span>
                    <span className="text-sm text-slate-500 mb-1">%</span>
                    <span className="text-[10px] text-slate-500 ml-1.5 mb-1.5 uppercase tracking-wider">compliant</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-600 rounded-full overflow-hidden mb-2">
                    <motion.div className={deployed ? 'h-full bg-gradient-to-r from-accent-emerald/80 to-accent-emerald' : 'h-full bg-gradient-to-r from-accent-amber/80 to-accent-amber'} initial={{ width: 0 }} animate={{ width: `${env.complianceScore}%` }} transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }} />
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-accent-emerald" />{compliantCount}/{env.affectedAssets.length} assets</span>
                    <span className="flex items-center gap-1"><XCircle className="w-3 h-3 text-slate-500" />{env.affectedAssets.length - compliantCount} open</span>
                  </div>
                </motion.div>
              );
            })}
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
