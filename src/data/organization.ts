import type { OrgEntity } from '../types';

export const organizations: OrgEntity[] = [
  {
    id: 'northstar-group',
    name: 'Northstar Group',
    type: 'parent',
    sector: 'Diversified Holdings',
    region: 'EMEA',
    employeeCount: 4200,
    criticalAssets: [
      'Azure AD Tenant (Group)',
      'SAP S/4HANA (Finance)',
      'Microsoft 365 (Group)',
      'Group Data Lake',
      'Corporate VPN Gateway',
    ],
    complianceScore: 78,
    riskExposure: 34,
  },
  {
    id: 'northstar-health',
    name: 'Northstar Health Services',
    type: 'subsidiary',
    parentId: 'northstar-group',
    sector: 'Healthcare Services',
    region: 'EMEA — Nordics',
    employeeCount: 1100,
    criticalAssets: [
      'Electronic Health Records (EHR)',
      'Patient Portal (OAuth-protected)',
      'Clinical Data Warehouse',
      'Azure AD (Subsidiary Tenant)',
      'Medical IoT Gateway',
    ],
    complianceScore: 71,
    riskExposure: 42,
  },
];

export const parentOrg = organizations.find((o) => o.type === 'parent')!;
export const subsidiaryOrg = organizations.find((o) => o.type === 'subsidiary')!;
