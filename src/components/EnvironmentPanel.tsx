import { useState } from 'react';
import {
  Server,
  Building2,
  GitBranch,
  CheckCircle2,
  XCircle,
  Clock,
  FileCheck,
  HardDrive,
  Wrench,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelShell } from './PanelShell';
import { initialEnvironment, postApprovalEnvironment } from '../data/environment';
import type { DemoPhase, EnvironmentState } from '../types';

type EntityTab = 'northstar-group' | 'northstar-health';

const policyStatusColor: Record<string, string> = {
  active: 'text-accent-emerald bg-accent-emerald/10',
  pending: 'text-accent-amber bg-accent-amber/10',
  not_assigned: 'text-slate-500 bg-surface-600',
};

function EnvironmentView({ env }: { env: EnvironmentState }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-3"
    >
      {/* Compliance score */}
      <div className="panel-inner p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] uppercase tracking-wider text-slate-500">Compliance Score</span>
          <span className={`text-lg font-bold ${env.complianceScore >= 85 ? 'text-accent-emerald' : env.complianceScore >= 70 ? 'text-accent-amber' : 'text-severity-high'}`}>
            {env.complianceScore}%
          </span>
        </div>
        <div className="w-full h-2 bg-surface-600 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${
              env.complianceScore >= 85
                ? 'bg-gradient-to-r from-accent-emerald/80 to-accent-emerald'
                : env.complianceScore >= 70
                  ? 'bg-gradient-to-r from-accent-amber/80 to-accent-amber'
                  : 'bg-gradient-to-r from-severity-high/80 to-severity-high'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${env.complianceScore}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Policy assignments */}
      <div>
        <div className="flex items-center gap-1.5 mb-1.5">
          <FileCheck className="w-3 h-3 text-slate-500" />
          <span className="text-[9px] uppercase tracking-wider text-slate-500">Policy Assignments</span>
        </div>
        <div className="space-y-1">
          {env.policyAssignments.map((pa) => (
            <div key={pa.policyId} className="panel-inner px-2.5 py-1.5 flex items-center gap-2">
              <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${policyStatusColor[pa.status]}`}>
                {pa.status === 'not_assigned' ? 'N/A' : pa.status}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-slate-300 truncate">{pa.policyName}</p>
                <p className="text-[9px] text-slate-500">{pa.assignedScope}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Affected assets */}
      <div>
        <div className="flex items-center gap-1.5 mb-1.5">
          <HardDrive className="w-3 h-3 text-slate-500" />
          <span className="text-[9px] uppercase tracking-wider text-slate-500">Affected Assets</span>
        </div>
        <div className="grid grid-cols-2 gap-1">
          {env.affectedAssets.map((asset) => (
            <div key={asset.id} className="panel-inner px-2.5 py-1.5 flex items-center gap-2">
              {asset.compliant ? (
                <CheckCircle2 className="w-3 h-3 text-accent-emerald shrink-0" />
              ) : (
                <XCircle className="w-3 h-3 text-severity-high shrink-0" />
              )}
              <div className="min-w-0">
                <p className="text-[10px] text-slate-300 truncate">{asset.name}</p>
                <p className="text-[9px] text-slate-500">{asset.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Remediation */}
      <div>
        <div className="flex items-center gap-1.5 mb-1.5">
          <Wrench className="w-3 h-3 text-slate-500" />
          <span className="text-[9px] uppercase tracking-wider text-slate-500">Remediation Status</span>
        </div>
        <div className="space-y-1">
          {env.remediationStatus.map((rem) => (
            <div key={rem.id} className="panel-inner px-2.5 py-1.5 flex items-center gap-2">
              {rem.status === 'complete' ? (
                <CheckCircle2 className="w-3 h-3 text-accent-emerald shrink-0" />
              ) : rem.status === 'in_progress' ? (
                <Clock className="w-3 h-3 text-accent-blue shrink-0 animate-pulse" />
              ) : (
                <Clock className="w-3 h-3 text-slate-500 shrink-0" />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-slate-300 truncate">{rem.description}</p>
                <p className="text-[9px] text-slate-500">{rem.assignedTo}</p>
              </div>
              <span className={`text-[9px] font-medium uppercase shrink-0 ${
                rem.status === 'complete' ? 'text-accent-emerald' : rem.status === 'in_progress' ? 'text-accent-blue' : 'text-slate-500'
              }`}>
                {rem.status.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface Props {
  phase: DemoPhase;
}

export function EnvironmentPanel({ phase }: Props) {
  const [activeTab, setActiveTab] = useState<EntityTab>('northstar-group');
  const deployed = phase === 'deployment_complete';
  const deploying = phase === 'deployment_in_progress';
  const envData = deployed ? postApprovalEnvironment : initialEnvironment;
  const currentEnv = envData.find((e) => e.entityId === activeTab);

  return (
    <PanelShell
      title="Corporate Environment"
      icon={Server}
      accentColor="text-accent-emerald"
      badge={deployed ? 'UPDATED' : deploying ? 'DEPLOYING' : undefined}
      badgeColor={deployed ? 'bg-accent-emerald/15 text-accent-emerald' : 'bg-accent-blue/15 text-accent-blue'}
    >
      <AnimatePresence mode="wait">
        {deploying && (
          <motion.div
            key="deploying"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full gap-3"
          >
            <div className="w-10 h-10 border-2 border-accent-blue/30 border-t-accent-blue rounded-full animate-spin" />
            <p className="text-xs text-slate-300 font-medium">Deploying policy to corporate environment…</p>
            <div className="flex gap-2 mt-1">
              {['Northstar Group', 'Northstar Health Services'].map((name) => (
                <span key={name} className="text-[10px] px-2 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {(deployed || (!deploying && phase !== 'idle')) && (
          <motion.div
            key="env-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full"
          >
            {/* Entity tabs */}
            <div className="flex items-center gap-1 p-0.5 bg-surface-700 rounded-lg border border-surface-border mb-3 self-start">
              <button
                onClick={() => setActiveTab('northstar-group')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-medium transition-all cursor-pointer ${
                  activeTab === 'northstar-group'
                    ? 'bg-accent-indigo/15 text-accent-indigo border border-accent-indigo/25'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Building2 className="w-3 h-3" />
                Northstar Group
              </button>
              <button
                onClick={() => setActiveTab('northstar-health')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-medium transition-all cursor-pointer ${
                  activeTab === 'northstar-health'
                    ? 'bg-accent-purple/15 text-accent-purple border border-accent-purple/25'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <GitBranch className="w-3 h-3" />
                Northstar Health
              </button>
            </div>

            {/* Environment view */}
            <div className="flex-1 overflow-auto">
              {currentEnv && (
                <EnvironmentView key={`${activeTab}-${deployed}`} env={currentEnv} />
              )}
            </div>
          </motion.div>
        )}

        {phase === 'idle' && (
          <motion.div
            key="waiting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-full"
          >
            <p className="text-xs text-slate-500">
              Awaiting approved deployment
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </PanelShell>
  );
}
