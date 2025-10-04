import React, { useState } from "react";
import VendorHeader from "@/components/vendor/VendorHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Star,
  Users,
  DollarSign,
  Building2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ServiceModal } from "@/components/vendor/service/modals/ServiceModal";

// Define service type
interface Service {
  id: string;
  name: string;
  category: string;
  industry: string;
  description: string;
  skills: string[];
  pricing: string;
  priceRange: string;
  experience: string;
  portfolio: string[];
  rating: number;
  completedProjects: number;
  activeProjects: number;
  revenue: string;
  certifications?: string[];
}

const ServiceVendorServices: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [industryFilter, setIndustryFilter] = useState<string>("all");
  const [showServiceModal, setShowServiceModal] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // Sample services (you already had these)
  const services: Service[] = [
    {
      id: "SRV-001",
      name: "Oil & Gas Plant EPC Services",
      category: "EPC Services (Engineering, Procurement, Construction)",
      industry: "Oil & Gas",
      description: "Complete EPC services for oil & gas facilities...",
      skills: ["Process Engineering", "HAZOP Studies"],
      pricing: "LSTK (Lump Sum Turn Key)",
      priceRange: "$50M-500M",
      experience: "15+ years",
      portfolio: ["Refinery Expansion - Petrotech Corp"],
      rating: 4.9,
      completedProjects: 45,
      activeProjects: 8,
      revenue: "$2.8M",
      certifications: ["API 570", "ISO 9001"],
    },
    // Add other services here...
  ];

  const serviceCategories: string[] = [
    "EPC Services (Engineering, Procurement, Construction)",
    "Specialized Industrial Contracting",
    "Consultancy Services",
    "Maintenance & Operations",
    "Specialized Technical Services",
  ];

  const industries: string[] = [
    "Oil & Gas",
    "Petrochemicals",
    "Power Generation",
    "Manufacturing",
    "Mining & Metals",
    "Environmental",
    "Multiple Industries",
  ];

  const handleAddService = () => {
    setSelectedService(null);
    setIsEditMode(false);
    setShowServiceModal(true);
  };

  const handleEditService = (service: Service) => {
    setSelectedService(service);
    setIsEditMode(true);
    setShowServiceModal(true);
  };

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || service.category === categoryFilter;
    const matchesIndustry =
      industryFilter === "all" || service.industry === industryFilter;
    return matchesSearch && matchesCategory && matchesIndustry;
  });

  const totalRevenue = services.reduce((sum, service) => {
    const revenue = parseFloat(service.revenue.replace(/[$MK,]/g, ""));
    const multiplier = service.revenue.includes("M") ? 1000000 : 1000;
    return sum + revenue * multiplier;
  }, 0);

  const totalActiveProjects = services.reduce(
    (sum, service) => sum + service.activeProjects,
    0
  );
  const avgRating =
    services.reduce((sum, service) => sum + service.rating, 0) /
    services.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <VendorHeader /> */}

      <main className="pt-32 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 mt-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Industrial Services Portfolio
              </h1>
              <p className="text-gray-600 mt-1">
                EPC, Contracting & Consultancy Services for Industrial Clients
              </p>
            </div>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
              onClick={handleAddService}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Service
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-gray-600">Active Services</p>
                <p className="text-2xl font-bold">{services.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">
                  ${(totalRevenue / 1000000).toFixed(1)}M
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold">{totalActiveProjects}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold">{avgRating.toFixed(1)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardContent className="p-6 flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search industrial services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full lg:w-80">
                  <SelectValue placeholder="Filter by service category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Service Categories</SelectItem>
                  {serviceCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="w-full lg:w-64">
                  <SelectValue placeholder="Filter by industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries.map((ind) => (
                    <SelectItem key={ind} value={ind}>
                      {ind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button>
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </CardContent>
          </Card>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredServices.map((service) => (
              <Card key={service.id}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold">{service.name}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      onClick={() => console.log("View Details", service.id)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleEditService(service)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Service Modal */}
      <ServiceModal
        isOpen={showServiceModal}
        onClose={() => setShowServiceModal(false)}
        service={selectedService}
        isEdit={isEditMode}
      />
    </div>
  );
};

export default ServiceVendorServices;
