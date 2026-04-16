import { Search, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelShell } from './PanelShell';
import type { DemoPhase } from '../types';
import type { ScenarioData } from '../data/scenarioTypes';

const VISIBLE_PHASES: DemoPhase[] = ['risk_mapped', 'policy_generated', 'awaiting_approval', 'deployment_in_progress', 'deployment_complete'];

interface Props {
  phase: DemoPhase;
  scenario: ScenarioData;
  isActive: boolean;
  isDimmed: boolean;
}

export function AnalysisPanel({ phase, scenario, isActive, isDimmed }: Props) {
  const active = VISIBLE_PHASES.includes(phase);
  const analysing = phase === 'threat_analysis_in_progress';
  const s = scenario.analysisSummary;

  return (
    <PanelShell
      title="Risk Mapping"
      icon={Search}
      accentColor="text-accent-indigo"
      isActive={isActive}
      isDimmed={isDimmed}
      badge={active ? s.isoCode : analysing ? '…' : undefined}
      badgeColor="bg-accent-indigo/15 text-accent-indigo"
    >
      <AnimatePresence mode="wait">
        {analysing && (
          <motion.div key="analysing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center h-full gap-3">
            <div className="w-10 h-10 border-2 border-accent-blue/30 border-t-accent-blue rounded-full animate-spin" />
            <p className="text-sm text-slate-400">Mapping to risk scenarios…</p>
          </motion.div>
        )}
        {active && (
          <motion.div key={`mapped-${scenario.id}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="space-y-4 h-full flex flex-col">
            {/* ISO control theme */}
            <div className="p-3 rounded-lg bg-accent-indigo/10 border border-accent-indigo/30">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-4 h-4 text-accent-indigo" />
                <span className="text-[10px] uppercase tracking-wider text-accent-indigo font-semibold">{s.isoTheme}</span>
              </div>
              <p className="text-sm font-bold text-white">{s.isoCode}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{s.isoDetail}</p>
            </div>

            {/* Single exposure bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Residual Exposure</span>
                <span className={`text-lg font-bold ${s.exposurePercent >= 60 ? 'text-severity-critical' : 'text-severity-high'}`}>
                  {s.exposurePercent}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-surface-600 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${s.exposurePercent >= 60 ? 'bg-gradient-to-r from-severity-high to-severity-critical' : 'bg-gradient-to-r from-severity-medium to-severity-high'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${s.exposurePercent}%` }}
                  transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Callout */}
            <div className="mt-auto p-3 rounded-lg bg-surface-700/50 border-l-2 border-l-severity-high">
              <p className="text-xs text-slate-300 leading-relaxed">
                {s.callout}
              </p>
            </div>
          </motion.div>
        )}
        {!active && !analysing && (
          <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center h-full">
            <p className="text-sm text-slate-600">Waiting for threat analysis</p>
          </motion.div>
        )}
      </AnimatePresence>
    </PanelShell>
  );
}
