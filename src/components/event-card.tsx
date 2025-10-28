'use client';

import { Calendar, Clock, MapPin, Users, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { CalendarEvent } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface EventCardProps {
  event: CalendarEvent;
  variant?: 'default' | 'compact';
  onEdit?: (event: CalendarEvent) => void;
  onDelete?: (event: CalendarEvent) => void;
}

const eventTypeLabels = {
  meeting: 'Meeting',
  focus: 'Focus Time',
  break: 'Break',
  personal: 'Personal',
};

export function EventCard({ event, variant = 'default', onEdit, onDelete }: EventCardProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const getDuration = () => {
    const minutes = (event.endTime.getTime() - event.startTime.getTime()) / (1000 * 60);
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);

    if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
    if (hours > 0) return `${hours}h`;
    return `${mins}m`;
  };

  if (variant === 'compact') {
    return (
      <div className="event-card flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
        <div
          className="w-1 h-12 rounded-full"
          style={{ backgroundColor: event.color }}
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate">{event.title}</h4>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <Clock className="h-3 w-3" />
            <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
            <span className="text-xs px-1.5 py-0.5 bg-muted rounded">
              {eventTypeLabels[event.type]}
            </span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit?.(event)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete?.(event)} className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="event-card bg-card border border-border rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: event.color }}
            />
            <span className="text-xs font-medium px-2 py-0.5 bg-muted rounded">
              {eventTypeLabels[event.type]}
            </span>
          </div>
          <h3 className="font-semibold text-lg">{event.title}</h3>
          {event.description && (
            <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit?.(event)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Event
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete?.(event)} className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Event
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
          <span className="text-xs px-2 py-0.5 bg-muted rounded">{getDuration()}</span>
        </div>

        {event.location && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
        )}

        {event.attendees && event.attendees.length > 0 && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{event.attendees.length} attendee{event.attendees.length > 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
    </div>
  );
}
