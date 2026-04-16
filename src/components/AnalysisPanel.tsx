import { Search, BookOpen, Building2, GitBranch } from 'lucide-react';
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
  const rm = scenario.riskMapping;
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
          <motion.div key={`mapped-${scenario.id}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="space-y-3 h-full">
            <div className="p-3 rounded-lg bg-accent-indigo/10 border border-accent-indigo/30">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-4 h-4 text-accent-indigo" />
                <span className="text-[10px] uppercase tracking-wider text-accent-indigo font-semibold">{s.isoTheme}</span>
              </div>
              <p className="text-sm font-bold text-white">{s.isoCode}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{s.isoDetail}</p>
            </div>
            <div className="space-y-2.5">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Exposure by Entity</p>
              {rm.affectedEntities.map((entity, i) => {
                const isGroup = entity.entityId === 'northstar-group';
                return (
                  <div key={entity.entityId}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        {isGroup ? <Building2 className="w-3.5 h-3.5 text-accent-indigo" /> : <GitBranch className="w-3.5 h-3.5 text-accent-purple" />}
                        <span className="text-xs font-semibold text-slate-200">{entity.entityName}</span>
                      </div>
                      <span className={`text-sm font-bold ${entity.localExposure >= 60 ? 'text-severity-critical' : 'text-severity-high'}`}>{entity.localExposure}%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-600 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${entity.localExposure >= 60 ? 'bg-gradient-to-r from-severity-high to-severity-critical' : 'bg-gradient-to-r from-severity-medium to-severity-high'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${entity.localExposure}%` }}
                        transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-auto p-2.5 rounded-lg bg-surface-700/50 border-l-2 border-l-severity-high">
              <p className="text-[11px] text-slate-300 leading-relaxed">
                <span className="font-bold text-severity-high">{s.callout}</span>{s.calloutHighlight}
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
