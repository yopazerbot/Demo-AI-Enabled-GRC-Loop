import type { DemoPhase } from '../types';

export type PanelId = 'threat' | 'agents' | 'analysis' | 'policy' | 'approval' | 'environment' | 'executive';

// Which panels are spotlit per phase.
// At risk_mapped: Risk Mapping + Board Summary (risk lands at board level).
// At awaiting_approval: Approval + Environment (decision maker sees what will change).
// At deployment_complete: Environment + Board (target state + business impact).
const ACTIVE_PANEL_BY_PHASE: Record<DemoPhase, PanelId[]> = {
  idle: ['threat'],
  new_event_received: ['threat'],
  threat_analysis_in_progress: ['agents'],
  risk_mapped: ['analysis', 'executive'],
  policy_generated: ['policy'],
  awaiting_approval: ['approval', 'environment'],
  deployment_in_progress: ['environment'],
  environment_updated: ['environment'],
  deployment_complete: ['executive'],
};

// Which panels are visible at full opacity (reached) but not highlighted.
const REACHED_PANELS_BY_PHASE: Record<DemoPhase, PanelId[]> = {
  idle: [],
  new_event_received: [],
  threat_analysis_in_progress: ['threat'],
  risk_mapped: ['threat', 'agents'],
  policy_generated: ['threat', 'agents', 'analysis', 'executive'],
  awaiting_approval: ['threat', 'agents', 'analysis', 'policy', 'executive'],
  deployment_in_progress: ['threat', 'agents', 'analysis', 'policy', 'approval', 'executive'],
  environment_updated: ['threat', 'agents', 'analysis', 'policy', 'approval', 'executive'],
  deployment_complete: ['threat', 'agents', 'analysis', 'policy', 'approval', 'environment'],
};

export function getPanelState(phase: DemoPhase, panelId: PanelId): { isActive: boolean; isDimmed: boolean } {
  const activePanels = ACTIVE_PANEL_BY_PHASE[phase];
  const reachedPanels = REACHED_PANELS_BY_PHASE[phase];
  const isActive = activePanels.includes(panelId);
  const isReached = reachedPanels.includes(panelId);
  const isDimmed = !isActive && !isReached;
  return { isActive, isDimmed };
}
