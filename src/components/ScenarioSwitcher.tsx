import { ShieldAlert, Bug, Lock, Building2, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ScenarioData } from '../data/scenarioTypes';

const ICONS = {
  phishing: ShieldAlert,
  bug: Bug,
  ransomware: Lock,
  vendor: Building2,
  cloud: Cloud,
};

interface Props {
  scenarios: ScenarioData[];
  activeIdx: number;
  onSwitch: (idx: number) => void;
  disabled?: boolean;
}

export function ScenarioSwitcher({ scenarios, activeIdx, onSwitch, disabled }: Props) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 border-b border-surface-border bg-surface-800/40">
      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mr-1">
        Scenario
      </span>
      {scenarios.map((sc, i) => {
        const Icon = ICONS[sc.icon];
        const isActive = i === activeIdx;

        return (
          <motion.button
            key={sc.id}
            whileTap={{ scale: 0.97 }}
            onClick={() => !disabled && onSwitch(i)}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all
              ${disabled && !isActive ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
              ${isActive
                ? 'bg-accent-cyan/15 border-accent-cyan/40 text-accent-cyan shadow-[0_0_12px_rgba(34,211,238,0.15)]'
                : 'bg-surface-700/50 border-surface-border text-slate-400 hover:text-slate-200 hover:border-slate-500'
              }
            `}
          >
            <Icon className="w-3.5 h-3.5" />
            <div className="text-left">
              <p className={`text-[11px] font-semibold ${isActive ? 'text-accent-cyan' : ''}`}>
                {sc.label}
              </p>
              <p className={`text-[9px] ${isActive ? 'text-accent-cyan/60' : 'text-slate-500'}`}>
                {sc.subtitle}
              </p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
