import { Building2, MapPin, Shield, Scale, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import type { DemoPhase } from '../types';

interface Props {
  phase: DemoPhase;
}

export function OrgContext({ phase }: Props) {
  const active = phase !== 'idle';
  const deployed = phase === 'deployment_complete';

  return (
    <div className="px-3 pt-2">
      <motion.div
        layout
        className={`
          flex items-center gap-4 px-4 py-2.5 rounded-lg border transition-colors duration-500
          ${deployed
            ? 'bg-accent-emerald/5 border-accent-emerald/25'
            : active
              ? 'bg-severity-high/5 border-severity-high/20'
              : 'bg-surface-700/50 border-surface-border'
          }
        `}
      >
        <div className="w-9 h-9 rounded-lg bg-accent-indigo/15 border border-accent-indigo/30 flex items-center justify-center shrink-0">
          <Building2 className="w-5 h-5 text-accent-indigo" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-100">Verhelst Industries</p>
          <div className="flex items-center gap-3 mt-0.5 text-[10px] text-slate-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Antwerp, Belgium
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              2,800 employees
            </span>
            <span>Energy & Critical Infrastructure</span>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-accent-amber/10 border border-accent-amber/25">
            <Scale className="w-3 h-3 text-accent-amber" />
            <span className="text-[10px] font-semibold text-accent-amber">NIS2 Essential Entity</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-accent-indigo/10 border border-accent-indigo/25">
            <Shield className="w-3 h-3 text-accent-indigo" />
            <span className="text-[10px] font-semibold text-accent-indigo">ISO 27001 Certified</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
