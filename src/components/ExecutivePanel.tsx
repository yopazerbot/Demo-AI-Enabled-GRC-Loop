import { BarChart3, AlertTriangle, CheckCircle2, ArrowRight, Wrench, ScrollText } from 'lucide-react';
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

type RiskLevel = 'high' | 'elevated' | 'moderate' | 'low';

function scoreToLevel(score: number): RiskLevel {
  if (score >= 40) return 'high';
  if (score >= 25) return 'elevated';
  if (score >= 15) return 'moderate';
  return 'low';
}

const LEVEL_CONFIG: Record<RiskLevel, { label: string; color: string; bg: string; within: boolean }> = {
  high:     { label: 'High',     color: 'text-severity-critical', bg: 'bg-severity-critical/10 border-severity-critical/40', within: false },
  elevated: { label: 'Elevated', color: 'text-severity-high',     bg: 'bg-severity-high/10 border-severity-high/40',         within: false },
  moderate: { label: 'Moderate', color: 'text-severity-medium',   bg: 'bg-severity-medium/10 border-severity-medium/40',     within: true  },
  low:      { label: 'Low',      color: 'text-accent-emerald',    bg: 'bg-accent-emerald/10 border-accent-emerald/40',       within: true  },
};

function RiskBlock({ level, label }: { level: RiskLevel; label: string }) {
  const cfg = LEVEL_CONFIG[level];
  return (
    <div className={`flex-1 p-2.5 rounded-lg border ${cfg.bg}`}>
      <p className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">{label}</p>
      <p className={`text-xl font-bold mt-0.5 ${cfg.color}`}>{cfg.label}</p>
      <div className={`flex items-center gap-1 mt-1 text-[9px] font-bold uppercase tracking-wider ${
        cfg.within ? 'text-accent-emerald' : 'text-severity-critical'
      }`}>
        {cfg.within
          ? <><CheckCircle2 className="w-2.5 h-2.5" /> Within appetite</>
          : <><AlertTriangle className="w-2.5 h-2.5" /> Outside appetite</>
        }
      </div>
    </div>
  );
}

const PHASES_WITH_DATA: DemoPhase[] = ['risk_mapped', 'policy_generated', 'awaiting_approval', 'deployment_in_progress', 'environment_updated', 'deployment_complete'];

export function ExecutivePanel({ phase, scenario, isActive, isDimmed }: Props) {
  const deployed = phase === 'deployment_complete';
  const hasData = PHASES_WITH_DATA.includes(phase);
  const beforeLevel = scoreToLevel(scenario.metricsBefore.overallRiskScore);
  const afterLevel = scoreToLevel(scenario.metricsAfter.overallRiskScore);
  const currentLevel = deployed ? afterLevel : beforeLevel;

  return (
    <PanelShell
      title="Board Summary"
      icon={BarChart3}
      accentColor="text-accent-cyan"
      isActive={isActive}
      isDimmed={isDimmed}
      badge={deployed ? 'REFRESHED' : hasData ? 'LIVE' : undefined}
      badgeColor={deployed ? 'bg-accent-emerald/15 text-accent-emerald' : 'bg-accent-cyan/15 text-accent-cyan'}
    >
      <AnimatePresence mode="wait">
        {hasData ? (
          <motion.div
            key={`exec-${scenario.id}-${deployed}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-3 h-full"
          >
            {!deployed ? (
              /* Before deployment: show current state only */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="p-3 rounded-lg border border-severity-critical/40 bg-severity-critical/10"
                style={phase === 'risk_mapped' ? { boxShadow: '0 0 0 1px rgba(239,68,68,0.3), 0 0 24px -4px rgba(239,68,68,0.35)' } : undefined}
              >
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Cyber Risk Level</p>
                <p className={`text-3xl font-bold ${LEVEL_CONFIG[currentLevel].color}`}>
                  {LEVEL_CONFIG[currentLevel].label}
                </p>
                <div className="flex items-center gap-1 mt-1.5 text-[10px] font-bold uppercase tracking-wider text-severity-critical">
                  <AlertTriangle className="w-3 h-3" /> Outside Appetite
                </div>
                {phase === 'risk_mapped' && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-[11px] text-slate-300 mt-2 leading-relaxed"
                  >
                    The board needs to act — risk now sits outside stated appetite.
                  </motion.p>
                )}
              </motion.div>
            ) : (
              /* After deployment: show before → after comparison */
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Cyber Risk Level</p>
                <div className="flex items-stretch gap-2">
                  <RiskBlock level={beforeLevel} label="Before" />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-center"
                  >
                    <div className="w-7 h-7 rounded-full bg-accent-emerald/20 border border-accent-emerald/40 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-accent-emerald" />
                    </div>
                  </motion.div>
                  <RiskBlock level={afterLevel} label="After" />
                </div>
              </motion.div>
            )}

            {/* Control action that brought risk back */}
            {deployed && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="p-3 rounded-lg bg-accent-emerald/5 border border-accent-emerald/30"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Wrench className="w-3.5 h-3.5 text-accent-emerald" />
                  <span className="text-[10px] uppercase tracking-wider text-accent-emerald font-bold">
                    Control Action Taken
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {scenario.controlAction}
                </p>
              </motion.div>
            )}

            {/* Board statement */}
            <div className="mt-auto p-2.5 rounded-lg bg-surface-700/40 border border-surface-border">
              <div className="flex items-start gap-2">
                <ScrollText className="w-3.5 h-3.5 text-accent-cyan shrink-0 mt-0.5" />
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-accent-cyan font-bold mb-0.5">
                    Board Statement
                  </p>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {deployed ? scenario.boardStatement.after : scenario.boardStatement.before}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center h-full">
            <p className="text-sm text-slate-600">Board view appears after risk is mapped</p>
          </motion.div>
        )}
      </AnimatePresence>
    </PanelShell>
  );
}
