import type { ApprovalRequest } from '../types';

export const scenarioApproval: ApprovalRequest = {
  id: 'APR-2026-0341',
  reasonForChange:
    'Critical threat intelligence (MISP-2026-04871) identifies active AI-assisted phishing campaigns targeting cloud identities in the Nordic healthcare sector. Current legacy MFA posture leaves privileged accounts vulnerable to adversary-in-the-middle token interception.',
  scope: 'group_with_local_override',
  scopeLabel: 'Group Baseline + Northstar Health Accelerated Rollout',
  expectedImpact:
    'Eliminates SMS/voice-based MFA for privileged accounts group-wide. Reduces estimated identity compromise exposure from 62% to under 15%. Enforces compliant device requirements for sensitive resource access.',
  businessFrictionWarning:
    'Approximately 23% of group admin accounts and 31% of Northstar Health clinical staff currently use legacy MFA methods. Users will need to enroll FIDO2 security keys or platform passkeys. Estimated enrollment disruption window: 3–5 business days per entity. IT service desk volume may increase 40% during rollout.',
  approverName: 'Dr. Elena Vasquez',
  approverRole: 'Group Chief Risk Officer',
  impactedEntities: ['Northstar Group', 'Northstar Health Services'],
  status: 'pending',
};
