import { Building2, GitBranch, Users, MapPin, Shield, TrendingDown, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { organizations } from '../data/organization';
import { postApprovalEnvironment } from '../data/environment';
import type { DemoPhase } from '../types';

const riskBarColor = (exposure: number) => {
  if (exposure >= 60) return 'bg-severity-critical';
  if (exposure >= 40) return 'bg-severity-high';
  if (exposure >= 25) return 'bg-severity-medium';
  return 'bg-accent-emerald';
};

interface Props {
  phase: DemoPhase;
}

export function OrgContext({ phase }: Props) {
  const showThreatImpact = phase !== 'idle' && phase !== 'deployment_complete';
  const deployed = phase === 'deployment_complete';

  return (
    <div className="flex items-stretch gap-2 px-3 pt-2">
      {organizations.map((org) => {
        const postEnv = postApprovalEnvironment.find((e) => e.entityId === org.id);
        const compliance = deployed && postEnv ? postEnv.complianceScore : org.complianceScore;
        const exposure = deployed ? (org.id === 'northstar-group' ? 18 : 22) : org.riskExposure;
        const complianceDelta = deployed && postEnv ? postEnv.complianceScore - org.complianceScore : 0;
        const exposureDelta = deployed ? exposure - org.riskExposure : 0;

        return (
          <motion.div
            key={org.id}
            layout
            className={`
              flex-1 panel-inner px-3 py-2 flex items-center gap-3 transition-all duration-500
              ${showThreatImpact ? 'border-severity-high/25' : ''}
              ${deployed ? 'border-accent-emerald/25' : ''}
            `}
          >
            {/* Entity icon */}
            <div className={`
              w-8 h-8 rounded-lg flex items-center justify-center shrink-0
              ${org.type === 'parent'
                ? 'bg-accent-indigo/10 border border-accent-indigo/20'
                : 'bg-accent-purple/10 border border-accent-purple/20'
              }
            `}>
              {org.type === 'parent'
                ? <Building2 className="w-4 h-4 text-accent-indigo" />
                : <GitBranch className="w-4 h-4 text-accent-purple" />
              }
            </div>

            {/* Entity info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-[11px] font-semibold text-slate-200 truncate">{org.name}</p>
                <span className={`text-[8px] uppercase tracking-wider font-bold px-1 py-0.5 rounded ${
                  org.type === 'parent'
                    ? 'bg-accent-indigo/10 text-accent-indigo'
                    : 'bg-accent-purple/10 text-accent-purple'
                }`}>
                  {org.type === 'parent' ? 'Group Parent' : 'Subsidiary'}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-0.5 text-[9px] text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5" />
                  {org.region}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-2.5 h-2.5" />
                  {org.employeeCount.toLocaleString()}
                </span>
                <span>{org.sector}</span>
              </div>
            </div>

            {/* Compliance & Risk gauges */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-center">
                <p className="text-[8px] text-slate-500 uppercase tracking-wider">Compliance</p>
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-accent-emerald" />
                  <motion.span
                    key={compliance}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    className={`text-sm font-bold ${deployed ? 'text-accent-emerald' : 'text-slate-200'}`}
                  >
                    {compliance}%
                  </motion.span>
                  {deployed && complianceDelta > 0 && (
                    <span className="text-[9px] text-accent-emerald flex items-center">
                      <TrendingUp className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>
              </div>
              <div className="text-center">
                <p className="text-[8px] text-slate-500 uppercase tracking-wider">Exposure</p>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${riskBarColor(exposure)}`} />
                  <motion.span
                    key={exposure}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    className={`text-sm font-bold ${deployed ? 'text-accent-emerald' : 'text-slate-200'}`}
                  >
                    {exposure}
                  </motion.span>
                  {deployed && exposureDelta < 0 && (
                    <span className="text-[9px] text-accent-emerald flex items-center">
                      <TrendingDown className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Status badge */}
            <AnimatePresence mode="wait">
              {showThreatImpact && (
                <motion.div
                  key="threat"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="shrink-0 px-2 py-1 rounded bg-severity-high/10 border border-severity-high/25"
                >
                  <p className="text-[8px] text-severity-high font-bold uppercase tracking-wider">Exposed</p>
                </motion.div>
              )}
              {deployed && (
                <motion.div
                  key="secure"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="shrink-0 px-2 py-1 rounded bg-accent-emerald/10 border border-accent-emerald/25"
                >
                  <p className="text-[8px] text-accent-emerald font-bold uppercase tracking-wider">Secured</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
