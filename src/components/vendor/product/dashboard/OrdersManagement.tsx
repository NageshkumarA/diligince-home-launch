
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Truck, Package, Eye, MessageSquare } from "lucide-react";

const mockOrders = [
  {
    id: "PO-2024-001",
    customer: "Steel Plant Ltd.",
    products: [
      { name: "Industrial Valve V-450", quantity: 5, price: "₹45,000" }
    ],
    totalValue: "₹2,25,000",
    orderDate: "2024-05-01",
    deliveryDate: "2024-05-15",
    status: "processing",
    priority: "high",
    shippingAddress: "Mumbai, Maharashtra"
  },
  {
    id: "PO-2024-002",
    customer: "Chem Industries",
    products: [
      { name: "Pressure Sensor PS-200", quantity: 10, price: "₹8,500" }
    ],
    totalValue: "₹85,000",
    orderDate: "2024-04-28",
    deliveryDate: "2024-05-12",
    status: "shipped",
    priority: "medium",
    shippingAddress: "Pune, Maharashtra"
  },
  {
    id: "PO-2024-003",
    customer: "Power Gen Co.",
    products: [
      { name: "Control Panel CP-300", quantity: 1, price: "₹1,25,000" }
    ],
    totalValue: "₹1,25,000",
    orderDate: "2024-04-25",
    deliveryDate: "2024-05-10",
    status: "delivered",
    priority: "high",
    shippingAddress: "Delhi, NCR"
  }
];

export const OrdersManagement = () => {
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
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

  const filteredOrders = filterStatus === "all" 
    ? mockOrders 
    : mockOrders.filter(order => order.status === filterStatus);

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Orders Management
          </CardTitle>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1 border rounded-md text-sm"
            >
              <option value="all">All Orders</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
            <Button variant="outline" size="sm">
              Export Orders
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{order.id}</h4>
                    <Badge className={getPriorityColor(order.priority)}>
                      {order.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </div>
              
              <div className="mb-3">
                <h5 className="text-sm font-medium mb-2">Products:</h5>
                {order.products.map((product, index) => (
                  <div key={index} className="text-sm text-gray-700">
                    {product.name} - Qty: {product.quantity} @ {product.price}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <span className="text-gray-600">Order Date:</span>
                  <span className="ml-2 font-medium">{new Date(order.orderDate).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Delivery Date:</span>
                  <span className="ml-2 font-medium">{new Date(order.deliveryDate).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Total Value:</span>
                  <span className="ml-2 font-bold text-gray-900">{order.totalValue}</span>
                </div>
                <div>
                  <span className="text-gray-600">Shipping To:</span>
                  <span className="ml-2">{order.shippingAddress}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {order.status === "processing" && (
                    <Button size="sm" className="bg-[#faad14] hover:bg-[#faad14]/90">
                      <Truck className="h-4 w-4 mr-1" />
                      Ship Order
                    </Button>
                  )}
                  {order.status === "shipped" && (
                    <Button size="sm" variant="outline">
                      <Package className="h-4 w-4 mr-1" />
                      Track Package
                    </Button>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
