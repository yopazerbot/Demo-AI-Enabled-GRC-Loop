/* ──────────────────────────────────────────────
   GRC Control Loop – Core Type Definitions
   ────────────────────────────────────────────── */

// ── Demo State Machine ──

export type DemoPhase =
  | 'idle'
  | 'new_event_received'
  | 'threat_analysis_in_progress'
  | 'risk_mapped'
  | 'policy_generated'
  | 'awaiting_approval'
  | 'deployment_in_progress'
  | 'deployment_complete';

// ── Organizational Structure ──

export interface OrgEntity {
  id: string;
  name: string;
  type: 'parent' | 'subsidiary';
  parentId?: string;
  sector: string;
  region: string;
  employeeCount: number;
  criticalAssets: string[];
  complianceScore: number;
  riskExposure: number;
}

// ── Threat Intelligence ──

export type TLP = 'RED' | 'AMBER' | 'GREEN' | 'WHITE';
export type Severity = 'critical' | 'high' | 'medium' | 'low';
export type Confidence = 'high' | 'medium' | 'low';

export interface ThreatEvent {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  confidence: Confidence;
  tlp: TLP;
  threatVector: string;
  suggestedMitigation: string;
  timestamp: string;
  source: string;
  affectedEntities: string[]; // org entity IDs
  tags: string[];
}

// ── Agent Orchestration ──

export type AgentStatus = 'idle' | 'processing' | 'completed';

export interface AgentState {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  description: string;
  outputSummary?: string;
}

// ── Risk Mapping ──

export interface RiskMapping {
  riskId: string;
  riskStatement: string;
  riskOwner: string;
  impactedCapability: string;
  residualExposure: number; // 0–100
  isoControlTheme: string;
  isoControlRef: string;
  affectedEntities: {
    entityId: string;
    entityName: string;
    localExposure: number;
    localImpact: string;
  }[];
}

// ── Policy Studio ──

export type PolicyScope = 'group' | 'subsidiary' | 'group_with_local_override';

export interface PolicyUpdate {
  policyId: string;
  title: string;
  scope: PolicyScope;
  scopeLabel: string;
  humanReadable: string;
  previousPolicy?: string;
  policyAsCode: string;
  previousPolicyAsCode?: string;
  effectiveDate: string;
  rationale: string;
}

// ── Approval Gate ──

export interface ApprovalRequest {
  id: string;
  reasonForChange: string;
  scope: PolicyScope;
  scopeLabel: string;
  expectedImpact: string;
  businessFrictionWarning: string;
  approverName: string;
  approverRole: string;
  impactedEntities: string[];
  status: 'pending' | 'approved' | 'rejected';
  timestamp?: string;
}

// ── Corporate Environment ──

export interface EnvironmentState {
  entityId: string;
  entityName: string;
  complianceScore: number;
  policyAssignments: PolicyAssignment[];
  affectedAssets: AssetStatus[];
  remediationStatus: RemediationItem[];
}

export interface PolicyAssignment {
  policyId: string;
  policyName: string;
  status: 'active' | 'pending' | 'not_assigned';
  assignedScope: string;
}

export interface AssetStatus {
  id: string;
  name: string;
  type: string;
  compliant: boolean;
  lastChecked: string;
}

export interface RemediationItem {
  id: string;
  description: string;
  status: 'pending' | 'in_progress' | 'complete';
  assignedTo: string;
}

// ── Executive Summary ──

export interface ExecutiveMetrics {
  entityId: string;
  entityName: string;
  overallRiskScore: number;
  compliancePosture: number;
  openFindings: number;
  controlCoverage: number;
  exposureTrend: number[]; // last 6 data points
  complianceTrend: number[];
}

// ── Audit Trail ──

export interface AuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  detail: string;
  phase: DemoPhase;
}
