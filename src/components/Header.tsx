import { Shield, Building2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import type { DemoPhase } from '../types';

const phaseLabels: Record<DemoPhase, string> = {
  idle: 'Awaiting Threat Intelligence',
  new_event_received: 'New Event Received',
  threat_analysis_in_progress: 'Threat Analysis In Progress',
  risk_mapped: 'Risk Scenario Mapped',
  policy_generated: 'Policy Artifact Generated',
  awaiting_approval: 'Awaiting Governance Approval',
  deployment_in_progress: 'Deploying to Environment',
  deployment_complete: 'Control Loop Complete',
};

const phaseColors: Record<DemoPhase, string> = {
  idle: 'bg-surface-400',
  new_event_received: 'bg-accent-amber',
  threat_analysis_in_progress: 'bg-accent-blue',
  risk_mapped: 'bg-accent-indigo',
  policy_generated: 'bg-accent-purple',
  awaiting_approval: 'bg-accent-amber',
  deployment_in_progress: 'bg-accent-blue',
  deployment_complete: 'bg-accent-emerald',
};

const phaseBgColors: Record<DemoPhase, string> = {
  idle: 'bg-surface-600/50',
  new_event_received: 'bg-accent-amber/10 border-accent-amber/20',
  threat_analysis_in_progress: 'bg-accent-blue/10 border-accent-blue/20',
  risk_mapped: 'bg-accent-indigo/10 border-accent-indigo/20',
  policy_generated: 'bg-accent-purple/10 border-accent-purple/20',
  awaiting_approval: 'bg-accent-amber/10 border-accent-amber/20',
  deployment_in_progress: 'bg-accent-blue/10 border-accent-blue/20',
  deployment_complete: 'bg-accent-emerald/10 border-accent-emerald/20',
};

const phaseTextColors: Record<DemoPhase, string> = {
  idle: 'text-slate-400',
  new_event_received: 'text-accent-amber',
  threat_analysis_in_progress: 'text-accent-blue',
  risk_mapped: 'text-accent-indigo',
  policy_generated: 'text-accent-purple',
  awaiting_approval: 'text-accent-amber',
  deployment_in_progress: 'text-accent-blue',
  deployment_complete: 'text-accent-emerald',
};

interface HeaderProps {
  phase: DemoPhase;
}

export function Header({ phase }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-2.5 border-b border-surface-border bg-surface-800/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20">
          <Shield className="w-4 h-4 text-accent-cyan" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-white tracking-tight leading-none flex items-center gap-2">
            GRC Control Loop
            <span className="text-[9px] font-medium text-slate-500 bg-surface-600 px-1.5 py-0.5 rounded">
              DEMO
            </span>
          </h1>
          <p className="text-[11px] text-slate-500 mt-0.5">
            AI-Driven Cyber Risk — Governance Engineering
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Powered by */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-700/50 border border-surface-border">
          <Zap className="w-3 h-3 text-accent-amber" />
          <span className="text-[10px] text-slate-400">Powered by</span>
          <span className="text-[10px] text-slate-300 font-semibold">AI Orchestration</span>
        </div>

        {/* Org */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-surface-700/50 border border-surface-border">
          <Building2 className="w-3 h-3 text-slate-400" />
          <span className="text-[10px] text-slate-300 font-medium">Northstar Group</span>
          <span className="text-[10px] text-slate-500">+1 entity</span>
        </div>

        {/* Phase status */}
        <motion.div
          key={phase}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${phaseBgColors[phase]}`}
        >
          <div className={`w-2 h-2 rounded-full ${phaseColors[phase]} ${
            phase !== 'idle' && phase !== 'deployment_complete' ? 'animate-pulse' : ''
          }`} />
          <span className={`text-[10px] font-semibold ${phaseTextColors[phase]}`}>
            {phaseLabels[phase]}
          </span>
        </motion.div>
      </div>
    </header>
  );
}
