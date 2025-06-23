
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Plus, Search, Eye, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockProducts = [
  {
    id: 1,
    name: "Industrial Valve V-450",
    category: "Valves",
    sku: "IV-450-001",
    stock: 25,
    price: "₹45,000",
    status: "active",
    image: "/placeholder.svg",
    description: "High-pressure industrial valve for chemical processing"
  },
  {
    id: 2,
    name: "Pressure Sensor PS-200",
    category: "Sensors",
    sku: "PS-200-002",
    stock: 12,
    price: "₹8,500",
    status: "low-stock",
    image: "/placeholder.svg",
    description: "Digital pressure sensor with 4-20mA output"
  },
  {
    id: 3,
    name: "Control Panel CP-300",
    category: "Panels",
    sku: "CP-300-003",
    stock: 0,
    price: "₹125,000",
    status: "out-of-stock",
    image: "/placeholder.svg",
    description: "Complete control panel with PLC and HMI"
  }
];

export const ProductCatalogView = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "low-stock":
        return "bg-yellow-100 text-yellow-800";
      case "out-of-stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Package className="h-5 w-5" />
            Product Catalog
          </CardTitle>
          <Button size="sm" className="bg-[#faad14] hover:bg-[#faad14]/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {filteredProducts.map((product) => (
            <div key={product.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-600">{product.category} • {product.sku}</p>
                </div>
                <Badge className={getStatusColor(product.status)}>
                  {product.status.replace("-", " ")}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-700 mb-2 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="font-medium text-gray-900">{product.price}</span>
                  <span className="text-gray-500 ml-2">Stock: {product.stock}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button className="w-full mt-4 bg-[#faad14] hover:bg-[#faad14]/90">
          View Full Catalog
        </Button>
      </CardContent>
    </Card>
  );
};
