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
  icon: 'phishing' | 'bug' | 'info';
  threatEvent: ThreatEvent;
  riskMapping: RiskMapping;
  policy: PolicyUpdate;
  approval: ApprovalRequest;
  envBefore: EnvironmentState;
  envAfter: EnvironmentState;
  metricsBefore: ExecutiveMetrics;
  metricsAfter: ExecutiveMetrics;
  agents: AgentState[];
  agentSteps: Record<string, { processing: string; output: string }>;
  auditEntries: Partial<Record<DemoPhase, Omit<AuditEntry, 'id' | 'timestamp'>>>;
  analysisSummary: {
    isoTheme: string;
    isoCode: string;
    isoDetail: string;
    riskStatement: string;
    likelihood: 'Very High' | 'High' | 'Medium' | 'Low';
    impact: 'Critical' | 'High' | 'Medium' | 'Low';
    callout: string;
  };
  policySummary: {
    title: string;
    subtitle: string;
    requirements: { icon: 'fingerprint' | 'key' | 'shield' | 'scan' | 'clock' | 'code'; text: string }[];
    scope: string;
  };
  approvalSummary: {
    reason: string;
    friction: string;
  };
  boardStatement: {
    before: string;
    after: string;
  };
  controlAction: string;
  threatSummary: {
    shortTitle: string;
    description: string;
    vector: string;
    source: string;
  };
}
