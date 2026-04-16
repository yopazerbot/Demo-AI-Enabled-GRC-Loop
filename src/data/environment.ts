import type { EnvironmentState } from '../types';

export const initialEnvironment: EnvironmentState[] = [
  {
    entityId: 'northstar-group',
    entityName: 'Northstar Group',
    complianceScore: 78,
    policyAssignments: [
      { policyId: 'POL-IAM-001', policyName: 'MFA for Admin Accounts', status: 'active', assignedScope: 'Group-wide' },
      { policyId: 'POL-NET-003', policyName: 'Network Segmentation Baseline', status: 'active', assignedScope: 'Group-wide' },
      { policyId: 'POL-DLP-002', policyName: 'Data Loss Prevention — Email', status: 'active', assignedScope: 'Group-wide' },
      { policyId: 'POL-IAM-012', policyName: 'Phishing-Resistant MFA — Privileged Access', status: 'not_assigned', assignedScope: '—' },
    ],
    affectedAssets: [
      { id: 'AST-001', name: 'Azure AD Tenant (Group)', type: 'Identity Provider', compliant: false, lastChecked: '2026-04-16T08:00:00Z' },
      { id: 'AST-002', name: 'Exchange Online', type: 'Collaboration', compliant: true, lastChecked: '2026-04-16T08:00:00Z' },
      { id: 'AST-003', name: 'SAP S/4HANA', type: 'ERP', compliant: true, lastChecked: '2026-04-16T08:00:00Z' },
      { id: 'AST-004', name: 'Corporate VPN Gateway', type: 'Network', compliant: true, lastChecked: '2026-04-16T08:00:00Z' },
    ],
    remediationStatus: [
      { id: 'REM-001', description: 'Enroll privileged accounts in FIDO2', status: 'pending', assignedTo: 'IAM Team' },
      { id: 'REM-002', description: 'Deploy Conditional Access policy update', status: 'pending', assignedTo: 'Cloud Security' },
      { id: 'REM-003', description: 'Restrict OAuth consent to admin-only', status: 'pending', assignedTo: 'IAM Team' },
    ],
  },
  {
    entityId: 'northstar-health',
    entityName: 'Northstar Health Services',
    complianceScore: 71,
    policyAssignments: [
      { policyId: 'POL-IAM-001', policyName: 'MFA for Admin Accounts', status: 'active', assignedScope: 'Inherited (Group)' },
      { policyId: 'POL-HC-001', policyName: 'Patient Data Access Control', status: 'active', assignedScope: 'Subsidiary' },
      { policyId: 'POL-HC-002', policyName: 'Clinical System Segmentation', status: 'active', assignedScope: 'Subsidiary' },
      { policyId: 'POL-IAM-012', policyName: 'Phishing-Resistant MFA — Privileged Access', status: 'not_assigned', assignedScope: '—' },
    ],
    affectedAssets: [
      { id: 'AST-H01', name: 'Azure AD (Subsidiary Tenant)', type: 'Identity Provider', compliant: false, lastChecked: '2026-04-16T08:00:00Z' },
      { id: 'AST-H02', name: 'Patient Portal (OAuth)', type: 'Application', compliant: false, lastChecked: '2026-04-16T08:00:00Z' },
      { id: 'AST-H03', name: 'EHR System', type: 'Clinical', compliant: true, lastChecked: '2026-04-16T08:00:00Z' },
      { id: 'AST-H04', name: 'Clinical Data Warehouse', type: 'Data Store', compliant: true, lastChecked: '2026-04-16T08:00:00Z' },
    ],
    remediationStatus: [
      { id: 'REM-H01', description: 'Enroll clinical staff in FIDO2 (priority)', status: 'pending', assignedTo: 'Local IT' },
      { id: 'REM-H02', description: 'Restrict Patient Portal OAuth scope', status: 'pending', assignedTo: 'AppSec Team' },
      { id: 'REM-H03', description: 'Deploy Conditional Access for clinical apps', status: 'pending', assignedTo: 'Cloud Security' },
    ],
  },
];

export const postApprovalEnvironment: EnvironmentState[] = [
  {
    entityId: 'northstar-group',
    entityName: 'Northstar Group',
    complianceScore: 89,
    policyAssignments: [
      { policyId: 'POL-IAM-001', policyName: 'MFA for Admin Accounts', status: 'active', assignedScope: 'Group-wide (superseded)' },
      { policyId: 'POL-NET-003', policyName: 'Network Segmentation Baseline', status: 'active', assignedScope: 'Group-wide' },
      { policyId: 'POL-DLP-002', policyName: 'Data Loss Prevention — Email', status: 'active', assignedScope: 'Group-wide' },
      { policyId: 'POL-IAM-012', policyName: 'Phishing-Resistant MFA — Privileged Access', status: 'active', assignedScope: 'Group-wide (30-day rollout)' },
    ],
    affectedAssets: [
      { id: 'AST-001', name: 'Azure AD Tenant (Group)', type: 'Identity Provider', compliant: true, lastChecked: '2026-04-16T09:32:00Z' },
      { id: 'AST-002', name: 'Exchange Online', type: 'Collaboration', compliant: true, lastChecked: '2026-04-16T09:32:00Z' },
      { id: 'AST-003', name: 'SAP S/4HANA', type: 'ERP', compliant: true, lastChecked: '2026-04-16T09:32:00Z' },
      { id: 'AST-004', name: 'Corporate VPN Gateway', type: 'Network', compliant: true, lastChecked: '2026-04-16T09:32:00Z' },
    ],
    remediationStatus: [
      { id: 'REM-001', description: 'Enroll privileged accounts in FIDO2', status: 'in_progress', assignedTo: 'IAM Team' },
      { id: 'REM-002', description: 'Deploy Conditional Access policy update', status: 'complete', assignedTo: 'Cloud Security' },
      { id: 'REM-003', description: 'Restrict OAuth consent to admin-only', status: 'complete', assignedTo: 'IAM Team' },
    ],
  },
  {
    entityId: 'northstar-health',
    entityName: 'Northstar Health Services',
    complianceScore: 86,
    policyAssignments: [
      { policyId: 'POL-IAM-001', policyName: 'MFA for Admin Accounts', status: 'active', assignedScope: 'Inherited (superseded)' },
      { policyId: 'POL-HC-001', policyName: 'Patient Data Access Control', status: 'active', assignedScope: 'Subsidiary' },
      { policyId: 'POL-HC-002', policyName: 'Clinical System Segmentation', status: 'active', assignedScope: 'Subsidiary' },
      { policyId: 'POL-IAM-012', policyName: 'Phishing-Resistant MFA — Privileged Access', status: 'active', assignedScope: 'Subsidiary (7-day accelerated)' },
    ],
    affectedAssets: [
      { id: 'AST-H01', name: 'Azure AD (Subsidiary Tenant)', type: 'Identity Provider', compliant: true, lastChecked: '2026-04-16T09:32:00Z' },
      { id: 'AST-H02', name: 'Patient Portal (OAuth)', type: 'Application', compliant: true, lastChecked: '2026-04-16T09:32:00Z' },
      { id: 'AST-H03', name: 'EHR System', type: 'Clinical', compliant: true, lastChecked: '2026-04-16T09:32:00Z' },
      { id: 'AST-H04', name: 'Clinical Data Warehouse', type: 'Data Store', compliant: true, lastChecked: '2026-04-16T09:32:00Z' },
    ],
    remediationStatus: [
      { id: 'REM-H01', description: 'Enroll clinical staff in FIDO2 (priority)', status: 'in_progress', assignedTo: 'Local IT' },
      { id: 'REM-H02', description: 'Restrict Patient Portal OAuth scope', status: 'complete', assignedTo: 'AppSec Team' },
      { id: 'REM-H03', description: 'Deploy Conditional Access for clinical apps', status: 'complete', assignedTo: 'Cloud Security' },
    ],
  },
];
