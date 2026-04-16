import { Rss, AlertTriangle, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelShell } from './PanelShell';
import type { DemoPhase } from '../types';
import type { ScenarioData } from '../data/scenarioTypes';

interface Props {
  phase: DemoPhase;
  scenario: ScenarioData;
  onTrigger: () => void;
  isActive: boolean;
  isDimmed: boolean;
}

export function ThreatFeedPanel({ phase, scenario, onTrigger, isActive, isDimmed }: Props) {
  const hasEvent = phase !== 'idle';
  const t = scenario.threatSummary;
  const evt = scenario.threatEvent;

  return (
    <PanelShell
      title="Threat Intelligence"
      icon={Rss}
      accentColor="text-accent-red"
      isActive={isActive}
      isDimmed={isDimmed}
      badge={hasEvent ? 'NEW EVENT' : 'LIVE'}
      badgeColor={hasEvent ? 'bg-severity-critical/15 text-severity-critical' : 'bg-accent-emerald/15 text-accent-emerald'}
    >
      <AnimatePresence mode="wait">
        {!hasEvent ? (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full gap-4"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center"
            >
              <Rss className="w-8 h-8 text-accent-cyan" />
            </motion.div>
            <p className="text-sm text-slate-400 text-center">
              Monitoring threat intelligence feeds
            </p>
            <button
              onClick={onTrigger}
              className="flex items-center gap-2 px-6 py-3 bg-accent-cyan/15 hover:bg-accent-cyan/25 border border-accent-cyan/40 rounded-lg text-accent-cyan text-sm font-semibold transition-all cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.15)]"
            >
              <Play className="w-4 h-4 fill-current" />
              Start Demo
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={`event-${scenario.id}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex flex-col"
          >
            <motion.div
              animate={isActive ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
              className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-severity-critical/10 border border-severity-critical/30"
            >
              <AlertTriangle className="w-5 h-5 text-severity-critical" />
              <div className="flex-1">
                <p className="text-[10px] font-mono text-slate-400">{evt.id}</p>
                <p className="text-xs font-bold text-severity-critical uppercase tracking-wider">
                  Critical · TLP:{evt.tlp}
                </p>
              </div>
            </motion.div>

            <p className="text-base font-bold text-white leading-tight mb-3">
              {t.shortTitle}
            </p>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              {t.description}
            </p>

            <div className="space-y-2 mt-auto">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Vector</span>
                <span className="text-slate-300 font-medium">{t.vector}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Affects</span>
                <span className="text-accent-amber font-semibold">{t.affects}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Source</span>
                <span className="text-slate-300">{t.source}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PanelShell>
  );
}
