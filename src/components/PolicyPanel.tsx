import { useState } from 'react';
import { FileCode, FileText, ArrowLeftRight, GitBranch, Building2, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelShell } from './PanelShell';
import { scenarioPolicy } from '../data/policy';
import type { DemoPhase, PolicyScope } from '../types';

const VISIBLE_PHASES: DemoPhase[] = [
  'policy_generated',
  'awaiting_approval',
  'deployment_in_progress',
  'deployment_complete',
];

const scopeConfig: Record<PolicyScope, { icon: typeof Globe; label: string; color: string }> = {
  group: { icon: Globe, label: 'Group-Wide', color: 'text-accent-indigo bg-accent-indigo/10 border-accent-indigo/25' },
  subsidiary: { icon: Building2, label: 'Subsidiary Only', color: 'text-accent-purple bg-accent-purple/10 border-accent-purple/25' },
  group_with_local_override: { icon: GitBranch, label: 'Group + Local Override', color: 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/25' },
};

function PolicyMarkdown({ text, isNew }: { text: string; isNew?: boolean }) {
  // Simple markdown-like rendering for the policy text
  const lines = text.split('\n');

  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-1" />;

        // Bold headings
        if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
          return (
            <p key={i} className="text-[11px] font-bold text-slate-200">
              {trimmed.replace(/\*\*/g, '')}
            </p>
          );
        }

        // Numbered items
        if (/^\d+\./.test(trimmed)) {
          return (
            <div key={i} className={`text-[10px] leading-relaxed pl-2 border-l-2 ${
              isNew ? 'border-accent-emerald/30 text-slate-300' : 'border-surface-border text-slate-400'
            }`}>
              {trimmed}
            </div>
          );
        }

        // Bold inline text
        if (trimmed.includes('**')) {
          const parts = trimmed.split(/(\*\*.*?\*\*)/g);
          return (
            <p key={i} className="text-[10px] text-slate-400 leading-relaxed">
              {parts.map((part, pi) =>
                part.startsWith('**') && part.endsWith('**')
                  ? <span key={pi} className="font-semibold text-slate-200">{part.replace(/\*\*/g, '')}</span>
                  : part
              )}
            </p>
          );
        }

        return (
          <p key={i} className="text-[10px] text-slate-400 leading-relaxed">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

function CodeBlock({ code, isNew }: { code: string; isNew?: boolean }) {
  return (
    <pre className={`text-[9px] leading-relaxed font-mono overflow-auto p-3 rounded-lg border ${
      isNew
        ? 'bg-accent-cyan/5 border-accent-cyan/15 text-accent-cyan/80'
        : 'bg-surface-900/50 border-surface-border text-slate-400'
    }`}>
      {code}
    </pre>
  );
}

type ViewMode = 'new' | 'previous' | 'diff';

interface Props {
  phase: DemoPhase;
}

export function PolicyPanel({ phase }: Props) {
  const active = VISIBLE_PHASES.includes(phase);
  const generating = phase === 'risk_mapped';
  const [viewMode, setViewMode] = useState<ViewMode>('new');
  const policy = scenarioPolicy;
  const scopeCfg = scopeConfig[policy.scope];
  const ScopeIcon = scopeCfg.icon;

  return (
    <PanelShell
      title="Policy Studio"
      icon={FileCode}
      accentColor="text-accent-purple"
      badge={active ? policy.policyId : generating ? 'GENERATING' : undefined}
      badgeColor={active ? 'bg-accent-purple/15 text-accent-purple' : 'bg-accent-blue/15 text-accent-blue'}
    >
      <AnimatePresence mode="wait">
        {generating && (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full gap-3"
          >
            <div className="w-8 h-8 border-2 border-accent-purple/30 border-t-accent-purple rounded-full animate-spin" />
            <p className="text-xs text-slate-400">Generating policy artifact and policy-as-code…</p>
          </motion.div>
        )}

        {active && (
          <motion.div
            key="policy"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-3 h-full overflow-auto"
          >
            {/* Policy header */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-semibold text-slate-200">{policy.title}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Effective: {policy.effectiveDate}</p>
              </div>
              <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[10px] font-medium shrink-0 ${scopeCfg.color}`}>
                <ScopeIcon className="w-3 h-3" />
                {scopeCfg.label}
              </div>
            </div>

            {/* Scope detail */}
            <div className="panel-inner p-2.5">
              <p className="text-[9px] uppercase tracking-wider text-slate-500 mb-1">Scope</p>
              <p className="text-[11px] text-accent-cyan font-medium">{policy.scopeLabel}</p>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{policy.rationale}</p>
            </div>

            {/* View mode toggle */}
            <div className="flex items-center gap-1 p-0.5 bg-surface-700 rounded-lg border border-surface-border self-start">
              {([['new', 'Updated', FileText], ['previous', 'Previous', FileText], ['diff', 'Compare', ArrowLeftRight]] as const).map(
                ([mode, label, Icon]) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode as ViewMode)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-medium transition-all cursor-pointer ${
                      viewMode === mode
                        ? 'bg-surface-500 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    {label}
                  </button>
                ),
              )}
            </div>

            {/* Side-by-side content */}
            <div className="flex-1 grid grid-cols-2 gap-3 min-h-0">
              {/* Human-readable column */}
              <div className="flex flex-col min-h-0">
                <p className="text-[9px] uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  Human-Readable Policy
                </p>
                <div className="flex-1 overflow-auto panel-inner p-3">
                  {viewMode === 'previous' ? (
                    <PolicyMarkdown text={policy.previousPolicy || ''} />
                  ) : viewMode === 'diff' ? (
                    <div className="space-y-3">
                      <div className="border-l-2 border-accent-red/40 pl-2 opacity-60">
                        <p className="text-[9px] text-accent-red font-bold mb-1">— Previous</p>
                        <PolicyMarkdown text={policy.previousPolicy || ''} />
                      </div>
                      <div className="border-l-2 border-accent-emerald/40 pl-2">
                        <p className="text-[9px] text-accent-emerald font-bold mb-1">+ Updated</p>
                        <PolicyMarkdown text={policy.humanReadable} isNew />
                      </div>
                    </div>
                  ) : (
                    <PolicyMarkdown text={policy.humanReadable} isNew />
                  )}
                </div>
              </div>

              {/* Policy-as-code column */}
              <div className="flex flex-col min-h-0">
                <p className="text-[9px] uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                  <FileCode className="w-3 h-3" />
                  Policy-as-Code (Azure Policy style)
                </p>
                <div className="flex-1 overflow-auto">
                  {viewMode === 'previous' ? (
                    <CodeBlock code={policy.previousPolicyAsCode || ''} />
                  ) : viewMode === 'diff' ? (
                    <div className="space-y-3">
                      <div className="opacity-60">
                        <p className="text-[9px] text-accent-red font-bold mb-1">— Previous</p>
                        <CodeBlock code={policy.previousPolicyAsCode || ''} />
                      </div>
                      <div>
                        <p className="text-[9px] text-accent-emerald font-bold mb-1">+ Updated</p>
                        <CodeBlock code={policy.policyAsCode} isNew />
                      </div>
                    </div>
                  ) : (
                    <CodeBlock code={policy.policyAsCode} isNew />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {!active && !generating && (
          <motion.div
            key="waiting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-full"
          >
            <p className="text-xs text-slate-500">
              Awaiting risk mapping completion
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </PanelShell>
  );
}
