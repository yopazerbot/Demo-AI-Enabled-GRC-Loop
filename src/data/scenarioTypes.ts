import type {
  ThreatEvent,
  RiskMapping,
  PolicyUpdate,
  ApprovalRequest,
  EnvironmentState,
  ExecutiveMetrics,
  AgentState,
  DemoPhase,
  AuditEntry,
} from '../types';

export interface ScenarioData {
  id: string;
  label: string;
  subtitle: string;
  icon: 'phishing' | 'bug';
  threatEvent: ThreatEvent;
  riskMapping: RiskMapping;
  policy: PolicyUpdate;
  approval: ApprovalRequest;
  envBefore: EnvironmentState[];
  envAfter: EnvironmentState[];
  metricsBefore: ExecutiveMetrics[];
  metricsAfter: ExecutiveMetrics[];
  agents: AgentState[];
  auditEntries: Partial<Record<DemoPhase, Omit<AuditEntry, 'id' | 'timestamp'>>>;
  /** Short labels for the analysis callout */
  analysisSummary: {
    isoTheme: string;
    isoCode: string;
    isoDetail: string;
    callout: string;
    calloutHighlight: string;
  };
  /** Short labels for the policy card */
  policySummary: {
    title: string;
    subtitle: string;
    requirements: { icon: 'fingerprint' | 'key' | 'shield' | 'scan' | 'clock' | 'code'; text: string }[];
    scopeGroup: string;
    scopeSub: string;
  };
  /** Approval panel summary */
  approvalSummary: {
    reason: string;
    friction: string;
  };
  /** Threat card summary */
  threatSummary: {
    shortTitle: string;
    description: string;
    vector: string;
    affects: string;
    source: string;
  };
}
