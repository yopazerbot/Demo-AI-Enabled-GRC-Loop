import { FileCode, Shield, Fingerprint, Key, ScanSearch, Clock, Code, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelShell } from './PanelShell';
import type { DemoPhase } from '../types';
import type { ScenarioData } from '../data/scenarioTypes';

const VISIBLE_PHASES: DemoPhase[] = ['policy_generated', 'awaiting_approval', 'deployment_in_progress', 'deployment_complete'];

const ICON_MAP = {
  fingerprint: Fingerprint,
  key: Key,
  shield: Shield,
  scan: ScanSearch,
  clock: Clock,
  code: Code,
};

interface Props {
  phase: DemoPhase;
  scenario: ScenarioData;
  isActive: boolean;
  isDimmed: boolean;
}

export function PolicyPanel({ phase, scenario, isActive, isDimmed }: Props) {
  const active = VISIBLE_PHASES.includes(phase);
  const generating = phase === 'risk_mapped';
  const p = scenario.policySummary;

  return (
    <PanelShell
      title="Policy Studio"
      icon={FileCode}
      accentColor="text-accent-purple"
      isActive={isActive}
      isDimmed={isDimmed}
      badge={active ? 'DRAFTED' : generating ? '…' : undefined}
      badgeColor="bg-accent-purple/15 text-accent-purple"
    >
      <AnimatePresence mode="wait">
        {generating && (
          <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center h-full gap-3">
            <div className="w-10 h-10 border-2 border-accent-purple/30 border-t-accent-purple rounded-full animate-spin" />
            <p className="text-sm text-slate-400">Drafting policy…</p>
          </motion.div>
        )}
        {active && (
          <motion.div key={`policy-${scenario.id}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="flex flex-col gap-3 h-full">
            <div>
              <p className="text-[10px] font-mono text-slate-500 mb-1">{scenario.policy.policyId}</p>
              <p className="text-sm font-bold text-white leading-tight">{p.title}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{p.subtitle}</p>
            </div>
            <div className="space-y-2 my-auto">
              {p.requirements.map((req, i) => {
                const Icon = ICON_MAP[req.icon];
                const colors = ['bg-accent-cyan/15 text-accent-cyan', 'bg-accent-indigo/15 text-accent-indigo', 'bg-accent-purple/15 text-accent-purple'];
                const color = colors[i % colors.length];
                return (
                  <div key={i} className="flex items-center gap-2.5 p-2 rounded-lg bg-surface-700/50">
                    <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${color.split(' ')[0]}`}>
                      <Icon className={`w-4 h-4 ${color.split(' ')[1]}`} />
                    </div>
                    <p className="text-xs text-slate-200">{req.text}</p>
                  </div>
                );
              })}
            </div>
            <div className="p-2.5 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30">
              <div className="flex items-center gap-2 mb-1">
                <Globe className="w-3.5 h-3.5 text-accent-cyan" />
                <span className="text-[10px] uppercase tracking-wider text-accent-cyan font-bold">Scope</span>
              </div>
              <p className="text-xs text-accent-cyan font-semibold">{p.scope}</p>
            </div>
          </motion.div>
        )}
        {!active && !generating && (
          <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center h-full">
            <p className="text-sm text-slate-600">Waiting for risk assessment</p>
          </motion.div>
        )}
      </AnimatePresence>
    </PanelShell>
  );
}
