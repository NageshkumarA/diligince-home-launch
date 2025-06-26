import React, { useState, useMemo, memo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Search, AlertTriangle, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const topProducts = [
  {
    id: 1,
    name: "PLC Controller S7-1200",
    category: "Automation",
    sales: 32,
    stock: "In Stock",
    stockLevel: 45,
    price: "₹85,000",
    brand: "Siemens",
    reorderLevel: 10,
    trend: "up"
  },
  {
    id: 2,
    name: "Pressure Transmitter PT100",
    category: "Instrumentation",
    sales: 28,
    stock: "In Stock",
    stockLevel: 67,
    price: "₹12,500",
    brand: "Rosemount",
    reorderLevel: 15,
    trend: "up"
  },
  {
    id: 3,
    name: "Pneumatic Valve V-250",
    category: "Valves",
    sales: 22,
    stock: "Low Stock",
    stockLevel: 8,
    price: "₹3,500",
    brand: "Festo",
    reorderLevel: 20,
    trend: "down"
  },
  {
    id: 4,
    name: "Flow Meter FM-420",
    category: "Instrumentation",
    sales: 18,
    stock: "In Stock",
    stockLevel: 23,
    price: "₹45,000",
    brand: "Endress+Hauser",
    reorderLevel: 5,
    trend: "stable"
  }
];

// Memoized product item component
const ProductItem = memo(({ product, onViewDetails }: { 
  product: typeof topProducts[0], 
  onViewDetails: (id: number) => void 
}) => {
  const getStockColor = useCallback((stock: string) => {
    switch (stock) {
      case "In Stock":
        return "bg-green-100 text-green-800 border-green-200";
      case "Low Stock":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Out of Stock":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  }, []);

  const getTrendIcon = useCallback((trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-600" />;
      case "down":
        return <TrendingUp className="h-3 w-3 text-red-600 rotate-180" />;
      default:
        return <div className="h-3 w-3 bg-gray-400 rounded-full" />;
    }
  }, []);

  const handleViewDetails = useCallback(() => {
    onViewDetails(product.id);
  }, [product.id, onViewDetails]);

  return (
    <div className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 mb-1 text-sm">{product.name}</h4>
          <p className="text-sm text-gray-600">{product.brand} • {product.category}</p>
        </div>
        <div className="flex items-center gap-2">
          {getTrendIcon(product.trend)}
          <Badge className={getStockColor(product.stock)}>
            {product.stock}
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 mb-3">
        <div>Sales: <span className="font-medium text-gray-900">{product.sales}</span></div>
        <div>Stock: <span className="font-medium text-gray-900">{product.stockLevel}</span></div>
        <div>Price: <span className="font-medium text-gray-900">{product.price}</span></div>
        <div className="flex items-center gap-1">
          {product.stockLevel <= product.reorderLevel && (
            <AlertTriangle className="h-3 w-3 text-orange-500" />
          )}
          <span className={product.stockLevel <= product.reorderLevel ? "text-orange-600 font-medium" : ""}>
            Reorder: {product.reorderLevel}
          </span>
        </div>
      </div>
      
      <Button 
        size="sm" 
        variant="outline" 
        className="w-full border-gray-200 hover:bg-gray-50"
        onClick={handleViewDetails}
      >
        View Details
      </Button>
    </div>
  );
});

ProductItem.displayName = "ProductItem";

export const ProductCatalogView = memo(() => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => 
    topProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]
  );

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleViewDetails = useCallback((id: number) => {
    console.log("View details for product:", id);
  }, []);

  const handleManageCatalog = useCallback(() => {
    navigate('/product-vendor-catalog');
  }, [navigate]);

  const handleViewAllProducts = useCallback(() => {
    navigate('/product-vendor-catalog');
  }, [navigate]);

  return (
    <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <Package className="h-4 w-4 text-orange-600" />
            </div>
            Product Catalog
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            className="border-orange-200 text-orange-600 hover:bg-orange-50"
            onClick={handleManageCatalog}
          >
            Manage Catalog
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 border-gray-200 focus:border-orange-300 focus:ring-orange-200"
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {filteredProducts.map((product) => (
            <ProductItem 
              key={product.id} 
              product={product} 
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
        
        <Button 
          className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white"
          onClick={handleViewAllProducts}
        >
          View All Products
        </Button>
      </CardContent>
    </Card>
  );
});

ProductCatalogView.displayName = "ProductCatalogView";
