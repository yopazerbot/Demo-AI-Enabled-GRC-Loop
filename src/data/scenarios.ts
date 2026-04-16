import type { ScenarioData } from './scenarioTypes';

export const scenario1: ScenarioData = {
  id: 'phishing-mfa',
  label: 'AI Phishing Campaign',
  subtitle: 'Identity & Access Control',
  icon: 'phishing',

  threatEvent: {
    id: 'MISP-2026-04871',
    title: 'AI-Assisted Phishing Campaign Targeting Cloud Identities and OAuth Tokens',
    description: 'Sophisticated AiTM phishing campaign using LLMs to generate credential-harvesting emails.',
    severity: 'critical',
    confidence: 'high',
    tlp: 'AMBER',
    threatVector: 'Phishing → AiTM Proxy → OAuth Token Theft',
    suggestedMitigation: 'Enforce phishing-resistant MFA for all privileged accounts.',
    timestamp: '2026-04-16T09:14:00Z',
    source: 'Nordic CERT / MISP Community',
    affectedEntities: ['northstar'],
    tags: ['T1566.001', 'AiTM', 'OAuth abuse'],
  },

  threatSummary: {
    shortTitle: 'AI-Assisted Phishing',
    description: 'Targeting cloud identities & OAuth tokens via AiTM proxy',
    vector: 'AiTM → OAuth Theft',
    source: 'Nordic CERT',
  },

  riskMapping: {
    riskId: 'RSK-2026-0087',
    riskStatement: 'Compromise of privileged cloud identities through AI-assisted phishing and OAuth token interception.',
    riskOwner: 'Marcus Lindgren, CISO',
    impactedCapability: 'Identity & Access Management',
    residualExposure: 62,
    isoControlTheme: 'A.8 — Access Control (ISO/IEC 27001:2022)',
    isoControlRef: 'A.8.5 · A.8.2 · A.8.3',
    affectedEntities: [
      { entityId: 'northstar', entityName: 'Northstar', localExposure: 62, localImpact: 'Legacy MFA on 23% of admin accounts.' },
    ],
  },

  analysisSummary: {
    isoTheme: 'ISO/IEC 27001',
    isoCode: 'A.8 · Access Control',
    isoDetail: 'Identity compromise risk',
    exposurePercent: 62,
    callout: '23% of privileged accounts use legacy MFA — vulnerable to AiTM interception.',
  },

  policy: {
    policyId: 'POL-IAM-2026-012',
    title: 'Phishing-Resistant MFA Enforcement for Privileged and High-Risk Access',
    scope: 'group',
    scopeLabel: 'Organization-wide',
    humanReadable: '',
    policyAsCode: '',
    effectiveDate: '2026-04-16',
    rationale: 'Active AiTM phishing campaign targeting the Nordic region.',
  },

  policySummary: {
    title: 'Phishing-Resistant MFA',
    subtitle: 'For privileged & high-risk access',
    requirements: [
      { icon: 'fingerprint', text: 'FIDO2 / Passkeys required' },
      { icon: 'key', text: 'OAuth consent: admin-approved only' },
      { icon: 'shield', text: 'Compliant device required' },
    ],
    scope: 'Organization-wide · 30-day rollout',
  },

  approval: {
    id: 'APR-2026-0341',
    reasonForChange: 'Active AI-assisted phishing campaign targeting cloud identities.',
    scope: 'group',
    scopeLabel: 'Organization-wide',
    expectedImpact: 'Reduces identity compromise exposure from 62% to under 15%.',
    businessFrictionWarning: '3-5 day FIDO2 enrollment for ~25% of users.',
    approverName: 'Dr. Elena Vasquez',
    approverRole: 'Chief Risk Officer',
    impactedEntities: ['Northstar'],
    status: 'pending',
  },

  approvalSummary: {
    reason: 'Approve phishing-resistant MFA to mitigate active AiTM campaign.',
    friction: '3-5 day FIDO2 enrollment for ~25% of users.',
  },

  envBefore: {
    entityId: 'northstar', entityName: 'Northstar', complianceScore: 74,
    policyAssignments: [], affectedAssets: [
      { id: 'A1', name: 'Azure AD Tenant', type: 'Identity Provider', compliant: false, lastChecked: '' },
      { id: 'A2', name: 'Exchange Online', type: 'Collaboration', compliant: true, lastChecked: '' },
      { id: 'A3', name: 'SAP S/4HANA', type: 'ERP', compliant: true, lastChecked: '' },
      { id: 'A4', name: 'Corporate VPN', type: 'Network', compliant: false, lastChecked: '' },
      { id: 'A5', name: 'Data Lake', type: 'Data Store', compliant: true, lastChecked: '' },
    ], remediationStatus: [],
  },

  envAfter: {
    entityId: 'northstar', entityName: 'Northstar', complianceScore: 91,
    policyAssignments: [], affectedAssets: [
      { id: 'A1', name: 'Azure AD Tenant', type: 'Identity Provider', compliant: true, lastChecked: '' },
      { id: 'A2', name: 'Exchange Online', type: 'Collaboration', compliant: true, lastChecked: '' },
      { id: 'A3', name: 'SAP S/4HANA', type: 'ERP', compliant: true, lastChecked: '' },
      { id: 'A4', name: 'Corporate VPN', type: 'Network', compliant: true, lastChecked: '' },
      { id: 'A5', name: 'Data Lake', type: 'Data Store', compliant: true, lastChecked: '' },
    ], remediationStatus: [],
  },

  metricsBefore: {
    entityId: 'northstar', entityName: 'Northstar', overallRiskScore: 34, compliancePosture: 74, openFindings: 12, controlCoverage: 72,
    exposureTrend: [28, 30, 29, 32, 33, 34], complianceTrend: [80, 79, 78, 76, 75, 74],
  },

  metricsAfter: {
    entityId: 'northstar', entityName: 'Northstar', overallRiskScore: 12, compliancePosture: 91, openFindings: 4, controlCoverage: 90,
    exposureTrend: [30, 32, 33, 34, 22, 12], complianceTrend: [79, 78, 76, 74, 84, 91],
  },

  agents: [
    { id: 'threat-intake', name: 'Threat Intake Agent', role: 'Analyzes raw threat intelligence events.', status: 'idle', description: '' },
    { id: 'risk-mapping', name: 'Risk Mapping Agent', role: 'Maps threats to risk scenarios and ISO controls.', status: 'idle', description: '' },
    { id: 'control-engineering', name: 'Control Engineering Agent', role: 'Generates policies and policy-as-code.', status: 'idle', description: '' },
  ],

  auditEntries: {
    new_event_received: { actor: 'MISP Connector', action: 'Threat Ingested', detail: 'MISP-2026-04871 — AI phishing. Critical.', phase: 'new_event_received' },
    threat_analysis_in_progress: { actor: 'Threat Intake Agent', action: 'Analysing', detail: 'Extracting threat context.', phase: 'threat_analysis_in_progress' },
    risk_mapped: { actor: 'Risk Mapping Agent', action: 'Risk Mapped', detail: 'RSK-2026-0087 → ISO A.8.', phase: 'risk_mapped' },
    policy_generated: { actor: 'Control Engineering Agent', action: 'Policy Drafted', detail: 'POL-IAM-2026-012 ready.', phase: 'policy_generated' },
    awaiting_approval: { actor: 'Orchestration', action: 'Approval Gate', detail: 'Awaiting CRO.', phase: 'awaiting_approval' },
    deployment_in_progress: { actor: 'Dr. Elena Vasquez', action: 'Approved', detail: 'Deploying.', phase: 'deployment_in_progress' },
    deployment_complete: { actor: 'Environment Controller', action: 'Deployed', detail: 'Policy active.', phase: 'deployment_complete' },
  },
};

export const scenario2: ScenarioData = {
  id: 'bug-bounty-rce',
  label: 'Bug Bounty Critical RCE',
  subtitle: 'Secure Development Lifecycle',
  icon: 'bug',

  threatEvent: {
    id: 'BB-2026-00193',
    title: 'Critical RCE in Authentication Library via Deserialization Flaw (Bug Bounty)',
    description: 'Security researcher reports unauthenticated RCE in an open-source JWT validation library used across multiple services.',
    severity: 'critical',
    confidence: 'high',
    tlp: 'RED',
    threatVector: 'Malicious JWT → Deserialization → Remote Code Execution',
    suggestedMitigation: 'Patch dependency to v4.2.1. Enforce SCA gating. Deploy WAF rule.',
    timestamp: '2026-04-16T11:22:00Z',
    source: 'Northstar Bug Bounty Program',
    affectedEntities: ['northstar'],
    tags: ['CVE-2026-31847', 'RCE', 'Deserialization', 'Supply chain'],
  },

  threatSummary: {
    shortTitle: 'Critical RCE via Bug Bounty',
    description: 'Unauthenticated RCE in JWT library used across all services',
    vector: 'JWT → Deserialization → RCE',
    source: 'Bug Bounty Program',
  },

  riskMapping: {
    riskId: 'RSK-2026-0094',
    riskStatement: 'Unauthenticated remote code execution through a widely-deployed open-source dependency.',
    riskOwner: 'Anna Berglund, VP Engineering',
    impactedCapability: 'Secure Software Development Lifecycle',
    residualExposure: 78,
    isoControlTheme: 'A.8.25–28 — Secure Development (ISO/IEC 27001:2022)',
    isoControlRef: 'A.8.25 · A.8.28 · A.8.8',
    affectedEntities: [
      { entityId: 'northstar', entityName: 'Northstar', localExposure: 78, localImpact: '14 services use the vulnerable library. No SCA gate in CI/CD.' },
    ],
  },

  analysisSummary: {
    isoTheme: 'ISO/IEC 27001',
    isoCode: 'A.8.25 · Secure Development',
    isoDetail: 'Software supply chain risk',
    exposurePercent: 78,
    callout: '14 services use the vulnerable library. CI/CD pipeline has no SCA gating.',
  },

  policy: {
    policyId: 'POL-SDLC-2026-008',
    title: 'Mandatory SCA Gating and Critical Vulnerability Patch SLA',
    scope: 'group',
    scopeLabel: 'Organization-wide',
    humanReadable: '',
    policyAsCode: '',
    effectiveDate: '2026-04-16',
    rationale: 'Bug bounty disclosure reveals unmitigated RCE with no SCA pipeline enforcement.',
  },

  policySummary: {
    title: 'SCA Gating & Patch SLA',
    subtitle: 'For all CI/CD pipelines and deployments',
    requirements: [
      { icon: 'scan', text: 'Mandatory SCA scan in CI/CD pipeline' },
      { icon: 'clock', text: '24-hour patch SLA for critical CVEs' },
      { icon: 'code', text: 'SBOM generation & validation required' },
    ],
    scope: 'Organization-wide · immediate enforcement',
  },

  approval: {
    id: 'APR-2026-0348',
    reasonForChange: 'Bug bounty disclosure of critical unauthenticated RCE in JWT library.',
    scope: 'group',
    scopeLabel: 'Organization-wide',
    expectedImpact: 'Eliminates CVE-2026-31847 attack surface. Enforces SCA gating.',
    businessFrictionWarning: 'Emergency maintenance window. 2 CI/CD pipelines blocked until SCA integrated.',
    approverName: 'Dr. Elena Vasquez',
    approverRole: 'Chief Risk Officer',
    impactedEntities: ['Northstar'],
    status: 'pending',
  },

  approvalSummary: {
    reason: 'Approve emergency patch SLA and mandatory SCA gating to close critical RCE.',
    friction: 'Emergency maintenance window. 2 CI/CD pipelines blocked until SCA integrated.',
  },

  envBefore: {
    entityId: 'northstar', entityName: 'Northstar', complianceScore: 68,
    policyAssignments: [], affectedAssets: [
      { id: 'S1', name: 'CI/CD Platform', type: 'DevOps', compliant: false, lastChecked: '' },
      { id: 'S2', name: 'API Gateway', type: 'Service', compliant: false, lastChecked: '' },
      { id: 'S3', name: 'Artifact Registry', type: 'DevOps', compliant: true, lastChecked: '' },
      { id: 'S4', name: 'Identity Service', type: 'Service', compliant: false, lastChecked: '' },
      { id: 'S5', name: 'Customer Portal', type: 'Application', compliant: false, lastChecked: '' },
    ], remediationStatus: [],
  },

  envAfter: {
    entityId: 'northstar', entityName: 'Northstar', complianceScore: 92,
    policyAssignments: [], affectedAssets: [
      { id: 'S1', name: 'CI/CD Platform', type: 'DevOps', compliant: true, lastChecked: '' },
      { id: 'S2', name: 'API Gateway', type: 'Service', compliant: true, lastChecked: '' },
      { id: 'S3', name: 'Artifact Registry', type: 'DevOps', compliant: true, lastChecked: '' },
      { id: 'S4', name: 'Identity Service', type: 'Service', compliant: true, lastChecked: '' },
      { id: 'S5', name: 'Customer Portal', type: 'Application', compliant: true, lastChecked: '' },
    ], remediationStatus: [],
  },

  metricsBefore: {
    entityId: 'northstar', entityName: 'Northstar', overallRiskScore: 46, compliancePosture: 68, openFindings: 14, controlCoverage: 65,
    exposureTrend: [35, 37, 39, 41, 44, 46], complianceTrend: [76, 74, 72, 71, 69, 68],
  },

  metricsAfter: {
    entityId: 'northstar', entityName: 'Northstar', overallRiskScore: 11, compliancePosture: 92, openFindings: 3, controlCoverage: 93,
    exposureTrend: [37, 39, 41, 46, 28, 11], complianceTrend: [74, 72, 71, 68, 82, 92],
  },

  agents: [
    { id: 'threat-intake', name: 'Threat Intake Agent', role: 'Analyzes vulnerability disclosures.', status: 'idle', description: '' },
    { id: 'risk-mapping', name: 'Risk Mapping Agent', role: 'Maps vulnerabilities to risk scenarios.', status: 'idle', description: '' },
    { id: 'control-engineering', name: 'Control Engineering Agent', role: 'Generates SDLC policies and SCA rules.', status: 'idle', description: '' },
  ],

  auditEntries: {
    new_event_received: { actor: 'Bug Bounty Triage', action: 'Disclosure Ingested', detail: 'BB-2026-00193 — Critical RCE. TLP:RED.', phase: 'new_event_received' },
    threat_analysis_in_progress: { actor: 'Threat Intake Agent', action: 'Analysing', detail: 'Assessing CVE-2026-31847 blast radius.', phase: 'threat_analysis_in_progress' },
    risk_mapped: { actor: 'Risk Mapping Agent', action: 'Risk Mapped', detail: 'RSK-2026-0094 → ISO A.8.25.', phase: 'risk_mapped' },
    policy_generated: { actor: 'Control Engineering Agent', action: 'Policy Drafted', detail: 'POL-SDLC-2026-008 ready.', phase: 'policy_generated' },
    awaiting_approval: { actor: 'Orchestration', action: 'Approval Gate', detail: 'Awaiting CRO.', phase: 'awaiting_approval' },
    deployment_in_progress: { actor: 'Dr. Elena Vasquez', action: 'Approved', detail: 'Emergency patch deploying.', phase: 'deployment_in_progress' },
    deployment_complete: { actor: 'Environment Controller', action: 'Deployed', detail: 'Patch applied. SCA active.', phase: 'deployment_complete' },
  },
};

export const ALL_SCENARIOS: ScenarioData[] = [scenario1, scenario2];
