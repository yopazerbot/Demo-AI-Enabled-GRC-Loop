import { Search, AlertTriangle, Building2, Shield, BookOpen, User, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelShell } from './PanelShell';
import { scenarioRiskMapping } from '../data/riskMapping';
import type { DemoPhase } from '../types';

const VISIBLE_PHASES: DemoPhase[] = [
  'risk_mapped',
  'policy_generated',
  'awaiting_approval',
  'deployment_in_progress',
  'deployment_complete',
];

interface Props {
  phase: DemoPhase;
}

export function AnalysisPanel({ phase }: Props) {
  const active = VISIBLE_PHASES.includes(phase);
  const analysing = phase === 'threat_analysis_in_progress';
  const rm = scenarioRiskMapping;

  return (
    <PanelShell
      title="Analysis & Mapping"
      icon={Search}
      accentColor="text-accent-indigo"
      badge={active ? 'MAPPED' : analysing ? 'ANALYSING' : undefined}
      badgeColor={active ? 'bg-accent-indigo/15 text-accent-indigo' : 'bg-accent-blue/15 text-accent-blue'}
    >
      <AnimatePresence mode="wait">
        {analysing && (
          <motion.div
            key="analysing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full gap-3"
          >
            <div className="w-8 h-8 border-2 border-accent-blue/30 border-t-accent-blue rounded-full animate-spin" />
            <p className="text-xs text-slate-400">Interpreting threat context and mapping risk scenario…</p>
          </motion.div>
        )}

        {active && (
          <motion.div
            key="mapped"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-3 h-full overflow-auto"
          >
            {/* Risk ID & Statement */}
            <div className="panel-inner p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-severity-high" />
                <span className="text-[10px] font-mono text-slate-400">{rm.riskId}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {rm.riskStatement}
              </p>
            </div>

            {/* Key fields grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="panel-inner p-2.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <User className="w-3 h-3 text-slate-500" />
                  <span className="text-[9px] uppercase tracking-wider text-slate-500">Risk Owner</span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium">{rm.riskOwner}</p>
              </div>
              <div className="panel-inner p-2.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <Layers className="w-3 h-3 text-slate-500" />
                  <span className="text-[9px] uppercase tracking-wider text-slate-500">Business Capability</span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium">{rm.impactedCapability}</p>
              </div>
            </div>

            {/* ISO Control Theme */}
            <div className="panel-inner p-2.5">
              <div className="flex items-center gap-1.5 mb-1">
                <BookOpen className="w-3 h-3 text-accent-indigo" />
                <span className="text-[9px] uppercase tracking-wider text-slate-500">ISO/IEC 27001 Control Theme</span>
              </div>
              <p className="text-xs text-accent-indigo font-semibold">{rm.isoControlTheme}</p>
              <p className="text-[10px] text-slate-400 mt-0.5 font-mono">{rm.isoControlRef}</p>
            </div>

            {/* Residual Exposure */}
            <div className="panel-inner p-2.5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] uppercase tracking-wider text-slate-500">Residual Exposure (Pre-Control)</span>
                <span className="text-xs font-bold text-severity-high">{rm.residualExposure}%</span>
              </div>
              <div className="w-full h-1.5 bg-surface-600 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-severity-medium to-severity-high rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${rm.residualExposure}%` }}
                  transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Entity-Specific Impact */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Building2 className="w-3 h-3 text-slate-500" />
                <span className="text-[9px] uppercase tracking-wider text-slate-500">Entity Impact Comparison</span>
              </div>
              {rm.affectedEntities.map((entity) => (
                <div key={entity.entityId} className="panel-inner p-2.5 mb-2 last:mb-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Shield className={`w-3 h-3 ${
                        entity.entityId === 'northstar-group' ? 'text-accent-indigo' : 'text-accent-purple'
                      }`} />
                      <span className="text-[11px] font-semibold text-slate-200">{entity.entityName}</span>
                    </div>
                    <span className={`text-[10px] font-bold ${
                      entity.localExposure >= 60 ? 'text-severity-critical' : 'text-severity-high'
                    }`}>
                      {entity.localExposure}% exposure
                    </span>
                  </div>
                  <div className="w-full h-1 bg-surface-600 rounded-full overflow-hidden mb-1.5">
                    <motion.div
                      className={`h-full rounded-full ${
                        entity.localExposure >= 60
                          ? 'bg-gradient-to-r from-severity-high to-severity-critical'
                          : 'bg-gradient-to-r from-severity-medium to-severity-high'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${entity.localExposure}%` }}
                      transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    {entity.localImpact}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {!active && !analysing && (
          <motion.div
            key="waiting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-full"
          >
            <p className="text-xs text-slate-500">
              Awaiting threat analysis completion
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </PanelShell>
  );
}
