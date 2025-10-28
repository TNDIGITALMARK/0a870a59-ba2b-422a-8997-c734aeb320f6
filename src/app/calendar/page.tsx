'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EventCard } from '@/components/event-card';
import { mockEvents, CalendarEvent } from '@/lib/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'week' | 'month'>('week');

  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getWeekDays = () => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay()); // Start from Sunday

    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      return day;
    });
  };

  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty slots for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getEventsForDay = (day: Date) => {
    return mockEvents.filter(
      (event) => event.startTime.toDateString() === day.toDateString()
    );
  };

  const weekDays = getWeekDays();
  const monthDays = getMonthDays();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">Calendar</h1>
            <Button variant="outline" onClick={goToToday}>
              Today
            </Button>
          </div>

          <Button size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            New Event
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={goToPrevious}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-semibold min-w-[200px] text-center">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <Button variant="ghost" size="icon" onClick={goToNext}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <Tabs value={view} onValueChange={(v) => setView(v as 'week' | 'month')}>
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-auto p-6">
        {view === 'week' ? (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Week Header */}
            <div className="grid grid-cols-8 border-b border-border">
              <div className="p-4 bg-muted/50 border-r border-border">
                <span className="text-sm text-muted-foreground">Time</span>
              </div>
              {weekDays.map((day, i) => {
                const isToday = day.toDateString() === new Date().toDateString();
                return (
                  <div
                    key={i}
                    className="p-4 text-center border-r border-border last:border-r-0"
                  >
                    <div className="text-sm text-muted-foreground">{dayNames[i]}</div>
                    <div
                      className={`text-xl font-semibold mt-1 ${
                        isToday ? 'text-primary' : ''
                      }`}
                    >
                      {day.getDate()}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Time Grid */}
            <div className="grid grid-cols-8">
              {hours.map((hour) => (
                <div key={hour} className="contents">
                  <div className="p-2 text-right text-sm text-muted-foreground bg-muted/50 border-r border-b border-border">
                    {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                  </div>
                  {weekDays.map((day, dayIndex) => {
                    const events = getEventsForDay(day).filter((e) => e.startTime.getHours() === hour);
                    return (
                      <div
                        key={`${hour}-${dayIndex}`}
                        className="time-slot min-h-[80px] p-2 border-r border-b border-border last:border-r-0 relative"
                      >
                        {events.map((event) => (
                          <div
                            key={event.id}
                            className="absolute inset-x-2 p-2 rounded text-xs font-medium cursor-pointer hover:opacity-90 transition-opacity"
                            style={{
                              backgroundColor: event.color,
                              color: 'white',
                              top: '8px',
                              height: `${((event.endTime.getTime() - event.startTime.getTime()) / (1000 * 60 * 60)) * 80}px`,
                            }}
                          >
                            <div className="font-semibold">{event.title}</div>
                            <div className="text-[10px] opacity-90">
                              {event.startTime.toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true,
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Month Header */}
            <div className="grid grid-cols-7 border-b border-border">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="p-4 text-center font-semibold bg-muted/50 border-r border-border last:border-r-0"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Month Grid */}
            <div className="grid grid-cols-7">
              {monthDays.map((day, index) => {
                const isToday = day && day.toDateString() === new Date().toDateString();
                const events = day ? getEventsForDay(day) : [];

                return (
                  <div
                    key={index}
                    className="min-h-[120px] p-2 border-r border-b border-border last:border-r-0"
                  >
                    {day && (
                      <>
                        <div
                          className={`text-sm font-medium mb-2 ${
                            isToday ? 'text-primary font-bold' : ''
                          }`}
                        >
                          {day.getDate()}
                        </div>
                        <div className="space-y-1">
                          {events.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className="text-xs p-1 rounded truncate cursor-pointer hover:opacity-90"
                              style={{
                                backgroundColor: event.color,
                                color: 'white',
                              }}
                            >
                              {event.title}
                            </div>
                          ))}
                          {events.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{events.length - 2} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
