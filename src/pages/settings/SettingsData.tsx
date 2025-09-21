import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Download, 
  Upload, 
  Database, 
  Calendar,
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

interface BackupJob {
  id: string;
  type: 'full' | 'incremental';
  status: 'completed' | 'running' | 'failed';
  size: string;
  createdAt: string;
}

const mockBackups: BackupJob[] = [
  {
    id: '1',
    type: 'full',
    status: 'completed',
    size: '2.4 GB',
    createdAt: '2024-03-15 02:00 AM'
  },
  {
    id: '2',
    type: 'incremental',
    status: 'completed',
    size: '156 MB',
    createdAt: '2024-03-14 02:00 AM'
  },
  {
    id: '3',
    type: 'incremental',
    status: 'failed',
    size: '0 MB',
    createdAt: '2024-03-13 02:00 AM'
  }
];

export default function SettingsData() {
  const { toast } = useToast();
  const [backups, setBackups] = useState(mockBackups);
  const [dataSettings, setDataSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    retentionPeriod: '30',
    encryptBackups: true,
    exportFormat: 'csv'
  });
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const handleBackupNow = () => {
    const newBackup: BackupJob = {
      id: Date.now().toString(),
      type: 'full',
      status: 'running',
      size: '0 MB',
      createdAt: new Date().toLocaleString()
    };
    
    setBackups(prev => [newBackup, ...prev]);
    
    // Simulate backup completion
    setTimeout(() => {
      setBackups(prev => 
        prev.map(backup => 
          backup.id === newBackup.id 
            ? { ...backup, status: 'completed', size: '2.1 GB' }
            : backup
        )
      );
      
      toast({
        title: "Backup completed",
        description: "Your data has been backed up successfully.",
      });
    }, 3000);
    
    toast({
      title: "Backup started",
      description: "Your data backup is now in progress.",
    });
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Export completed",
        description: `Data exported successfully in ${dataSettings.exportFormat.toUpperCase()} format.`,
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async () => {
    setIsImporting(true);
    try {
      // Simulate import process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Import completed",
        description: "Data imported successfully.",
      });
    } catch (error) {
      toast({
        title: "Import failed",
        description: "Failed to import data. Please check your file format.",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  const getStatusIcon = (status: BackupJob['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'running':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusBadge = (status: BackupJob['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="badge-success">Completed</Badge>;
      case 'running':
        return <Badge className="badge-info">Running</Badge>;
      case 'failed':
        return <Badge className="badge-error">Failed</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Data Export */}
      <Card>
        <CardHeader>
          <CardTitle>Data Export</CardTitle>
          <CardDescription>
            Export your data for backup or migration purposes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-field">
              <Label htmlFor="exportFormat">Export Format</Label>
              <Select 
                value={dataSettings.exportFormat}
                onValueChange={(value) => setDataSettings(prev => ({ ...prev, exportFormat: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="xml">XML</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleExport} 
                disabled={isExporting}
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                {isExporting ? "Exporting..." : "Export Data"}
              </Button>
            </div>
          </div>
          
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium text-sm mb-2">What will be exported:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Company profile and team member information</li>
              <li>• Project data and requirements</li>
              <li>• Purchase orders and vendor information</li>
              <li>• Workflow configurations and templates</li>
              <li>• Approval history and audit logs</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Data Import */}
      <Card>
        <CardHeader>
          <CardTitle>Data Import</CardTitle>
          <CardDescription>
            Import data from external sources or previous backups
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-4">
              Drop your files here or click to browse
            </p>
            <Button 
              variant="outline" 
              onClick={handleImport}
              disabled={isImporting}
            >
              {isImporting ? "Importing..." : "Select Files"}
            </Button>
          </div>
          
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-orange-800">Important:</h4>
                <p className="text-sm text-orange-700">
                  Importing data will overwrite existing records. Please backup your current data before proceeding.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Backup Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Data Backups</CardTitle>
              <CardDescription>
                Manage your automated and manual data backups
              </CardDescription>
            </div>
            <Button onClick={handleBackupNow}>
              <Database className="h-4 w-4 mr-2" />
              Backup Now
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Backup Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoBackup">Automatic Backups</Label>
                <p className="text-sm text-muted-foreground">
                  Enable scheduled automatic backups
                </p>
              </div>
              <Switch
                id="autoBackup"
                checked={dataSettings.autoBackup}
                onCheckedChange={(checked) => 
                  setDataSettings(prev => ({ ...prev, autoBackup: checked }))
                }
              />
            </div>

            {dataSettings.autoBackup && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-muted">
                <div className="form-field">
                  <Label htmlFor="frequency">Backup Frequency</Label>
                  <Select 
                    value={dataSettings.backupFrequency}
                    onValueChange={(value) => setDataSettings(prev => ({ ...prev, backupFrequency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="form-field">
                  <Label htmlFor="retention">Retention Period</Label>
                  <Select 
                    value={dataSettings.retentionPeriod}
                    onValueChange={(value) => setDataSettings(prev => ({ ...prev, retentionPeriod: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 Days</SelectItem>
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="90">90 Days</SelectItem>
                      <SelectItem value="365">1 Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="encryption">Encrypt Backups</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your backups
                </p>
              </div>
              <Switch
                id="encryption"
                checked={dataSettings.encryptBackups}
                onCheckedChange={(checked) => 
                  setDataSettings(prev => ({ ...prev, encryptBackups: checked }))
                }
              />
            </div>
          </div>

          {/* Backup History */}
          <div className="space-y-4">
            <h4 className="font-medium">Recent Backups</h4>
            {backups.map((backup) => (
              <div key={backup.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(backup.status)}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium capitalize">
                        {backup.type} Backup
                      </span>
                      {getStatusBadge(backup.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {backup.createdAt} • {backup.size}
                    </p>
                  </div>
                </div>
                {backup.status === 'completed' && (
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                )}
                {backup.status === 'running' && (
                  <div className="w-24">
                    <Progress value={65} className="h-2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </div>
  );
}