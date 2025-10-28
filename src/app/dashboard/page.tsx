'use client';

import { Plus, Sparkles, TrendingUp, Clock, Coffee, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EventCard } from '@/components/event-card';
import { TimeBlock } from '@/components/time-block';
import { MetricCard } from '@/components/metric-card';
import {
  getTodaysEvents,
  getTodayTimeAllocation,
  getWeekProductivity,
  mockAISuggestions,
} from '@/lib/mock-data';

export default function DashboardPage() {
  const todayEvents = getTodaysEvents();
  const timeAllocation = getTodayTimeAllocation();
  const weekEfficiency = getWeekProductivity();

  const upcomingEvents = todayEvents
    .filter(event => event.startTime > new Date())
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
    .slice(0, 3);

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Good morning, John</h1>
          <p className="text-muted-foreground">
            Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <Button size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          New Event
        </Button>
      </div>

      {/* Productivity Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Week Efficiency"
          value={`${weekEfficiency}%`}
          subtitle="Average productivity score"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
        <MetricCard
          title="Focus Time Today"
          value={`${timeAllocation.focus.toFixed(1)}h`}
          subtitle="Deep work sessions"
          icon={Target}
        />
        <MetricCard
          title="Meetings Today"
          value={`${timeAllocation.meetings.toFixed(1)}h`}
          subtitle={`${todayEvents.filter(e => e.type === 'meeting').length} scheduled`}
          icon={Clock}
        />
      </div>

      {/* AI Suggestions */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">AI Suggestions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockAISuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="p-4 bg-accent/50 border border-accent-foreground/20 rounded-lg space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-sm mb-1">{suggestion.title}</h3>
                  <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                {suggestion.action}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Today's Schedule</h2>
            <span className="text-sm text-muted-foreground">
              {todayEvents.length} event{todayEvents.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="space-y-3">
            {todayEvents.length > 0 ? (
              todayEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  variant="compact"
                />
              ))
            ) : (
              <div className="p-8 text-center bg-card border border-dashed border-border rounded-lg">
                <Coffee className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-medium mb-1">No events today</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Enjoy your free day or add new events
                </p>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Today's Time</h2>

          <div className="space-y-3">
            <TimeBlock
              title="Focus Time"
              hours={timeAllocation.focus}
              color="hsl(262, 83%, 58%)"
              icon={<Target className="h-4 w-4 text-purple-600" />}
            />
            <TimeBlock
              title="Meetings"
              hours={timeAllocation.meetings}
              color="hsl(217, 91%, 60%)"
              icon={<Clock className="h-4 w-4 text-blue-600" />}
            />
            <TimeBlock
              title="Breaks"
              hours={timeAllocation.breaks}
              color="hsl(142, 71%, 45%)"
              icon={<Coffee className="h-4 w-4 text-green-600" />}
            />
          </div>

          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div className="mt-6 space-y-3">
              <h3 className="text-lg font-semibold">Up Next</h3>
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: event.color }}
                    />
                    <span className="text-sm font-medium">{event.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {event.startTime.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
