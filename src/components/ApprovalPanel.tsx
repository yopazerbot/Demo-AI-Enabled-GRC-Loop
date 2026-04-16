import { ShieldCheck, AlertTriangle, User, CheckCircle2, XCircle } from 'lucide-react';
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
          <motion.div key="active" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col h-full justify-between gap-3">
            <div>
              <div className="flex items-center gap-2.5 mb-3 p-2.5 rounded-lg bg-surface-700/50">
                <div className="w-9 h-9 rounded-full bg-accent-amber/15 border border-accent-amber/30 flex items-center justify-center">
                  <User className="w-4 h-4 text-accent-amber" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-200">{appr.approverName}</p>
                  <p className="text-[10px] text-slate-400">{appr.approverRole}</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">{a.reason}</p>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-accent-amber/10 border border-accent-amber/25">
                <AlertTriangle className="w-3.5 h-3.5 text-accent-amber shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  <span className="font-semibold text-accent-amber">Policy Impact Simulation:</span> {a.friction}
                </p>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-2 gap-2">
              <button onClick={onApprove} className="flex items-center justify-center gap-2 py-3 bg-accent-emerald/20 hover:bg-accent-emerald/30 border border-accent-emerald/40 rounded-lg text-accent-emerald font-bold transition-all cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <CheckCircle2 className="w-5 h-5" /> Approve
              </button>
              <button onClick={onReject} className="flex items-center justify-center gap-2 py-3 bg-surface-700 hover:bg-accent-red/15 border border-surface-border hover:border-accent-red/30 rounded-lg text-slate-400 hover:text-accent-red font-medium transition-all cursor-pointer">
                <XCircle className="w-4 h-4" /> Reject
              </button>
            </motion.div>
          </motion.div>
        )}
        {resolved && (
          <motion.div key="resolved" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center h-full gap-3">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="w-16 h-16 rounded-full bg-accent-emerald/15 border-2 border-accent-emerald/40 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-accent-emerald" />
            </motion.div>
            <div className="text-center">
              <p className="text-sm font-bold text-white">Approved</p>
              <p className="text-[11px] text-slate-400 mt-1">{appr.approverName} · {appr.approverRole.split(' ').slice(-1)}</p>
            </div>
          </motion.div>
        )}
        {!active && !resolved && (
          <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center h-full">
            <p className="text-sm text-slate-600">Waiting for policy draft</p>
          </motion.div>
        )}
      </AnimatePresence>
    </PanelShell>
  );
}
