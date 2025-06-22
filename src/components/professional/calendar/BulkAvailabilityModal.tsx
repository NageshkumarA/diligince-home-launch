
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface BulkAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BulkAvailabilityModal = ({ isOpen, onClose }: BulkAvailabilityModalProps) => {
  const [bulkSettings, setBulkSettings] = useState({
    dateRange: 'thisWeek',
    startTime: '09:00',
    endTime: '17:00',
    hourlyRate: '',
    dayRate: '',
    status: 'available',
    recurring: false,
    excludeWeekends: true,
    notes: ''
  });

  const handleApplyBulkSettings = () => {
    if (!bulkSettings.hourlyRate && !bulkSettings.dayRate) {
      toast.error("Please set either hourly or day rate");
      return;
    }
    
    toast.success("Bulk availability settings applied successfully");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Bulk Set Availability</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateRange">Date Range</Label>
              <Select value={bulkSettings.dateRange} onValueChange={(value) => setBulkSettings({...bulkSettings, dateRange: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="thisWeek">This Week</SelectItem>
                  <SelectItem value="nextWeek">Next Week</SelectItem>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                  <SelectItem value="nextMonth">Next Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Availability Status</Label>
              <Select value={bulkSettings.status} onValueChange={(value) => setBulkSettings({...bulkSettings, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                type="time"
                value={bulkSettings.startTime}
                onChange={(e) => setBulkSettings({...bulkSettings, startTime: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                type="time"
                value={bulkSettings.endTime}
                onChange={(e) => setBulkSettings({...bulkSettings, endTime: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
              <Input
                type="number"
                placeholder="e.g., 75"
                value={bulkSettings.hourlyRate}
                onChange={(e) => setBulkSettings({...bulkSettings, hourlyRate: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dayRate">Day Rate ($)</Label>
              <Input
                type="number"
                placeholder="e.g., 600"
                value={bulkSettings.dayRate}
                onChange={(e) => setBulkSettings({...bulkSettings, dayRate: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Options</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="recurring" 
                  checked={bulkSettings.recurring}
                  onCheckedChange={(checked) => setBulkSettings({...bulkSettings, recurring: !!checked})}
                />
                <Label htmlFor="recurring" className="text-sm">Make this a recurring pattern</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="excludeWeekends" 
                  checked={bulkSettings.excludeWeekends}
                  onCheckedChange={(checked) => setBulkSettings({...bulkSettings, excludeWeekends: !!checked})}
                />
                <Label htmlFor="excludeWeekends" className="text-sm">Exclude weekends</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              placeholder="Add any special notes or conditions..."
              value={bulkSettings.notes}
              onChange={(e) => setBulkSettings({...bulkSettings, notes: e.target.value})}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleApplyBulkSettings}>
            Apply to Calendar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkAvailabilityModal;
