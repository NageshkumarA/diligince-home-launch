
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import VendorHeader from "@/components/vendor/VendorHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Search, Eye, Truck, CheckCircle, Clock, Package, AlertCircle, MapPin } from "lucide-react";
import { toast } from "sonner";

interface Product {
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  customerEmail: string;
  products: Product[];
  totalAmount: number;
  orderDate: string;
  expectedDelivery: string;
  status: string;
  priority: string;
  shippingAddress: string;
  notes: string;
  trackingNumber?: string;
  deliveredDate?: string;
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    orderNumber: "PO-12456",
    customer: "Chem Industries",
    customerEmail: "procurement@chemindustries.com",
    products: [
      { name: "Industrial Ball Valve - 4 inch", quantity: 10, unitPrice: 15000, total: 150000 },
      { name: "Gate Valve - 6 inch", quantity: 5, unitPrice: 22000, total: 110000 }
    ],
    totalAmount: 260000,
    orderDate: "2024-05-10",
    expectedDelivery: "2024-05-20",
    status: "confirmed",
    priority: "high",
    shippingAddress: "Chemical Processing Plant, MIDC Tarapur, Maharashtra 401506",
    notes: "Urgent delivery required for plant maintenance shutdown"
  },
  {
    id: "ORD-002",
    orderNumber: "PO-12457",
    customer: "Power Gen Co.",
    customerEmail: "supplies@powergen.com",
    products: [
      { name: "Circuit Breaker - 100A", quantity: 20, unitPrice: 8500, total: 170000 }
    ],
    totalAmount: 170000,
    orderDate: "2024-05-12",
    expectedDelivery: "2024-05-25",
    status: "processing",
    priority: "medium",
    shippingAddress: "Power Plant Unit 2, Sector 15, Noida, UP 201301",
    notes: "Standard delivery schedule acceptable"
  },
  {
    id: "ORD-003",
    orderNumber: "PO-12458",
    customer: "Steel Plant Ltd.",
    customerEmail: "purchase@steelplant.com",
    products: [
      { name: "Safety Helmet - Hard Hat", quantity: 100, unitPrice: 450, total: 45000 },
      { name: "Safety Gloves - Heat Resistant", quantity: 200, unitPrice: 250, total: 50000 }
    ],
    totalAmount: 95000,
    orderDate: "2024-05-08",
    expectedDelivery: "2024-05-18",
    status: "shipped",
    priority: "low",
    shippingAddress: "Steel Manufacturing Unit, Industrial Area, Rourkela, Odisha 769012",
    notes: "Bulk safety equipment order for new shift workers",
    trackingNumber: "TRK123456789"
  },
  {
    id: "ORD-004",
    orderNumber: "PO-12459",
    customer: "AutoParts Ltd.",
    customerEmail: "orders@autoparts.com",
    products: [
      { name: "Hydraulic Pump", quantity: 3, unitPrice: 45000, total: 135000 }
    ],
    totalAmount: 135000,
    orderDate: "2024-05-15",
    expectedDelivery: "2024-05-28",
    status: "delivered",
    priority: "medium",
    shippingAddress: "Auto Manufacturing Plant, Gurgaon, Haryana 122001",
    notes: "Replacement parts for production line",
    deliveredDate: "2024-05-16"
  }
];

const ProductVendorOrders = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingInfo, setTrackingInfo] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "processing": return "bg-purple-100 text-purple-800";
      case "shipped": return "bg-orange-100 text-orange-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4" />;
      case "confirmed": return <CheckCircle className="w-4 h-4" />;
      case "processing": return <Package className="w-4 h-4" />;
      case "shipped": return <Truck className="w-4 h-4" />;
      case "delivered": return <CheckCircle className="w-4 h-4" />;
      case "cancelled": return <AlertCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    if (statusFilter !== "all" && order.status !== statusFilter) return false;
    if (searchTerm && !order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !order.customer.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
    toast.success(`Order status updated to ${newStatus}`);
  };

  const addTrackingInfo = (orderId: string, tracking: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, trackingNumber: tracking, status: "shipped" }
        : order
    ));
    setTrackingInfo("");
    toast.success("Tracking information added successfully");
  };

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => o.status === "processing" || o.status === "confirmed").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Orders | Product Vendor Dashboard</title>
      </Helmet>
      
      <VendorHeader />
      
      <main className="pt-32 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 mt-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
              <p className="text-gray-600">Track and manage your product orders</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">
                {orderStats.processing} Processing
              </Badge>
              <Badge className="bg-orange-100 text-orange-800">
                {orderStats.shipped} Shipped
              </Badge>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{orderStats.total}</p>
                  <p className="text-sm text-gray-600">Total Orders</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">{orderStats.pending}</p>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{orderStats.processing}</p>
                  <p className="text-sm text-gray-600">Processing</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{orderStats.shipped}</p>
                  <p className="text-sm text-gray-600">Shipped</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{orderStats.delivered}</p>
                  <p className="text-sm text-gray-600">Delivered</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search orders by number or customer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold text-gray-900">{order.orderNumber}</h3>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </Badge>
                        <Badge className={getPriorityColor(order.priority)}>
                          {order.priority}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Customer:</span>
                          <p className="font-medium">{order.customer}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Order Date:</span>
                          <p className="font-medium">{order.orderDate}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Expected Delivery:</span>
                          <p className="font-medium">{order.expectedDelivery}</p>
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <span className="text-gray-500">Products:</span>
                        <p className="font-medium">
                          {order.products.map(p => `${p.name} (${p.quantity})`).join(", ")}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-gray-500 text-sm">Total Amount:</span>
                          <p className="text-xl font-bold text-yellow-600">₹{order.totalAmount.toLocaleString()}</p>
                        </div>
                        
                        {order.trackingNumber && (
                          <div className="text-sm">
                            <span className="text-gray-500">Tracking:</span>
                            <p className="font-medium">{order.trackingNumber}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 lg:w-auto w-full">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" onClick={() => setSelectedOrder(order)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Order Details - {order.orderNumber}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            {/* Customer Information */}
                            <div>
                              <h4 className="font-semibold mb-2">Customer Information</h4>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">Company:</span>
                                  <p>{order.customer}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Email:</span>
                                  <p>{order.customerEmail}</p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Shipping Address */}
                            <div>
                              <h4 className="font-semibold mb-2">Shipping Address</h4>
                              <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                                <p className="text-sm">{order.shippingAddress}</p>
                              </div>
                            </div>
                            
                            {/* Products */}
                            <div>
                              <h4 className="font-semibold mb-2">Products</h4>
                              <div className="space-y-2">
                                {order.products.map((product, index) => (
                                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <div>
                                      <p className="font-medium">{product.name}</p>
                                      <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-medium">₹{product.total.toLocaleString()}</p>
                                      <p className="text-sm text-gray-600">@₹{product.unitPrice.toLocaleString()}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="border-t pt-2 mt-2">
                                <div className="flex justify-between items-center">
                                  <span className="font-semibold">Total Amount:</span>
                                  <span className="text-xl font-bold text-yellow-600">₹{order.totalAmount.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Notes */}
                            {order.notes && (
                              <div>
                                <h4 className="font-semibold mb-2">Order Notes</h4>
                                <p className="text-sm bg-blue-50 p-3 rounded">{order.notes}</p>
                              </div>
                            )}
                            
                            {/* Status Update */}
                            <div>
                              <h4 className="font-semibold mb-2">Update Order Status</h4>
                              <div className="flex gap-2">
                                {order.status === "confirmed" && (
                                  <Button 
                                    size="sm" 
                                    onClick={() => updateOrderStatus(order.id, "processing")}
                                    className="bg-yellow-600 hover:bg-yellow-700"
                                  >
                                    Mark as Processing
                                  </Button>
                                )}
                                {order.status === "processing" && (
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                                        <Truck className="w-4 h-4 mr-2" />
                                        Mark as Shipped
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Add Tracking Information</DialogTitle>
                                      </DialogHeader>
                                      <div className="space-y-4">
                                        <div>
                                          <label className="text-sm font-medium">Tracking Number</label>
                                          <Input
                                            placeholder="Enter tracking number"
                                            value={trackingInfo}
                                            onChange={(e) => setTrackingInfo(e.target.value)}
                                          />
                                        </div>
                                        <div className="flex justify-end space-x-2">
                                          <Button variant="outline">Cancel</Button>
                                          <Button 
                                            onClick={() => addTrackingInfo(order.id, trackingInfo)}
                                            className="bg-yellow-600 hover:bg-yellow-700"
                                          >
                                            Mark as Shipped
                                          </Button>
                                        </div>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                )}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      {order.status === "confirmed" && (
                        <Button 
                          size="sm" 
                          onClick={() => updateOrderStatus(order.id, "processing")}
                          className="bg-yellow-600 hover:bg-yellow-700"
                        >
                          Start Processing
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredOrders.length === 0 && (
            <Card className="p-8">
              <div className="text-center">
                <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Found</h3>
                <p className="text-gray-500">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "New orders will appear here when customers place them"}
                </p>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductVendorOrders;
