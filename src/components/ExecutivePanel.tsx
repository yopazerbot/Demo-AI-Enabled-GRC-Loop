import { BarChart3, Shield, AlertTriangle, CheckCircle2, ScrollText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelShell } from './PanelShell';
import type { DemoPhase, ExecutiveMetrics } from '../types';
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
  high:     { label: 'High',     color: 'text-severity-critical',  bg: 'bg-severity-critical/10 border-severity-critical/30', within: false },
  elevated: { label: 'Elevated', color: 'text-severity-high',      bg: 'bg-severity-high/10 border-severity-high/30',         within: false },
  moderate: { label: 'Moderate', color: 'text-severity-medium',    bg: 'bg-severity-medium/10 border-severity-medium/30',     within: true  },
  low:      { label: 'Low',      color: 'text-accent-emerald',     bg: 'bg-accent-emerald/10 border-accent-emerald/30',       within: true  },
};

function RiskAppetiteDial({ level }: { level: RiskLevel }) {
  const levels: RiskLevel[] = ['low', 'moderate', 'elevated', 'high'];
  const activeIdx = levels.indexOf(level);
  const cfg = LEVEL_CONFIG[level];

  return (
    <div className="space-y-2">
      {/* Big status */}
      <div className={`p-3 rounded-lg border ${cfg.bg}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold mb-0.5">
              Cyber Risk Level
            </p>
            <p className={`text-xl font-bold ${cfg.color}`}>{cfg.label}</p>
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded ${
            cfg.within ? 'bg-accent-emerald/15 text-accent-emerald' : 'bg-severity-critical/15 text-severity-critical'
          }`}>
            {cfg.within ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
            <span className="text-[9px] font-bold uppercase tracking-wider">
              {cfg.within ? 'Within Appetite' : 'Outside Appetite'}
            </span>
          </div>
        </div>
      </div>

      {/* Appetite scale */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">Risk Appetite Scale</span>
          <span className="text-[9px] text-slate-500">Threshold: Moderate</span>
        </div>
        <div className="flex items-center gap-0.5">
          {levels.map((l, i) => {
            const isActive = i === activeIdx;
            const lc = LEVEL_CONFIG[l];
            return (
              <motion.div
                key={l}
                animate={{ scale: isActive ? 1.02 : 1 }}
                className={`
                  flex-1 text-center py-1.5 rounded text-[9px] font-bold uppercase tracking-wider border transition-all
                  ${isActive
                    ? `${lc.bg} ${lc.color} border-current`
                    : 'bg-surface-700/40 text-slate-600 border-surface-border'
                  }
                `}
              >
                {lc.label}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ComplianceCard({ m, prev }: { m: ExecutiveMetrics; prev?: ExecutiveMetrics }) {
  const delta = prev ? m.compliancePosture - prev.compliancePosture : 0;

  return (
    <div className="p-3 rounded-lg bg-surface-700/50 border border-surface-border">
      <div className="flex items-center gap-2 mb-2">
        <Shield className="w-3.5 h-3.5 text-accent-emerald" />
        <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">
          ISO 27001 / NIS2 Compliance
        </span>
      </div>
      <div className="flex items-end gap-2">
        <motion.span
          key={m.compliancePosture}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          className={`text-3xl font-bold ${delta > 0 ? 'text-accent-emerald' : 'text-slate-200'}`}
        >
          {m.compliancePosture}
        </motion.span>
        <span className="text-sm text-slate-500 mb-1">%</span>
        {delta > 0 && (
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[11px] text-accent-emerald font-bold mb-1"
          >
            +{delta}pp
          </motion.span>
        )}
      </div>
      <div className="w-full h-1.5 bg-surface-600 rounded-full overflow-hidden mt-2">
        <motion.div
          className={delta > 0 ? 'h-full bg-gradient-to-r from-accent-emerald/80 to-accent-emerald' : 'h-full bg-gradient-to-r from-accent-amber/80 to-accent-amber'}
          initial={{ width: 0 }}
          animate={{ width: `${m.compliancePosture}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export function ExecutivePanel({ phase, scenario, isActive, isDimmed }: Props) {
  const deployed = phase === 'deployment_complete';
  const hasData = phase !== 'idle';
  const m = deployed ? scenario.metricsAfter : scenario.metricsBefore;
  const prev = deployed ? scenario.metricsBefore : undefined;
  const level = scoreToLevel(m.overallRiskScore);

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
            <RiskAppetiteDial level={level} />
            <ComplianceCard m={m} prev={prev} />

            {/* Board statement */}
            <div className="mt-auto p-2.5 rounded-lg bg-surface-700/40 border border-surface-border">
              <div className="flex items-start gap-2">
                <ScrollText className="w-3.5 h-3.5 text-accent-cyan shrink-0 mt-0.5" />
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-accent-cyan font-bold mb-0.5">
                    Board Statement
                  </p>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {deployed
                      ? 'Threat contained through approved policy uplift. Residual risk returned to within appetite. NIS2 reporting obligations met.'
                      : 'Active threat event has moved cyber risk outside stated appetite. Governance uplift in progress.'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center h-full">
            <p className="text-sm text-slate-600">Board view refreshes after deployment</p>
          </motion.div>
        )}
      </AnimatePresence>
    </PanelShell>
  );
}
