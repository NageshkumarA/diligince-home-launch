
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ShoppingCart, Package, Truck, Eye, Calendar } from "lucide-react";
import { OrderDetailsModal } from "./OrderDetailsModal";

const activeOrders = [
  {
    id: "PO-12456",
    title: "Automation Parts",
    client: "Chem Industries",
    items: 7,
    value: "₹275,000",
    status: "shipped",
    progress: 100,
    orderDate: "2024-04-25",
    deliveryDate: "2024-05-06",
    priority: "high",
    paymentStatus: "paid",
    shippingInfo: {
      carrier: "BlueDart",
      trackingNumber: "BD123456789",
      estimatedDelivery: "2024-05-06"
    }
  },
  {
    id: "PO-12455",
    title: "Electrical Components",
    client: "Power Gen Co.",
    items: 5,
    value: "₹180,000",
    status: "processing",
    progress: 30,
    orderDate: "2024-05-01",
    deliveryDate: "2024-05-12",
    priority: "medium",
    paymentStatus: "pending",
    shippingInfo: {
      carrier: "TBD",
      trackingNumber: null,
      estimatedDelivery: "2024-05-12"
    }
  }
];

export const OrdersManagement = () => {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-orange-100 text-orange-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Orders Management
            </CardTitle>
            <Button variant="outline" size="sm">
              View All Orders
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {activeOrders.map((order) => (
              <div key={order.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">{order.id}</h4>
                      <Badge className={getPriorityColor(order.priority)}>
                        {order.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{order.title} • {order.client}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        {order.items} items
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Ordered: {new Date(order.orderDate).toLocaleDateString()}
                      </span>
                      {order.shippingInfo.trackingNumber && (
                        <span className="flex items-center gap-1">
                          <Truck className="h-3 w-3" />
                          {order.shippingInfo.trackingNumber}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{order.value}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                        {order.paymentStatus}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Order Progress</span>
                    <span className="text-gray-900 font-medium">{order.progress}%</span>
                  </div>
                  <Progress value={order.progress} className="h-2" />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Expected delivery: {new Date(order.deliveryDate).toLocaleDateString()}
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleViewOrder(order)}
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-3 w-3" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Button className="w-full mt-4 bg-[#faad14] hover:bg-[#faad14]/90">
            View All Orders
          </Button>
        </CardContent>
      </Card>

      <OrderDetailsModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        order={selectedOrder}
      />
    </>
  );
};
