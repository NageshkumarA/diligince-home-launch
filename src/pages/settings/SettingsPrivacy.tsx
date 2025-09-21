import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  Smartphone,
  Key,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Download,
  Trash2
} from "lucide-react";

interface LoginSession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
  browser: string;
}

const mockSessions: LoginSession[] = [
  {
    id: '1',
    device: 'MacBook Pro',
    location: 'New York, NY',
    lastActive: '2 minutes ago',
    current: true,
    browser: 'Chrome'
  },
  {
    id: '2',
    device: 'iPhone 14',
    location: 'New York, NY',
    lastActive: '1 hour ago',
    current: false,
    browser: 'Safari'
  },
  {
    id: '3',
    device: 'Windows PC',
    location: 'Los Angeles, CA',
    lastActive: '3 days ago',
    current: false,
    browser: 'Edge'
  }
];

export default function SettingsPrivacy() {
  const { toast } = useToast();
  const [sessions, setSessions] = useState(mockSessions);
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'team',
    showEmailToTeam: false,
    showPhoneToTeam: false,
    activityTracking: true,
    dataCollection: true,
    marketingCommunications: false,
    twoFactorEnabled: false
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handlePrivacySettingChange = (setting: string, value: boolean) => {
    setPrivacySettings(prev => ({ ...prev, [setting]: value }));
  };

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleEndSession = (sessionId: string) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId));
    toast({
      title: "Session ended",
      description: "The selected session has been terminated.",
    });
  };

  const handleEndAllSessions = () => {
    setSessions(prev => prev.filter(session => session.current));
    toast({
      title: "All sessions ended",
      description: "All other sessions have been terminated.",
    });
  };

  const handleEnable2FA = () => {
    setPrivacySettings(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }));
    toast({
      title: privacySettings.twoFactorEnabled ? "2FA disabled" : "2FA enabled",
      description: privacySettings.twoFactorEnabled 
        ? "Two-factor authentication has been disabled."
        : "Two-factor authentication has been enabled.",
    });
  };

  const handleDownloadData = () => {
    toast({
      title: "Download started",
      description: "Your data export will be ready for download shortly.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "Your account deletion request has been submitted.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      {/* Privacy Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Privacy Controls</CardTitle>
          <CardDescription>
            Control how your information is shared and displayed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="profileVisibility">Profile Visibility</Label>
              <p className="text-sm text-muted-foreground">
                Who can see your profile information
              </p>
            </div>
            <Badge variant="outline">Team Members Only</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="showEmail">Show Email to Team</Label>
              <p className="text-sm text-muted-foreground">
                Display your email address to team members
              </p>
            </div>
            <Switch
              id="showEmail"
              checked={privacySettings.showEmailToTeam}
              onCheckedChange={(checked) => handlePrivacySettingChange('showEmailToTeam', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="showPhone">Show Phone to Team</Label>
              <p className="text-sm text-muted-foreground">
                Display your phone number to team members
              </p>
            </div>
            <Switch
              id="showPhone"
              checked={privacySettings.showPhoneToTeam}
              onCheckedChange={(checked) => handlePrivacySettingChange('showPhoneToTeam', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="activityTracking">Activity Tracking</Label>
              <p className="text-sm text-muted-foreground">
                Allow tracking for analytics and improvement
              </p>
            </div>
            <Switch
              id="activityTracking"
              checked={privacySettings.activityTracking}
              onCheckedChange={(checked) => handlePrivacySettingChange('activityTracking', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="marketing">Marketing Communications</Label>
              <p className="text-sm text-muted-foreground">
                Receive marketing emails and product updates
              </p>
            </div>
            <Switch
              id="marketing"
              checked={privacySettings.marketingCommunications}
              onCheckedChange={(checked) => handlePrivacySettingChange('marketingCommunications', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>
            Manage your account security and authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Password Change */}
          <div className="space-y-4">
            <h4 className="font-medium">Change Password</h4>
            <div className="space-y-3">
              <div className="form-field">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPassword.current ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}
                  >
                    {showPassword.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="form-field">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPassword.new ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                  >
                    {showPassword.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="form-field">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPassword.confirm ? "text" : "password"}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                  >
                    {showPassword.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button onClick={handlePasswordChange}>
                <Lock className="h-4 w-4 mr-2" />
                Update Password
              </Button>
            </div>
          </div>

          <Separator />

          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="2fa">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <div className="flex items-center gap-2">
              {privacySettings.twoFactorEnabled && (
                <Badge className="badge-success">Enabled</Badge>
              )}
              <Button 
                variant={privacySettings.twoFactorEnabled ? "outline" : "default"}
                onClick={handleEnable2FA}
              >
                <Smartphone className="h-4 w-4 mr-2" />
                {privacySettings.twoFactorEnabled ? "Disable" : "Enable"} 2FA
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>
                Manage devices that are currently signed in to your account
              </CardDescription>
            </div>
            <Button variant="outline" onClick={handleEndAllSessions}>
              End All Other Sessions
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded">
                    <Smartphone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{session.device}</span>
                      {session.current && (
                        <Badge className="badge-success">Current Session</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {session.browser} • {session.location} • {session.lastActive}
                    </p>
                  </div>
                </div>
                {!session.current && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEndSession(session.id)}
                  >
                    End Session
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Control your personal data and account information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Download Your Data</h4>
              <p className="text-sm text-muted-foreground">
                Get a copy of all your data stored in our system
              </p>
            </div>
            <Button variant="outline" onClick={handleDownloadData}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
            <div>
              <h4 className="font-medium text-red-800">Delete Account</h4>
              <p className="text-sm text-red-600">
                Permanently delete your account and all associated data
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Account</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove all your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeleteAccount}
                    className="bg-destructive text-destructive-foreground"
                  >
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}