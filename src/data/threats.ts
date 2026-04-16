import type { ThreatEvent } from '../types';

export const primaryThreatEvent: ThreatEvent = {
  id: 'MISP-2026-04871',
  title: 'AI-Assisted Phishing Campaign Targeting Cloud Identities and OAuth Tokens',
  description:
    'A sophisticated phishing campaign leveraging large language models to generate highly convincing credential-harvesting emails has been observed across the Nordic healthcare and financial sectors. Attackers are using adversary-in-the-middle (AiTM) techniques to intercept OAuth tokens and bypass legacy MFA. Compromised identities are used to establish persistent access through consent-grant abuse and mailbox rule manipulation.',
  severity: 'critical',
  confidence: 'high',
  tlp: 'AMBER',
  threatVector: 'Phishing → AiTM Proxy → OAuth Token Theft → Consent Grant Abuse',
  suggestedMitigation:
    'Enforce phishing-resistant MFA (FIDO2/passkeys) for all privileged and high-risk accounts. Review and restrict OAuth consent policies. Deploy conditional access policies requiring compliant devices.',
  timestamp: '2026-04-16T09:14:00Z',
  source: 'Nordic CERT / MISP Community',
  affectedEntities: ['northstar-group', 'northstar-health'],
  tags: [
    'T1566.001',
    'T1557',
    'T1550.001',
    'AI-generated content',
    'OAuth abuse',
    'Healthcare sector',
    'AiTM',
  ],
};

export const backgroundEvents: ThreatEvent[] = [
  {
    id: 'MISP-2026-04822',
    title: 'Ransomware Variant Targeting Healthcare DICOM Systems',
    description: 'New ransomware strain observed targeting DICOM imaging servers in European hospitals.',
    severity: 'high',
    confidence: 'medium',
    tlp: 'AMBER',
    threatVector: 'Exploit → Lateral Movement → Encryption',
    suggestedMitigation: 'Segment medical imaging networks. Patch CVE-2026-1134.',
    timestamp: '2026-04-15T16:42:00Z',
    source: 'EU ENISA',
    affectedEntities: ['northstar-health'],
    tags: ['Ransomware', 'Healthcare', 'DICOM'],
  },
  {
    id: 'MISP-2026-04790',
    title: 'Supply Chain Compromise in NPM Dependency (typo-squatting)',
    description: 'Malicious NPM packages mimicking popular identity libraries discovered.',
    severity: 'medium',
    confidence: 'high',
    tlp: 'GREEN',
    threatVector: 'Supply Chain → Dependency Confusion',
    suggestedMitigation: 'Audit package registries. Enable dependency lockfile verification.',
    timestamp: '2026-04-14T11:20:00Z',
    source: 'GitHub Advisory',
    affectedEntities: ['northstar-group'],
    tags: ['Supply chain', 'NPM', 'Dependency confusion'],
  },
];
