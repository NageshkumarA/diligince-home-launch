import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Bell, 
  Mail, 
  Smartphone, 
  MessageSquare,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  Settings
} from "lucide-react";

interface NotificationSetting {
  id: string;
  category: string;
  name: string;
  description: string;
  channels: {
    email: boolean;
    push: boolean;
    sms: boolean;
    inApp: boolean;
  };
}

const notificationCategories = [
  {
    id: 'approvals',
    name: 'Approvals & Workflows',
    icon: <CheckCircle className="h-4 w-4" />,
    settings: [
      {
        id: 'approval-request',
        category: 'approvals',
        name: 'New Approval Request',
        description: 'When someone submits a request that requires your approval',
        channels: { email: true, push: true, sms: false, inApp: true }
      },
      {
        id: 'approval-approved',
        category: 'approvals', 
        name: 'Request Approved',
        description: 'When your request has been approved',
        channels: { email: true, push: true, sms: false, inApp: true }
      },
      {
        id: 'approval-rejected',
        category: 'approvals',
        name: 'Request Rejected',
        description: 'When your request has been rejected',
        channels: { email: true, push: true, sms: true, inApp: true }
      }
    ]
  },
  {
    id: 'projects',
    name: 'Projects & Requirements',
    icon: <Settings className="h-4 w-4" />,
    settings: [
      {
        id: 'project-milestone',
        category: 'projects',
        name: 'Milestone Reached',
        description: 'When a project milestone is completed',
        channels: { email: true, push: false, sms: false, inApp: true }
      },
      {
        id: 'project-deadline',
        category: 'projects',
        name: 'Approaching Deadline',
        description: 'Reminders for upcoming project deadlines',
        channels: { email: true, push: true, sms: false, inApp: true }
      }
    ]
  },
  {
    id: 'messages',
    name: 'Messages & Communications',
    icon: <MessageSquare className="h-4 w-4" />,
    settings: [
      {
        id: 'new-message',
        category: 'messages',
        name: 'New Message',
        description: 'When you receive a new direct message',
        channels: { email: false, push: true, sms: false, inApp: true }
      },
      {
        id: 'message-mention',
        category: 'messages',
        name: 'Mentioned in Message',
        description: 'When someone mentions you in a message or comment',
        channels: { email: true, push: true, sms: false, inApp: true }
      }
    ]
  },
  {
    id: 'system',
    name: 'System & Security',
    icon: <AlertTriangle className="h-4 w-4" />,
    settings: [
      {
        id: 'security-login',
        category: 'system',
        name: 'New Device Login',
        description: 'When your account is accessed from a new device',
        channels: { email: true, push: false, sms: true, inApp: false }
      },
      {
        id: 'system-maintenance',
        category: 'system',
        name: 'System Maintenance',
        description: 'Notifications about scheduled system maintenance',
        channels: { email: true, push: false, sms: false, inApp: true }
      }
    ]
  }
];

export default function SettingsNotifications() {
  const { toast } = useToast();
  const [notificationSettings, setNotificationSettings] = useState(
    notificationCategories.reduce((acc, category) => {
      category.settings.forEach(setting => {
        acc[setting.id] = setting.channels;
      });
      return acc;
    }, {} as Record<string, NotificationSetting['channels']>)
  );

  const [globalSettings, setGlobalSettings] = useState({
    digestFrequency: 'daily',
    quietHours: true,
    quietStart: '22:00',
    quietEnd: '08:00',
    timezone: 'America/New_York'
  });

  const handleChannelToggle = (settingId: string, channel: keyof NotificationSetting['channels']) => {
    setNotificationSettings(prev => ({
      ...prev,
      [settingId]: {
        ...prev[settingId],
        [channel]: !prev[settingId][channel]
      }
    }));
  };

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your notification preferences have been updated successfully.",
    });
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'push':
        return <Bell className="h-4 w-4" />;
      case 'sms':
        return <Smartphone className="h-4 w-4" />;
      case 'inApp':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Global Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Global Settings</CardTitle>
          <CardDescription>
            Configure general notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-field">
              <Label htmlFor="digestFrequency">Email Digest Frequency</Label>
              <Select 
                value={globalSettings.digestFrequency}
                onValueChange={(value) => setGlobalSettings(prev => ({ ...prev, digestFrequency: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="form-field">
              <Label htmlFor="timezone">Timezone</Label>
              <Select 
                value={globalSettings.timezone}
                onValueChange={(value) => setGlobalSettings(prev => ({ ...prev, timezone: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                  <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="quietHours">Quiet Hours</Label>
                <p className="text-sm text-muted-foreground">
                  Disable push notifications during specified hours
                </p>
              </div>
              <Switch
                id="quietHours"
                checked={globalSettings.quietHours}
                onCheckedChange={(checked) => 
                  setGlobalSettings(prev => ({ ...prev, quietHours: checked }))
                }
              />
            </div>

            {globalSettings.quietHours && (
              <div className="grid grid-cols-2 gap-4 pl-4 border-l-2 border-muted">
                <div className="form-field">
                  <Label htmlFor="quietStart">Start Time</Label>
                  <Select 
                    value={globalSettings.quietStart}
                    onValueChange={(value) => setGlobalSettings(prev => ({ ...prev, quietStart: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20:00">8:00 PM</SelectItem>
                      <SelectItem value="21:00">9:00 PM</SelectItem>
                      <SelectItem value="22:00">10:00 PM</SelectItem>
                      <SelectItem value="23:00">11:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="form-field">
                  <Label htmlFor="quietEnd">End Time</Label>
                  <Select 
                    value={globalSettings.quietEnd}
                    onValueChange={(value) => setGlobalSettings(prev => ({ ...prev, quietEnd: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="06:00">6:00 AM</SelectItem>
                      <SelectItem value="07:00">7:00 AM</SelectItem>
                      <SelectItem value="08:00">8:00 AM</SelectItem>
                      <SelectItem value="09:00">9:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notification Categories */}
      {notificationCategories.map((category) => (
        <Card key={category.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {category.icon}
              {category.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Channel Headers */}
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
                <div className="col-span-6">Notification Type</div>
                <div className="col-span-6">
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Mail className="h-3 w-3" />
                      Email
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Bell className="h-3 w-3" />
                      Push
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Smartphone className="h-3 w-3" />
                      SMS
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      In-App
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Notification Settings */}
              {category.settings.map((setting) => (
                <div key={setting.id} className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-6">
                    <h4 className="font-medium">{setting.name}</h4>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <div className="col-span-6">
                    <div className="grid grid-cols-4 gap-2">
                      {Object.entries(notificationSettings[setting.id] || setting.channels).map(([channel, enabled]) => (
                        <div key={channel} className="flex justify-center">
                          <Switch
                            checked={enabled}
                            onCheckedChange={() => handleChannelToggle(setting.id, channel as keyof NotificationSetting['channels'])}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-end gap-2">
        <Button variant="outline">Test Notifications</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}