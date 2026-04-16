import { BarChart3, TrendingDown, TrendingUp, Shield, AlertTriangle, Building2, GitBranch } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelShell } from './PanelShell';
import { MiniSparkline } from './MiniSparkline';
import type { DemoPhase, ExecutiveMetrics } from '../types';
import type { ScenarioData } from '../data/scenarioTypes';

interface Props {
  phase: DemoPhase;
  scenario: ScenarioData;
  isActive: boolean;
  isDimmed: boolean;
}

function EntityRow({ metrics, prev, isGroup, deployed, delay }: { metrics: ExecutiveMetrics; prev?: ExecutiveMetrics; isGroup: boolean; deployed: boolean; delay: number }) {
  const riskDelta = prev ? metrics.overallRiskScore - prev.overallRiskScore : 0;
  const compDelta = prev ? metrics.compliancePosture - prev.compliancePosture : 0;
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className="p-3 rounded-lg bg-surface-700/50 border border-surface-border">
      <div className="flex items-center gap-2 mb-2">
        {isGroup ? <Building2 className="w-4 h-4 text-accent-indigo" /> : <GitBranch className="w-4 h-4 text-accent-purple" />}
        <span className="text-xs font-semibold text-slate-200">{metrics.entityName}</span>
        <span className={`ml-auto text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded ${isGroup ? 'bg-accent-indigo/10 text-accent-indigo' : 'bg-accent-purple/10 text-accent-purple'}`}>{isGroup ? 'Group' : 'Subsidiary'}</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className={`w-4 h-4 ${deployed ? 'text-accent-emerald' : 'text-severity-high'}`} />
          <div>
            <div className="flex items-end gap-1">
              <motion.span key={metrics.overallRiskScore} initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} className={`text-2xl font-bold ${deployed ? 'text-accent-emerald' : 'text-severity-high'}`}>{metrics.overallRiskScore}</motion.span>
              {deployed && riskDelta < 0 && <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: delay + 0.3 }} className="text-[10px] text-accent-emerald mb-1 flex items-center"><TrendingDown className="w-3 h-3" />{riskDelta}</motion.span>}
            </div>
            <p className="text-[9px] uppercase tracking-wider text-slate-500">Risk</p>
          </div>
          <div className="ml-auto"><MiniSparkline data={metrics.exposureTrend} color={deployed ? '#10b981' : '#f97316'} height={20} width={50} /></div>
        </div>
        <div className="flex items-center gap-2">
          <Shield className={`w-4 h-4 ${deployed ? 'text-accent-emerald' : 'text-accent-amber'}`} />
          <div>
            <div className="flex items-end gap-1">
              <motion.span key={metrics.compliancePosture} initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} className={`text-2xl font-bold ${deployed ? 'text-accent-emerald' : 'text-slate-200'}`}>{metrics.compliancePosture}</motion.span>
              <span className="text-sm text-slate-500 mb-1">%</span>
              {deployed && compDelta > 0 && <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: delay + 0.4 }} className="text-[10px] text-accent-emerald mb-1 flex items-center"><TrendingUp className="w-3 h-3" />+{compDelta}</motion.span>}
            </div>
            <p className="text-[9px] uppercase tracking-wider text-slate-500">Compliance</p>
          </div>
          <div className="ml-auto"><MiniSparkline data={metrics.complianceTrend} color={deployed ? '#10b981' : '#f59e0b'} height={20} width={50} /></div>
        </div>
      </div>
    </motion.div>
  );
}

export function ExecutivePanel({ phase, scenario, isActive, isDimmed }: Props) {
  const deployed = phase === 'deployment_complete';
  const hasData = phase !== 'idle';
  const currentMetrics = deployed ? scenario.metricsAfter : scenario.metricsBefore;
  const prevMetrics = deployed ? scenario.metricsBefore : undefined;
  const groupMetrics = currentMetrics.find((m) => m.entityId === 'northstar-group')!;
  const entityMetrics = currentMetrics.find((m) => m.entityId === 'northstar-health')!;
  const prevGroup = prevMetrics?.find((m) => m.entityId === 'northstar-group');
  const prevEntity = prevMetrics?.find((m) => m.entityId === 'northstar-health');

  return (
    <PanelShell title="Board Summary" icon={BarChart3} accentColor="text-accent-cyan" isActive={isActive} isDimmed={isDimmed}
      badge={deployed ? 'REFRESHED' : hasData ? 'LIVE' : undefined}
      badgeColor={deployed ? 'bg-accent-emerald/15 text-accent-emerald' : 'bg-accent-cyan/15 text-accent-cyan'}
    >
      <AnimatePresence mode="wait">
        {hasData ? (
          <motion.div key={`exec-${scenario.id}-${deployed}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-2 h-full">
            <EntityRow metrics={groupMetrics} prev={prevGroup} isGroup deployed={deployed} delay={0} />
            <EntityRow metrics={entityMetrics} prev={prevEntity} isGroup={false} deployed={deployed} delay={0.15} />
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
