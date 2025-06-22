
import React, { useState, useEffect } from "react";
import { BaseModal } from "@/components/shared/modals/BaseModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  FileText, 
  Upload, 
  X, 
  Plus,
  Trash2
} from "lucide-react";
import { format } from "date-fns";
import { DayData } from "./EnhancedAvailabilityCalendar";

interface DayDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  dayData?: DayData;
  onSave: (date: Date, data: DayData) => void;
}

export const DayDetailsModal = ({ 
  isOpen, 
  onClose, 
  date, 
  dayData, 
  onSave 
}: DayDetailsModalProps) => {
  const [formData, setFormData] = useState<DayData>({
    date,
    availability: {
      status: 'available',
      timeSlots: [{ start: '09:00', end: '17:00' }],
    },
    pricing: {
      currency: 'USD',
    },
    notes: {
      private: '',
      clientVisible: '',
      templates: []
    },
    documents: {
      files: [],
      categories: [],
      permissions: 'private'
    }
  });

  useEffect(() => {
    if (dayData) {
      setFormData(dayData);
    } else {
      setFormData({
        date,
        availability: {
          status: 'available',
          timeSlots: [{ start: '09:00', end: '17:00' }],
        },
        pricing: {
          currency: 'USD',
        },
        notes: {
          private: '',
          clientVisible: '',
          templates: []
        },
        documents: {
          files: [],
          categories: [],
          permissions: 'private'
        }
      });
    }
  }, [date, dayData]);

  const handleSave = () => {
    onSave(date, formData);
  };

  const addTimeSlot = () => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        timeSlots: [...prev.availability.timeSlots, { start: '09:00', end: '17:00' }]
      }
    }));
  };

  const removeTimeSlot = (index: number) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        timeSlots: prev.availability.timeSlots.filter((_, i) => i !== index)
      }
    }));
  };

  const updateTimeSlot = (index: number, field: 'start' | 'end', value: string) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        timeSlots: prev.availability.timeSlots.map((slot, i) => 
          i === index ? { ...slot, [field]: value } : slot
        )
      }
    }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          files: [...prev.documents.files, ...newFiles]
        }
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        files: prev.documents.files.filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Manage Availability - ${format(date, 'MMMM d, yyyy')}`}
      maxWidth="max-w-4xl"
    >
      <Tabs defaultValue="availability" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="availability">
            <Clock className="w-4 h-4 mr-2" />
            Availability
          </TabsTrigger>
          <TabsTrigger value="pricing">
            <DollarSign className="w-4 h-4 mr-2" />
            Pricing
          </TabsTrigger>
          <TabsTrigger value="notes">
            <FileText className="w-4 h-4 mr-2" />
            Notes
          </TabsTrigger>
          <TabsTrigger value="documents">
            <Upload className="w-4 h-4 mr-2" />
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="availability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Availability Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Status</Label>
                <Select 
                  value={formData.availability.status} 
                  onValueChange={(value: 'available' | 'busy' | 'unavailable') => 
                    setFormData(prev => ({
                      ...prev,
                      availability: { ...prev.availability, status: value }
                    }))
                  }
                >
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

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Time Slots</Label>
                  <Button size="sm" onClick={addTimeSlot}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add Slot
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.availability.timeSlots.map((slot, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        type="time"
                        value={slot.start}
                        onChange={(e) => updateTimeSlot(index, 'start', e.target.value)}
                        className="w-32"
                      />
                      <span>to</span>
                      <Input
                        type="time"
                        value={slot.end}
                        onChange={(e) => updateTimeSlot(index, 'end', e.target.value)}
                        className="w-32"
                      />
                      {formData.availability.timeSlots.length > 1 && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeTimeSlot(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Hourly Rate</Label>
                  <Input
                    type="number"
                    placeholder="75"
                    value={formData.pricing.hourlyRate || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      pricing: { ...prev.pricing, hourlyRate: parseFloat(e.target.value) || undefined }
                    }))}
                  />
                </div>
                <div>
                  <Label>Day Rate</Label>
                  <Input
                    type="number"
                    placeholder="600"
                    value={formData.pricing.dayRate || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      pricing: { ...prev.pricing, dayRate: parseFloat(e.target.value) || undefined }
                    }))}
                  />
                </div>
              </div>

              <div>
                <Label>Currency</Label>
                <Select 
                  value={formData.pricing.currency} 
                  onValueChange={(value) => 
                    setFormData(prev => ({
                      ...prev,
                      pricing: { ...prev.pricing, currency: value }
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="CAD">CAD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Pricing Notes</Label>
                <Textarea
                  placeholder="e.g., Includes travel time, Emergency rate, etc."
                  value={formData.pricing.notes || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    pricing: { ...prev.pricing, notes: e.target.value }
                  }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Private Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Notes only visible to you..."
                  value={formData.notes.private}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    notes: { ...prev.notes, private: e.target.value }
                  }))}
                  rows={4}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Client-Visible Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Notes that clients can see..."
                  value={formData.notes.clientVisible}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    notes: { ...prev.notes, clientVisible: e.target.value }
                  }))}
                  rows={4}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Upload Documents</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drag and drop files here, or click to select
                  </p>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    id="document-upload"
                    onChange={(e) => handleFileUpload(e.target.files)}
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('document-upload')?.click()}
                  >
                    Select Files
                  </Button>
                </div>
              </div>

              {formData.documents.files.length > 0 && (
                <div>
                  <Label>Uploaded Files</Label>
                  <div className="space-y-2">
                    {formData.documents.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{file.name}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFile(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label>Document Permissions</Label>
                <Select 
                  value={formData.documents.permissions} 
                  onValueChange={(value: 'private' | 'client-visible') => 
                    setFormData(prev => ({
                      ...prev,
                      documents: { ...prev.documents, permissions: value }
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="client-visible">Client Visible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-3 pt-4">
        <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
          Save Changes
        </Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </BaseModal>
  );
};
