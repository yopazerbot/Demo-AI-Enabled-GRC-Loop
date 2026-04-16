import { Header } from './components/Header';
import { PhaseControls } from './components/PhaseControls';
import { ThreatFeedPanel } from './components/ThreatFeedPanel';
import { AgentPanel } from './components/AgentPanel';
import { AnalysisPanel } from './components/AnalysisPanel';
import { PolicyPanel } from './components/PolicyPanel';
import { ApprovalPanel } from './components/ApprovalPanel';
import { EnvironmentPanel } from './components/EnvironmentPanel';
import { ExecutivePanel } from './components/ExecutivePanel';
import { useDemoStateMachine } from './hooks/useDemoStateMachine';

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

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top bar */}
      <Header phase={phase} />

      {/* Main grid */}
      <main className="flex-1 overflow-hidden grid grid-cols-12 grid-rows-[1fr_1fr_1fr] gap-3 p-3">
        {/* Row 1 */}
        <div className="col-span-4 row-span-1 min-h-0">
          <ThreatFeedPanel phase={phase} onTrigger={triggerScenario} />
        </div>
        <div className="col-span-4 row-span-1 min-h-0">
          <AgentPanel agents={agents} />
        </div>
        <div className="col-span-4 row-span-1 min-h-0">
          <AnalysisPanel phase={phase} />
        </div>

        {/* Row 2 */}
        <div className="col-span-6 row-span-1 min-h-0">
          <PolicyPanel phase={phase} />
        </div>
        <div className="col-span-6 row-span-1 min-h-0">
          <ApprovalPanel
            phase={phase}
            approvalStatus={approvalStatus}
            onApprove={approve}
            onReject={reject}
          />
        </div>

        {/* Row 3 */}
        <div className="col-span-6 row-span-1 min-h-0">
          <EnvironmentPanel phase={phase} />
        </div>
        <div className="col-span-6 row-span-1 min-h-0">
          <ExecutivePanel phase={phase} />
        </div>
      </main>

      {/* Bottom phase controls */}
      <PhaseControls
        phase={phase}
        onAdvance={advancePhase}
        onReset={resetDemo}
      />
    </div>
  );
}
