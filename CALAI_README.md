# CalAI Desktop Dashboard

A professional calendar management application with intelligent scheduling and productivity insights.

## Features Implemented

### 📊 **Main Dashboard** (`/dashboard`)
- Today's schedule overview with upcoming events
- Real-time productivity metrics (focus time, meetings, efficiency)
- AI-powered scheduling suggestions
- Time allocation breakdown by activity type
- Quick stats and upcoming events preview

### 📅 **Calendar View** (`/calendar`)
- Weekly and monthly calendar views
- Interactive time grid with hourly slots
- Color-coded events by type (meeting, focus, break, personal)
- Event hover states and visual feedback
- Navigation controls (previous/next week/month, today)
- Responsive grid layout

### 📈 **Analytics Dashboard** (`/analytics`)
- Weekly productivity trends with line charts
- Meeting distribution analysis with bar charts
- Peak productivity hours visualization
- Time allocation pie chart
- Schedule optimization score with improvement suggestions
- Interactive charts powered by Recharts

### ⚙️ **Settings** (`/settings`)
- Profile management
- Notification preferences
- Calendar configuration (working hours, week start day)
- Privacy and security settings

## Design System

### Typography
- **Font Family**: Inter (Primary & Headings), JetBrains Mono (Monospace)
- **Scale**: 12px to 36px with 8px grid system
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Color Palette
- **Primary**: Professional Blue (#4A90E2 / hsl(217, 91%, 60%))
- **Background**: Light Gray (#FAFAFA / hsl(0, 0%, 98%))
- **Success**: Green (hsl(142, 71%, 45%))
- **Warning**: Amber (hsl(38, 92%, 50%))
- **Error**: Red (hsl(0, 72%, 51%))

### Event Colors
- **Meetings**: Blue
- **Focus Time**: Purple
- **Breaks**: Green
- **Personal**: Orange

## Component Architecture

### Reusable Components
- **EventCard**: Displays event details with compact and full variants
- **TimeBlock**: Shows time allocation with visual indicators
- **MetricCard**: Productivity metrics with trend indicators
- **AppShell**: Main layout with sidebar navigation
- **EventDialog**: Modal for creating/editing events

### Mock Data Layer
- Comprehensive sample events and productivity data
- AI suggestion generators
- Helper functions for data filtering and aggregation
- Located in `/src/lib/mock-data.ts`

## Technical Stack

- **Framework**: Next.js 15.5.2 (App Router)
- **UI Library**: Radix UI + Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Theme**: next-themes (light/dark mode)
- **Forms**: React Hook Form + Zod validation

## Responsive Design

- **Desktop First**: Optimized for 1400px+ screens
- **Tablet**: Collapsible sidebar, adjusted grid layouts
- **Mobile**: Hamburger menu, stacked layouts, touch-optimized
- **Breakpoints**:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: 1024px+

## Key Features

### Professional UI
- Clean, modern interface with subtle shadows
- Smooth transitions and hover states
- Consistent spacing using 8px grid system
- Professional color palette with accessible contrast

### Intelligent Scheduling
- AI-powered scheduling suggestions
- Automatic time blocking recommendations
- Conflict detection visualization
- Productivity optimization tips

### Productivity Analytics
- Weekly efficiency tracking
- Meeting time analysis
- Focus time trends
- Peak productivity hour identification
- Time allocation breakdown

### User Experience
- Intuitive navigation with sidebar
- Quick action buttons throughout
- Visual feedback on interactions
- Loading states and error handling
- Keyboard shortcuts ready

## File Structure

```
src/
├── app/
│   ├── dashboard/          # Main dashboard
│   ├── calendar/           # Calendar view
│   ├── analytics/          # Analytics dashboard
│   ├── settings/           # Settings page
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles & design system
├── components/
│   ├── app-shell.tsx       # Main layout wrapper
│   ├── event-card.tsx      # Event display component
│   ├── time-block.tsx      # Time allocation component
│   ├── metric-card.tsx     # Metric display component
│   ├── event-dialog.tsx    # Event creation/edit modal
│   └── ui/                 # Radix UI components
└── lib/
    └── mock-data.ts        # Sample data and helpers
```

## Next Steps (Future Enhancements)

- Connect to real calendar APIs (Google Calendar, Outlook)
- Implement drag-and-drop event rescheduling
- Add real-time collaboration features
- Integrate actual AI scheduling algorithms
- Add data persistence with database
- Implement authentication system
- Add export functionality (iCal, CSV)
- Mobile companion app
- Advanced analytics and reporting

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:4006](http://localhost:4006) to view the application.

The app will redirect to `/dashboard` automatically.

---

Built with modern web technologies and professional design principles.
