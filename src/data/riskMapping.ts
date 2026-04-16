import type { RiskMapping } from '../types';

export const scenarioRiskMapping: RiskMapping = {
  riskId: 'RSK-2026-0087',
  riskStatement:
    'Compromise of privileged cloud identities through AI-assisted phishing and OAuth token interception, leading to unauthorized access to sensitive business systems and patient data across the group.',
  riskOwner: 'Marcus Lindgren, Group CISO',
  impactedCapability: 'Identity & Access Management / Cloud Security Posture',
  residualExposure: 62,
  isoControlTheme: 'A.8 — Access Control (ISO/IEC 27001:2022)',
  isoControlRef: 'A.8.5 Secure authentication · A.8.2 Privileged access rights · A.8.3 Information access restriction',
  affectedEntities: [
    {
      entityId: 'northstar-group',
      entityName: 'Northstar Group',
      localExposure: 48,
      localImpact:
        'Group Azure AD tenant hosts all privileged admin accounts. Legacy MFA on 23% of admin accounts leaves a significant attack surface for AiTM-based token theft.',
    },
    {
      entityId: 'northstar-health',
      entityName: 'Northstar Health Services',
      localExposure: 72,
      localImpact:
        'Patient portal uses OAuth-based SSO with the group tenant. Clinical staff have elevated data access. Healthcare data breach carries regulatory and reputational severity.',
    },
  ],
};
