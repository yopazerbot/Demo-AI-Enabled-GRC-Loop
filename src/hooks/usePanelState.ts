import type { DemoPhase } from '../types';

export type PanelId = 'threat' | 'agents' | 'analysis' | 'policy' | 'approval' | 'environment' | 'executive';

// Which panels are spotlit per phase. At risk_mapped we spotlight BOTH the
// risk mapping panel AND the board summary, so the audience sees how the
// risk mapping lands at board level — before moving on to policy design.
const ACTIVE_PANEL_BY_PHASE: Record<DemoPhase, PanelId[]> = {
  idle: ['threat'],
  new_event_received: ['threat'],
  threat_analysis_in_progress: ['agents'],
  risk_mapped: ['analysis', 'executive'],
  policy_generated: ['policy'],
  awaiting_approval: ['approval'],
  deployment_in_progress: ['environment'],
  deployment_complete: ['executive'],
};

// Which panels have been "reached" (full opacity but not highlighted).
// Executive first becomes visible at risk_mapped.
const REACHED_PANELS_BY_PHASE: Record<DemoPhase, PanelId[]> = {
  idle: [],
  new_event_received: [],
  threat_analysis_in_progress: ['threat'],
  risk_mapped: ['threat', 'agents'],
  policy_generated: ['threat', 'agents', 'analysis', 'executive'],
  awaiting_approval: ['threat', 'agents', 'analysis', 'policy', 'executive'],
  deployment_in_progress: ['threat', 'agents', 'analysis', 'policy', 'approval', 'executive'],
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
