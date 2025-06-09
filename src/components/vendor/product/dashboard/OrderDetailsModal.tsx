
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Building, Calendar, Package, Truck, CreditCard, MapPin } from "lucide-react";
import { BaseModal } from "@/components/shared/modals/BaseModal";
import { getStatusColor, getPaymentStatusColor } from "@/utils/shared";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

export const OrderDetailsModal = ({ isOpen, onClose, order }: OrderDetailsModalProps) => {
  if (!order) return null;

  const mockOrderedItems = [
    { name: "PLC Controller", quantity: 2, unitPrice: "₹85,000", total: "₹170,000" },
    { name: "HMI Display", quantity: 1, unitPrice: "₹45,000", total: "₹45,000" },
    { name: "I/O Modules", quantity: 4, unitPrice: "₹15,000", total: "₹60,000" }
  ];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Order Details - ${order.id}`}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Order Header */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{order.client}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>Order Date: {new Date(order.orderDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-gray-500" />
              <span>Expected Delivery: {new Date(order.deliveryDate).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(order.status)}>
                {order.status}
              </Badge>
              <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                {order.paymentStatus}
              </Badge>
            </div>
            <div className="text-2xl font-bold text-gray-900">{order.value}</div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{order.progress}%</span>
              </div>
              <Progress value={order.progress} className="h-2" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Shipping Information */}
        {order.shippingInfo && (
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Shipping Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Carrier:</span>
                <span className="ml-2 font-medium">{order.shippingInfo.carrier}</span>
              </div>
              {order.shippingInfo.trackingNumber && (
                <div>
                  <span className="text-gray-600">Tracking Number:</span>
                  <span className="ml-2 font-medium">{order.shippingInfo.trackingNumber}</span>
                </div>
              )}
              <div>
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="ml-2 font-medium">
                  {new Date(order.shippingInfo.estimatedDelivery).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        )}

        <Separator />

        {/* Order Items */}
        <div>
          <h3 className="font-semibold mb-3">Order Items</h3>
          <div className="space-y-2">
            {mockOrderedItems.map((item, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 p-3 bg-gray-50 rounded-lg text-sm">
                <div className="font-medium">{item.name}</div>
                <div className="text-center">Qty: {item.quantity}</div>
                <div className="text-center">{item.unitPrice}</div>
                <div className="text-right font-medium">{item.total}</div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="outline">
            Generate Invoice
          </Button>
          <Button variant="outline">
            Print Order
          </Button>
          <Button className="bg-[#faad14] hover:bg-[#faad14]/90">
            Update Status
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
