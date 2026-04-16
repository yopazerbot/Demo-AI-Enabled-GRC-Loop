import { Header } from './components/Header';
import { OrgContext } from './components/OrgContext';
import { FlowTimeline } from './components/FlowTimeline';
import { PhaseControls } from './components/PhaseControls';
import { ThreatFeedPanel } from './components/ThreatFeedPanel';
import { AgentPanel } from './components/AgentPanel';
import { AnalysisPanel } from './components/AnalysisPanel';
import { PolicyPanel } from './components/PolicyPanel';
import { ApprovalPanel } from './components/ApprovalPanel';
import { EnvironmentPanel } from './components/EnvironmentPanel';
import { ExecutivePanel } from './components/ExecutivePanel';
import { useDemoStateMachine } from './hooks/useDemoStateMachine';
import { getPanelState } from './hooks/usePanelState';

export default function App() {
  const {
    phase,
    agents,
    approvalStatus,
    triggerScenario,
    advancePhase,
    approve,
    reject,
    resetDemo,
  } = useDemoStateMachine();

  const threatState = getPanelState(phase, 'threat');
  const agentsState = getPanelState(phase, 'agents');
  const analysisState = getPanelState(phase, 'analysis');
  const policyState = getPanelState(phase, 'policy');
  const approvalState = getPanelState(phase, 'approval');
  const environmentState = getPanelState(phase, 'environment');
  const executiveState = getPanelState(phase, 'executive');

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header phase={phase} />
      <OrgContext phase={phase} />
      <FlowTimeline phase={phase} />

      {/* Main 2-row grid with 4 columns */}
      <main className="flex-1 overflow-hidden grid grid-cols-4 grid-rows-2 gap-3 p-3">
        {/* Row 1 */}
        <div className="min-h-0">
          <ThreatFeedPanel
            phase={phase}
            onTrigger={triggerScenario}
            isActive={threatState.isActive}
            isDimmed={threatState.isDimmed}
          />
        </div>
        <div className="min-h-0">
          <AgentPanel
            agents={agents}
            isActive={agentsState.isActive}
            isDimmed={agentsState.isDimmed}
          />
        </div>
        <div className="min-h-0">
          <AnalysisPanel
            phase={phase}
            isActive={analysisState.isActive}
            isDimmed={analysisState.isDimmed}
          />
        </div>
        <div className="min-h-0">
          <PolicyPanel
            phase={phase}
            isActive={policyState.isActive}
            isDimmed={policyState.isDimmed}
          />
        </div>

        {/* Row 2 */}
        <div className="min-h-0">
          <ApprovalPanel
            phase={phase}
            approvalStatus={approvalStatus}
            onApprove={approve}
            onReject={reject}
            isActive={approvalState.isActive}
            isDimmed={approvalState.isDimmed}
          />
        </div>
        <div className="col-span-2 min-h-0">
          <EnvironmentPanel
            phase={phase}
            isActive={environmentState.isActive}
            isDimmed={environmentState.isDimmed}
          />
        </div>
        <div className="min-h-0">
          <ExecutivePanel
            phase={phase}
            isActive={executiveState.isActive}
            isDimmed={executiveState.isDimmed}
          />
        </div>
      </main>

      <PhaseControls
        phase={phase}
        onAdvance={advancePhase}
        onReset={resetDemo}
      />
    </div>
  );
}
