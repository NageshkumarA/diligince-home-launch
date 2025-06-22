
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterModal = ({ isOpen, onClose }: FilterModalProps) => {
  const [filters, setFilters] = useState({
    status: 'all',
    priceRange: 'all',
    projectType: 'all',
    dateRange: 'all',
    showRecurring: true,
    showBookings: true
  });

  const handleApplyFilters = () => {
    toast.success("Filters applied successfully");
    onClose();
  };

  const handleResetFilters = () => {
    setFilters({
      status: 'all',
      priceRange: 'all',
      projectType: 'all',
      dateRange: 'all',
      showRecurring: true,
      showBookings: true
    });
    toast.success("Filters reset");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Calendar Filters</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Availability Status</Label>
              <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceRange">Price Range</Label>
              <Select value={filters.priceRange} onValueChange={(value) => setFilters({...filters, priceRange: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ranges</SelectItem>
                  <SelectItem value="50-100">$50-100/hr</SelectItem>
                  <SelectItem value="100-150">$100-150/hr</SelectItem>
                  <SelectItem value="150+">$150+/hr</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectType">Project Type</Label>
              <Select value={filters.projectType} onValueChange={(value) => setFilters({...filters, projectType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="meetings">Meetings</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateRange">Date Range</Label>
              <Select value={filters.dateRange} onValueChange={(value) => setFilters({...filters, dateRange: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="thisWeek">This Week</SelectItem>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                  <SelectItem value="nextMonth">Next Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Display Options</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="recurring" 
                  checked={filters.showRecurring}
                  onCheckedChange={(checked) => setFilters({...filters, showRecurring: !!checked})}
                />
                <Label htmlFor="recurring" className="text-sm">Show recurring appointments</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="bookings" 
                  checked={filters.showBookings}
                  onCheckedChange={(checked) => setFilters({...filters, showBookings: !!checked})}
                />
                <Label htmlFor="bookings" className="text-sm">Show client bookings</Label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-3">
          <Button variant="outline" onClick={handleResetFilters}>
            Reset Filters
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
