
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Link, RefreshCw, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface CalendarSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendarSyncModal = ({ isOpen, onClose }: CalendarSyncModalProps) => {
  const [syncSettings, setSyncSettings] = useState({
    googleCalendar: true,
    outlookCalendar: false,
    appleCalendar: false,
    autoSync: true,
    syncInterval: '15min'
  });

  const calendars = [
    {
      name: "Google Calendar",
      type: "google",
      connected: true,
      lastSync: "2 minutes ago",
      events: 12
    },
    {
      name: "Outlook Calendar",
      type: "outlook",
      connected: false,
      lastSync: "Never",
      events: 0
    },
    {
      name: "Apple Calendar",
      type: "apple",
      connected: false,
      lastSync: "Never",
      events: 0
    }
  ];

  const handleSync = (calendarType: string) => {
    toast.success(`Syncing with ${calendarType} calendar...`);
  };

  const handleConnect = (calendarType: string) => {
    toast.success(`Connecting to ${calendarType} calendar...`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendar Sync Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Connected Calendars */}
          <div className="space-y-3">
            <h3 className="font-medium">Connected Calendars</h3>
            <div className="space-y-3">
              {calendars.map((calendar, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <div>
                        <h4 className="font-medium">{calendar.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>Last sync: {calendar.lastSync}</span>
                          {calendar.connected && (
                            <>
                              <span>•</span>
                              <span>{calendar.events} events</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {calendar.connected ? (
                        <>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Connected
                          </Badge>
                          <Button variant="outline" size="sm" onClick={() => handleSync(calendar.type)}>
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button variant="outline" size="sm" onClick={() => handleConnect(calendar.type)}>
                          <Link className="h-4 w-4 mr-2" />
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sync Settings */}
          <div className="space-y-4">
            <h3 className="font-medium">Sync Settings</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoSync">Auto Sync</Label>
                <p className="text-sm text-gray-500">Automatically sync calendars in the background</p>
              </div>
              <Switch
                id="autoSync"
                checked={syncSettings.autoSync}
                onCheckedChange={(checked) => setSyncSettings({...syncSettings, autoSync: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Sync Interval</Label>
                <p className="text-sm text-gray-500">How often to check for updates</p>
              </div>
              <select 
                className="border rounded p-2"
                value={syncSettings.syncInterval}
                onChange={(e) => setSyncSettings({...syncSettings, syncInterval: e.target.value})}
              >
                <option value="5min">Every 5 minutes</option>
                <option value="15min">Every 15 minutes</option>
                <option value="30min">Every 30 minutes</option>
                <option value="1hour">Every hour</option>
              </select>
            </div>
          </div>

          {/* Sync Conflicts */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">Conflict Resolution</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  When conflicts occur, your professional calendar takes priority. 
                  External calendar events will be marked as "busy" time.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => toast.success("Sync settings saved")}>
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarSyncModal;
