import { useState, useEffect } from 'react';
import { Server, CheckCircle2, XCircle, Loader2, Check } from 'lucide-react';
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

const PHASES_WITH_DATA: DemoPhase[] = [
  'awaiting_approval',
  'deployment_in_progress',
  'environment_updated',
  'deployment_complete',
];

const DEPLOYMENT_STEPS = [
  'Compiling policy-as-code artifact…',
  'Pushing configuration to target systems…',
  'Checking resource configurations…',
  'Validating compliance state…',
];

function percentCompliant(assets: { compliant: boolean }[]): number {
  if (assets.length === 0) return 0;
  return Math.round((assets.filter((a) => a.compliant).length / assets.length) * 100);
}

function DeploymentAnimation() {
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStepIdx((i) => Math.min(i + 1, DEPLOYMENT_STEPS.length - 1));
    }, 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col h-full justify-center gap-1.5 px-2">
      {DEPLOYMENT_STEPS.map((step, i) => {
        const isDone = i < stepIdx;
        const isCurrent = i === stepIdx;
        const isPending = i > stepIdx;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: isPending ? 0.35 : 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border transition-colors duration-300 ${
              isDone ? 'bg-accent-emerald/10 border-accent-emerald/30'
              : isCurrent ? 'bg-accent-blue/10 border-accent-blue/40 shadow-[0_0_16px_rgba(37,99,235,0.2)]'
              : 'bg-surface-700/40 border-surface-border'
            }`}
          >
            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0">
              {isDone && <Check className="w-4 h-4 text-accent-emerald" />}
              {isCurrent && <Loader2 className="w-4 h-4 text-accent-blue animate-spin" />}
              {isPending && <div className="w-2 h-2 rounded-full bg-surface-400" />}
            </div>
            <p className={`text-xs font-medium ${
              isDone ? 'text-accent-emerald' : isCurrent ? 'text-accent-blue' : 'text-slate-500'
            }`}>
              {step}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

export function EnvironmentPanel({ phase, scenario, isActive, isDimmed }: Props) {
  const showTarget = phase === 'environment_updated' || phase === 'deployment_complete';
  const deploying = phase === 'deployment_in_progress';
  const hasData = PHASES_WITH_DATA.includes(phase);
  const env = showTarget ? scenario.envAfter : scenario.envBefore;

  const pct = percentCompliant(env.affectedAssets);
  const compliantCount = env.affectedAssets.filter((a) => a.compliant).length;
  const total = env.affectedAssets.length;

  return (
    <PanelShell
      title="Corporate Environment"
      icon={Server}
      accentColor="text-accent-emerald"
      isActive={isActive}
      isDimmed={isDimmed}
      badge={showTarget ? 'TARGET STATE' : deploying ? 'UPDATING…' : hasData ? 'CURRENT STATE' : undefined}
      badgeColor={
        showTarget ? 'bg-accent-emerald/15 text-accent-emerald'
        : deploying ? 'bg-accent-blue/15 text-accent-blue'
        : 'bg-accent-amber/15 text-accent-amber'
      }
    >
      <AnimatePresence mode="wait">
        {deploying && (
          <motion.div key="deploying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            <DeploymentAnimation />
          </motion.div>
        )}
        {hasData && !deploying && (
          <motion.div key={`env-${scenario.id}-${showTarget}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col gap-4">
            {/* Headline: assets compliant */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">Critical Assets Compliant</p>
                <div className="flex items-end gap-2">
                  <motion.span key={compliantCount} initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} className={`text-4xl font-bold ${showTarget ? 'text-accent-emerald' : 'text-slate-200'}`}>
                    {compliantCount}
                  </motion.span>
                  <span className="text-xl text-slate-500 mb-1">of {total}</span>
                  <span className={`text-sm font-semibold mb-1.5 ${showTarget ? 'text-accent-emerald' : 'text-slate-400'}`}>
                    ({pct}%)
                  </span>
                </div>
                <div className="w-56 h-2 bg-surface-600 rounded-full overflow-hidden mt-2">
                  <motion.div
                    className={showTarget ? 'h-full bg-gradient-to-r from-accent-emerald/80 to-accent-emerald' : 'h-full bg-gradient-to-r from-accent-amber/80 to-accent-amber'}
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
        {!hasData && !deploying && (
          <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center h-full">
            <p className="text-sm text-slate-600">Environment view appears at approval</p>
          </motion.div>
        )}
      </AnimatePresence>
    </PanelShell>
  );
}
