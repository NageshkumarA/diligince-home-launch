import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Mail, Smartphone, MessageSquare, AlertCircle, DollarSign, FileText, Moon } from 'lucide-react';
import toast from '@/utils/toast.utils';

const NotificationsSection = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    requirements: true,
    approvals: true,
    payments: false,
    messages: true,
    systemAlerts: true,
  });

  const [digestFrequency, setDigestFrequency] = useState('daily');
  const [quietHours, setQuietHours] = useState({
    enabled: true,
    start: '22:00',
    end: '08:00'
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const loadingToast = toast.loading('Saving preferences...');
    
    try {
      // TODO: API integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.dismiss(loadingToast);
      toast.success('Preferences saved successfully');
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to save preferences');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Notification Channels */}
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-primary/10">
          <CardTitle className="flex items-center gap-2">
            <Bell className="text-primary" size={24} />
            Notification Channels
          </CardTitle>
          <CardDescription>
            Choose how you want to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="grid gap-6">
            {/* Email Notifications */}
            <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-950">
                  <Mail className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
                <div>
                  <Label className="text-base font-semibold">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => handleToggle('email', checked)}
              />
            </div>

            {/* SMS Notifications */}
            <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-950">
                  <Smartphone className="text-green-600 dark:text-green-400" size={20} />
                </div>
                <div>
                  <Label className="text-base font-semibold">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get text messages for urgent alerts</p>
                </div>
              </div>
              <Switch
                checked={notifications.sms}
                onCheckedChange={(checked) => handleToggle('sms', checked)}
              />
            </div>

            {/* Push Notifications */}
            <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-950">
                  <Bell className="text-purple-600 dark:text-purple-400" size={20} />
                </div>
                <div>
                  <Label className="text-base font-semibold">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Browser push notifications</p>
                </div>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => handleToggle('push', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event Categories */}
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b bg-gradient-to-r from-purple/5 to-purple/10">
          <CardTitle className="flex items-center gap-2">
            <FileText className="text-primary" size={24} />
            Event Categories
          </CardTitle>
          <CardDescription>
            Select which events you want to be notified about
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-primary" />
                <Label>Requirements & Projects</Label>
              </div>
              <Switch
                checked={notifications.requirements}
                onCheckedChange={(checked) => handleToggle('requirements', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <AlertCircle size={18} className="text-amber-600" />
                <Label>Approvals & Actions</Label>
              </div>
              <Switch
                checked={notifications.approvals}
                onCheckedChange={(checked) => handleToggle('approvals', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <DollarSign size={18} className="text-green-600" />
                <Label>Payments & Invoices</Label>
              </div>
              <Switch
                checked={notifications.payments}
                onCheckedChange={(checked) => handleToggle('payments', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <MessageSquare size={18} className="text-blue-600" />
                <Label>Messages & Communications</Label>
              </div>
              <Switch
                checked={notifications.messages}
                onCheckedChange={(checked) => handleToggle('messages', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <Bell size={18} className="text-red-600" />
                <Label>System Alerts</Label>
              </div>
              <Switch
                checked={notifications.systemAlerts}
                onCheckedChange={(checked) => handleToggle('systemAlerts', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Digest & Quiet Hours */}
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b bg-gradient-to-r from-indigo/5 to-indigo/10">
          <CardTitle className="flex items-center gap-2">
            <Moon className="text-primary" size={24} />
            Preferences
          </CardTitle>
          <CardDescription>
            Configure digest frequency and quiet hours
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Digest Frequency */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Email Digest Frequency</Label>
            <Select value={digestFrequency} onValueChange={setDigestFrequency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instant">Instant (as they happen)</SelectItem>
                <SelectItem value="hourly">Hourly Summary</SelectItem>
                <SelectItem value="daily">Daily Digest</SelectItem>
                <SelectItem value="weekly">Weekly Summary</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quiet Hours */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Quiet Hours</Label>
              <Switch
                checked={quietHours.enabled}
                onCheckedChange={(checked) => setQuietHours(prev => ({ ...prev, enabled: checked }))}
              />
            </div>
            {quietHours.enabled && (
              <div className="grid grid-cols-2 gap-4 pl-4 border-l-2 border-primary/30">
                <div className="space-y-2">
                  <Label className="text-sm">Start Time</Label>
                  <Select 
                    value={quietHours.start} 
                    onValueChange={(value) => setQuietHours(prev => ({ ...prev, start: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, '0');
                        return <SelectItem key={hour} value={`${hour}:00`}>{`${hour}:00`}</SelectItem>;
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">End Time</Label>
                  <Select 
                    value={quietHours.end} 
                    onValueChange={(value) => setQuietHours(prev => ({ ...prev, end: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, '0');
                        return <SelectItem key={hour} value={`${hour}:00`}>{`${hour}:00`}</SelectItem>;
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              No notifications will be sent during quiet hours
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
        >
          Reset
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="min-w-[120px]"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

export default NotificationsSection;
