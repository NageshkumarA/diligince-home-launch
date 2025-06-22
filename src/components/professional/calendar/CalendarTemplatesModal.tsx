import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Copy, Edit } from "lucide-react";
import { toast } from "sonner";

interface CalendarTemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendarTemplatesModal = ({ isOpen, onClose }: CalendarTemplatesModalProps) => {
  const [templates] = useState([
    {
      id: 1,
      name: "Standard Work Week",
      description: "Mon-Fri 9AM-5PM, $75/hr",
      schedule: "9:00-17:00",
      rate: "$75/hr",
      days: "Weekdays"
    },
    {
      id: 2,
      name: "Consultation Hours",
      description: "Tue/Thu 2PM-6PM, $100/hr",
      schedule: "14:00-18:00",
      rate: "$100/hr",
      days: "Tue, Thu"
    },
    {
      id: 3,
      name: "Weekend Availability",
      description: "Sat-Sun 10AM-3PM, $125/hr",
      schedule: "10:00-15:00",
      rate: "$125/hr",
      days: "Weekends"
    }
  ]);

  const [newTemplateName, setNewTemplateName] = useState("");

  const handleApplyTemplate = (template: any) => {
    toast.success(`Applied template: ${template.name}`);
    onClose();
  };

  const handleCreateTemplate = () => {
    if (!newTemplateName.trim()) {
      toast.error("Please enter a template name");
      return;
    }
    toast.success(`Created new template: ${newTemplateName}`);
    setNewTemplateName("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Calendar Templates</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Create New Template */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Create New Template</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Template name..."
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleCreateTemplate}>
                <Plus className="h-4 w-4 mr-2" />
                Create
              </Button>
            </div>
          </div>

          {/* Existing Templates */}
          <div className="space-y-3">
            <h3 className="font-medium">Saved Templates</h3>
            <div className="grid gap-3">
              {templates.map((template) => (
                <Card key={template.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{template.name}</h4>
                        <Badge variant="secondary">{template.rate}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span>Schedule: {template.schedule}</span>
                        <span>Days: {template.days}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleApplyTemplate(template)}>
                        Apply
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarTemplatesModal;
