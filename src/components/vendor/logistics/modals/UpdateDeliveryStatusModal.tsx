
import React, { useState } from "react";
import { FormModal } from "@/components/shared/modals/FormModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Camera, AlertCircle, CheckCircle } from "lucide-react";

interface UpdateDeliveryStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  delivery: any;
}

export const UpdateDeliveryStatusModal = ({ isOpen, onClose, delivery }: UpdateDeliveryStatusModalProps) => {
  const [newStatus, setNewStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [issueType, setIssueType] = useState("");

  if (!delivery) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating delivery status:", { newStatus, notes, issueType });
    onClose();
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Update Status - ${delivery.id}`}
      onSubmit={handleSubmit}
      submitText="Update Status"
      submitVariant="default"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Current Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Status:</span>
                <p className="font-medium capitalize">{delivery.status}</p>
              </div>
              <div>
                <span className="text-gray-600">Progress:</span>
                <p className="font-medium">{delivery.progress}%</p>
              </div>
              <div>
                <span className="text-gray-600">ETA:</span>
                <p className="font-medium">{delivery.estimatedArrival}</p>
              </div>
              <div>
                <span className="text-gray-600">Current Location:</span>
                <p className="font-medium">{delivery.currentLocation}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Update */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="status">New Status</Label>
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="loading">Loading</SelectItem>
                <SelectItem value="in-transit">In Transit</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="issue">Issue Reported</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(newStatus === "delayed" || newStatus === "issue") && (
            <div>
              <Label htmlFor="issueType">Issue Type</Label>
              <Select value={issueType} onValueChange={setIssueType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="traffic">Traffic Delay</SelectItem>
                  <SelectItem value="weather">Weather Conditions</SelectItem>
                  <SelectItem value="vehicle">Vehicle Issue</SelectItem>
                  <SelectItem value="route">Route Problem</SelectItem>
                  <SelectItem value="customer">Customer Unavailable</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="notes">Status Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add notes about the status update..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {newStatus === "delivered" && (
            <div>
              <Label>Delivery Confirmation</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <Button variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Customer Notification */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customer Notification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="notify-customer" defaultChecked />
              <Label htmlFor="notify-customer">Notify customer of status change</Label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="send-eta" />
              <Label htmlFor="send-eta">Send updated ETA</Label>
            </div>
            {(newStatus === "delayed" || newStatus === "issue") && (
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange-500" />
                <span className="text-sm text-orange-600">Customer will be automatically notified of delays</span>
              </div>
            )}
            {newStatus === "delivered" && (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600">Delivery confirmation will be sent to customer</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </FormModal>
  );
};
