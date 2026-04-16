import { FileCode, GitBranch, Shield, Key, Fingerprint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelShell } from './PanelShell';
import type { DemoPhase } from '../types';

const VISIBLE_PHASES: DemoPhase[] = [
  'policy_generated',
  'awaiting_approval',
  'deployment_in_progress',
  'deployment_complete',
];

interface Props {
  phase: DemoPhase;
  isActive: boolean;
  isDimmed: boolean;
}

export function PolicyPanel({ phase, isActive, isDimmed }: Props) {
  const active = VISIBLE_PHASES.includes(phase);
  const generating = phase === 'risk_mapped';

  return (
    <PanelShell
      title="Policy Studio"
      icon={FileCode}
      accentColor="text-accent-purple"
      isActive={isActive}
      isDimmed={isDimmed}
      badge={active ? 'DRAFTED' : generating ? '…' : undefined}
      badgeColor="bg-accent-purple/15 text-accent-purple"
    >
      <AnimatePresence mode="wait">
        {generating && (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full gap-3"
          >
            <div className="w-10 h-10 border-2 border-accent-purple/30 border-t-accent-purple rounded-full animate-spin" />
            <p className="text-sm text-slate-400">Drafting policy…</p>
          </motion.div>
        )}

        {active && (
          <motion.div
            key="policy"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-3 h-full"
          >
            {/* Policy title - BIG */}
            <div>
              <p className="text-[10px] font-mono text-slate-500 mb-1">POL-IAM-2026-012</p>
              <p className="text-sm font-bold text-white leading-tight">
                Phishing-Resistant MFA
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                For privileged & high-risk access
              </p>
            </div>

            {/* Key requirements - simplified icons */}
            <div className="space-y-2 my-auto">
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-surface-700/50">
                <div className="w-7 h-7 rounded-md bg-accent-cyan/15 flex items-center justify-center shrink-0">
                  <Fingerprint className="w-4 h-4 text-accent-cyan" />
                </div>
                <p className="text-xs text-slate-200">FIDO2 / Passkeys required</p>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-surface-700/50">
                <div className="w-7 h-7 rounded-md bg-accent-indigo/15 flex items-center justify-center shrink-0">
                  <Key className="w-4 h-4 text-accent-indigo" />
                </div>
                <p className="text-xs text-slate-200">OAuth consent: admin-approved only</p>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-surface-700/50">
                <div className="w-7 h-7 rounded-md bg-accent-purple/15 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-accent-purple" />
                </div>
                <p className="text-xs text-slate-200">Compliant device required</p>
              </div>
            </div>

            {/* Scope - key differentiator */}
            <div className="p-2.5 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30">
              <div className="flex items-center gap-2 mb-1">
                <GitBranch className="w-3.5 h-3.5 text-accent-cyan" />
                <span className="text-[10px] uppercase tracking-wider text-accent-cyan font-bold">
                  Scope
                </span>
              </div>
              <p className="text-xs text-slate-200 font-medium">
                Group baseline (30d)
              </p>
              <p className="text-xs text-accent-cyan font-semibold">
                + Subsidiary accelerated (7d)
              </p>
            </div>
          </motion.div>
        )}

        {!active && !generating && (
          <motion.div
            key="waiting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-full"
          >
            <p className="text-sm text-slate-600">Waiting for risk mapping</p>
          </motion.div>
        )}
      </AnimatePresence>
    </PanelShell>
  );
}
