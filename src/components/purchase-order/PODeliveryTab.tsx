import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Truck, MapPin, Calendar, Upload, Package } from 'lucide-react';
import { DeliveryTracking } from '@/services/modules/purchase-orders';
import { format } from 'date-fns';

interface PODeliveryTabProps {
  orderId: string;
  delivery?: DeliveryTracking;
}

export const PODeliveryTab: React.FC<PODeliveryTabProps> = ({ orderId, delivery }) => {
  const getStatusColor = (status: string) => {
    const colors = {
      not_started: 'bg-gray-100 text-gray-800',
      in_transit: 'bg-blue-100 text-blue-800',
      partially_delivered: 'bg-yellow-100 text-yellow-800',
      delivered: 'bg-green-100 text-green-800',
      delayed: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (!delivery) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No delivery information available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Delivery Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Delivery Status
            </CardTitle>
            <Badge className={getStatusColor(delivery.status)}>
              {delivery.status.replace(/_/g, ' ').toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Tracking Number</p>
              <p className="text-lg font-medium">{delivery.trackingNumber || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Carrier</p>
              <p className="text-lg font-medium">{delivery.carrier || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expected Delivery</p>
              <p className="text-lg font-medium">
                {delivery.expectedDeliveryDate
                  ? format(new Date(delivery.expectedDeliveryDate), 'PPP')
                  : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Actual Delivery</p>
              <p className="text-lg font-medium">
                {delivery.actualDeliveryDate
                  ? format(new Date(delivery.actualDeliveryDate), 'PPP')
                  : 'Pending'}
              </p>
            </div>
          </div>

          {delivery.currentLocation && (
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Current Location</p>
                <p className="font-medium">{delivery.currentLocation}</p>
              </div>
            </div>
          )}

          {delivery.status !== 'delivered' && (
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Proof of Delivery
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Delivery Timeline */}
      {delivery.events && delivery.events.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Delivery Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {delivery.events.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    {index < delivery.events.length - 1 && (
                      <div className="w-0.5 h-full bg-border min-h-[40px]" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{event.description}</p>
                        {event.location && (
                          <p className="text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3 inline mr-1" />
                            {event.location}
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(event.timestamp), 'PPp')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
