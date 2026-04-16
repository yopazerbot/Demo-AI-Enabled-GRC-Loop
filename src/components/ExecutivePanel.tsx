import { useState } from 'react';
import {
  BarChart3,
  Building2,
  GitBranch,
  TrendingDown,
  TrendingUp,
  Shield,
  AlertTriangle,
  Target,
  Layers,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelShell } from './PanelShell';
import { MiniSparkline } from './MiniSparkline';
import { initialExecutiveMetrics, postApprovalExecutiveMetrics } from '../data/executive';
import type { DemoPhase, ExecutiveMetrics } from '../types';
import type { AuditEntry } from '../types';

type ViewLevel = 'group' | 'entity';

function MetricCard({
  label,
  value,
  unit,
  icon: Icon,
  trend,
  trendData,
  trendColor,
  delay = 0,
}: {
  label: string;
  value: number;
  unit?: string;
  icon: typeof Shield;
  trend?: 'up' | 'down';
  trendData?: number[];
  trendColor: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className="panel-inner p-3"
    >
      <div className="flex items-center gap-1.5 mb-2">
        <Icon className="w-3 h-3 text-slate-500" />
        <span className="text-[9px] uppercase tracking-wider text-slate-500">{label}</span>
        {trend && (
          <span className="ml-auto">
            {trend === 'down' ? (
              <TrendingDown className="w-3 h-3 text-accent-emerald" />
            ) : (
              <TrendingUp className="w-3 h-3 text-accent-emerald" />
            )}
          </span>
        )}
      </div>
      <div className="flex items-end justify-between">
        <span className="text-xl font-bold text-white">
          {value}
          {unit && <span className="text-sm text-slate-400 font-normal ml-0.5">{unit}</span>}
        </span>
        {trendData && (
          <MiniSparkline data={trendData} color={trendColor} height={24} width={70} />
        )}
      </div>
    </motion.div>
  );
}

function EntitySummary({
  metrics,
  prevMetrics,
  isPost,
}: {
  metrics: ExecutiveMetrics;
  prevMetrics?: ExecutiveMetrics;
  isPost: boolean;
}) {
  const riskDelta = prevMetrics ? metrics.overallRiskScore - prevMetrics.overallRiskScore : 0;
  const compDelta = prevMetrics ? metrics.compliancePosture - prevMetrics.compliancePosture : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-2"
    >
      <div className="grid grid-cols-2 gap-2">
        <MetricCard
          label="Risk Score"
          value={metrics.overallRiskScore}
          icon={AlertTriangle}
          trend={isPost ? 'down' : undefined}
          trendData={metrics.exposureTrend}
          trendColor={isPost ? '#10b981' : '#f97316'}
          delay={0}
        />
        <MetricCard
          label="Compliance"
          value={metrics.compliancePosture}
          unit="%"
          icon={Shield}
          trend={isPost ? 'up' : undefined}
          trendData={metrics.complianceTrend}
          trendColor={isPost ? '#10b981' : '#f59e0b'}
          delay={0.1}
        />
        <MetricCard
          label="Open Findings"
          value={metrics.openFindings}
          icon={Target}
          trendColor="#6366f1"
          delay={0.2}
        />
        <MetricCard
          label="Control Coverage"
          value={metrics.controlCoverage}
          unit="%"
          icon={Layers}
          trendColor="#3b82f6"
          delay={0.3}
        />
      </div>

      {/* Delta summary after deployment */}
      {isPost && prevMetrics && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="panel-inner p-2.5 border-l-2 border-l-accent-emerald"
        >
          <p className="text-[9px] uppercase tracking-wider text-accent-emerald mb-1">Post-Control Impact</p>
          <div className="flex items-center gap-4 text-[10px]">
            <span className="text-slate-300">
              Risk <span className="text-accent-emerald font-bold">{riskDelta}</span>
            </span>
            <span className="text-slate-300">
              Compliance <span className="text-accent-emerald font-bold">+{compDelta}%</span>
            </span>
            <span className="text-slate-300">
              Findings <span className="text-accent-emerald font-bold">
                {metrics.openFindings - (prevMetrics?.openFindings ?? 0)}
              </span>
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

interface Props {
  phase: DemoPhase;
  auditTrail: AuditEntry[];
}

export function ExecutivePanel({ phase, auditTrail }: Props) {
  const [viewLevel, setViewLevel] = useState<ViewLevel>('group');
  const deployed = phase === 'deployment_complete';
  const hasData = phase !== 'idle';

  const currentMetrics = deployed ? postApprovalExecutiveMetrics : initialExecutiveMetrics;
  const prevMetrics = deployed ? initialExecutiveMetrics : undefined;

  const groupMetrics = currentMetrics.find((m) => m.entityId === 'northstar-group')!;
  const entityMetrics = currentMetrics.find((m) => m.entityId === 'northstar-health')!;
  const prevGroup = prevMetrics?.find((m) => m.entityId === 'northstar-group');
  const prevEntity = prevMetrics?.find((m) => m.entityId === 'northstar-health');

  return (
    <PanelShell
      title="Executive / Board Summary"
      icon={BarChart3}
      accentColor="text-accent-cyan"
      badge={deployed ? 'REFRESHED' : hasData ? 'LIVE' : undefined}
      badgeColor={deployed ? 'bg-accent-emerald/15 text-accent-emerald' : 'bg-accent-cyan/15 text-accent-cyan'}
    >
      <AnimatePresence mode="wait">
        {hasData ? (
          <motion.div
            key={`exec-${deployed}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full gap-3"
          >
            {/* View level toggle */}
            <div className="flex items-center gap-1 p-0.5 bg-surface-700 rounded-lg border border-surface-border self-start">
              <button
                onClick={() => setViewLevel('group')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-medium transition-all cursor-pointer ${
                  viewLevel === 'group'
                    ? 'bg-accent-indigo/15 text-accent-indigo border border-accent-indigo/25'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Building2 className="w-3 h-3" />
                Group View
              </button>
              <button
                onClick={() => setViewLevel('entity')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-medium transition-all cursor-pointer ${
                  viewLevel === 'entity'
                    ? 'bg-accent-purple/15 text-accent-purple border border-accent-purple/25'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <GitBranch className="w-3 h-3" />
                Northstar Health
              </button>
            </div>

            {/* Metrics */}
            <div className="flex-1 overflow-auto">
              <AnimatePresence mode="wait">
                {viewLevel === 'group' ? (
                  <EntitySummary
                    key={`group-${deployed}`}
                    metrics={groupMetrics}
                    prevMetrics={prevGroup}
                    isPost={deployed}
                  />
                ) : (
                  <EntitySummary
                    key={`entity-${deployed}`}
                    metrics={entityMetrics}
                    prevMetrics={prevEntity}
                    isPost={deployed}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Audit trail (compact) */}
            {auditTrail.length > 0 && (
              <div className="border-t border-surface-border pt-2 mt-auto">
                <p className="text-[9px] uppercase tracking-wider text-slate-500 mb-1.5">Audit Trail</p>
                <div className="space-y-1 max-h-24 overflow-auto">
                  {[...auditTrail].reverse().map((entry) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-2 text-[9px]"
                    >
                      <span className="text-slate-600 font-mono shrink-0 w-12">
                        {new Date(entry.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="text-slate-500 shrink-0 w-28 truncate">{entry.actor}</span>
                      <span className="text-slate-400">{entry.action}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="waiting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-full"
          >
            <p className="text-xs text-slate-500">
              Metrics refresh after deployment
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </PanelShell>
  );
}
