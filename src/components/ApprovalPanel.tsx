import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, TrendingDown, Zap, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelShell } from './PanelShell';
import type { DemoPhase } from '../types';
import type { ScenarioData } from '../data/scenarioTypes';

interface Props {
  phase: DemoPhase;
  scenario: ScenarioData;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  onApprove: () => void;
  onReject: () => void;
  isActive: boolean;
  isDimmed: boolean;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function ApprovalPanel({ phase, scenario, approvalStatus, onApprove, onReject, isActive, isDimmed }: Props) {
  const active = phase === 'awaiting_approval';
  const resolved = ['deployment_in_progress', 'environment_updated', 'deployment_complete'].includes(phase);
  const a = scenario.approvalSummary;
  const appr = scenario.approval;

  const badgeText = resolved
    ? approvalStatus === 'approved' ? 'APPROVED' : 'REJECTED'
    : active ? 'ACTION NEEDED' : undefined;
  const badgeColor = resolved && approvalStatus === 'approved'
    ? 'bg-accent-emerald/15 text-accent-emerald'
    : resolved ? 'bg-accent-red/15 text-accent-red'
    : 'bg-accent-amber/15 text-accent-amber';

  return (
    <PanelShell title="Governance Approval" icon={ShieldCheck} accentColor="text-accent-amber" isActive={isActive} isDimmed={isDimmed} badge={badgeText} badgeColor={badgeColor}>
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key="active"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full gap-3"
          >
            {/* HUMAN IN THE LOOP banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 py-1.5 rounded-md bg-gradient-to-r from-accent-amber/15 via-accent-amber/25 to-accent-amber/15 border border-accent-amber/40"
            >
              <UserCheck className="w-3.5 h-3.5 text-accent-amber" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent-amber">
                Human in the loop
              </span>
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-accent-amber"
              />
            </motion.div>

            {/* Approver card with pulsing avatar */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-700/60 border border-surface-border">
              <div className="relative shrink-0">
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-accent-amber/40 blur-md"
                />
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-accent-amber/90 to-accent-amber/50 border-2 border-accent-amber/60 flex items-center justify-center shadow-[0_0_18px_rgba(245,158,11,0.45)]">
                  <span className="text-sm font-bold text-surface-900 tracking-tight">
                    {initials(appr.approverName)}
                  </span>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-[0.15em] text-accent-amber font-bold">
                  Pending signature
                </p>
                <p className="text-sm font-bold text-white leading-tight truncate">{appr.approverName}</p>
                <p className="text-[11px] text-slate-400 leading-tight truncate">{appr.approverRole}</p>
              </div>
            </div>

            {/* Reason for change */}
            <div className="pl-3 border-l-2 border-accent-amber/50">
              <p className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold mb-0.5">Reason for change</p>
              <p className="text-xs text-slate-200 leading-relaxed">{a.reason}</p>
            </div>

            {/* Impact vs Friction split */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg bg-accent-emerald/10 border border-accent-emerald/25">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingDown className="w-3 h-3 text-accent-emerald" />
                  <span className="text-[9px] uppercase tracking-wider font-bold text-accent-emerald">Expected Impact</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">{appr.expectedImpact}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-accent-amber/10 border border-accent-amber/25">
                <div className="flex items-center gap-1.5 mb-1">
                  <Zap className="w-3 h-3 text-accent-amber" />
                  <span className="text-[9px] uppercase tracking-wider font-bold text-accent-amber">Business Friction</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">{a.friction}</p>
              </div>
            </div>

            {/* Decision CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-auto"
            >
              <div className="grid grid-cols-[2fr_1fr] gap-2">
                <motion.button
                  onClick={onApprove}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative flex items-center justify-center gap-2 py-3.5 bg-gradient-to-b from-accent-emerald/30 to-accent-emerald/15 hover:from-accent-emerald/40 hover:to-accent-emerald/20 border border-accent-emerald/50 rounded-lg text-accent-emerald font-bold transition-all cursor-pointer shadow-[0_0_24px_rgba(16,185,129,0.25)]"
                >
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-lg border border-accent-emerald/40"
                  />
                  <CheckCircle2 className="w-5 h-5 relative" />
                  <span className="relative">Approve</span>
                </motion.button>
                <button
                  onClick={onReject}
                  className="flex items-center justify-center gap-1.5 py-3.5 bg-surface-700 hover:bg-accent-red/15 border border-surface-border hover:border-accent-red/30 rounded-lg text-slate-400 hover:text-accent-red font-medium transition-all cursor-pointer"
                >
                  <XCircle className="w-4 h-4" /> Reject
                </button>
              </div>
              <p className="text-center text-[9px] text-slate-500 mt-1.5 tracking-wide">
                <kbd className="px-1 py-0.5 rounded bg-surface-700 border border-surface-border text-slate-400 font-mono text-[9px]">→</kbd> to approve
              </p>
            </motion.div>
          </motion.div>
        )}

        {resolved && (
          <motion.div
            key="resolved"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full gap-4"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: -8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 16 }}
              className="relative"
            >
              <div className="w-28 h-28 rounded-full border-[3px] border-accent-emerald/70 flex items-center justify-center bg-accent-emerald/10 shadow-[0_0_40px_rgba(16,185,129,0.35)]">
                <div className="text-center">
                  <CheckCircle2 className="w-7 h-7 text-accent-emerald mx-auto mb-1" />
                  <p className="text-[11px] font-black text-accent-emerald tracking-[0.2em]">APPROVED</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-surface-700/60 border border-surface-border"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-emerald/80 to-accent-emerald/40 border border-accent-emerald/60 flex items-center justify-center">
                <span className="text-[10px] font-bold text-surface-900">{initials(appr.approverName)}</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200 leading-tight">{appr.approverName}</p>
                <p className="text-[10px] text-slate-400 leading-tight">{appr.approverRole}</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {!active && !resolved && (
          <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-slate-600" />
            </div>
            <p className="text-sm text-slate-600">Waiting for policy draft</p>
          </motion.div>
        )}
      </AnimatePresence>
    </PanelShell>
  );
}
