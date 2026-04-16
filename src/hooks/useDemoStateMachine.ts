import { useState, useCallback } from 'react';
import type { DemoPhase, AgentState, AuditEntry } from '../types';
import { initialAgents } from '../data/agents';
import { generateAuditEntry } from '../data/auditTrail';

const PHASE_ORDER: DemoPhase[] = [
  'idle',
  'new_event_received',
  'threat_analysis_in_progress',
  'risk_mapped',
  'policy_generated',
  'awaiting_approval',
  'deployment_in_progress',
  'deployment_complete',
];

function agentsForPhase(phase: DemoPhase): AgentState[] {
  return initialAgents.map((agent) => {
    switch (phase) {
      case 'idle':
        return { ...agent, status: 'idle' as const };

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
          return { ...agent, status: 'completed' as const, outputSummary: 'Risk scenario RSK-2026-0087 mapped to ISO 27001 A.8.' };
        return { ...agent, status: 'idle' as const };

      case 'policy_generated':
      case 'awaiting_approval':
      case 'deployment_in_progress':
      case 'deployment_complete':
        if (agent.id === 'threat-intake')
          return { ...agent, status: 'completed' as const, outputSummary: 'Threat interpretation complete. Business context extracted.' };
        if (agent.id === 'risk-mapping')
          return { ...agent, status: 'completed' as const, outputSummary: 'Risk scenario RSK-2026-0087 mapped to ISO 27001 A.8.' };
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

  const addAuditEntry = useCallback((newPhase: DemoPhase, idx: number) => {
    const entry = generateAuditEntry(newPhase, idx);
    if (entry) {
      setAuditTrail((prev) => [...prev, entry]);
    }
  }, []);

  const advancePhase = useCallback(() => {
    setPhase((current) => {
      const idx = PHASE_ORDER.indexOf(current);
      if (idx < 0 || idx >= PHASE_ORDER.length - 1) return current;

      // Don't auto-advance past awaiting_approval
      if (current === 'awaiting_approval') return current;

      const next = PHASE_ORDER[idx + 1];
      setAgents(agentsForPhase(next));
      addAuditEntry(next, idx + 1);
      return next;
    });
  }, [addAuditEntry]);

  const triggerScenario = useCallback(() => {
    if (phase !== 'idle') return;
    const next: DemoPhase = 'new_event_received';
    setPhase(next);
    setAgents(agentsForPhase(next));
    setApprovalStatus('pending');
    setAuditTrail([]);
    addAuditEntry(next, 0);
  }, [phase, addAuditEntry]);

  const approve = useCallback(() => {
    if (phase !== 'awaiting_approval') return;
    setApprovalStatus('approved');
    const next: DemoPhase = 'deployment_in_progress';
    setPhase(next);
    setAgents(agentsForPhase(next));
    addAuditEntry(next, PHASE_ORDER.indexOf(next));
  }, [phase, addAuditEntry]);

  const reject = useCallback(() => {
    if (phase !== 'awaiting_approval') return;
    setApprovalStatus('rejected');
  }, [phase]);

  const resetDemo = useCallback(() => {
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
