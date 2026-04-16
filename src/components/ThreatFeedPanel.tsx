import { Rss, AlertTriangle, Clock, Tag, Building2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelShell } from './PanelShell';
import { primaryThreatEvent, backgroundEvents } from '../data/threats';
import { organizations } from '../data/organization';
import type { DemoPhase, ThreatEvent, Severity, TLP } from '../types';

const severityConfig: Record<Severity, { color: string; bg: string; label: string }> = {
  critical: { color: 'text-severity-critical', bg: 'bg-severity-critical/15 border-severity-critical/30', label: 'CRITICAL' },
  high: { color: 'text-severity-high', bg: 'bg-severity-high/15 border-severity-high/30', label: 'HIGH' },
  medium: { color: 'text-severity-medium', bg: 'bg-severity-medium/15 border-severity-medium/30', label: 'MEDIUM' },
  low: { color: 'text-severity-low', bg: 'bg-severity-low/15 border-severity-low/30', label: 'LOW' },
};

const tlpColors: Record<TLP, string> = {
  RED: 'bg-red-500/15 text-red-400 border-red-500/30',
  AMBER: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  GREEN: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  WHITE: 'bg-slate-400/15 text-slate-300 border-slate-400/30',
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

function entityName(id: string) {
  return organizations.find((o) => o.id === id)?.name ?? id;
}

function ThreatCard({
  event,
  isNew,
  isActive,
  onSelect,
}: {
  event: ThreatEvent;
  isNew?: boolean;
  isActive?: boolean;
  onSelect?: () => void;
}) {
  const sev = severityConfig[event.severity];

  return (
    <motion.div
      layout
      initial={isNew ? { opacity: 0, x: -20, scale: 0.97 } : { opacity: 1 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onClick={onSelect}
      className={`
        panel-inner p-3 transition-all duration-200
        ${isActive ? 'glow-border-active' : ''}
        ${onSelect ? 'cursor-pointer hover:border-accent-cyan/30' : ''}
      `}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <AlertTriangle className={`w-3.5 h-3.5 shrink-0 ${sev.color}`} />
          <span className="text-[10px] font-mono text-slate-500">{event.id}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${sev.bg} ${sev.color}`}>
            {sev.label}
          </span>
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${tlpColors[event.tlp]}`}>
            TLP:{event.tlp}
          </span>
        </div>
      </div>

      {/* Title */}
      <p className="text-xs font-semibold text-slate-200 leading-snug mb-1.5">
        {event.title}
      </p>

      {/* Description - truncated for compact view */}
      <p className="text-[11px] text-slate-400 leading-relaxed mb-2 line-clamp-2">
        {event.description}
      </p>

      {/* Threat vector */}
      <div className="flex items-center gap-1.5 mb-2">
        <ChevronRight className="w-3 h-3 text-slate-500" />
        <span className="text-[10px] text-slate-400 font-mono">{event.threatVector}</span>
      </div>

      {/* Meta row */}
      <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-500">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {formatTime(event.timestamp)}
        </span>
        <span className="flex items-center gap-1">
          Confidence: <span className="text-slate-300 font-medium">{event.confidence}</span>
        </span>
        <span className="flex items-center gap-1">
          Source: <span className="text-slate-300">{event.source}</span>
        </span>
      </div>

      {/* Affected entities */}
      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
        <Building2 className="w-3 h-3 text-slate-500" />
        {event.affectedEntities.map((eid) => (
          <span
            key={eid}
            className="text-[10px] px-1.5 py-0.5 rounded bg-surface-600 text-slate-300 border border-surface-border"
          >
            {entityName(eid)}
          </span>
        ))}
      </div>

      {/* Tags */}
      <div className="flex items-center gap-1 mt-2 flex-wrap">
        <Tag className="w-3 h-3 text-slate-500 shrink-0" />
        {event.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="text-[9px] px-1.5 py-0.5 rounded bg-accent-blue/8 text-accent-blue/70 border border-accent-blue/15"
          >
            {tag}
          </span>
        ))}
        {event.tags.length > 4 && (
          <span className="text-[9px] text-slate-500">+{event.tags.length - 4}</span>
        )}
      </div>
    </motion.div>
  );
}

interface Props {
  phase: DemoPhase;
  onTrigger: () => void;
}

export function ThreatFeedPanel({ phase, onTrigger }: Props) {
  const isActive = phase !== 'idle';

  return (
    <PanelShell
      title="Threat Intelligence Feed"
      icon={Rss}
      accentColor="text-accent-red"
      badge={phase === 'idle' ? 'LIVE' : 'EVENT ACTIVE'}
      badgeColor={phase === 'idle' ? 'bg-accent-emerald/15 text-accent-emerald' : 'bg-accent-red/15 text-accent-red'}
    >
      <div className="flex flex-col gap-2 h-full">
        <AnimatePresence mode="popLayout">
          {/* Primary event - shown after trigger */}
          {isActive && (
            <ThreatCard
              key="primary"
              event={primaryThreatEvent}
              isNew
              isActive
            />
          )}

          {/* Background events */}
          {backgroundEvents.map((evt) => (
            <ThreatCard key={evt.id} event={evt} />
          ))}
        </AnimatePresence>

        {/* Trigger button overlay when idle */}
        {!isActive && (
          <motion.div
            className="mt-auto pt-2 border-t border-surface-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={onTrigger}
              className="w-full py-2.5 bg-accent-cyan/10 hover:bg-accent-cyan/20 border border-accent-cyan/30 hover:border-accent-cyan/50 rounded-lg text-accent-cyan text-xs font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Simulate Incoming Threat Event
            </button>
          </motion.div>
        )}
      </div>
    </PanelShell>
  );
}
