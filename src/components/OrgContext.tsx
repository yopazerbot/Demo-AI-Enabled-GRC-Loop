import { Building2, GitBranch, Users, MapPin, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { organizations } from '../data/organization';
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
  const showThreatImpact = phase !== 'idle';

  return (
    <div className="flex items-stretch gap-3 px-3 pt-3">
      {organizations.map((org) => (
        <motion.div
          key={org.id}
          layout
          className={`
            flex-1 panel-inner px-4 py-2.5 flex items-center gap-4 transition-all duration-500
            ${showThreatImpact ? 'border-severity-high/30' : ''}
          `}
        >
          {/* Entity icon */}
          <div className={`
            w-9 h-9 rounded-lg flex items-center justify-center shrink-0
            ${org.type === 'parent'
              ? 'bg-accent-indigo/10 border border-accent-indigo/20'
              : 'bg-accent-purple/10 border border-accent-purple/20'
            }
          `}>
            {org.type === 'parent'
              ? <Building2 className="w-4.5 h-4.5 text-accent-indigo" />
              : <GitBranch className="w-4.5 h-4.5 text-accent-purple" />
            }
          </div>

          {/* Entity info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-slate-200 truncate">{org.name}</p>
              <span className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded ${
                org.type === 'parent'
                  ? 'bg-accent-indigo/10 text-accent-indigo'
                  : 'bg-accent-purple/10 text-accent-purple'
              }`}>
                {org.type === 'parent' ? 'Group' : 'Subsidiary'}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {org.region}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {org.employeeCount.toLocaleString()}
              </span>
              <span>{org.sector}</span>
            </div>
          </div>

          {/* Compliance & Risk mini gauges */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-center">
              <p className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Compliance</p>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-accent-emerald" />
                <span className="text-sm font-semibold text-slate-200">{org.complianceScore}%</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Exposure</p>
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${riskBarColor(org.riskExposure)}`} />
                <span className="text-sm font-semibold text-slate-200">{org.riskExposure}</span>
              </div>
            </div>
          </div>

          {/* Threat impact flash */}
          {showThreatImpact && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="shrink-0 px-2 py-1 rounded bg-severity-high/10 border border-severity-high/25"
            >
              <p className="text-[9px] text-severity-high font-bold uppercase">Threat Impact</p>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
