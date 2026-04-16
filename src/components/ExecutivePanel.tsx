import { BarChart3, TrendingDown, TrendingUp, Shield, AlertTriangle, Target, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelShell } from './PanelShell';
import { MiniSparkline } from './MiniSparkline';
import type { DemoPhase } from '../types';
import type { ScenarioData } from '../data/scenarioTypes';

interface Props {
  phase: DemoPhase;
  scenario: ScenarioData;
  isActive: boolean;
  isDimmed: boolean;
}

function MetricCard({ label, value, unit, icon: Icon, trend, trendData, trendColor, delay = 0 }: {
  label: string; value: number; unit?: string; icon: typeof Shield; trend?: 'up' | 'down'; trendData?: number[]; trendColor: string; delay?: number;
}) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay }} className="p-3 rounded-lg bg-surface-700/50 border border-surface-border">
      <div className="flex items-center gap-1.5 mb-2">
        <Icon className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{label}</span>
        {trend && (
          <span className="ml-auto">
            {trend === 'down' ? <TrendingDown className="w-3.5 h-3.5 text-accent-emerald" /> : <TrendingUp className="w-3.5 h-3.5 text-accent-emerald" />}
          </span>
        )}
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-white">
          {value}{unit && <span className="text-sm text-slate-400 font-normal ml-0.5">{unit}</span>}
        </span>
        {trendData && <MiniSparkline data={trendData} color={trendColor} height={24} width={60} />}
      </div>
    </motion.div>
  );
}

export function ExecutivePanel({ phase, scenario, isActive, isDimmed }: Props) {
  const deployed = phase === 'deployment_complete';
  const hasData = phase !== 'idle';
  const m = deployed ? scenario.metricsAfter : scenario.metricsBefore;
  const prev = deployed ? scenario.metricsBefore : undefined;
  const riskDelta = prev ? m.overallRiskScore - prev.overallRiskScore : 0;
  const compDelta = prev ? m.compliancePosture - prev.compliancePosture : 0;

  return (
    <PanelShell title="Board Summary" icon={BarChart3} accentColor="text-accent-cyan" isActive={isActive} isDimmed={isDimmed}
      badge={deployed ? 'REFRESHED' : hasData ? 'LIVE' : undefined}
      badgeColor={deployed ? 'bg-accent-emerald/15 text-accent-emerald' : 'bg-accent-cyan/15 text-accent-cyan'}
    >
      <AnimatePresence mode="wait">
        {hasData ? (
          <motion.div key={`exec-${scenario.id}-${deployed}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-2 h-full">
            <div className="grid grid-cols-2 gap-2">
              <MetricCard label="Risk Score" value={m.overallRiskScore} icon={AlertTriangle}
                trend={deployed ? 'down' : undefined} trendData={m.exposureTrend} trendColor={deployed ? '#10b981' : '#f97316'} delay={0} />
              <MetricCard label="Compliance" value={m.compliancePosture} unit="%" icon={Shield}
                trend={deployed ? 'up' : undefined} trendData={m.complianceTrend} trendColor={deployed ? '#10b981' : '#f59e0b'} delay={0.1} />
              <MetricCard label="Open Findings" value={m.openFindings} icon={Target} trendColor="#6366f1" delay={0.2} />
              <MetricCard label="Control Coverage" value={m.controlCoverage} unit="%" icon={Layers} trendColor="#3b82f6" delay={0.3} />
            </div>
            {deployed && prev && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ delay: 0.5 }}
                className="mt-auto p-2.5 rounded-lg bg-accent-emerald/10 border border-accent-emerald/25">
                <p className="text-[10px] uppercase tracking-wider text-accent-emerald font-bold mb-1">Post-Control Impact</p>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-slate-300">Risk <span className="text-accent-emerald font-bold">{riskDelta}</span></span>
                  <span className="text-slate-300">Compliance <span className="text-accent-emerald font-bold">+{compDelta}%</span></span>
                  <span className="text-slate-300">Findings <span className="text-accent-emerald font-bold">{m.openFindings - prev.openFindings}</span></span>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center h-full">
            <p className="text-sm text-slate-600">Metrics refresh after deployment</p>
          </motion.div>
        )}
      </AnimatePresence>
    </PanelShell>
  );
}
