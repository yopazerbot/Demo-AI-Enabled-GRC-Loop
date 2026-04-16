import { Shield, Sun, Moon } from 'lucide-react';
import type { DemoPhase } from '../types';
import type { Theme } from '../hooks/useTheme';

const phaseLabels: Record<DemoPhase, string> = {
  idle: 'Ready',
  new_event_received: 'Ingesting Threat',
  threat_analysis_in_progress: 'Analyzing',
  risk_mapped: 'Mapping Risk',
  policy_generated: 'Drafting Policy',
  awaiting_approval: 'Awaiting Approval',
  deployment_in_progress: 'Deploying',
  deployment_complete: 'Complete',
};

interface HeaderProps {
  phase: DemoPhase;
  theme: Theme;
  onToggleTheme: () => void;
}

export function Header({ phase, theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 py-3 border-b border-surface-border bg-surface-800/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20">
          <Shield className="w-5 h-5 text-accent-cyan" />
        </div>
        <div>
          <h1 className="text-base font-bold text-white tracking-tight leading-tight">
            AI-enabled GRC engineering to stay ahead of AI-enabled threats
          </h1>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {phaseLabels[phase]}
          </p>
        </div>
      </div>

      <button
        onClick={onToggleTheme}
        className="w-8 h-8 rounded-lg bg-surface-700 hover:bg-surface-600 border border-surface-border flex items-center justify-center transition-colors cursor-pointer"
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark'
          ? <Sun className="w-4 h-4 text-slate-400" />
          : <Moon className="w-4 h-4 text-slate-400" />
        }
      </button>
    </header>
  );
}
