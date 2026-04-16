import type { ExecutiveMetrics } from '../types';

export const initialExecutiveMetrics: ExecutiveMetrics[] = [
  {
    entityId: 'northstar-group',
    entityName: 'Northstar Group',
    overallRiskScore: 34,
    compliancePosture: 78,
    openFindings: 12,
    controlCoverage: 74,
    exposureTrend: [28, 30, 29, 32, 33, 34],
    complianceTrend: [82, 81, 80, 79, 78, 78],
  },
  {
    entityId: 'northstar-health',
    entityName: 'Northstar Health Services',
    overallRiskScore: 42,
    compliancePosture: 71,
    openFindings: 8,
    controlCoverage: 68,
    exposureTrend: [35, 36, 38, 39, 41, 42],
    complianceTrend: [76, 75, 74, 73, 72, 71],
  },
];

export const postApprovalExecutiveMetrics: ExecutiveMetrics[] = [
  {
    entityId: 'northstar-group',
    entityName: 'Northstar Group',
    overallRiskScore: 18,
    compliancePosture: 89,
    openFindings: 5,
    controlCoverage: 88,
    exposureTrend: [30, 32, 33, 34, 26, 18],
    complianceTrend: [81, 80, 79, 78, 84, 89],
  },
  {
    entityId: 'northstar-health',
    entityName: 'Northstar Health Services',
    overallRiskScore: 22,
    compliancePosture: 86,
    openFindings: 3,
    controlCoverage: 84,
    exposureTrend: [36, 38, 39, 42, 32, 22],
    complianceTrend: [75, 74, 73, 71, 79, 86],
  },
];
