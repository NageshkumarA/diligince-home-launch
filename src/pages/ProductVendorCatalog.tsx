
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
import { Search, Filter, Plus, Edit, Trash2, Package, Upload, Download, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

// Mock product catalog data
const mockProducts = [
  {
    id: 1,
    name: "Industrial Ball Valve - 4 inch",
    sku: "IBV-4-SS316",
    category: "Valves",
    price: 15000,
    stock: 25,
    minStock: 10,
    description: "High-quality stainless steel ball valve for industrial applications",
    specifications: ["Material: SS316", "Size: 4 inch", "Pressure: 150 PSI", "API 6D Certified"],
    image: "/placeholder.svg",
    status: "active"
  },
  {
    id: 2,
    name: "Circuit Breaker - 100A",
    sku: "CB-100A-415V",
    category: "Electrical",
    price: 8500,
    stock: 5,
    minStock: 15,
    description: "Industrial grade circuit breaker with overload protection",
    specifications: ["Current: 100A", "Voltage: 415V", "IP65 Rating", "CE Certified"],
    image: "/placeholder.svg",
    status: "active"
  },
  {
    id: 3,
    name: "Safety Helmet - Hard Hat",
    sku: "SH-HH-001",
    category: "Safety Equipment",
    price: 450,
    stock: 0,
    minStock: 50,
    description: "Industrial safety helmet with adjustable headband",
    specifications: ["Material: ABS", "Color: Yellow", "ISI Marked", "Adjustable"],
    image: "/placeholder.svg",
    status: "out-of-stock"
  }
];

const ProductVendorCatalog = () => {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showStockUpdate, setShowStockUpdate] = useState(false);
  const [stockUpdates, setStockUpdates] = useState<{[key: number]: number}>({});

  const getStockStatus = (product: any) => {
    if (product.stock === 0) return { status: "out-of-stock", color: "bg-red-100 text-red-800" };
    if (product.stock <= product.minStock) return { status: "low-stock", color: "bg-yellow-100 text-yellow-800" };
    return { status: "in-stock", color: "bg-green-100 text-green-800" };
  };

  const filteredProducts = products.filter(product => {
    if (categoryFilter !== "all" && product.category !== categoryFilter) return false;
    if (stockFilter === "low-stock" && product.stock > product.minStock) return false;
    if (stockFilter === "out-of-stock" && product.stock > 0) return false;
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !product.sku.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const categories = [...new Set(products.map(p => p.category))];

  const handleBulkStockUpdate = () => {
    setProducts(prev => prev.map(product => 
      stockUpdates[product.id] !== undefined 
        ? { ...product, stock: stockUpdates[product.id] }
        : product
    ));
    setStockUpdates({});
    setShowStockUpdate(false);
    toast.success("Stock levels updated successfully!");
  };

  const lowStockCount = products.filter(p => p.stock <= p.minStock && p.stock > 0).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Product Catalog | Product Vendor Dashboard</title>
      </Helmet>
      
      <VendorHeader />
      
      <main className="pt-24 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 mt-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Product Catalog</h1>
              <p className="text-gray-600">Manage your product inventory and catalog</p>
            </div>
            <div className="flex items-center gap-3">
              {lowStockCount > 0 && (
                <Badge className="bg-yellow-100 text-yellow-800">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {lowStockCount} Low Stock
                </Badge>
              )}
              {outOfStockCount > 0 && (
                <Badge className="bg-red-100 text-red-800">
                  {outOfStockCount} Out of Stock
                </Badge>
              )}
              <Button className="bg-yellow-600 hover:bg-yellow-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Products</p>
                    <p className="text-2xl font-bold">{products.length}</p>
                  </div>
                  <Package className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">In Stock</p>
                    <p className="text-2xl font-bold text-green-600">
                      {products.filter(p => p.stock > p.minStock).length}
                    </p>
                  </div>
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Package className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Low Stock</p>
                    <p className="text-2xl font-bold text-yellow-600">{lowStockCount}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Out of Stock</p>
                    <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
                  </div>
                  <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                    <Package className="h-4 w-4 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-col md:flex-row gap-4 flex-1">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search products by name or SKU..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={stockFilter} onValueChange={setStockFilter}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Filter by stock" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Stock Levels</SelectItem>
                      <SelectItem value="low-stock">Low Stock</SelectItem>
                      <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowStockUpdate(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Quick Stock Update
                  </Button>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Import CSV
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product);
              return (
                <Card key={product.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <Package className="h-12 w-12 text-gray-400" />
                    </div>
                    <CardTitle className="text-lg text-gray-900 line-clamp-2">{product.name}</CardTitle>
                    <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                    <Badge variant="outline" className="w-fit">
                      {product.category}
                    </Badge>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-yellow-600">₹{product.price.toLocaleString()}</span>
                      <Badge className={stockStatus.color}>
                        {product.stock} in stock
                      </Badge>
                    </div>
                    
                    {product.stock <= product.minStock && (
                      <div className="flex items-center gap-2 text-sm text-yellow-600">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Below minimum stock ({product.minStock})</span>
                      </div>
                    )}
                    
                    <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                    
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Bulk Stock Update Modal */}
          <Dialog open={showStockUpdate} onOpenChange={setShowStockUpdate}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Quick Stock Update</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Update stock levels for multiple products at once. Leave blank to keep current stock.
                </p>
                
                <div className="space-y-3">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                        <p className="text-sm">Current: {product.stock} units</p>
                      </div>
                      <div className="w-32">
                        <Input
                          type="number"
                          placeholder="New stock"
                          value={stockUpdates[product.id] || ""}
                          onChange={(e) => setStockUpdates(prev => ({
                            ...prev,
                            [product.id]: parseInt(e.target.value) || 0
                          }))}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowStockUpdate(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleBulkStockUpdate} className="bg-yellow-600 hover:bg-yellow-700">
                    Update Stock Levels
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          {filteredProducts.length === 0 && (
            <Card className="p-8">
              <div className="text-center">
                <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Found</h3>
                <p className="text-gray-500">
                  {searchTerm || categoryFilter !== "all" || stockFilter !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "Start by adding your first product to the catalog"}
                </p>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductVendorCatalog;
