import {
  ShieldCheck,
  AlertTriangle,
  Building2,
  User,
  Target,
  Scale,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelShell } from './PanelShell';
import { scenarioApproval } from '../data/approval';
import type { DemoPhase } from '../types';

interface Props {
  phase: DemoPhase;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  onApprove: () => void;
  onReject: () => void;
}

export function ApprovalPanel({ phase, approvalStatus, onApprove, onReject }: Props) {
  const active = phase === 'awaiting_approval';
  const resolved = ['deployment_in_progress', 'deployment_complete'].includes(phase);
  const approval = scenarioApproval;

  const badgeText = resolved
    ? approvalStatus === 'approved' ? 'APPROVED' : 'REJECTED'
    : active
      ? 'ACTION REQUIRED'
      : undefined;

  const badgeColor = resolved && approvalStatus === 'approved'
    ? 'bg-accent-emerald/15 text-accent-emerald'
    : resolved && approvalStatus === 'rejected'
      ? 'bg-accent-red/15 text-accent-red'
      : 'bg-accent-amber/15 text-accent-amber';

  return (
    <PanelShell
      title="Governance Approval"
      icon={ShieldCheck}
      accentColor="text-accent-amber"
      badge={badgeText}
      badgeColor={badgeColor}
    >
      <AnimatePresence mode="wait">
        {(active || resolved) && (
          <motion.div
            key="approval-content"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-3 h-full overflow-auto"
          >
            {/* Approval header */}
            <div className={`panel-inner p-3 border-l-4 ${
              resolved && approvalStatus === 'approved'
                ? 'border-l-accent-emerald'
                : resolved && approvalStatus === 'rejected'
                  ? 'border-l-accent-red'
                  : 'border-l-accent-amber'
            }`}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono text-slate-400">{approval.id}</span>
                {active && (
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-[9px] font-bold text-accent-amber bg-accent-amber/10 px-1.5 py-0.5 rounded"
                  >
                    PENDING HUMAN DECISION
                  </motion.span>
                )}
                {resolved && approvalStatus === 'approved' && (
                  <span className="text-[9px] font-bold text-accent-emerald bg-accent-emerald/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> APPROVED
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {approval.reasonForChange}
              </p>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-2">
              {/* Scope */}
              <div className="panel-inner p-2.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <Target className="w-3 h-3 text-accent-cyan" />
                  <span className="text-[9px] uppercase tracking-wider text-slate-500">Scope</span>
                </div>
                <p className="text-[10px] text-accent-cyan font-medium">{approval.scopeLabel}</p>
              </div>

              {/* Approver */}
              <div className="panel-inner p-2.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <User className="w-3 h-3 text-slate-400" />
                  <span className="text-[9px] uppercase tracking-wider text-slate-500">Approver</span>
                </div>
                <p className="text-[10px] text-slate-200 font-medium">{approval.approverName}</p>
                <p className="text-[9px] text-slate-500">{approval.approverRole}</p>
              </div>
            </div>

            {/* Expected impact */}
            <div className="panel-inner p-2.5">
              <div className="flex items-center gap-1.5 mb-1">
                <Scale className="w-3 h-3 text-accent-emerald" />
                <span className="text-[9px] uppercase tracking-wider text-slate-500">Expected Impact</span>
              </div>
              <p className="text-[10px] text-slate-300 leading-relaxed">{approval.expectedImpact}</p>
            </div>

            {/* Business friction warning */}
            <div className="panel-inner p-2.5 border-l-2 border-l-accent-amber/50">
              <div className="flex items-center gap-1.5 mb-1">
                <AlertTriangle className="w-3 h-3 text-accent-amber" />
                <span className="text-[9px] uppercase tracking-wider text-accent-amber">Business Friction Warning</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">{approval.businessFrictionWarning}</p>
            </div>

            {/* Impacted entities */}
            <div className="panel-inner p-2.5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Building2 className="w-3 h-3 text-slate-400" />
                <span className="text-[9px] uppercase tracking-wider text-slate-500">Impacted Entities</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {approval.impactedEntities.map((entity) => (
                  <span
                    key={entity}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-surface-600 text-slate-300 border border-surface-border"
                  >
                    {entity}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            {active && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 pt-1"
              >
                <button
                  onClick={onApprove}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-accent-emerald/15 hover:bg-accent-emerald/25 border border-accent-emerald/30 hover:border-accent-emerald/50 rounded-lg text-accent-emerald text-sm font-semibold transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Approve & Deploy
                </button>
                <button
                  onClick={onReject}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-accent-red/10 hover:bg-accent-red/20 border border-accent-red/25 hover:border-accent-red/40 rounded-lg text-accent-red/80 text-sm font-medium transition-all cursor-pointer"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
              </motion.div>
            )}

            {/* Resolved timestamp */}
            {resolved && (
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <Clock className="w-3 h-3" />
                <span>Decision recorded at {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
              </div>
            )}
          </motion.div>
        )}

        {!active && !resolved && (
          <motion.div
            key="waiting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-full"
          >
            <p className="text-xs text-slate-500">
              Awaiting policy generation
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </PanelShell>
  );
}
