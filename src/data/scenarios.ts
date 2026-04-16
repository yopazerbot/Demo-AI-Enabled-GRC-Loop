import type { ScenarioData } from './scenarioTypes';

export const scenario1: ScenarioData = {
  id: 'phishing-mfa',
  label: 'AI Phishing Campaign',
  subtitle: 'Identity & Access Control',
  icon: 'phishing',

  threatEvent: {
    id: 'MISP-2026-04871',
    title: 'AI-Assisted Phishing Campaign Targeting Cloud Identities and OAuth Tokens',
    description: 'Sophisticated AiTM phishing campaign using LLMs to generate credential-harvesting emails targeting Nordic healthcare and financial sectors.',
    severity: 'critical',
    confidence: 'high',
    tlp: 'AMBER',
    threatVector: 'Phishing → AiTM Proxy → OAuth Token Theft',
    suggestedMitigation: 'Enforce phishing-resistant MFA for all privileged accounts.',
    timestamp: '2026-04-16T09:14:00Z',
    source: 'Nordic CERT / MISP Community',
    affectedEntities: ['northstar-group', 'northstar-health'],
    tags: ['T1566.001', 'AiTM', 'OAuth abuse', 'Healthcare'],
  },

  threatSummary: {
    shortTitle: 'AI-Assisted Phishing',
    description: 'Targeting cloud identities & OAuth tokens across Nordic healthcare',
    vector: 'AiTM → OAuth Theft',
    affects: 'Both Entities',
    source: 'Nordic CERT',
  },

  riskMapping: {
    riskId: 'RSK-2026-0087',
    riskStatement: 'Compromise of privileged cloud identities through AI-assisted phishing and OAuth token interception.',
    riskOwner: 'Marcus Lindgren, Group CISO',
    impactedCapability: 'Identity & Access Management',
    residualExposure: 62,
    isoControlTheme: 'A.8 — Access Control (ISO/IEC 27001:2022)',
    isoControlRef: 'A.8.5 · A.8.2 · A.8.3',
    affectedEntities: [
      { entityId: 'northstar-group', entityName: 'Northstar Group', localExposure: 48, localImpact: 'Legacy MFA on 23% of admin accounts.' },
      { entityId: 'northstar-health', entityName: 'Northstar Health Services', localExposure: 72, localImpact: 'Patient portal OAuth SSO vulnerability.' },
    ],
  },

  analysisSummary: {
    isoTheme: 'ISO/IEC 27001',
    isoCode: 'A.8 · Access Control',
    isoDetail: 'Identity compromise risk',
    callout: 'Subsidiary is more exposed',
    calloutHighlight: ' — healthcare data amplifies regulatory risk.',
  },

  policy: {
    policyId: 'POL-IAM-2026-012',
    title: 'Phishing-Resistant MFA Enforcement for Privileged and High-Risk Access',
    scope: 'group_with_local_override',
    scopeLabel: 'Group Baseline + Northstar Health Accelerated Rollout',
    humanReadable: '',
    policyAsCode: '',
    effectiveDate: '2026-04-16',
    rationale: 'Active AiTM phishing campaign targeting Nordic region.',
  },

  policySummary: {
    title: 'Phishing-Resistant MFA',
    subtitle: 'For privileged & high-risk access',
    requirements: [
      { icon: 'fingerprint', text: 'FIDO2 / Passkeys required' },
      { icon: 'key', text: 'OAuth consent: admin-approved only' },
      { icon: 'shield', text: 'Compliant device required' },
    ],
    scopeGroup: 'Group baseline (30d)',
    scopeSub: '+ Subsidiary accelerated (7d)',
  },

  approval: {
    id: 'APR-2026-0341',
    reasonForChange: 'Active AI-assisted phishing campaign targeting cloud identities.',
    scope: 'group_with_local_override',
    scopeLabel: 'Group Baseline + Northstar Health Accelerated Rollout',
    expectedImpact: 'Reduces identity compromise exposure from 62% to under 15%.',
    businessFrictionWarning: '3-5 day FIDO2 enrollment for ~25% of users.',
    approverName: 'Dr. Elena Vasquez',
    approverRole: 'Group Chief Risk Officer',
    impactedEntities: ['Northstar Group', 'Northstar Health Services'],
    status: 'pending',
  },

  approvalSummary: {
    reason: 'Approve phishing-resistant MFA policy to mitigate active AiTM campaign.',
    friction: '3-5 day FIDO2 enrollment for ~25% of users.',
  },

  envBefore: [
    {
      entityId: 'northstar-group', entityName: 'Northstar Group', complianceScore: 78,
      policyAssignments: [], affectedAssets: [
        { id: 'A1', name: 'Azure AD Tenant', type: 'IdP', compliant: false, lastChecked: '' },
        { id: 'A2', name: 'Exchange Online', type: 'Collab', compliant: true, lastChecked: '' },
        { id: 'A3', name: 'SAP S/4HANA', type: 'ERP', compliant: true, lastChecked: '' },
        { id: 'A4', name: 'Corporate VPN', type: 'Network', compliant: true, lastChecked: '' },
      ], remediationStatus: [],
    },
    {
      entityId: 'northstar-health', entityName: 'Northstar Health Services', complianceScore: 71,
      policyAssignments: [], affectedAssets: [
        { id: 'H1', name: 'Azure AD (Sub)', type: 'IdP', compliant: false, lastChecked: '' },
        { id: 'H2', name: 'Patient Portal', type: 'App', compliant: false, lastChecked: '' },
        { id: 'H3', name: 'EHR System', type: 'Clinical', compliant: true, lastChecked: '' },
        { id: 'H4', name: 'Clinical Data Warehouse', type: 'Data', compliant: true, lastChecked: '' },
      ], remediationStatus: [],
    },
  ],

  envAfter: [
    {
      entityId: 'northstar-group', entityName: 'Northstar Group', complianceScore: 89,
      policyAssignments: [], affectedAssets: [
        { id: 'A1', name: 'Azure AD Tenant', type: 'IdP', compliant: true, lastChecked: '' },
        { id: 'A2', name: 'Exchange Online', type: 'Collab', compliant: true, lastChecked: '' },
        { id: 'A3', name: 'SAP S/4HANA', type: 'ERP', compliant: true, lastChecked: '' },
        { id: 'A4', name: 'Corporate VPN', type: 'Network', compliant: true, lastChecked: '' },
      ], remediationStatus: [],
    },
    {
      entityId: 'northstar-health', entityName: 'Northstar Health Services', complianceScore: 86,
      policyAssignments: [], affectedAssets: [
        { id: 'H1', name: 'Azure AD (Sub)', type: 'IdP', compliant: true, lastChecked: '' },
        { id: 'H2', name: 'Patient Portal', type: 'App', compliant: true, lastChecked: '' },
        { id: 'H3', name: 'EHR System', type: 'Clinical', compliant: true, lastChecked: '' },
        { id: 'H4', name: 'Clinical Data Warehouse', type: 'Data', compliant: true, lastChecked: '' },
      ], remediationStatus: [],
    },
  ],

  metricsBefore: [
    { entityId: 'northstar-group', entityName: 'Northstar Group', overallRiskScore: 34, compliancePosture: 78, openFindings: 12, controlCoverage: 74, exposureTrend: [28, 30, 29, 32, 33, 34], complianceTrend: [82, 81, 80, 79, 78, 78] },
    { entityId: 'northstar-health', entityName: 'Northstar Health Services', overallRiskScore: 42, compliancePosture: 71, openFindings: 8, controlCoverage: 68, exposureTrend: [35, 36, 38, 39, 41, 42], complianceTrend: [76, 75, 74, 73, 72, 71] },
  ],

  metricsAfter: [
    { entityId: 'northstar-group', entityName: 'Northstar Group', overallRiskScore: 18, compliancePosture: 89, openFindings: 5, controlCoverage: 88, exposureTrend: [30, 32, 33, 34, 26, 18], complianceTrend: [81, 80, 79, 78, 84, 89] },
    { entityId: 'northstar-health', entityName: 'Northstar Health Services', overallRiskScore: 22, compliancePosture: 86, openFindings: 3, controlCoverage: 84, exposureTrend: [36, 38, 39, 42, 32, 22], complianceTrend: [75, 74, 73, 71, 79, 86] },
  ],

  agents: [
    { id: 'threat-intake', name: 'Threat Intake Agent', role: 'Analyzes raw threat intelligence events.', status: 'idle', description: 'Ingests MISP events and extracts business context.' },
    { id: 'risk-mapping', name: 'Risk Mapping Agent', role: 'Maps threats to risk scenarios and ISO controls.', status: 'idle', description: 'Correlates with entity-specific risk profiles.' },
    { id: 'control-engineering', name: 'Control Engineering Agent', role: 'Generates policies and policy-as-code.', status: 'idle', description: 'Produces enforceable policy updates.' },
  ],

  auditEntries: {
    new_event_received: { actor: 'MISP Connector', action: 'Threat Event Ingested', detail: 'MISP-2026-04871 — AI-Assisted Phishing Campaign. TLP:AMBER. Critical.', phase: 'new_event_received' },
    threat_analysis_in_progress: { actor: 'Threat Intake Agent', action: 'Analysis Initiated', detail: 'Analyzing MISP-2026-04871.', phase: 'threat_analysis_in_progress' },
    risk_mapped: { actor: 'Risk Mapping Agent', action: 'Risk Mapped', detail: 'RSK-2026-0087 → ISO 27001 A.8.', phase: 'risk_mapped' },
    policy_generated: { actor: 'Control Engineering Agent', action: 'Policy Generated', detail: 'POL-IAM-2026-012 drafted.', phase: 'policy_generated' },
    awaiting_approval: { actor: 'Orchestration Layer', action: 'Approval Gate', detail: 'Awaiting CRO decision.', phase: 'awaiting_approval' },
    deployment_in_progress: { actor: 'Dr. Elena Vasquez', action: 'Approved', detail: 'Deploying to environment.', phase: 'deployment_in_progress' },
    deployment_complete: { actor: 'Environment Controller', action: 'Deployed', detail: 'Policy active. Metrics refreshed.', phase: 'deployment_complete' },
  },
};

// ─────────────────────────────────────────────────
// Scenario 2: Bug Bounty / Software Supply Chain
// ─────────────────────────────────────────────────

export const scenario2: ScenarioData = {
  id: 'bug-bounty-rce',
  label: 'Bug Bounty Critical RCE',
  subtitle: 'Secure Development Lifecycle',
  icon: 'bug',

  threatEvent: {
    id: 'BB-2026-00193',
    title: 'Critical RCE in Authentication Library via Deserialization Flaw (Bug Bounty)',
    description: 'A security researcher reported a critical Remote Code Execution vulnerability through the Northstar bug bounty program. The flaw exists in an open-source JWT validation library used across multiple internal and customer-facing services. Exploitation requires no authentication.',
    severity: 'critical',
    confidence: 'high',
    tlp: 'RED',
    threatVector: 'Malicious JWT → Deserialization → Remote Code Execution',
    suggestedMitigation: 'Patch dependency to v4.2.1. Enforce SBOM validation. Deploy WAF rule as interim mitigation.',
    timestamp: '2026-04-16T11:22:00Z',
    source: 'Northstar Bug Bounty Program',
    affectedEntities: ['northstar-group', 'northstar-health'],
    tags: ['CVE-2026-31847', 'RCE', 'Deserialization', 'Supply chain', 'Bug bounty'],
  },

  threatSummary: {
    shortTitle: 'Critical RCE via Bug Bounty',
    description: 'Unauthenticated RCE in JWT library used across all services',
    vector: 'JWT → Deserialization → RCE',
    affects: 'Both Entities',
    source: 'Bug Bounty Program',
  },

  riskMapping: {
    riskId: 'RSK-2026-0094',
    riskStatement: 'Unauthenticated remote code execution through a widely-deployed open-source dependency, enabling full system compromise of customer-facing and internal services.',
    riskOwner: 'Anna Berglund, VP Engineering',
    impactedCapability: 'Secure Software Development Lifecycle',
    residualExposure: 78,
    isoControlTheme: 'A.8.25–28 — Secure Development (ISO/IEC 27001:2022)',
    isoControlRef: 'A.8.25 Secure development life cycle · A.8.28 Secure coding · A.8.8 Management of technical vulnerabilities',
    affectedEntities: [
      { entityId: 'northstar-group', entityName: 'Northstar Group', localExposure: 55, localImpact: '12 internal services use the vulnerable library. CI/CD pipeline has no SCA gate.' },
      { entityId: 'northstar-health', entityName: 'Northstar Health Services', localExposure: 85, localImpact: 'Patient portal and clinical API directly exposed. Public-facing attack surface. Regulated data at risk.' },
    ],
  },

  analysisSummary: {
    isoTheme: 'ISO/IEC 27001',
    isoCode: 'A.8.25 · Secure Development',
    isoDetail: 'Software supply chain risk',
    callout: 'Subsidiary is critically exposed',
    calloutHighlight: ' — patient-facing services are directly vulnerable.',
  },

  policy: {
    policyId: 'POL-SDLC-2026-008',
    title: 'Mandatory SCA Gating and Critical Vulnerability Patch SLA',
    scope: 'group_with_local_override',
    scopeLabel: 'Group SDLC Baseline + Northstar Health Emergency Patch',
    humanReadable: '',
    policyAsCode: '',
    effectiveDate: '2026-04-16',
    rationale: 'Bug bounty disclosure reveals unmitigated RCE across services with no SCA pipeline enforcement.',
  },

  policySummary: {
    title: 'SCA Gating & Patch SLA',
    subtitle: 'For all CI/CD pipelines and deployments',
    requirements: [
      { icon: 'scan', text: 'Mandatory SCA scan in CI/CD pipeline' },
      { icon: 'clock', text: '24-hour patch SLA for critical CVEs' },
      { icon: 'code', text: 'SBOM generation & validation required' },
    ],
    scopeGroup: 'Group SDLC baseline (14d rollout)',
    scopeSub: '+ Subsidiary emergency patch (24h)',
  },

  approval: {
    id: 'APR-2026-0348',
    reasonForChange: 'Bug bounty disclosure of critical unauthenticated RCE in JWT library deployed across all services.',
    scope: 'group_with_local_override',
    scopeLabel: 'Group SDLC Baseline + Northstar Health Emergency Patch',
    expectedImpact: 'Eliminates CVE-2026-31847 attack surface. Enforces SCA gating to prevent future dependency vulnerabilities from reaching production.',
    businessFrictionWarning: 'Subsidiary services require emergency maintenance window. 2 group CI/CD pipelines will fail until SCA tool is integrated.',
    approverName: 'Dr. Elena Vasquez',
    approverRole: 'Group Chief Risk Officer',
    impactedEntities: ['Northstar Group', 'Northstar Health Services'],
    status: 'pending',
  },

  approvalSummary: {
    reason: 'Approve emergency patch SLA and mandatory SCA gating to close critical RCE.',
    friction: 'Emergency maintenance window for subsidiary. 2 CI/CD pipelines blocked until SCA integrated.',
  },

  envBefore: [
    {
      entityId: 'northstar-group', entityName: 'Northstar Group', complianceScore: 74,
      policyAssignments: [], affectedAssets: [
        { id: 'S1', name: 'CI/CD Platform', type: 'DevOps', compliant: false, lastChecked: '' },
        { id: 'S2', name: 'Internal API Gateway', type: 'Service', compliant: false, lastChecked: '' },
        { id: 'S3', name: 'Artifact Registry', type: 'DevOps', compliant: true, lastChecked: '' },
        { id: 'S4', name: 'Identity Service', type: 'Service', compliant: true, lastChecked: '' },
      ], remediationStatus: [],
    },
    {
      entityId: 'northstar-health', entityName: 'Northstar Health Services', complianceScore: 64,
      policyAssignments: [], affectedAssets: [
        { id: 'SH1', name: 'Patient Portal API', type: 'Service', compliant: false, lastChecked: '' },
        { id: 'SH2', name: 'Clinical API', type: 'Service', compliant: false, lastChecked: '' },
        { id: 'SH3', name: 'Mobile Backend', type: 'Service', compliant: false, lastChecked: '' },
        { id: 'SH4', name: 'EHR Integration', type: 'Service', compliant: true, lastChecked: '' },
      ], remediationStatus: [],
    },
  ],

  envAfter: [
    {
      entityId: 'northstar-group', entityName: 'Northstar Group', complianceScore: 91,
      policyAssignments: [], affectedAssets: [
        { id: 'S1', name: 'CI/CD Platform', type: 'DevOps', compliant: true, lastChecked: '' },
        { id: 'S2', name: 'Internal API Gateway', type: 'Service', compliant: true, lastChecked: '' },
        { id: 'S3', name: 'Artifact Registry', type: 'DevOps', compliant: true, lastChecked: '' },
        { id: 'S4', name: 'Identity Service', type: 'Service', compliant: true, lastChecked: '' },
      ], remediationStatus: [],
    },
    {
      entityId: 'northstar-health', entityName: 'Northstar Health Services', complianceScore: 88,
      policyAssignments: [], affectedAssets: [
        { id: 'SH1', name: 'Patient Portal API', type: 'Service', compliant: true, lastChecked: '' },
        { id: 'SH2', name: 'Clinical API', type: 'Service', compliant: true, lastChecked: '' },
        { id: 'SH3', name: 'Mobile Backend', type: 'Service', compliant: true, lastChecked: '' },
        { id: 'SH4', name: 'EHR Integration', type: 'Service', compliant: true, lastChecked: '' },
      ], remediationStatus: [],
    },
  ],

  metricsBefore: [
    { entityId: 'northstar-group', entityName: 'Northstar Group', overallRiskScore: 38, compliancePosture: 74, openFindings: 14, controlCoverage: 70, exposureTrend: [30, 32, 33, 35, 36, 38], complianceTrend: [79, 78, 77, 76, 75, 74] },
    { entityId: 'northstar-health', entityName: 'Northstar Health Services', overallRiskScore: 52, compliancePosture: 64, openFindings: 11, controlCoverage: 61, exposureTrend: [40, 42, 44, 47, 50, 52], complianceTrend: [72, 70, 68, 67, 65, 64] },
  ],

  metricsAfter: [
    { entityId: 'northstar-group', entityName: 'Northstar Group', overallRiskScore: 14, compliancePosture: 91, openFindings: 4, controlCoverage: 92, exposureTrend: [33, 35, 36, 38, 24, 14], complianceTrend: [78, 77, 76, 74, 84, 91] },
    { entityId: 'northstar-health', entityName: 'Northstar Health Services', overallRiskScore: 18, compliancePosture: 88, openFindings: 2, controlCoverage: 86, exposureTrend: [42, 44, 47, 52, 34, 18], complianceTrend: [70, 68, 67, 64, 78, 88] },
  ],

  agents: [
    { id: 'threat-intake', name: 'Threat Intake Agent', role: 'Analyzes vulnerability disclosures.', status: 'idle', description: 'Triages bug bounty reports and CVE feeds.' },
    { id: 'risk-mapping', name: 'Risk Mapping Agent', role: 'Maps vulnerabilities to risk scenarios.', status: 'idle', description: 'Identifies affected services and supply chain impact.' },
    { id: 'control-engineering', name: 'Control Engineering Agent', role: 'Generates SDLC policies and SCA rules.', status: 'idle', description: 'Produces patch SLAs and CI/CD gating policies.' },
  ],

  auditEntries: {
    new_event_received: { actor: 'Bug Bounty Triage', action: 'Disclosure Ingested', detail: 'BB-2026-00193 — Critical RCE in JWT library. TLP:RED.', phase: 'new_event_received' },
    threat_analysis_in_progress: { actor: 'Threat Intake Agent', action: 'Analysis Initiated', detail: 'Analyzing CVE-2026-31847 blast radius.', phase: 'threat_analysis_in_progress' },
    risk_mapped: { actor: 'Risk Mapping Agent', action: 'Risk Mapped', detail: 'RSK-2026-0094 → ISO 27001 A.8.25.', phase: 'risk_mapped' },
    policy_generated: { actor: 'Control Engineering Agent', action: 'Policy Generated', detail: 'POL-SDLC-2026-008 drafted.', phase: 'policy_generated' },
    awaiting_approval: { actor: 'Orchestration Layer', action: 'Approval Gate', detail: 'Awaiting CRO decision.', phase: 'awaiting_approval' },
    deployment_in_progress: { actor: 'Dr. Elena Vasquez', action: 'Approved', detail: 'Emergency patch deploying.', phase: 'deployment_in_progress' },
    deployment_complete: { actor: 'Environment Controller', action: 'Deployed', detail: 'Patch applied. SCA gating active.', phase: 'deployment_complete' },
  },
};

export const ALL_SCENARIOS: ScenarioData[] = [scenario1, scenario2];
