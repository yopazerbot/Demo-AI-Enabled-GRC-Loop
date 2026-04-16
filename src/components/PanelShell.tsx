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
  isActive?: boolean;
  isDimmed?: boolean;
}

export function PanelShell({
  title,
  icon: Icon,
  children,
  accentColor = 'text-accent-cyan',
  className = '',
  badge,
  badgeColor = 'bg-surface-500 text-slate-300',
  isActive = false,
  isDimmed = false,
}: PanelShellProps) {
  return (
    <motion.div
      className={`panel flex flex-col overflow-hidden h-full transition-all duration-500 ${className}`}
      animate={{
        opacity: isDimmed ? 0.35 : 1,
        scale: isActive ? 1 : 1,
      }}
      initial={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        boxShadow: isActive
          ? '0 0 0 1px rgba(34, 211, 238, 0.5), 0 0 40px -5px rgba(34, 211, 238, 0.3)'
          : undefined,
        borderColor: isActive ? 'rgba(34, 211, 238, 0.5)' : undefined,
      }}
    >
      {/* Panel header */}
      <div className={`flex items-center gap-2 px-4 py-2.5 border-b border-surface-border transition-colors duration-500 ${
        isActive ? 'bg-accent-cyan/5' : 'bg-surface-800/50'
      }`}>
        <Icon className={`w-4 h-4 ${accentColor}`} />
        <h2 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
          {title}
        </h2>
        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse"
          />
        )}
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
