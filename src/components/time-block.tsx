'use client';

import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimeBlockProps {
  title: string;
  hours: number;
  color?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function TimeBlock({ title, hours, color, icon, className }: TimeBlockProps) {
  const formatHours = (h: number) => {
    const wholeHours = Math.floor(h);
    const minutes = Math.round((h - wholeHours) * 60);

    if (minutes === 0) return `${wholeHours}h`;
    return `${wholeHours}h ${minutes}m`;
  };

  return (
    <div className={cn("p-4 bg-card border border-border rounded-lg space-y-2", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon || <Clock className="h-4 w-4 text-muted-foreground" />}
          <span className="text-sm text-muted-foreground">{title}</span>
        </div>
        {color && (
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
        )}
      </div>
      <div className="text-2xl font-semibold">{formatHours(hours)}</div>
    </div>
  );
}
