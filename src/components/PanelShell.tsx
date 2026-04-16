import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface PanelShellProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  accentColor?: string;
  className?: string;
  badge?: string;
  badgeColor?: string;
}

export function PanelShell({
  title,
  icon: Icon,
  children,
  accentColor = 'text-accent-cyan',
  className = '',
  badge,
  badgeColor = 'bg-surface-500 text-slate-300',
}: PanelShellProps) {
  return (
    <motion.div
      className={`panel flex flex-col overflow-hidden h-full ${className}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Panel header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-surface-border bg-surface-800/50">
        <Icon className={`w-4 h-4 ${accentColor}`} />
        <h2 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
          {title}
        </h2>
        {badge && (
          <span className={`ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>

      {/* Panel content */}
      <div className="flex-1 overflow-auto p-4">
        {children}
      </div>
    </motion.div>
  );
}
