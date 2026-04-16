import { Search, BookOpen, AlertTriangle, FileWarning } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelShell } from './PanelShell';
import type { DemoPhase } from '../types';
import type { ScenarioData } from '../data/scenarioTypes';

const VISIBLE_PHASES: DemoPhase[] = ['risk_mapped', 'policy_generated', 'awaiting_approval', 'deployment_in_progress', 'deployment_complete'];

const LEVEL_COLORS: Record<string, string> = {
  'Very High': 'text-severity-critical bg-severity-critical/15 border-severity-critical/30',
  'Critical':  'text-severity-critical bg-severity-critical/15 border-severity-critical/30',
  'High':      'text-severity-high bg-severity-high/15 border-severity-high/30',
  'Medium':    'text-severity-medium bg-severity-medium/15 border-severity-medium/30',
  'Low':       'text-accent-emerald bg-accent-emerald/15 border-accent-emerald/30',
};

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
      title="Risk Assessment"
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
          <motion.div key={`mapped-${scenario.id}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="space-y-3 h-full flex flex-col">
            {/* ISO control theme */}
            <div className="p-3 rounded-lg bg-accent-indigo/10 border border-accent-indigo/30">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-4 h-4 text-accent-indigo" />
                <span className="text-[10px] uppercase tracking-wider text-accent-indigo font-semibold">{s.isoTheme}</span>
              </div>
              <p className="text-sm font-bold text-white">{s.isoCode}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{s.isoDetail}</p>
            </div>

            {/* Risk statement */}
            <div className="p-3 rounded-lg bg-surface-700/50 border border-surface-border">
              <div className="flex items-center gap-2 mb-1.5">
                <FileWarning className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Risk Statement</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed mb-2">
                {s.riskStatement}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider">Likelihood</span>
                  <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${LEVEL_COLORS[s.likelihood]}`}>
                    {s.likelihood}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider">Impact</span>
                  <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${LEVEL_COLORS[s.impact]}`}>
                    {s.impact}
                  </span>
                </div>
              </div>
            </div>

            {/* Actual impact */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex-1 flex flex-col justify-center p-3 rounded-lg bg-severity-high/10 border border-severity-high/30"
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-severity-high" />
                <span className="text-[10px] uppercase tracking-wider text-severity-high font-bold">
                  Actual Impact
                </span>
              </div>
              <p className="text-sm text-white font-semibold leading-snug">
                {s.callout}
              </p>
            </motion.div>
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
