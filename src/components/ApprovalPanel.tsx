import { ShieldCheck } from 'lucide-react';
import { PanelShell } from './PanelShell';
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

  return (
    <PanelShell
      title="Governance Approval"
      icon={ShieldCheck}
      accentColor="text-accent-amber"
      badge={
        resolved
          ? approvalStatus === 'approved' ? 'APPROVED' : 'REJECTED'
          : active
            ? 'ACTION REQUIRED'
            : undefined
      }
      badgeColor={
        resolved && approvalStatus === 'approved'
          ? 'bg-accent-emerald/15 text-accent-emerald'
          : resolved && approvalStatus === 'rejected'
            ? 'bg-accent-red/15 text-accent-red'
            : 'bg-accent-amber/15 text-accent-amber'
      }
    >
      <div className="flex items-center justify-center h-full">
        {active ? (
          <div className="text-center space-y-3">
            <p className="text-sm text-slate-300">
              Policy requires human approval before deployment
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={onApprove}
                className="px-4 py-2 bg-accent-emerald/15 hover:bg-accent-emerald/25 border border-accent-emerald/30 rounded-lg text-accent-emerald text-sm font-medium transition-all cursor-pointer"
              >
                Approve
              </button>
              <button
                onClick={onReject}
                className="px-4 py-2 bg-accent-red/15 hover:bg-accent-red/25 border border-accent-red/30 rounded-lg text-accent-red text-sm font-medium transition-all cursor-pointer"
              >
                Reject
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Full approval details — implemented in Phase 4
            </p>
          </div>
        ) : resolved ? (
          <p className="text-sm text-accent-emerald">
            ✓ Policy approved by Dr. Elena Vasquez, Group CRO
          </p>
        ) : (
          <p className="text-xs text-slate-500">
            Awaiting policy generation
          </p>
        )}
      </div>
    </PanelShell>
  );
}
