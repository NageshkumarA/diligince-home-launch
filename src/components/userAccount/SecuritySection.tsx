import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Shield, 
  Lock, 
  Smartphone, 
  Key, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  Monitor
} from 'lucide-react';
import toast from '@/utils/toast.utils';

const SecuritySection = () => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isToggling2FA, setIsToggling2FA] = useState(false);

  // Mock active sessions
  const [activeSessions] = useState([
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'Mumbai, India',
      lastActive: '2 minutes ago',
      isCurrent: true
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'Delhi, India',
      lastActive: '3 hours ago',
      isCurrent: false
    }
  ]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setIsChangingPassword(true);
    const loadingToast = toast.loading('Changing password...');

    try {
      // TODO: API integration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.dismiss(loadingToast);
      toast.success('Password changed successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to change password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleToggle2FA = async () => {
    setIsToggling2FA(true);
    const loadingToast = toast.loading(
      twoFactorEnabled ? 'Disabling 2FA...' : 'Enabling 2FA...'
    );

    try {
      // TODO: API integration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setTwoFactorEnabled(!twoFactorEnabled);
      toast.dismiss(loadingToast);
      toast.success(
        twoFactorEnabled 
          ? 'Two-factor authentication disabled' 
          : 'Two-factor authentication enabled'
      );
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to update 2FA settings');
    } finally {
      setIsToggling2FA(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 25, label: 'Weak', color: 'bg-red-500' };
    if (password.length < 10) return { strength: 50, label: 'Fair', color: 'bg-orange-500' };
    if (password.length < 14) return { strength: 75, label: 'Good', color: 'bg-yellow-500' };
    return { strength: 100, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(passwordForm.newPassword);

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-primary/10">
          <CardTitle className="flex items-center gap-2">
            <Lock className="text-primary" size={24} />
            Change Password
          </CardTitle>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                required
              />
              {passwordForm.newPassword && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all ${passwordStrength.color}`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{passwordStrength.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 8 characters long
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                required
              />
            </div>

            <Button 
              type="submit" 
              disabled={isChangingPassword}
              className="w-full"
            >
              {isChangingPassword ? 'Changing...' : 'Change Password'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b bg-gradient-to-r from-green/5 to-green/10">
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="text-primary" size={24} />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${twoFactorEnabled ? 'bg-green-100 dark:bg-green-950' : 'bg-gray-100 dark:bg-gray-800'}`}>
                <Shield className={twoFactorEnabled ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'} size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Label className="text-base font-semibold">2FA Status</Label>
                  <Badge variant={twoFactorEnabled ? 'default' : 'secondary'}>
                    {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {twoFactorEnabled 
                    ? 'Your account is protected with 2FA' 
                    : 'Enable 2FA to enhance security'}
                </p>
              </div>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={handleToggle2FA}
              disabled={isToggling2FA}
            />
          </div>

          {twoFactorEnabled && (
            <div className="space-y-3 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center gap-2 text-green-800 dark:text-green-300">
                <CheckCircle2 size={18} />
                <span className="font-semibold">2FA is Active</span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-400">
                You'll be asked for a verification code when signing in from a new device.
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                <Key size={16} className="mr-2" />
                View Recovery Codes
              </Button>
            </div>
          )}

          {!twoFactorEnabled && (
            <div className="space-y-3 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
                <AlertTriangle size={18} />
                <span className="font-semibold">2FA is Disabled</span>
              </div>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                Your account is more vulnerable without two-factor authentication. Enable it to add an extra layer of security.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Sessions */}
      {/* <Card className="shadow-lg border-0">
        <CardHeader className="border-b bg-gradient-to-r from-blue/5 to-blue/10">
          <CardTitle className="flex items-center gap-2">
            <Monitor className="text-primary" size={24} />
            Active Sessions
          </CardTitle>
          <CardDescription>
            Manage your active sessions across devices
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          {activeSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Monitor className="text-primary" size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{session.device}</span>
                    {session.isCurrent && (
                      <Badge variant="default" className="text-xs">Current</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{session.location}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Clock size={12} />
                    <span>Last active: {session.lastActive}</span>
                  </div>
                </div>
              </div>
              {!session.isCurrent && (
                <Button variant="outline" size="sm">
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card> */}
    </div>
  );
};

export default SecuritySection;
