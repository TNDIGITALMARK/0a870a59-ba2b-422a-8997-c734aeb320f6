'use client';

import { Settings as SettingsIcon, User, Bell, Calendar, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Settings */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Profile</h2>
        </div>

        <div className="space-y-4 p-6 bg-card border border-border rounded-lg">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue="John Smith" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john.smith@company.com" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" defaultValue="Professional" />
          </div>

          <Button>Save Changes</Button>
        </div>
      </div>

      <Separator />

      {/* Notification Settings */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Notifications</h2>
        </div>

        <div className="space-y-4 p-6 bg-card border border-border rounded-lg">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email reminders for upcoming events
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Desktop Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Show browser notifications for events
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>AI Suggestions</Label>
              <p className="text-sm text-muted-foreground">
                Get smart scheduling recommendations
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      <Separator />

      {/* Calendar Settings */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Calendar Preferences</h2>
        </div>

        <div className="space-y-4 p-6 bg-card border border-border rounded-lg">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Week Starts On</Label>
              <p className="text-sm text-muted-foreground">
                Choose your preferred first day of the week
              </p>
            </div>
            <select className="px-3 py-2 bg-background border border-input rounded-md">
              <option>Sunday</option>
              <option>Monday</option>
            </select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Default Event Duration</Label>
              <p className="text-sm text-muted-foreground">
                Default length for new events
              </p>
            </div>
            <select className="px-3 py-2 bg-background border border-input rounded-md">
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>2 hours</option>
            </select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Working Hours</Label>
              <p className="text-sm text-muted-foreground">
                Set your typical working schedule
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Input type="time" defaultValue="09:00" className="w-32" />
              <span className="text-muted-foreground">to</span>
              <Input type="time" defaultValue="17:00" className="w-32" />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Privacy Settings */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Privacy & Security</h2>
        </div>

        <div className="space-y-4 p-6 bg-card border border-border rounded-lg">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Make Calendar Public</Label>
              <p className="text-sm text-muted-foreground">
                Allow others to see your availability
              </p>
            </div>
            <Switch />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Share Analytics</Label>
              <p className="text-sm text-muted-foreground">
                Share productivity insights with team
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </div>
    </div>
  );
}
