
import React from "react";
import { DetailsModal } from "@/components/shared/modals/DetailsModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageSquare, User, Star, Clock } from "lucide-react";

interface ContactDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  delivery: any;
}

export const ContactDriverModal = ({ isOpen, onClose, delivery }: ContactDriverModalProps) => {
  if (!delivery) return null;

  const driverInfo = {
    name: delivery.driver,
    phone: "+91 98765 43210",
    rating: 4.8,
    experience: "12 years",
    status: "on-duty",
    vehicle: delivery.vehicle,
    lastContact: "2 hours ago"
  };

  return (
    <DetailsModal
      isOpen={isOpen}
      onClose={onClose}
      title="Contact Driver"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Driver Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Driver Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{driverInfo.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span>{driverInfo.rating} • {driverInfo.experience}</span>
                </div>
                <Badge className="bg-green-100 text-green-800 mt-1">
                  {driverInfo.status}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Phone:</span>
                <p className="font-medium">{driverInfo.phone}</p>
              </div>
              <div>
                <span className="text-gray-600">Vehicle:</span>
                <p className="font-medium">{driverInfo.vehicle}</p>
              </div>
              <div>
                <span className="text-gray-600">Last Contact:</span>
                <p className="font-medium">{driverInfo.lastContact}</p>
              </div>
              <div>
                <span className="text-gray-600">Current Delivery:</span>
                <p className="font-medium">{delivery.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Contact Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-green-600 hover:bg-green-700">
                <Phone className="h-4 w-4 mr-2" />
                Call Driver
              </Button>
              <Button variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send SMS
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Send Message */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Send Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input placeholder="Message subject" />
            </div>
            <div>
              <Textarea 
                placeholder="Type your message to the driver..."
                rows={4}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                Save as Template
              </Button>
              <Button className="flex-1">
                Send Message
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Communications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Communications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Clock className="h-4 w-4 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Status Update Requested</p>
                  <p className="text-xs text-gray-600">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="h-4 w-4 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Call - Route Clarification</p>
                  <p className="text-xs text-gray-600">4 hours ago • 3 min</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DetailsModal>
  );
};
