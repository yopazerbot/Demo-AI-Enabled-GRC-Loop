import type { AgentState } from '../types';

export const initialAgents: AgentState[] = [
  {
    id: 'threat-intake',
    name: 'Threat Intake Agent',
    role: 'Analyzes raw threat intelligence events and produces structured, business-readable threat interpretations.',
    status: 'idle',
    description: 'Ingests MISP events and translates technical indicators into business-context threat narratives.',
  },
  {
    id: 'risk-mapping',
    name: 'Risk Mapping Agent',
    role: 'Maps interpreted threats to organizational risk scenarios and ISO/IEC 27001 control themes.',
    status: 'idle',
    description: 'Correlates threat data with entity-specific risk profiles and identifies relevant governance controls.',
  },
  {
    id: 'control-engineering',
    name: 'Control Engineering Agent',
    role: 'Generates human-readable policies and policy-as-code artifacts from risk assessments.',
    status: 'idle',
    description: 'Produces enforceable policy updates and machine-readable policy definitions for automated deployment.',
  },
];
