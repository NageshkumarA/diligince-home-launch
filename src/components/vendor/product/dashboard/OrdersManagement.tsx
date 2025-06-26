import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ShoppingCart, Package, Truck, Eye, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { OrderDetailsModal } from "./OrderDetailsModal";
import { getStatusColor, getPaymentStatusColor, getPriorityColor } from "@/utils/shared";

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
  const navigate = useNavigate();

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  const handleViewAllOrders = () => {
    navigate('/product-vendor-orders');
  };

  return (
    <>
      <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="h-4 w-4 text-orange-600" />
              </div>
              Orders Management
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              className="border-orange-200 text-orange-600 hover:bg-orange-50"
              onClick={handleViewAllOrders}
            >
              View All Orders
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {activeOrders.map((order) => (
              <div key={order.id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 text-sm">{order.id}</h4>
                      <Badge className={getPriorityColor(order.priority)}>
                        {order.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{order.title} • {order.client}</p>
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
                    <p className="font-semibold text-gray-900 text-sm">{order.value}</p>
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
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Order Progress</span>
                    <span className="text-gray-900 font-medium">{order.progress}%</span>
                  </div>
                  <Progress 
                    value={order.progress} 
                    className="h-2 bg-gray-100" 
                    indicatorClassName="bg-orange-500"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Expected delivery: {new Date(order.deliveryDate).toLocaleDateString()}
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleViewOrder(order)}
                    className="flex items-center gap-1 border-gray-200 hover:bg-gray-50"
                  >
                    <Eye className="h-3 w-3" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white"
            onClick={handleViewAllOrders}
          >
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
