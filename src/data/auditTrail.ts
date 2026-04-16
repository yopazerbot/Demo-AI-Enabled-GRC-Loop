import type { AuditEntry, DemoPhase } from '../types';

export function generateAuditEntry(
  phase: DemoPhase,
  index: number,
): AuditEntry | null {
  const entries: Partial<Record<DemoPhase, Omit<AuditEntry, 'id' | 'timestamp'>>> = {
    new_event_received: {
      actor: 'MISP Connector',
      action: 'Threat Event Ingested',
      detail: 'MISP-2026-04871 — AI-Assisted Phishing Campaign received from Nordic CERT feed. TLP:AMBER. Severity: Critical.',
      phase: 'new_event_received',
    },
    threat_analysis_in_progress: {
      actor: 'Threat Intake Agent',
      action: 'Threat Analysis Initiated',
      detail: 'Analyzing event MISP-2026-04871. Extracting threat vectors, affected sectors, and organizational relevance.',
      phase: 'threat_analysis_in_progress',
    },
    risk_mapped: {
      actor: 'Risk Mapping Agent',
      action: 'Risk Scenario Mapped',
      detail: 'RSK-2026-0087 created. Mapped to ISO/IEC 27001:2022 A.8 — Access Control. Residual exposure: 62%. Affected: Northstar Group, Northstar Health Services.',
      phase: 'risk_mapped',
    },
    policy_generated: {
      actor: 'Control Engineering Agent',
      action: 'Policy Artifact Generated',
      detail: 'POL-IAM-2026-012 drafted. Scope: Group baseline + subsidiary accelerated rollout. Human-readable policy and policy-as-code artifact produced.',
      phase: 'policy_generated',
    },
    awaiting_approval: {
      actor: 'Orchestration Layer',
      action: 'Approval Gate Activated',
      detail: 'APR-2026-0341 submitted for review by Dr. Elena Vasquez (Group CRO). Awaiting human decision.',
      phase: 'awaiting_approval',
    },
    deployment_in_progress: {
      actor: 'Dr. Elena Vasquez',
      action: 'Policy Approved — Deployment Initiated',
      detail: 'APR-2026-0341 approved. Deploying POL-IAM-2026-012 to group environment with accelerated subsidiary rollout.',
      phase: 'deployment_in_progress',
    },
    deployment_complete: {
      actor: 'Environment Controller',
      action: 'Deployment Complete',
      detail: 'Policy POL-IAM-2026-012 active. Compliance scores updated. Remediation tasks assigned. Executive metrics refreshed.',
      phase: 'deployment_complete',
    },
  };

  const entry = entries[phase];
  if (!entry) return null;

  const baseTime = new Date('2026-04-16T09:14:00Z');
  const offset = index * 45_000; // 45 seconds between entries
  const ts = new Date(baseTime.getTime() + offset);

  return {
    id: `AUD-${String(index + 1).padStart(4, '0')}`,
    timestamp: ts.toISOString(),
    ...entry,
  };
}
