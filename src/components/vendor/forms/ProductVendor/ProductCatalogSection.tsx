
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { 
  Plus, Search, Filter, Grid, List, Image, Upload, Box, Tag, 
  Trash, Edit, Copy
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const productSchema = z.object({
  productName: z.string().min(1, { message: "Product name is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  specifications: z.string().min(1, { message: "Specifications are required" }),
  price: z.string().min(1, { message: "Price is required" }),
  minOrderQuantity: z.string().min(1, { message: "Minimum order quantity is required" }),
  leadTime: z.string().min(1, { message: "Lead time is required" }),
  stockAvailability: z.string().min(1, { message: "Stock availability is required" }),
});

// Mock data for product list
const mockProducts = [
  {
    id: "1",
    name: "Industrial Bearing Kit",
    sku: "BRG-1001",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&h=120&fit=crop",
    category: "Mechanical Parts",
    price: "₹2,500.00",
    stock: "In Stock (25)",
  },
  {
    id: "2",
    name: "Electronic Motor Controller",
    sku: "EMC-2035",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=120&h=120&fit=crop",
    category: "Electrical Components",
    price: "₹15,750.00",
    stock: "In Stock (8)",
  },
  {
    id: "3",
    name: "Pressure Sensor Array",
    sku: "PSA-3022",
    thumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=120&h=120&fit=crop",
    category: "Instrumentation",
    price: "₹8,200.00",
    stock: "Low Stock (3)",
  },
  {
    id: "4",
    name: "Stainless Steel Pipe Fittings",
    sku: "SSP-4017",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=120&h=120&fit=crop",
    category: "Pumps & Valves",
    price: "₹950.00",
    stock: "Out of Stock",
  },
  {
    id: "5",
    name: "Safety Harness Kit",
    sku: "SHK-5099",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=120&h=120&fit=crop",
    category: "Safety Equipment",
    price: "₹4,250.00",
    stock: "In Stock (12)",
  }
];

// Category options for the form
const categoryOptions = [
  { value: "electrical", label: "Electrical Components" },
  { value: "mechanical", label: "Mechanical Parts" },
  { value: "pneumatic", label: "Pneumatic Systems" },
  { value: "hydraulic", label: "Hydraulic Components" },
  { value: "safety", label: "Safety Equipment" },
  { value: "instrumentation", label: "Instrumentation" },
  { value: "process_control", label: "Process Control" },
  { value: "pumps_valves", label: "Pumps & Valves" },
  { value: "motors_drives", label: "Motors & Drives" },
  { value: "maintenance_tools", label: "Maintenance Tools" },
  { value: "laboratory", label: "Laboratory Equipment" },
  { value: "raw_materials", label: "Raw Materials" },
];

const ProductCatalogSection = () => {
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState(mockProducts);
  const [images, setImages] = useState<string[]>([]);
  const [documents, setDocuments] = useState<string[]>([]);
  
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: "",
      category: "",
      description: "",
      specifications: "",
      price: "",
      minOrderQuantity: "",
      leadTime: "",
      stockAvailability: "",
    },
  });

  const onSubmit = (values: z.infer<typeof productSchema>) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Product values:", values);
      
      // Generate a new product object
      const newProduct = {
        id: (products.length + 1).toString(),
        name: values.productName,
        sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
        thumbnail: images.length > 0 ? images[0] : "https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&h=120&fit=crop",
        category: categoryOptions.find(c => c.value === values.category)?.label || values.category,
        price: `₹${values.price}`,
        stock: `In Stock (${values.stockAvailability})`,
      };
      
      // Add the new product to the list
      setProducts([...products, newProduct]);
      
      setIsLoading(false);
      setIsAddProductDialogOpen(false);
      form.reset();
      setImages([]);
      setDocuments([]);
      
      toast.success("Product added successfully!");
    }, 1500);
  };

  const handleImportProducts = () => {
    setIsImporting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsImporting(false);
      toast.success("Products imported successfully!");
    }, 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Simulate image upload
    if (e.target.files && e.target.files[0]) {
      const newImages = [...images];
      
      for (let i = 0; i < e.target.files.length; i++) {
        // In a real application, you would upload the file to a server
        // Here we're just creating a fake URL for demonstration
        const fakeUrl = `https://images.unsplash.com/photo-${1518770660439 + i}-4636190af475?w=120&h=120&fit=crop`;
        newImages.push(fakeUrl);
      }
      
      setImages(newImages);
      toast.success("Images uploaded successfully!");
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Simulate document upload
    if (e.target.files && e.target.files[0]) {
      const newDocuments = [...documents];
      
      for (let i = 0; i < e.target.files.length; i++) {
        // In a real application, you would upload the file to a server
        // Here we're just using the filename for demonstration
        newDocuments.push(e.target.files[i].name);
      }
      
      setDocuments(newDocuments);
      toast.success("Documents uploaded successfully!");
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
    toast.success("Product deleted successfully!");
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-800">Product Catalog</CardTitle>
              <CardDescription>
                Manage your products, add new items or import in bulk.
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-2">
              <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-yellow-600 hover:bg-yellow-700">
                    <Plus size={16} />
                    <span>Add Product</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                      Fill in the product details, specifications, and upload images.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <Tabs defaultValue="basic" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="basic">Basic Info</TabsTrigger>
                          <TabsTrigger value="specs">Specifications</TabsTrigger>
                          <TabsTrigger value="media">Images & Documents</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="basic" className="space-y-4 pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="productName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Product Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter product name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="category"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Category</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {categoryOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                          {option.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Product Description</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Enter detailed product description"
                                    className="min-h-32"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="price"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Price (₹)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter price" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="stockAvailability"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Stock Availability</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter quantity in stock" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="minOrderQuantity"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Minimum Order Quantity</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter minimum order quantity" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="leadTime"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Lead Time (days)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter lead time in days" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="specs" className="space-y-4 pt-4">
                          <FormField
                            control={form.control}
                            name="specifications"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Technical Specifications</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Enter technical specifications, one per line (e.g., Voltage: 220V, Material: Stainless Steel)"
                                    className="min-h-64"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TabsContent>
                        
                        <TabsContent value="media" className="space-y-6 pt-4">
                          <div className="space-y-3">
                            <FormLabel>Product Images</FormLabel>
                            <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                              <Image className="h-8 w-8 text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground text-center mb-2">
                                Drag and drop product images or click to browse
                              </p>
                              <p className="text-xs text-muted-foreground mb-4">
                                PNG, JPG or WEBP up to 5MB each
                              </p>
                              <Input
                                id="productImages"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => document.getElementById("productImages")?.click()}
                              >
                                Browse Images
                              </Button>
                            </div>
                            
                            {images.length > 0 && (
                              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-4">
                                {images.map((image, index) => (
                                  <div key={index} className="relative rounded-md overflow-hidden border h-24">
                                    <img src={image} alt={`Product ${index}`} className="w-full h-full object-cover" />
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="icon"
                                      className="absolute top-1 right-1 h-6 w-6"
                                      onClick={() => setImages(images.filter((_, i) => i !== index))}
                                    >
                                      <Trash size={12} />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-3">
                            <FormLabel>Product Documents</FormLabel>
                            <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground text-center mb-2">
                                Drag and drop product documents or click to browse
                              </p>
                              <p className="text-xs text-muted-foreground mb-4">
                                PDF, DOC or XLS up to 10MB each
                              </p>
                              <Input
                                id="productDocuments"
                                type="file"
                                className="hidden"
                                accept=".pdf,.doc,.docx,.xls,.xlsx"
                                multiple
                                onChange={handleDocumentUpload}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => document.getElementById("productDocuments")?.click()}
                              >
                                Browse Documents
                              </Button>
                            </div>
                            
                            {documents.length > 0 && (
                              <div className="space-y-2 mt-4">
                                {documents.map((document, index) => (
                                  <div key={index} className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
                                    <span className="text-sm font-medium">{document}</span>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => setDocuments(documents.filter((_, i) => i !== index))}
                                    >
                                      <Trash size={16} />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </TabsContent>
                      </Tabs>
                      
                      <DialogFooter>
                        <Button 
                          variant="outline" 
                          type="button" 
                          onClick={() => setIsAddProductDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit" 
                          className="bg-yellow-600 hover:bg-yellow-700" 
                          disabled={isLoading}
                        >
                          {isLoading ? "Adding..." : "Add Product"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
              
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={handleImportProducts}
                disabled={isImporting}
              >
                <Upload size={16} />
                <span>{isImporting ? "Importing..." : "Import Products"}</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center justify-between gap-4">
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Filter size={16} />
                </Button>
                
                <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as "grid" | "list")}>
                  <ToggleGroupItem value="grid" aria-label="Grid view">
                    <Grid size={16} />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="list" aria-label="List view">
                    <List size={16} />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Box className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No products found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {searchQuery ? "Try a different search term" : "Add your first product to get started"}
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="aspect-square relative">
                      <img 
                        src={product.thumbnail} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Button variant="secondary" size="icon" className="h-8 w-8 opacity-90">
                          <Edit size={14} />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          className="h-8 w-8 opacity-90"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash size={14} />
                        </Button>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <Badge className="mb-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200">
                        {product.category}
                      </Badge>
                      <h3 className="font-medium text-base mb-1 truncate">{product.name}</h3>
                      <div className="text-sm text-muted-foreground mb-2">SKU: {product.sku}</div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-yellow-700">{product.price}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          product.stock.includes("In Stock") 
                            ? "bg-green-100 text-green-800" 
                            : product.stock.includes("Low")
                              ? "bg-orange-100 text-orange-800"
                              : "bg-red-100 text-red-800"
                        }`}>
                          {product.stock}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-medium text-xs uppercase text-muted-foreground">Product</th>
                      <th className="text-left p-3 font-medium text-xs uppercase text-muted-foreground">SKU</th>
                      <th className="text-left p-3 font-medium text-xs uppercase text-muted-foreground">Category</th>
                      <th className="text-left p-3 font-medium text-xs uppercase text-muted-foreground">Price</th>
                      <th className="text-left p-3 font-medium text-xs uppercase text-muted-foreground">Stock</th>
                      <th className="text-right p-3 font-medium text-xs uppercase text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <img 
                              src={product.thumbnail} 
                              alt={product.name}
                              className="w-10 h-10 rounded-md object-cover"
                            />
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">{product.sku}</td>
                        <td className="p-3">
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200">
                            {product.category}
                          </Badge>
                        </td>
                        <td className="p-3 font-medium text-yellow-700">{product.price}</td>
                        <td className="p-3">
                          <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                            product.stock.includes("In Stock") 
                              ? "bg-green-100 text-green-800" 
                              : product.stock.includes("Low")
                                ? "bg-orange-100 text-orange-800"
                                : "bg-red-100 text-red-800"
                          }`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon">
                              <Copy size={16} />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCatalogSection;
