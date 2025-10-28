// Mock data for CalAI Desktop Dashboard

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  type: 'meeting' | 'focus' | 'break' | 'personal';
  color: string;
  location?: string;
  attendees?: string[];
}

export interface ProductivityMetric {
  date: string;
  focusHours: number;
  meetingHours: number;
  breakHours: number;
  efficiency: number;
}

export interface AISuggestion {
  id: string;
  type: 'schedule' | 'optimize' | 'block';
  title: string;
  description: string;
  action: string;
}

// Sample calendar events
export const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Morning Team Standup',
    description: 'Daily sync with the development team',
    startTime: new Date(2025, 9, 28, 9, 0),
    endTime: new Date(2025, 9, 28, 9, 30),
    type: 'meeting',
    color: 'hsl(217, 91%, 60%)',
    location: 'Zoom',
    attendees: ['alice@company.com', 'bob@company.com'],
  },
  {
    id: '2',
    title: 'Client Presentation',
    description: 'Q4 roadmap presentation for Acme Corp',
    startTime: new Date(2025, 9, 28, 14, 0),
    endTime: new Date(2025, 9, 28, 15, 30),
    type: 'meeting',
    color: 'hsl(217, 91%, 60%)',
    location: 'Conference Room A',
    attendees: ['client@acme.com', 'manager@company.com'],
  },
  {
    id: '3',
    title: 'Focus Time - Development',
    description: 'Deep work session for feature implementation',
    startTime: new Date(2025, 9, 28, 15, 0),
    endTime: new Date(2025, 9, 28, 17, 0),
    type: 'focus',
    color: 'hsl(262, 83%, 58%)',
  },
  {
    id: '4',
    title: 'Lunch Break',
    description: 'Take a break and recharge',
    startTime: new Date(2025, 9, 28, 12, 0),
    endTime: new Date(2025, 9, 28, 13, 0),
    type: 'break',
    color: 'hsl(142, 71%, 45%)',
  },
  {
    id: '5',
    title: 'Code Review Session',
    description: 'Review pending pull requests',
    startTime: new Date(2025, 9, 28, 10, 0),
    endTime: new Date(2025, 9, 28, 11, 0),
    type: 'meeting',
    color: 'hsl(217, 91%, 60%)',
  },
  {
    id: '6',
    title: 'Gym Workout',
    description: 'Personal fitness time',
    startTime: new Date(2025, 9, 28, 18, 0),
    endTime: new Date(2025, 9, 28, 19, 0),
    type: 'personal',
    color: 'hsl(25, 95%, 53%)',
  },
];

// Sample productivity metrics
export const mockProductivityData: ProductivityMetric[] = [
  {
    date: '2025-10-21',
    focusHours: 5.5,
    meetingHours: 2.5,
    breakHours: 1,
    efficiency: 82,
  },
  {
    date: '2025-10-22',
    focusHours: 6,
    meetingHours: 2,
    breakHours: 1,
    efficiency: 88,
  },
  {
    date: '2025-10-23',
    focusHours: 4.5,
    meetingHours: 3.5,
    breakHours: 1,
    efficiency: 75,
  },
  {
    date: '2025-10-24',
    focusHours: 7,
    meetingHours: 1.5,
    breakHours: 1,
    efficiency: 92,
  },
  {
    date: '2025-10-25',
    focusHours: 5,
    meetingHours: 3,
    breakHours: 1,
    efficiency: 80,
  },
  {
    date: '2025-10-28',
    focusHours: 6,
    meetingHours: 2,
    breakHours: 1,
    efficiency: 85,
  },
];

// AI scheduling suggestions
export const mockAISuggestions: AISuggestion[] = [
  {
    id: '1',
    type: 'optimize',
    title: 'Optimize Meeting Schedule',
    description: 'Move client presentation to optimize focus time',
    action: 'Suggest moving to 11:00 AM',
  },
  {
    id: '2',
    type: 'block',
    title: 'Block Focus Time',
    description: 'Your productivity peaks between 10 AM and 2 PM',
    action: 'Block calendar for deep work',
  },
  {
    id: '3',
    type: 'schedule',
    title: 'Schedule Break',
    description: 'You have 4 consecutive hours of meetings',
    action: 'Add 15-minute break',
  },
];

// Weekly meeting distribution (for analytics)
export const weeklyMeetingDistribution = [
  { day: 'Monday', meetings: 8, hours: 4.0 },
  { day: 'Tuesday', meetings: 5, hours: 2.5 },
  { day: 'Wednesday', meetings: 6, hours: 3.0 },
  { day: 'Thursday', meetings: 4, hours: 2.0 },
  { day: 'Friday', meetings: 3, hours: 1.5 },
];

// Focus time trends (for analytics)
export const focusTimeTrends = [
  { hour: '8 AM', productivity: 65 },
  { hour: '9 AM', productivity: 75 },
  { hour: '10 AM', productivity: 90 },
  { hour: '11 AM', productivity: 95 },
  { hour: '12 PM', productivity: 70 },
  { hour: '1 PM', productivity: 60 },
  { hour: '2 PM', productivity: 85 },
  { hour: '3 PM', productivity: 80 },
  { hour: '4 PM', productivity: 70 },
  { hour: '5 PM', productivity: 55 },
];

// Time allocation (for analytics)
export const timeAllocation = [
  { category: 'Focused Work', hours: 6, percentage: 60 },
  { category: 'Meetings', hours: 2, percentage: 20 },
  { category: 'Breaks', hours: 1, percentage: 10 },
  { category: 'Email & Admin', hours: 1, percentage: 10 },
];

// Schedule optimization score
export const scheduleOptimizationScore = {
  current: 78,
  potential: 92,
  improvements: [
    'Reduce meeting time by 30 minutes',
    'Add 2 focus blocks during peak hours',
    'Schedule breaks between long meetings',
  ],
};

// Helper function to get today's events
export function getTodaysEvents(): CalendarEvent[] {
  const today = new Date();
  return mockEvents.filter(event => {
    return event.startTime.toDateString() === today.toDateString();
  });
}

// Helper function to get this week's productivity
export function getWeekProductivity(): number {
  const weekData = mockProductivityData.slice(-7);
  const avgEfficiency = weekData.reduce((sum, day) => sum + day.efficiency, 0) / weekData.length;
  return Math.round(avgEfficiency);
}

// Helper function to get total hours by type today
export function getTodayTimeAllocation() {
  const todayEvents = getTodaysEvents();

  const allocation = {
    focus: 0,
    meetings: 0,
    breaks: 0,
  };

  todayEvents.forEach(event => {
    const hours = (event.endTime.getTime() - event.startTime.getTime()) / (1000 * 60 * 60);

    if (event.type === 'focus') allocation.focus += hours;
    else if (event.type === 'meeting') allocation.meetings += hours;
    else if (event.type === 'break') allocation.breaks += hours;
  });

  return allocation;
}
