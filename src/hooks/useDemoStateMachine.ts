import { useState, useCallback } from 'react';
import type { DemoPhase, AgentState, AuditEntry } from '../types';
import type { ScenarioData } from '../data/scenarioTypes';
import { ALL_SCENARIOS } from '../data/scenarios';

export const PHASE_ORDER: DemoPhase[] = [
  'idle',
  'new_event_received',
  'threat_analysis_in_progress',
  'risk_mapped',
  'policy_generated',
  'awaiting_approval',
  'deployment_in_progress',
  'environment_updated',
  'deployment_complete',
];

function agentsForPhase(phase: DemoPhase, scenario: ScenarioData): AgentState[] {
  const steps = scenario.agentSteps;
  return scenario.agents.map((agent) => {
    const step = steps[agent.id];
    switch (phase) {
      case 'idle':
      case 'new_event_received':
        return { ...agent, status: 'idle' as const, outputSummary: undefined };

      case 'threat_analysis_in_progress':
        if (agent.id === 'threat-intake')
          return { ...agent, status: 'processing' as const, outputSummary: step?.processing };
        return { ...agent, status: 'idle' as const, outputSummary: undefined };

      case 'risk_mapped':
        if (agent.id === 'threat-intake')
          return { ...agent, status: 'completed' as const, outputSummary: step?.output };
        if (agent.id === 'risk-mapping')
          return { ...agent, status: 'processing' as const, outputSummary: step?.processing };
        return { ...agent, status: 'idle' as const, outputSummary: undefined };

      case 'policy_generated':
        if (agent.id === 'threat-intake')
          return { ...agent, status: 'completed' as const, outputSummary: step?.output };
        if (agent.id === 'risk-mapping')
          return { ...agent, status: 'completed' as const, outputSummary: step?.output };
        if (agent.id === 'control-engineering')
          return { ...agent, status: 'processing' as const, outputSummary: step?.processing };
        return agent;

      default:
        return { ...agent, status: 'completed' as const, outputSummary: step?.output };
    }
  });
}

function generateAuditEntryFromScenario(phase: DemoPhase, idx: number, scenario: ScenarioData): AuditEntry | null {
  const entry = scenario.auditEntries[phase];
  if (!entry) return null;
  const baseTime = new Date(scenario.threatEvent.timestamp);
  const ts = new Date(baseTime.getTime() + idx * 45_000);
  return { id: `AUD-${String(idx + 1).padStart(4, '0')}`, timestamp: ts.toISOString(), ...entry };
}

export function useDemoStateMachine() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [phase, setPhase] = useState<DemoPhase>('idle');
  const [agents, setAgents] = useState<AgentState[]>(ALL_SCENARIOS[0].agents);
  const [auditTrail, setAuditTrail] = useState<AuditEntry[]>([]);
  const [approvalStatus, setApprovalStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const scenario = ALL_SCENARIOS[scenarioIdx];

  const goToPhase = useCallback(
    (next: DemoPhase, sc: ScenarioData) => {
      const idx = PHASE_ORDER.indexOf(next);
      setPhase(next);
      setAgents(agentsForPhase(next, sc));
      const entry = generateAuditEntryFromScenario(next, idx, sc);
      if (entry) setAuditTrail((prev) => [...prev, entry]);
    },
    [],
  );

  const advancePhase = useCallback(() => {
    const idx = PHASE_ORDER.indexOf(phase);
    if (idx < 0 || idx >= PHASE_ORDER.length - 1) return;
    if (phase === 'awaiting_approval') return;
    goToPhase(PHASE_ORDER[idx + 1], scenario);
  }, [phase, goToPhase, scenario]);

  const stepBack = useCallback(() => {
    const idx = PHASE_ORDER.indexOf(phase);
    if (idx <= 0) return;
    const prev = PHASE_ORDER[idx - 1];
    setPhase(prev);
    setAgents(agentsForPhase(prev, scenario));
    // Trim the audit trail to remove entries from the phases we're rewinding past
    setAuditTrail((trail) => trail.slice(0, Math.max(0, idx - 1)));
    if (phase === 'deployment_in_progress' || phase === 'environment_updated' || phase === 'deployment_complete') {
      setApprovalStatus('pending');
    }
  }, [phase, scenario]);

  const triggerScenario = useCallback(() => {
    if (phase !== 'idle') return;
    setApprovalStatus('pending');
    setAuditTrail([]);
    goToPhase('new_event_received', scenario);
  }, [phase, goToPhase, scenario]);

  const approve = useCallback(() => {
    if (phase !== 'awaiting_approval') return;
    setApprovalStatus('approved');
    goToPhase('deployment_in_progress', scenario);
  }, [phase, goToPhase, scenario]);

  const reject = useCallback(() => {
    if (phase !== 'awaiting_approval') return;
    setApprovalStatus('rejected');
  }, [phase]);

  const resetDemo = useCallback(() => {
    setPhase('idle');
    setAgents(scenario.agents);
    setAuditTrail([]);
    setApprovalStatus('pending');
  }, [scenario]);

  const switchScenario = useCallback((idx: number) => {
    setScenarioIdx(idx);
    setPhase('idle');
    setAgents(ALL_SCENARIOS[idx].agents);
    setAuditTrail([]);
    setApprovalStatus('pending');
  }, []);

  return {
    phase,
    agents,
    auditTrail,
    approvalStatus,
    scenario,
    scenarioIdx,
    allScenarios: ALL_SCENARIOS,
    triggerScenario,
    advancePhase,
    stepBack,
    approve,
    reject,
    resetDemo,
    switchScenario,
  };
}
