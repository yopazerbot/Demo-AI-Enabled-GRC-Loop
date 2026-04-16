import { useState, useCallback, useRef, useEffect } from 'react';
import type { DemoPhase, AgentState, AuditEntry } from '../types';
import { initialAgents } from '../data/agents';
import { generateAuditEntry } from '../data/auditTrail';

export const PHASE_ORDER: DemoPhase[] = [
  'idle',
  'new_event_received',
  'threat_analysis_in_progress',
  'risk_mapped',
  'policy_generated',
  'awaiting_approval',
  'deployment_in_progress',
  'deployment_complete',
];

// Delay in ms before auto-advancing from each phase.
// Phases not listed here do not auto-advance.
const AUTO_ADVANCE_DELAYS: Partial<Record<DemoPhase, number>> = {
  new_event_received: 2000,
  threat_analysis_in_progress: 3000,
  risk_mapped: 2500,
  policy_generated: 2500,
  // awaiting_approval — stops, requires human action
  deployment_in_progress: 3000,
  // deployment_complete — terminal
};

function agentsForPhase(phase: DemoPhase): AgentState[] {
  return initialAgents.map((agent) => {
    switch (phase) {
      case 'idle':
      case 'new_event_received':
        return { ...agent, status: 'idle' as const };

      case 'threat_analysis_in_progress':
        if (agent.id === 'threat-intake')
          return { ...agent, status: 'processing' as const, outputSummary: 'Analyzing threat vectors and organizational relevance…' };
        return { ...agent, status: 'idle' as const };

      case 'risk_mapped':
        if (agent.id === 'threat-intake')
          return { ...agent, status: 'completed' as const, outputSummary: 'Threat interpretation complete. Business context extracted.' };
        if (agent.id === 'risk-mapping')
          return { ...agent, status: 'processing' as const, outputSummary: 'Mapping risk scenario to ISO 27001 control themes…' };
        return { ...agent, status: 'idle' as const };

      case 'policy_generated':
        if (agent.id === 'threat-intake')
          return { ...agent, status: 'completed' as const, outputSummary: 'Threat interpretation complete. Business context extracted.' };
        if (agent.id === 'risk-mapping')
          return { ...agent, status: 'completed' as const, outputSummary: 'Risk scenario RSK-2026-0087 mapped to ISO 27001 A.8 — Access Control.' };
        if (agent.id === 'control-engineering')
          return { ...agent, status: 'processing' as const, outputSummary: 'Generating policy artifact and policy-as-code definition…' };
        return agent;

      case 'awaiting_approval':
      case 'deployment_in_progress':
      case 'deployment_complete':
        if (agent.id === 'threat-intake')
          return { ...agent, status: 'completed' as const, outputSummary: 'Threat interpretation complete. Business context extracted.' };
        if (agent.id === 'risk-mapping')
          return { ...agent, status: 'completed' as const, outputSummary: 'Risk scenario RSK-2026-0087 mapped to ISO 27001 A.8 — Access Control.' };
        if (agent.id === 'control-engineering')
          return { ...agent, status: 'completed' as const, outputSummary: 'Policy POL-IAM-2026-012 generated. Human-readable + policy-as-code.' };
        return agent;

      default:
        return agent;
    }
  });
}

export function useDemoStateMachine() {
  const [phase, setPhase] = useState<DemoPhase>('idle');
  const [agents, setAgents] = useState<AgentState[]>(initialAgents);
  const [auditTrail, setAuditTrail] = useState<AuditEntry[]>([]);
  const [approvalStatus, setApprovalStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear any pending timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const addAuditEntry = useCallback((newPhase: DemoPhase, idx: number) => {
    const entry = generateAuditEntry(newPhase, idx);
    if (entry) {
      setAuditTrail((prev) => [...prev, entry]);
    }
  }, []);

  const goToPhase = useCallback(
    (next: DemoPhase) => {
      const idx = PHASE_ORDER.indexOf(next);
      setPhase(next);
      setAgents(agentsForPhase(next));
      addAuditEntry(next, idx);

      // Schedule auto-advance if applicable
      if (timerRef.current) clearTimeout(timerRef.current);
      const delay = AUTO_ADVANCE_DELAYS[next];
      if (delay) {
        const nextIdx = idx + 1;
        if (nextIdx < PHASE_ORDER.length) {
          timerRef.current = setTimeout(() => {
            goToPhase(PHASE_ORDER[nextIdx]);
          }, delay);
        }
      }
    },
    [addAuditEntry],
  );

  const advancePhase = useCallback(() => {
    setPhase((current) => {
      const idx = PHASE_ORDER.indexOf(current);
      if (idx < 0 || idx >= PHASE_ORDER.length - 1) return current;
      if (current === 'awaiting_approval') return current;

      const next = PHASE_ORDER[idx + 1];
      // Stop any auto timer since we're manually advancing
      if (timerRef.current) clearTimeout(timerRef.current);
      setAgents(agentsForPhase(next));
      addAuditEntry(next, idx + 1);

      // Re-schedule auto-advance from the new phase
      const delay = AUTO_ADVANCE_DELAYS[next];
      if (delay) {
        const nextIdx = idx + 2;
        if (nextIdx < PHASE_ORDER.length) {
          timerRef.current = setTimeout(() => {
            goToPhase(PHASE_ORDER[nextIdx]);
          }, delay);
        }
      }

      return next;
    });
  }, [addAuditEntry, goToPhase]);

  const triggerScenario = useCallback(() => {
    if (phase !== 'idle') return;
    if (timerRef.current) clearTimeout(timerRef.current);

    const next: DemoPhase = 'new_event_received';
    setApprovalStatus('pending');
    setAuditTrail([]);
    goToPhase(next);
  }, [phase, goToPhase]);

  const approve = useCallback(() => {
    if (phase !== 'awaiting_approval') return;
    setApprovalStatus('approved');
    goToPhase('deployment_in_progress');
  }, [phase, goToPhase]);

  const reject = useCallback(() => {
    if (phase !== 'awaiting_approval') return;
    setApprovalStatus('rejected');
  }, [phase]);

  const resetDemo = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase('idle');
    setAgents(initialAgents);
    setAuditTrail([]);
    setApprovalStatus('pending');
  }, []);

  return {
    phase,
    agents,
    auditTrail,
    approvalStatus,
    triggerScenario,
    advancePhase,
    approve,
    reject,
    resetDemo,
  };
}
