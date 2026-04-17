import type { ScenarioData } from './scenarioTypes';

export const explainerScenario: ScenarioData = {
  id: 'explainer',
  label: 'Explainer',
  subtitle: 'The process, at a glance',
  icon: 'info',

  threatEvent: {
    id: 'STEP-01',
    title: 'A new issue arrives',
    description: '',
    severity: 'medium',
    confidence: 'medium',
    tlp: 'GREEN',
    threatVector: '—',
    suggestedMitigation: '',
    timestamp: '2026-04-17T09:00:00Z',
    source: '—',
    affectedEntities: ['verhelst'],
    tags: [],
  },

  threatSummary: {
    shortTitle: 'A new issue arrives',
    description: '',
    vector: '—',
    source: '—',
  },

  riskMapping: {
    riskId: 'STEP-02',
    riskStatement: 'We understand it.',
    riskOwner: '—',
    impactedCapability: '—',
    residualExposure: 50,
    isoControlTheme: '—',
    isoControlRef: '—',
    affectedEntities: [
      { entityId: 'verhelst', entityName: 'Our Company', localExposure: 50, localImpact: '' },
    ],
  },

  analysisSummary: {
    isoTheme: 'Step 2',
    isoCode: 'We understand it',
    isoDetail: '',
    riskStatement: '',
    likelihood: 'Medium',
    impact: 'Medium',
    callout: 'We understand it.',
  },

  policy: {
    policyId: 'STEP-03',
    title: 'We write a rule',
    scope: 'group',
    scopeLabel: '—',
    humanReadable: '',
    policyAsCode: '',
    effectiveDate: '2026-04-17',
    rationale: '',
  },

  policySummary: {
    title: 'We write a rule',
    subtitle: '',
    requirements: [],
    scope: 'We write a rule.',
  },

  approval: {
    id: 'STEP-04',
    reasonForChange: 'A human decides.',
    scope: 'group',
    scopeLabel: '—',
    expectedImpact: '',
    businessFrictionWarning: '',
    approverName: 'A human',
    approverRole: 'Decision maker',
    impactedEntities: ['Our Company'],
    status: 'pending',
  },

  approvalSummary: {
    reason: 'A human decides.',
    friction: '',
  },

  boardStatement: {
    before: 'Risk is high.',
    after: 'Leaders see the result.',
  },

  controlAction: 'Systems are updated.',

  envBefore: {
    entityId: 'verhelst', entityName: 'Our Company', complianceScore: 60,
    policyAssignments: [], affectedAssets: [
      { id: 'E1', name: 'System A', type: '', compliant: false, lastChecked: '' },
      { id: 'E2', name: 'System B', type: '', compliant: false, lastChecked: '' },
      { id: 'E3', name: 'System C', type: '', compliant: true, lastChecked: '' },
      { id: 'E4', name: 'System D', type: '', compliant: false, lastChecked: '' },
      { id: 'E5', name: 'System E', type: '', compliant: true, lastChecked: '' },
    ], remediationStatus: [],
  },

  envAfter: {
    entityId: 'verhelst', entityName: 'Our Company', complianceScore: 95,
    policyAssignments: [], affectedAssets: [
      { id: 'E1', name: 'System A', type: '', compliant: true, lastChecked: '' },
      { id: 'E2', name: 'System B', type: '', compliant: true, lastChecked: '' },
      { id: 'E3', name: 'System C', type: '', compliant: true, lastChecked: '' },
      { id: 'E4', name: 'System D', type: '', compliant: true, lastChecked: '' },
      { id: 'E5', name: 'System E', type: '', compliant: true, lastChecked: '' },
    ], remediationStatus: [],
  },

  metricsBefore: {
    entityId: 'verhelst', entityName: 'Our Company', overallRiskScore: 40, compliancePosture: 60, openFindings: 10, controlCoverage: 60,
    exposureTrend: [30, 32, 34, 36, 38, 40], complianceTrend: [70, 68, 66, 64, 62, 60],
  },

  metricsAfter: {
    entityId: 'verhelst', entityName: 'Our Company', overallRiskScore: 10, compliancePosture: 95, openFindings: 2, controlCoverage: 95,
    exposureTrend: [32, 34, 36, 40, 25, 10], complianceTrend: [68, 66, 64, 60, 80, 95],
  },

  agents: [
    { id: 'threat-intake', name: 'Reader', role: '', status: 'idle', description: '' },
    { id: 'risk-mapping', name: 'Connector', role: '', status: 'idle', description: '' },
    { id: 'control-engineering', name: 'Writer', role: '', status: 'idle', description: '' },
  ],

  agentSteps: {
    'threat-intake': {
      processing: 'Thinking…',
      output: 'AI does the thinking.',
    },
    'risk-mapping': {
      processing: 'Thinking…',
      output: 'AI does the thinking.',
    },
    'control-engineering': {
      processing: 'Thinking…',
      output: 'AI does the thinking.',
    },
  },

  auditEntries: {
    new_event_received: { actor: 'Step 1', action: 'A new issue arrives', detail: '', phase: 'new_event_received' },
    threat_analysis_in_progress: { actor: 'Step 2', action: 'AI does the thinking', detail: '', phase: 'threat_analysis_in_progress' },
    risk_mapped: { actor: 'Step 2', action: 'We understand it', detail: '', phase: 'risk_mapped' },
    policy_generated: { actor: 'Step 3', action: 'We write a rule', detail: '', phase: 'policy_generated' },
    awaiting_approval: { actor: 'Step 4', action: 'A human decides', detail: '', phase: 'awaiting_approval' },
    deployment_in_progress: { actor: 'Step 5', action: 'Systems are updated', detail: '', phase: 'deployment_in_progress' },
    environment_updated: { actor: 'Step 6', action: 'Systems are updated', detail: '', phase: 'environment_updated' },
    deployment_complete: { actor: 'Step 7', action: 'Leaders see the result', detail: '', phase: 'deployment_complete' },
  },
};

export const scenario1: ScenarioData = {
  id: 'phishing-mfa',
  label: 'AI Phishing Campaign',
  subtitle: 'Identity & Access Control',
  icon: 'phishing',

  threatEvent: {
    id: 'MISP-2026-04871',
    title: 'AI-Assisted Phishing Campaign Targeting Cloud Identities and OAuth Tokens',
    description: 'Sophisticated AiTM phishing campaign using LLMs to generate credential-harvesting emails targeting EU energy operators.',
    severity: 'critical',
    confidence: 'high',
    tlp: 'AMBER',
    threatVector: 'Phishing → AiTM Proxy → OAuth Token Theft',
    suggestedMitigation: 'Enforce phishing-resistant MFA for all privileged accounts.',
    timestamp: '2026-04-16T09:14:00Z',
    source: 'CERT.be / MISP Community',
    affectedEntities: ['verhelst'],
    tags: ['T1566.001', 'AiTM', 'OAuth abuse'],
  },

  threatSummary: {
    shortTitle: 'AI-Assisted Phishing',
    description: 'Targeting cloud identities & OAuth tokens at EU energy operators',
    vector: 'AiTM → OAuth Theft',
    source: 'CERT.be',
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
      { entityId: 'verhelst', entityName: 'Verhelst Industries', localExposure: 62, localImpact: 'Legacy MFA on 23% of admin accounts.' },
    ],
  },

  analysisSummary: {
    isoTheme: 'ISO/IEC 27001',
    isoCode: 'A.8 · Access Control',
    isoDetail: 'Identity compromise risk',
    riskStatement: 'Compromise of privileged cloud identities through AI-assisted phishing, leading to unauthorised access to critical business systems.',
    likelihood: 'Very High',
    impact: 'Critical',
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
    rationale: 'Active AiTM phishing campaign targeting EU energy sector.',
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
    impactedEntities: ['Verhelst Industries'],
    status: 'pending',
  },

  approvalSummary: {
    reason: 'Approve phishing-resistant MFA to mitigate active AiTM campaign.',
    friction: '3-5 day FIDO2 enrollment for ~25% of users.',
  },

  boardStatement: {
    before: 'An active AI-driven phishing campaign has pushed identity compromise risk outside board-stated appetite. Governance engineering response under way.',
    after: 'Identity compromise risk returned to within appetite. Phishing-resistant MFA uplift strengthens ISO 27001 A.8 controls and evidences proactive cyber risk management as required for NIS2 essential entities.',
  },

  controlAction: 'Enforced phishing-resistant MFA (FIDO2/passkeys) for all privileged and high-risk access, restricted OAuth consent to admins, and required compliant devices.',

  envBefore: {
    entityId: 'verhelst', entityName: 'Verhelst Industries', complianceScore: 74,
    policyAssignments: [], affectedAssets: [
      { id: 'A1', name: 'Azure AD Tenant', type: 'Identity Provider', compliant: false, lastChecked: '' },
      { id: 'A2', name: 'Exchange Online', type: 'Collaboration', compliant: true, lastChecked: '' },
      { id: 'A3', name: 'SAP S/4HANA', type: 'ERP', compliant: true, lastChecked: '' },
      { id: 'A4', name: 'Corporate VPN', type: 'Network', compliant: false, lastChecked: '' },
      { id: 'A5', name: 'Data Lake', type: 'Data Store', compliant: true, lastChecked: '' },
    ], remediationStatus: [],
  },

  envAfter: {
    entityId: 'verhelst', entityName: 'Verhelst Industries', complianceScore: 91,
    policyAssignments: [], affectedAssets: [
      { id: 'A1', name: 'Azure AD Tenant', type: 'Identity Provider', compliant: true, lastChecked: '' },
      { id: 'A2', name: 'Exchange Online', type: 'Collaboration', compliant: true, lastChecked: '' },
      { id: 'A3', name: 'SAP S/4HANA', type: 'ERP', compliant: true, lastChecked: '' },
      { id: 'A4', name: 'Corporate VPN', type: 'Network', compliant: true, lastChecked: '' },
      { id: 'A5', name: 'Data Lake', type: 'Data Store', compliant: true, lastChecked: '' },
    ], remediationStatus: [],
  },

  metricsBefore: {
    entityId: 'verhelst', entityName: 'Verhelst Industries', overallRiskScore: 34, compliancePosture: 74, openFindings: 12, controlCoverage: 72,
    exposureTrend: [28, 30, 29, 32, 33, 34], complianceTrend: [80, 79, 78, 76, 75, 74],
  },

  metricsAfter: {
    entityId: 'verhelst', entityName: 'Verhelst Industries', overallRiskScore: 12, compliancePosture: 91, openFindings: 4, controlCoverage: 90,
    exposureTrend: [30, 32, 33, 34, 22, 12], complianceTrend: [79, 78, 76, 74, 84, 91],
  },

  agents: [
    { id: 'threat-intake', name: 'Threat Intake Agent', role: 'Reads the MISP event and explains it in business terms.', status: 'idle', description: '' },
    { id: 'risk-mapping', name: 'Risk Assessment Agent', role: 'Connects the threat to our risk register and ISO controls.', status: 'idle', description: '' },
    { id: 'control-engineering', name: 'Control Engineering Agent', role: 'Drafts the policy update and policy-as-code artifact.', status: 'idle', description: '' },
  ],

  agentSteps: {
    'threat-intake': {
      processing: 'Parsing MISP-2026-04871, extracting TTPs and business context…',
      output: 'Critical AiTM phishing campaign targeting OAuth tokens and cloud identities. Affects privileged access.',
    },
    'risk-mapping': {
      processing: 'Matching threat to risk register and ISO 27001 control themes…',
      output: 'Mapped to RSK-2026-0087 (Identity compromise) → ISO 27001 A.8 Access Control. Residual exposure: 62%.',
    },
    'control-engineering': {
      processing: 'Drafting policy text and Azure Policy artifact…',
      output: 'POL-IAM-2026-012 drafted: phishing-resistant MFA, admin-only OAuth consent, compliant device required.',
    },
  },

  auditEntries: {
    new_event_received: { actor: 'MISP Connector', action: 'Threat Ingested', detail: 'MISP-2026-04871 — AI phishing. Critical.', phase: 'new_event_received' },
    threat_analysis_in_progress: { actor: 'Threat Intake Agent', action: 'Analysing', detail: 'Extracting threat context.', phase: 'threat_analysis_in_progress' },
    risk_mapped: { actor: 'Risk Assessment Agent', action: 'Risk Assessed', detail: 'RSK-2026-0087 → ISO A.8.', phase: 'risk_mapped' },
    policy_generated: { actor: 'Control Engineering Agent', action: 'Policy Drafted', detail: 'POL-IAM-2026-012 ready.', phase: 'policy_generated' },
    awaiting_approval: { actor: 'Orchestration', action: 'Approval Gate', detail: 'Awaiting CRO.', phase: 'awaiting_approval' },
    deployment_in_progress: { actor: 'Dr. Elena Vasquez', action: 'Approved', detail: 'Deploying.', phase: 'deployment_in_progress' },
    environment_updated: { actor: 'Environment Controller', action: 'Target State Reached', detail: 'All assets compliant with new policy.', phase: 'environment_updated' },
    deployment_complete: { actor: 'Board Reporting', action: 'Board Refreshed', detail: 'Risk posture updated; loop closed.', phase: 'deployment_complete' },
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
    source: 'Verhelst Bug Bounty Program',
    affectedEntities: ['verhelst'],
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
      { entityId: 'verhelst', entityName: 'Verhelst Industries', localExposure: 78, localImpact: '14 services use the vulnerable library. No SCA gate in CI/CD.' },
    ],
  },

  analysisSummary: {
    isoTheme: 'ISO/IEC 27001',
    isoCode: 'A.8.25 · Secure Development',
    isoDetail: 'Software supply chain risk',
    riskStatement: 'Unauthenticated remote code execution through a widely-deployed open-source dependency, enabling full compromise of customer-facing and internal services.',
    likelihood: 'High',
    impact: 'Critical',
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
    impactedEntities: ['Verhelst Industries'],
    status: 'pending',
  },

  approvalSummary: {
    reason: 'Approve emergency patch SLA and mandatory SCA gating to close critical RCE.',
    friction: 'Emergency maintenance window. 2 CI/CD pipelines blocked until SCA integrated.',
  },

  boardStatement: {
    before: 'A critical unauthenticated RCE disclosed via the bug bounty programme has pushed software supply chain risk outside board-stated appetite. Emergency control uplift under way.',
    after: 'Supply chain risk returned to within appetite. The RCE is remediated and a mandatory SCA pipeline gate is in place to prevent recurrence, strengthening ISO 27001 A.8.25 secure development controls.',
  },

  controlAction: 'Patched the vulnerable JWT library across all services within SLA, introduced mandatory SCA scanning in CI/CD, and set a 24-hour patch SLA for critical CVEs.',

  envBefore: {
    entityId: 'verhelst', entityName: 'Verhelst Industries', complianceScore: 68,
    policyAssignments: [], affectedAssets: [
      { id: 'S1', name: 'CI/CD Platform', type: 'DevOps', compliant: false, lastChecked: '' },
      { id: 'S2', name: 'API Gateway', type: 'Service', compliant: false, lastChecked: '' },
      { id: 'S3', name: 'Artifact Registry', type: 'DevOps', compliant: true, lastChecked: '' },
      { id: 'S4', name: 'Identity Service', type: 'Service', compliant: false, lastChecked: '' },
      { id: 'S5', name: 'Customer Portal', type: 'Application', compliant: false, lastChecked: '' },
    ], remediationStatus: [],
  },

  envAfter: {
    entityId: 'verhelst', entityName: 'Verhelst Industries', complianceScore: 92,
    policyAssignments: [], affectedAssets: [
      { id: 'S1', name: 'CI/CD Platform', type: 'DevOps', compliant: true, lastChecked: '' },
      { id: 'S2', name: 'API Gateway', type: 'Service', compliant: true, lastChecked: '' },
      { id: 'S3', name: 'Artifact Registry', type: 'DevOps', compliant: true, lastChecked: '' },
      { id: 'S4', name: 'Identity Service', type: 'Service', compliant: true, lastChecked: '' },
      { id: 'S5', name: 'Customer Portal', type: 'Application', compliant: true, lastChecked: '' },
    ], remediationStatus: [],
  },

  metricsBefore: {
    entityId: 'verhelst', entityName: 'Verhelst Industries', overallRiskScore: 46, compliancePosture: 68, openFindings: 14, controlCoverage: 65,
    exposureTrend: [35, 37, 39, 41, 44, 46], complianceTrend: [76, 74, 72, 71, 69, 68],
  },

  metricsAfter: {
    entityId: 'verhelst', entityName: 'Verhelst Industries', overallRiskScore: 11, compliancePosture: 92, openFindings: 3, controlCoverage: 93,
    exposureTrend: [37, 39, 41, 46, 28, 11], complianceTrend: [74, 72, 71, 68, 82, 92],
  },

  agents: [
    { id: 'threat-intake', name: 'Threat Intake Agent', role: 'Triages the bug bounty report into business language.', status: 'idle', description: '' },
    { id: 'risk-mapping', name: 'Risk Assessment Agent', role: 'Scans the SBOM to find affected services and map to controls.', status: 'idle', description: '' },
    { id: 'control-engineering', name: 'Control Engineering Agent', role: 'Generates the SCA pipeline rule and patch SLA policy.', status: 'idle', description: '' },
  ],

  agentSteps: {
    'threat-intake': {
      processing: 'Reading bug bounty report BB-2026-00193, checking CVE-2026-31847 severity…',
      output: 'Unauthenticated RCE in JWT library via deserialization flaw. Exploitable in production today.',
    },
    'risk-mapping': {
      processing: 'Scanning SBOM across 14 services, correlating to ISO 27001 SDLC controls…',
      output: 'Mapped to RSK-2026-0094 (Supply chain compromise) → ISO 27001 A.8.25 Secure Development. Exposure: 78%.',
    },
    'control-engineering': {
      processing: 'Drafting SCA pipeline gate rule and critical patch SLA policy…',
      output: 'POL-SDLC-2026-008 drafted: mandatory SCA scan in CI/CD, 24h patch SLA, SBOM validation required.',
    },
  },

  auditEntries: {
    new_event_received: { actor: 'Bug Bounty Triage', action: 'Disclosure Ingested', detail: 'BB-2026-00193 — Critical RCE. TLP:RED.', phase: 'new_event_received' },
    threat_analysis_in_progress: { actor: 'Threat Intake Agent', action: 'Analysing', detail: 'Assessing CVE-2026-31847 blast radius.', phase: 'threat_analysis_in_progress' },
    risk_mapped: { actor: 'Risk Assessment Agent', action: 'Risk Assessed', detail: 'RSK-2026-0094 → ISO A.8.25.', phase: 'risk_mapped' },
    policy_generated: { actor: 'Control Engineering Agent', action: 'Policy Drafted', detail: 'POL-SDLC-2026-008 ready.', phase: 'policy_generated' },
    awaiting_approval: { actor: 'Orchestration', action: 'Approval Gate', detail: 'Awaiting CRO.', phase: 'awaiting_approval' },
    deployment_in_progress: { actor: 'Dr. Elena Vasquez', action: 'Approved', detail: 'Emergency patch deploying.', phase: 'deployment_in_progress' },
    environment_updated: { actor: 'Environment Controller', action: 'Target State Reached', detail: 'Patch applied. SCA gating active.', phase: 'environment_updated' },
    deployment_complete: { actor: 'Board Reporting', action: 'Board Refreshed', detail: 'Risk posture updated; loop closed.', phase: 'deployment_complete' },
  },
};

export const scenario3: ScenarioData = {
  id: 'ransomware-ot',
  label: 'Ransomware on OT',
  subtitle: 'Business Continuity & NIS2',
  icon: 'ransomware',

  threatEvent: {
    id: 'ENISA-2026-00442',
    title: 'Clop-Variant Ransomware Targeting EU Manufacturing SCADA/MES',
    description: 'Coordinated double-extortion campaign against discrete manufacturing across DACH and Benelux. Operators observed exfiltrating MES recipes before encrypting historian and SCADA hosts.',
    severity: 'critical',
    confidence: 'high',
    tlp: 'RED',
    threatVector: 'Spearphish → SMB Lateral Movement → MES/SCADA Encryption + Exfiltration',
    suggestedMitigation: 'Enforce IT/OT segmentation, immutable offline backups, and privileged access workstations for OT administration.',
    timestamp: '2026-04-15T06:12:00Z',
    source: 'ENISA / CERT-EU',
    affectedEntities: ['verhelst'],
    tags: ['T1486', 'T1490', 'Clop', 'NIS2', 'OT'],
  },

  threatSummary: {
    shortTitle: 'Ransomware on Manufacturing',
    description: 'Clop variant hitting EU discrete manufacturing MES/SCADA with double extortion',
    vector: 'Spearphish → Lateral → MES Encryption',
    source: 'ENISA / CERT-EU',
  },

  riskMapping: {
    riskId: 'RSK-2026-0099',
    riskStatement: 'Operational disruption and data extortion from ransomware targeting manufacturing execution and SCADA systems across EU plants.',
    riskOwner: 'Jan Desmet, COO',
    impactedCapability: 'Operational Technology Resilience',
    residualExposure: 71,
    isoControlTheme: 'A.5.29–30, A.8.13 — Business Continuity & Backup (ISO/IEC 27001:2022)',
    isoControlRef: 'A.5.29 · A.5.30 · A.8.13',
    affectedEntities: [
      { entityId: 'verhelst', entityName: 'Verhelst Industries', localExposure: 71, localImpact: 'Flat IT/OT network at 3 plants. MES backups are online only — fully ransomware-exposed.' },
    ],
  },

  analysisSummary: {
    isoTheme: 'ISO/IEC 27001',
    isoCode: 'A.5.29 · Continuity',
    isoDetail: 'OT ransomware & extortion risk',
    riskStatement: 'Ransomware encryption of MES and SCADA would halt production at 3 plants with double-extortion data leak risk, triggering NIS2 significant-incident notification obligations within 24 hours.',
    likelihood: 'High',
    impact: 'Critical',
    callout: '3 plants run flat IT/OT networks. MES backups online only — ransomware-exposed.',
  },

  policy: {
    policyId: 'POL-OT-2026-014',
    title: 'IT/OT Segmentation, Immutable Offline Backups & PAW for OT Administration',
    scope: 'group',
    scopeLabel: 'Organization-wide (OT sites)',
    humanReadable: '',
    policyAsCode: '',
    effectiveDate: '2026-04-15',
    rationale: 'Active ransomware campaign targeting EU manufacturing MES/SCADA combined with existing flat IT/OT topology.',
  },

  policySummary: {
    title: 'OT Ransomware Resilience',
    subtitle: 'Segmentation · immutable backup · PAW',
    requirements: [
      { icon: 'network', text: 'IT/OT segmentation (Purdue L3/L3.5 firewalls)' },
      { icon: 'lock', text: 'Daily immutable offline backups for MES & historian' },
      { icon: 'key', text: 'Privileged Access Workstations for OT admins' },
    ],
    scope: 'Organization-wide · 21-day rollout',
  },

  approval: {
    id: 'APR-2026-0356',
    reasonForChange: 'Active ransomware campaign targeting EU manufacturing MES/SCADA.',
    scope: 'group',
    scopeLabel: 'Organization-wide',
    expectedImpact: 'Reduces OT ransomware exposure from 71% to under 18% and shortens plant recovery time from days to hours.',
    businessFrictionWarning: '2-hour maintenance window per plant for segmentation firewalls. PAW provisioning for 38 OT admins.',
    approverName: 'Dr. Elena Vasquez',
    approverRole: 'Chief Risk Officer',
    impactedEntities: ['Verhelst Industries'],
    status: 'pending',
  },

  approvalSummary: {
    reason: 'Approve OT segmentation, immutable backups and PAW to contain ransomware blast radius.',
    friction: '2-hour maintenance per plant. PAW provisioning for 38 OT admins.',
  },

  boardStatement: {
    before: 'An active ransomware campaign against EU manufacturing has pushed operational-continuity risk outside board-stated appetite. NIS2-aligned response under way.',
    after: 'OT continuity risk returned to within appetite. IT/OT segmentation, immutable backups and PAW-based admin access materially reduce ransomware blast radius and evidence NIS2 business-continuity requirements.',
  },

  controlAction: 'Enforced Purdue-aligned IT/OT segmentation, daily immutable offline backups of MES and historian data, and required Privileged Access Workstations for all OT administration.',

  envBefore: {
    entityId: 'verhelst', entityName: 'Verhelst Industries', complianceScore: 65,
    policyAssignments: [], affectedAssets: [
      { id: 'O1', name: 'Antwerp Plant MES', type: 'OT', compliant: false, lastChecked: '' },
      { id: 'O2', name: 'Gent Plant SCADA', type: 'OT', compliant: false, lastChecked: '' },
      { id: 'O3', name: 'Hasselt Historian', type: 'OT', compliant: false, lastChecked: '' },
      { id: 'O4', name: 'Backup Vault', type: 'Data Store', compliant: false, lastChecked: '' },
      { id: 'O5', name: 'Jump Host Farm', type: 'Identity', compliant: true, lastChecked: '' },
    ], remediationStatus: [],
  },

  envAfter: {
    entityId: 'verhelst', entityName: 'Verhelst Industries', complianceScore: 93,
    policyAssignments: [], affectedAssets: [
      { id: 'O1', name: 'Antwerp Plant MES', type: 'OT', compliant: true, lastChecked: '' },
      { id: 'O2', name: 'Gent Plant SCADA', type: 'OT', compliant: true, lastChecked: '' },
      { id: 'O3', name: 'Hasselt Historian', type: 'OT', compliant: true, lastChecked: '' },
      { id: 'O4', name: 'Backup Vault', type: 'Data Store', compliant: true, lastChecked: '' },
      { id: 'O5', name: 'Jump Host Farm', type: 'Identity', compliant: true, lastChecked: '' },
    ], remediationStatus: [],
  },

  metricsBefore: {
    entityId: 'verhelst', entityName: 'Verhelst Industries', overallRiskScore: 42, compliancePosture: 65, openFindings: 16, controlCoverage: 64,
    exposureTrend: [33, 35, 37, 39, 41, 42], complianceTrend: [72, 71, 69, 68, 66, 65],
  },

  metricsAfter: {
    entityId: 'verhelst', entityName: 'Verhelst Industries', overallRiskScore: 13, compliancePosture: 93, openFindings: 3, controlCoverage: 92,
    exposureTrend: [35, 37, 39, 42, 25, 13], complianceTrend: [71, 69, 68, 65, 82, 93],
  },

  agents: [
    { id: 'threat-intake', name: 'Threat Intake Agent', role: 'Reads the ENISA advisory and maps Clop TTPs to our environment.', status: 'idle', description: '' },
    { id: 'risk-mapping', name: 'Risk Assessment Agent', role: 'Correlates OT asset inventory with backup state and segmentation posture.', status: 'idle', description: '' },
    { id: 'control-engineering', name: 'Control Engineering Agent', role: 'Drafts the segmentation, backup and PAW policy-as-code.', status: 'idle', description: '' },
  ],

  agentSteps: {
    'threat-intake': {
      processing: 'Reading ENISA-2026-00442, mapping ATT&CK to Clop TTPs…',
      output: 'Clop-variant ransomware targeting EU manufacturing MES/SCADA with double extortion. Business-critical exposure.',
    },
    'risk-mapping': {
      processing: 'Correlating OT asset inventory with backup state and segmentation posture…',
      output: 'Mapped to RSK-2026-0099 (OT ransomware) → ISO 27001 A.5.29 Continuity. Residual exposure: 71%.',
    },
    'control-engineering': {
      processing: 'Drafting Purdue segmentation firewall rules and immutable backup policy-as-code…',
      output: 'POL-OT-2026-014 drafted: IT/OT segmentation, daily immutable backups, PAW for OT admins.',
    },
  },

  auditEntries: {
    new_event_received: { actor: 'CERT-EU Connector', action: 'Threat Ingested', detail: 'ENISA-2026-00442 — Clop variant. TLP:RED.', phase: 'new_event_received' },
    threat_analysis_in_progress: { actor: 'Threat Intake Agent', action: 'Analysing', detail: 'Mapping Clop TTPs to OT estate.', phase: 'threat_analysis_in_progress' },
    risk_mapped: { actor: 'Risk Assessment Agent', action: 'Risk Assessed', detail: 'RSK-2026-0099 → ISO A.5.29.', phase: 'risk_mapped' },
    policy_generated: { actor: 'Control Engineering Agent', action: 'Policy Drafted', detail: 'POL-OT-2026-014 ready.', phase: 'policy_generated' },
    awaiting_approval: { actor: 'Orchestration', action: 'Approval Gate', detail: 'Awaiting CRO.', phase: 'awaiting_approval' },
    deployment_in_progress: { actor: 'Dr. Elena Vasquez', action: 'Approved', detail: 'Rolling segmentation + immutable backup.', phase: 'deployment_in_progress' },
    environment_updated: { actor: 'Environment Controller', action: 'Target State Reached', detail: 'Segmentation live. Immutable backups active.', phase: 'environment_updated' },
    deployment_complete: { actor: 'Board Reporting', action: 'Board Refreshed', detail: 'Risk posture updated; loop closed.', phase: 'deployment_complete' },
  },
};

export const scenario4: ScenarioData = {
  id: 'vendor-breach-hr',
  label: 'Third-Party HR Vendor Breach',
  subtitle: 'Supplier Risk & GDPR',
  icon: 'vendor',

  threatEvent: {
    id: 'CERT-EU-2026-01187',
    title: 'Data Breach at PeopleHub HCM — Employee PII Exposed Across EU Customers',
    description: 'PeopleHub (HR SaaS used by ~600 EU enterprises) discloses unauthorized data access via a leaked integration API key. Names, IBANs and national IDs for 1.2M workers affected.',
    severity: 'critical',
    confidence: 'high',
    tlp: 'AMBER',
    threatVector: 'Third-party API key leak → Unauthorized data access → PII exfiltration',
    suggestedMitigation: 'Rotate integration credentials, invoke DPA breach-notification clause, trigger 72h GDPR Art. 33 assessment.',
    timestamp: '2026-04-16T08:02:00Z',
    source: 'PeopleHub Trust Center / CERT-EU',
    affectedEntities: ['verhelst'],
    tags: ['GDPR', 'Art. 33', 'Third-party', 'PII', 'TPRM'],
  },

  threatSummary: {
    shortTitle: 'HR SaaS Vendor Breach',
    description: 'PeopleHub HCM breach exposes employee PII across EU customers',
    vector: 'API Key Leak → Data Exfiltration',
    source: 'PeopleHub Trust Center',
  },

  riskMapping: {
    riskId: 'RSK-2026-0101',
    riskStatement: 'Unauthorized disclosure of employee PII via compromised third-party HR SaaS, triggering GDPR Art. 33 notification obligations within 72 hours.',
    riskOwner: 'Ines Kowalski, DPO',
    impactedCapability: 'Third-Party Risk Management & Data Protection',
    residualExposure: 58,
    isoControlTheme: 'A.5.19–22, A.5.34 — Supplier & Privacy (ISO/IEC 27001:2022)',
    isoControlRef: 'A.5.19 · A.5.22 · A.5.34',
    affectedEntities: [
      { entityId: 'verhelst', entityName: 'Verhelst Industries', localExposure: 58, localImpact: 'PeopleHub integrated with SAP HR for 4,200 EU employees using a legacy static API key. No egress monitoring on connector.' },
    ],
  },

  analysisSummary: {
    isoTheme: 'ISO/IEC 27001',
    isoCode: 'A.5.19 · Supplier Risk',
    isoDetail: 'Third-party PII exposure',
    riskStatement: 'Compromised HR SaaS could expose PII for 4,200 EU employees, triggering GDPR Art. 33 supervisory-authority notification within 72 hours and potential fines up to 4% of group turnover.',
    likelihood: 'High',
    impact: 'Critical',
    callout: '9 HR/payroll SaaS integrations still authenticate with static API keys — no rotation, no egress monitoring.',
  },

  policy: {
    policyId: 'POL-TPRM-2026-011',
    title: 'Mandatory OAuth + mTLS for Vendor Integrations and GDPR 72h Escalation SLA',
    scope: 'group',
    scopeLabel: 'Organization-wide',
    humanReadable: '',
    policyAsCode: '',
    effectiveDate: '2026-04-16',
    rationale: 'Third-party HR SaaS breach exposes employee PII while static API keys remain in use across HR and payroll integrations.',
  },

  policySummary: {
    title: 'Vendor Integration Hardening',
    subtitle: 'OAuth + mTLS · GDPR 72h escalation',
    requirements: [
      { icon: 'key', text: 'OAuth + mTLS for all vendor integrations' },
      { icon: 'clock', text: '72-hour GDPR Art. 33 escalation runbook' },
      { icon: 'eye', text: 'Egress monitoring on all vendor connectors' },
    ],
    scope: 'Organization-wide · 14-day rollout',
  },

  approval: {
    id: 'APR-2026-0361',
    reasonForChange: 'Active third-party HR SaaS breach with PII exposure for 4,200 EU employees.',
    scope: 'group',
    scopeLabel: 'Organization-wide',
    expectedImpact: 'Rotates exposed credentials, eliminates static API keys, and formalises the GDPR Art. 33 breach timeline.',
    businessFrictionWarning: 'HR team needs credential re-enrolment for 9 SaaS integrations; possible 4-hour SAP HR sync pause during cutover.',
    approverName: 'Dr. Elena Vasquez',
    approverRole: 'Chief Risk Officer',
    impactedEntities: ['Verhelst Industries'],
    status: 'pending',
  },

  approvalSummary: {
    reason: 'Approve vendor-integration hardening and GDPR 72h escalation runbook.',
    friction: 'Credential re-enrolment for 9 HR/payroll SaaS integrations. 4h SAP HR sync pause.',
  },

  boardStatement: {
    before: 'A third-party HR-SaaS breach has pushed supplier and privacy risk outside board-stated appetite. DPO-led response under way.',
    after: 'Supplier and privacy risk returned to within appetite. Vendor-integration hardening and a formalised GDPR Art. 33 escalation runbook strengthen ISO 27001 A.5.19 supplier controls and eliminate reliance on static credentials.',
  },

  controlAction: 'Rotated PeopleHub integration credentials, mandated OAuth + mTLS across vendor connectors, deployed egress monitoring, and codified the 72-hour GDPR Art. 33 escalation runbook.',

  envBefore: {
    entityId: 'verhelst', entityName: 'Verhelst Industries', complianceScore: 70,
    policyAssignments: [], affectedAssets: [
      { id: 'V1', name: 'PeopleHub HCM', type: 'SaaS Vendor', compliant: false, lastChecked: '' },
      { id: 'V2', name: 'SAP HR', type: 'HRIS', compliant: true, lastChecked: '' },
      { id: 'V3', name: 'Okta Integrations', type: 'Identity', compliant: false, lastChecked: '' },
      { id: 'V4', name: 'DLP Egress Gateway', type: 'Network', compliant: false, lastChecked: '' },
      { id: 'V5', name: 'ROPA Register', type: 'Data Store', compliant: true, lastChecked: '' },
    ], remediationStatus: [],
  },

  envAfter: {
    entityId: 'verhelst', entityName: 'Verhelst Industries', complianceScore: 92,
    policyAssignments: [], affectedAssets: [
      { id: 'V1', name: 'PeopleHub HCM', type: 'SaaS Vendor', compliant: true, lastChecked: '' },
      { id: 'V2', name: 'SAP HR', type: 'HRIS', compliant: true, lastChecked: '' },
      { id: 'V3', name: 'Okta Integrations', type: 'Identity', compliant: true, lastChecked: '' },
      { id: 'V4', name: 'DLP Egress Gateway', type: 'Network', compliant: true, lastChecked: '' },
      { id: 'V5', name: 'ROPA Register', type: 'Data Store', compliant: true, lastChecked: '' },
    ], remediationStatus: [],
  },

  metricsBefore: {
    entityId: 'verhelst', entityName: 'Verhelst Industries', overallRiskScore: 36, compliancePosture: 70, openFindings: 11, controlCoverage: 70,
    exposureTrend: [28, 30, 32, 33, 35, 36], complianceTrend: [77, 75, 74, 72, 71, 70],
  },

  metricsAfter: {
    entityId: 'verhelst', entityName: 'Verhelst Industries', overallRiskScore: 12, compliancePosture: 92, openFindings: 3, controlCoverage: 91,
    exposureTrend: [30, 32, 33, 36, 22, 12], complianceTrend: [75, 74, 72, 70, 83, 92],
  },

  agents: [
    { id: 'threat-intake', name: 'Threat Intake Agent', role: 'Parses the vendor breach disclosure and impact scope.', status: 'idle', description: '' },
    { id: 'risk-mapping', name: 'Risk Assessment Agent', role: 'Joins affected SaaS to our ROPA and integration inventory.', status: 'idle', description: '' },
    { id: 'control-engineering', name: 'Control Engineering Agent', role: 'Drafts vendor-integration hardening and GDPR 72h runbook.', status: 'idle', description: '' },
  ],

  agentSteps: {
    'threat-intake': {
      processing: 'Parsing CERT-EU-2026-01187, correlating PeopleHub disclosure with contracts…',
      output: 'Breach of PeopleHub HCM exposes PII for 4,200 of our EU employees. GDPR Art. 33 clock started.',
    },
    'risk-mapping': {
      processing: 'Joining affected SaaS to ROPA, identifying static-credential integrations…',
      output: 'Mapped to RSK-2026-0101 (Supplier/Privacy) → ISO 27001 A.5.19. 9 static-key integrations found. Exposure: 58%.',
    },
    'control-engineering': {
      processing: 'Drafting OAuth+mTLS connector policy and GDPR 72h escalation runbook…',
      output: 'POL-TPRM-2026-011 drafted: OAuth+mTLS for vendor integrations, egress monitoring, 72h GDPR escalation.',
    },
  },

  auditEntries: {
    new_event_received: { actor: 'CERT-EU Connector', action: 'Disclosure Ingested', detail: 'CERT-EU-2026-01187 — Vendor breach. TLP:AMBER.', phase: 'new_event_received' },
    threat_analysis_in_progress: { actor: 'Threat Intake Agent', action: 'Analysing', detail: 'Scoping PeopleHub PII exposure.', phase: 'threat_analysis_in_progress' },
    risk_mapped: { actor: 'Risk Assessment Agent', action: 'Risk Assessed', detail: 'RSK-2026-0101 → ISO A.5.19.', phase: 'risk_mapped' },
    policy_generated: { actor: 'Control Engineering Agent', action: 'Policy Drafted', detail: 'POL-TPRM-2026-011 ready.', phase: 'policy_generated' },
    awaiting_approval: { actor: 'Orchestration', action: 'Approval Gate', detail: 'Awaiting CRO & DPO.', phase: 'awaiting_approval' },
    deployment_in_progress: { actor: 'Dr. Elena Vasquez', action: 'Approved', detail: 'Rotating credentials; enabling mTLS.', phase: 'deployment_in_progress' },
    environment_updated: { actor: 'Environment Controller', action: 'Target State Reached', detail: 'All vendor connectors on OAuth+mTLS.', phase: 'environment_updated' },
    deployment_complete: { actor: 'Board Reporting', action: 'Board Refreshed', detail: 'Risk posture updated; loop closed.', phase: 'deployment_complete' },
  },
};

export const scenario5: ScenarioData = {
  id: 'cloud-exposure-s3',
  label: 'Exposed Cloud Storage',
  subtitle: 'Cloud Posture & Data Protection',
  icon: 'cloud',

  threatEvent: {
    id: 'CSPM-2026-00812',
    title: 'Publicly Accessible S3 Bucket Containing 42,000 Customer Contracts',
    description: 'Wiz CSPM scanner flagged S3 bucket vh-customer-archive with a public ACL exposing 42,000 signed contracts containing PII and commercial terms for 18 enterprise customers.',
    severity: 'critical',
    confidence: 'high',
    tlp: 'AMBER',
    threatVector: 'Cloud misconfiguration → Public ACL → Data disclosure',
    suggestedMitigation: 'Lock the bucket ACL, enforce SCPs blocking public storage org-wide, require customer-managed keys and continuous drift detection.',
    timestamp: '2026-04-16T14:47:00Z',
    source: 'Wiz CSPM / AWS Security Hub',
    affectedEntities: ['verhelst'],
    tags: ['CIS AWS 2.1.5', 'PII', 'Cloud misconfig', 'GDPR'],
  },

  threatSummary: {
    shortTitle: 'Exposed S3 Bucket',
    description: '42,000 customer contracts publicly accessible on AWS',
    vector: 'Misconfig → Public ACL → PII Disclosure',
    source: 'Wiz CSPM',
  },

  riskMapping: {
    riskId: 'RSK-2026-0103',
    riskStatement: 'Disclosure of customer contracts and PII from misconfigured public cloud storage, with GDPR and commercial-confidentiality consequences.',
    riskOwner: 'Arjun Malhotra, Head of Cloud',
    impactedCapability: 'Cloud Security Posture Management',
    residualExposure: 66,
    isoControlTheme: 'A.5.23, A.8.12 — Cloud Security & DLP (ISO/IEC 27001:2022)',
    isoControlRef: 'A.5.23 · A.8.12 · A.8.10',
    affectedEntities: [
      { entityId: 'verhelst', entityName: 'Verhelst Industries', localExposure: 66, localImpact: '1 of 340 buckets public. No preventive SCP in place; CSPM is detective-only.' },
    ],
  },

  analysisSummary: {
    isoTheme: 'ISO/IEC 27001',
    isoCode: 'A.5.23 · Cloud Security',
    isoDetail: 'Public storage exposure risk',
    riskStatement: '42,000 customer contracts exposed on a public S3 bucket. Absent preventive guardrails a recurrence is likely. Potential GDPR fines and contractual breach with 18 enterprise customers.',
    likelihood: 'High',
    impact: 'Critical',
    callout: 'No organization-wide SCP blocking public buckets. CSPM is detective-only.',
  },

  policy: {
    policyId: 'POL-CLOUD-2026-019',
    title: 'Preventive SCPs Blocking Public Storage & Mandatory CMK Encryption at Rest',
    scope: 'group',
    scopeLabel: 'Organization-wide (AWS / Azure / GCP)',
    humanReadable: '',
    policyAsCode: '',
    effectiveDate: '2026-04-16',
    rationale: 'Exposed bucket demonstrates reactive-only cloud controls. Preventive guardrails required across the cloud estate.',
  },

  policySummary: {
    title: 'Cloud Storage Guardrails',
    subtitle: 'No public buckets · CMK encryption · drift detection',
    requirements: [
      { icon: 'cloud', text: 'SCPs block public buckets org-wide' },
      { icon: 'lock', text: 'Customer-managed keys required at rest' },
      { icon: 'scan', text: 'CSPM continuous drift detection' },
    ],
    scope: 'Organization-wide · immediate enforcement',
  },

  approval: {
    id: 'APR-2026-0367',
    reasonForChange: 'Live exposure of 42,000 customer contracts on a public cloud bucket.',
    scope: 'group',
    scopeLabel: 'Organization-wide',
    expectedImpact: 'Closes public access, prevents recurrence via SCP guardrails, and encrypts customer data with CMK.',
    businessFrictionWarning: '14 buckets need CMK rekey; brief read latency during migration. 3 legacy apps must update SDKs.',
    approverName: 'Dr. Elena Vasquez',
    approverRole: 'Chief Risk Officer',
    impactedEntities: ['Verhelst Industries'],
    status: 'pending',
  },

  approvalSummary: {
    reason: 'Approve preventive cloud-storage guardrails and CMK-based encryption at rest.',
    friction: '14 buckets rekeyed to CMK. 3 legacy apps need SDK update.',
  },

  boardStatement: {
    before: 'A live public cloud storage exposure has pushed cloud-data risk outside board-stated appetite. CSPM-led response under way.',
    after: 'Cloud-data risk returned to within appetite. Organization-wide SCP guardrails prevent public storage by construction, and CMK encryption evidences ISO 27001 A.5.23 and A.8.12 controls.',
  },

  controlAction: 'Locked the exposed bucket, applied organization-wide SCPs blocking public storage, enforced customer-managed keys at rest, and enabled CSPM continuous drift detection.',

  envBefore: {
    entityId: 'verhelst', entityName: 'Verhelst Industries', complianceScore: 67,
    policyAssignments: [], affectedAssets: [
      { id: 'C1', name: 'vh-customer-archive (S3)', type: 'Data Store', compliant: false, lastChecked: '' },
      { id: 'C2', name: 'AWS Organization SCPs', type: 'Governance', compliant: false, lastChecked: '' },
      { id: 'C3', name: 'CloudTrail Log Store', type: 'Logging', compliant: true, lastChecked: '' },
      { id: 'C4', name: 'KMS (CMK)', type: 'Crypto', compliant: false, lastChecked: '' },
      { id: 'C5', name: 'Wiz CSPM Scanner', type: 'CSPM', compliant: true, lastChecked: '' },
    ], remediationStatus: [],
  },

  envAfter: {
    entityId: 'verhelst', entityName: 'Verhelst Industries', complianceScore: 94,
    policyAssignments: [], affectedAssets: [
      { id: 'C1', name: 'vh-customer-archive (S3)', type: 'Data Store', compliant: true, lastChecked: '' },
      { id: 'C2', name: 'AWS Organization SCPs', type: 'Governance', compliant: true, lastChecked: '' },
      { id: 'C3', name: 'CloudTrail Log Store', type: 'Logging', compliant: true, lastChecked: '' },
      { id: 'C4', name: 'KMS (CMK)', type: 'Crypto', compliant: true, lastChecked: '' },
      { id: 'C5', name: 'Wiz CSPM Scanner', type: 'CSPM', compliant: true, lastChecked: '' },
    ], remediationStatus: [],
  },

  metricsBefore: {
    entityId: 'verhelst', entityName: 'Verhelst Industries', overallRiskScore: 38, compliancePosture: 67, openFindings: 13, controlCoverage: 68,
    exposureTrend: [30, 32, 33, 35, 37, 38], complianceTrend: [75, 73, 71, 70, 68, 67],
  },

  metricsAfter: {
    entityId: 'verhelst', entityName: 'Verhelst Industries', overallRiskScore: 10, compliancePosture: 94, openFindings: 2, controlCoverage: 93,
    exposureTrend: [32, 33, 35, 38, 22, 10], complianceTrend: [73, 71, 70, 67, 84, 94],
  },

  agents: [
    { id: 'threat-intake', name: 'Threat Intake Agent', role: 'Interprets the CSPM finding and its business exposure.', status: 'idle', description: '' },
    { id: 'risk-mapping', name: 'Risk Assessment Agent', role: 'Correlates exposed objects with data classification and contracts.', status: 'idle', description: '' },
    { id: 'control-engineering', name: 'Control Engineering Agent', role: 'Drafts preventive SCP guardrails and CMK encryption policy-as-code.', status: 'idle', description: '' },
  ],

  agentSteps: {
    'threat-intake': {
      processing: 'Parsing CSPM-2026-00812, mapping to CIS AWS Foundations benchmarks…',
      output: 'Public S3 bucket exposes 42,000 customer contracts with PII. GDPR and contractual-breach exposure.',
    },
    'risk-mapping': {
      processing: 'Correlating exposed objects with data classification and customer contract register…',
      output: 'Mapped to RSK-2026-0103 (Cloud misconfig) → ISO 27001 A.5.23 Cloud Security. Exposure: 66%.',
    },
    'control-engineering': {
      processing: 'Drafting SCP guardrail set and CMK encryption policy-as-code…',
      output: 'POL-CLOUD-2026-019 drafted: SCPs block public buckets, CMK at rest, continuous drift detection.',
    },
  },

  auditEntries: {
    new_event_received: { actor: 'Wiz Connector', action: 'Finding Ingested', detail: 'CSPM-2026-00812 — Public bucket. Critical.', phase: 'new_event_received' },
    threat_analysis_in_progress: { actor: 'Threat Intake Agent', action: 'Analysing', detail: 'Assessing blast radius of public bucket.', phase: 'threat_analysis_in_progress' },
    risk_mapped: { actor: 'Risk Assessment Agent', action: 'Risk Assessed', detail: 'RSK-2026-0103 → ISO A.5.23.', phase: 'risk_mapped' },
    policy_generated: { actor: 'Control Engineering Agent', action: 'Policy Drafted', detail: 'POL-CLOUD-2026-019 ready.', phase: 'policy_generated' },
    awaiting_approval: { actor: 'Orchestration', action: 'Approval Gate', detail: 'Awaiting CRO.', phase: 'awaiting_approval' },
    deployment_in_progress: { actor: 'Dr. Elena Vasquez', action: 'Approved', detail: 'Applying SCPs and CMK.', phase: 'deployment_in_progress' },
    environment_updated: { actor: 'Environment Controller', action: 'Target State Reached', detail: 'Bucket locked; guardrails live.', phase: 'environment_updated' },
    deployment_complete: { actor: 'Board Reporting', action: 'Board Refreshed', detail: 'Risk posture updated; loop closed.', phase: 'deployment_complete' },
  },
};

export const ALL_SCENARIOS: ScenarioData[] = [scenario2, scenario1, scenario3, scenario4, scenario5, explainerScenario];
