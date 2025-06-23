
import React, { useState } from "react";
import VendorHeader from "@/components/vendor/VendorHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, Edit, Eye, Star, TrendingUp, Users, DollarSign } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ServiceModal } from "@/components/vendor/service/modals/ServiceModal";

const ServiceVendorServices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Industrial services data
  const services = [
    {
      id: "SRV-001",
      name: "Industrial Equipment Maintenance",
      category: "Equipment Maintenance & Repair",
      description: "Comprehensive maintenance services for industrial machinery including preventive maintenance, emergency repairs, and equipment overhauls for manufacturing facilities.",
      skills: ["PLC Programming", "Hydraulics", "Pneumatics", "Electrical Systems", "Predictive Maintenance"],
      pricing: "Hourly Rate",
      priceRange: "$120-180/hr",
      experience: "8+ years",
      portfolio: ["Steel Mill Equipment Overhaul - MetalWorks Industries", "Chemical Plant Maintenance - ChemPro Manufacturing", "Food Processing Line Repair - AgriFood Corp"],
      rating: 4.8,
      completedProjects: 156,
      activeProjects: 12,
      revenue: "$485,000"
    },
    {
      id: "SRV-002",
      name: "Industrial Automation & Control Systems",
      category: "Industrial Automation & Control Systems",
      description: "Design, installation, and programming of industrial automation systems including SCADA, PLC programming, and process control optimization.",
      skills: ["Siemens PLC", "Allen-Bradley", "SCADA Systems", "HMI Programming", "Industrial Networks"],
      pricing: "Fixed Price",
      priceRange: "$25,000-85,000",
      experience: "10+ years",
      portfolio: ["Manufacturing Plant Automation - AutoMfg Corp", "Process Control Upgrade - ChemProcess Ltd", "SCADA Implementation - PowerGen Industries"],
      rating: 4.9,
      completedProjects: 89,
      activeProjects: 8,
      revenue: "$625,000"
    },
    {
      id: "SRV-003",
      name: "Safety & Compliance Auditing",
      category: "Safety & Compliance Auditing",
      description: "Comprehensive safety audits, regulatory compliance assessments, and implementation of safety management systems for industrial facilities.",
      skills: ["OSHA Standards", "ISO 45001", "Risk Assessment", "Safety Training", "Regulatory Compliance"],
      pricing: "Milestone-based",
      priceRange: "$15,000-45,000",
      experience: "12+ years",
      portfolio: ["Safety Audit - Petroleum Refinery Corp", "Compliance Assessment - Mining Operations Ltd", "Safety System Implementation - Chemical Plant XYZ"],
      rating: 4.7,
      completedProjects: 124,
      activeProjects: 6,
      revenue: "$398,000"
    },
    {
      id: "SRV-004",
      name: "Manufacturing Process Optimization",
      category: "Manufacturing Process Optimization",
      description: "Lean manufacturing implementation, process efficiency analysis, and production optimization services for manufacturing facilities.",
      skills: ["Lean Manufacturing", "Six Sigma", "Process Analysis", "Production Planning", "Quality Control"],
      pricing: "Monthly Retainer",
      priceRange: "$8,000-25,000/month",
      experience: "15+ years",
      portfolio: ["Production Optimization - Automotive Parts Mfg", "Lean Implementation - Steel Processing Plant", "Efficiency Audit - Pharmaceutical Manufacturing"],
      rating: 4.8,
      completedProjects: 67,
      activeProjects: 9,
      revenue: "$512,000"
    }
  ];

  const handleAddService = () => {
    setSelectedService(null);
    setIsEditMode(false);
    setShowServiceModal(true);
  };

  const handleEditService = (service: any) => {
    setSelectedService(service);
    setIsEditMode(true);
    setShowServiceModal(true);
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      
      <main className="pt-20 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Industrial Services Portfolio</h1>
              <p className="text-gray-600 mt-1">Manage your industrial service offerings and pricing</p>
            </div>
            <Button className="bg-yellow-600 hover:bg-yellow-700" onClick={handleAddService}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Service
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Eye className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Services</p>
                    <p className="text-2xl font-bold text-gray-900">4</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">$2.02M</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Users className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Projects</p>
                    <p className="text-2xl font-bold text-gray-900">35</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                    <p className="text-2xl font-bold text-gray-900">4.8</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search industrial services..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Equipment Maintenance & Repair">Equipment Maintenance & Repair</SelectItem>
                    <SelectItem value="Industrial Automation & Control Systems">Industrial Automation & Control Systems</SelectItem>
                    <SelectItem value="Safety & Compliance Auditing">Safety & Compliance Auditing</SelectItem>
                    <SelectItem value="Manufacturing Process Optimization">Manufacturing Process Optimization</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredServices.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                      <Badge variant="secondary" className="bg-yellow-50 text-yellow-700">
                        {service.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{service.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm">{service.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Projects Completed</p>
                      <p className="font-semibold">{service.completedProjects}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Active Projects</p>
                      <p className="font-semibold">{service.activeProjects}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Pricing Model</p>
                      <p className="font-semibold text-sm">{service.pricing}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Price Range</p>
                      <p className="font-semibold text-sm">{service.priceRange}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Key Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {service.skills.slice(0, 4).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {service.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{service.skills.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditService(service)}>
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
