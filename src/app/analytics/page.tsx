'use client';

import {
  TrendingUp,
  Clock,
  Target,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { MetricCard } from '@/components/metric-card';
import {
  mockProductivityData,
  weeklyMeetingDistribution,
  focusTimeTrends,
  timeAllocation,
  scheduleOptimizationScore,
} from '@/lib/mock-data';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['hsl(262, 83%, 58%)', 'hsl(217, 91%, 60%)', 'hsl(142, 71%, 45%)', 'hsl(25, 95%, 53%)'];

export default function AnalyticsPage() {
  // Calculate weekly averages
  const weeklyAvg = mockProductivityData.reduce(
    (acc, day) => ({
      focus: acc.focus + day.focusHours,
      meeting: acc.meeting + day.meetingHours,
      efficiency: acc.efficiency + day.efficiency,
    }),
    { focus: 0, meeting: 0, efficiency: 0 }
  );

  const avgFocus = (weeklyAvg.focus / mockProductivityData.length).toFixed(1);
  const avgMeeting = (weeklyAvg.meeting / mockProductivityData.length).toFixed(1);
  const avgEfficiency = Math.round(weeklyAvg.efficiency / mockProductivityData.length);

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Productivity insights and scheduling optimization
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Avg. Focus Time"
          value={`${avgFocus}h`}
          subtitle="Per day this week"
          icon={Target}
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard
          title="Avg. Meeting Time"
          value={`${avgMeeting}h`}
          subtitle="Per day this week"
          icon={Clock}
        />
        <MetricCard
          title="Productivity Score"
          value={`${avgEfficiency}%`}
          subtitle="Weekly average"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
        <MetricCard
          title="Total Events"
          value="26"
          subtitle="Scheduled this week"
          icon={Calendar}
        />
      </div>

      {/* Schedule Optimization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 bg-card border border-border rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Weekly Productivity Trend</h2>
            <span className="text-sm text-muted-foreground">Last 7 days</span>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockProductivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) =>
                  new Date(date).toLocaleDateString('en-US', { weekday: 'short' })
                }
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="focusHours"
                stroke="hsl(262, 83%, 58%)"
                strokeWidth={2}
                name="Focus Hours"
              />
              <Line
                type="monotone"
                dataKey="meetingHours"
                stroke="hsl(217, 91%, 60%)"
                strokeWidth={2}
                name="Meeting Hours"
              />
              <Line
                type="monotone"
                dataKey="efficiency"
                stroke="hsl(142, 71%, 45%)"
                strokeWidth={2}
                name="Efficiency %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 bg-card border border-border rounded-lg space-y-4">
          <h2 className="text-xl font-semibold">Optimization Score</h2>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Current</span>
                <span className="text-2xl font-bold text-primary">
                  {scheduleOptimizationScore.current}%
                </span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${scheduleOptimizationScore.current}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Potential</span>
                <span className="text-2xl font-bold text-success">
                  {scheduleOptimizationScore.potential}%
                </span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-success rounded-full transition-all"
                  style={{ width: `${scheduleOptimizationScore.potential}%` }}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-primary" />
                Improvement Areas
              </h3>
              <ul className="space-y-2">
                {scheduleOptimizationScore.improvements.map((improvement, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Meeting Distribution & Focus Time */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-card border border-border rounded-lg space-y-4">
          <h2 className="text-xl font-semibold">Weekly Meeting Distribution</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyMeetingDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="meetings" fill="hsl(217, 91%, 60%)" name="Meetings" />
              <Bar dataKey="hours" fill="hsl(262, 83%, 58%)" name="Hours" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 bg-card border border-border rounded-lg space-y-4">
          <h2 className="text-xl font-semibold">Peak Productivity Hours</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={focusTimeTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="productivity"
                stroke="hsl(142, 71%, 45%)"
                strokeWidth={3}
                name="Productivity %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Time Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-card border border-border rounded-lg space-y-4">
          <h2 className="text-xl font-semibold">Time Allocation</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={timeAllocation}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percentage }) => `${category}: ${percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="hours"
              >
                {timeAllocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 bg-card border border-border rounded-lg space-y-4">
          <h2 className="text-xl font-semibold">Time Breakdown</h2>

          <div className="space-y-4 pt-4">
            {timeAllocation.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-medium">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{item.hours}h</div>
                    <div className="text-sm text-muted-foreground">{item.percentage}%</div>
                  </div>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
