import { Building2, GitBranch, Shield, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { organizations } from '../data/organization';
import { postApprovalEnvironment } from '../data/environment';
import type { DemoPhase } from '../types';

interface Props {
  phase: DemoPhase;
}

export function OrgContext({ phase }: Props) {
  const showThreat = phase !== 'idle' && phase !== 'deployment_complete';
  const deployed = phase === 'deployment_complete';

  return (
    <div className="flex items-stretch gap-2 px-3 pt-2">
      {organizations.map((org) => {
        const postEnv = postApprovalEnvironment.find((e) => e.entityId === org.id);
        const compliance = deployed && postEnv ? postEnv.complianceScore : org.complianceScore;
        const exposure = deployed ? (org.id === 'northstar-group' ? 18 : 22) : org.riskExposure;

        return (
          <motion.div
            key={org.id}
            layout
            className={`
              flex-1 flex items-center gap-3 px-3 py-2 rounded-lg border transition-colors duration-500
              ${deployed
                ? 'bg-accent-emerald/5 border-accent-emerald/25'
                : showThreat
                  ? 'bg-severity-high/5 border-severity-high/25'
                  : 'bg-surface-700/50 border-surface-border'
              }
            `}
          >
            <div className={`
              w-8 h-8 rounded-lg flex items-center justify-center shrink-0
              ${org.type === 'parent'
                ? 'bg-accent-indigo/15 border border-accent-indigo/30'
                : 'bg-accent-purple/15 border border-accent-purple/30'
              }
            `}>
              {org.type === 'parent'
                ? <Building2 className="w-4 h-4 text-accent-indigo" />
                : <GitBranch className="w-4 h-4 text-accent-purple" />
              }
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-slate-100 truncate">{org.name}</p>
              <p className="text-[9px] text-slate-500 uppercase tracking-wider">
                {org.type === 'parent' ? 'Parent · Group' : 'Subsidiary'}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-accent-emerald" />
                <motion.span
                  key={compliance}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  className={`text-sm font-bold ${deployed ? 'text-accent-emerald' : 'text-slate-200'}`}
                >
                  {compliance}%
                </motion.span>
              </div>
              <div className="flex items-center gap-1.5">
                <AlertTriangle className={`w-3 h-3 ${deployed ? 'text-accent-emerald' : 'text-severity-high'}`} />
                <motion.span
                  key={exposure}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  className={`text-sm font-bold ${deployed ? 'text-accent-emerald' : 'text-slate-200'}`}
                >
                  {exposure}
                </motion.span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {showThreat && (
                <motion.span
                  key="threat"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="shrink-0 px-2 py-0.5 rounded bg-severity-high/15 text-severity-high text-[9px] font-bold uppercase tracking-wider"
                >
                  Exposed
                </motion.span>
              )}
              {deployed && (
                <motion.span
                  key="secure"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="shrink-0 px-2 py-0.5 rounded bg-accent-emerald/15 text-accent-emerald text-[9px] font-bold uppercase tracking-wider"
                >
                  Secured
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
