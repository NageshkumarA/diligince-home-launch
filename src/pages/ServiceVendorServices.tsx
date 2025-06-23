
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

  // Mock services data
  const services = [
    {
      id: "SRV-001",
      name: "Custom Software Development",
      category: "Software Development",
      description: "End-to-end custom software development using modern technologies including React, Node.js, and cloud platforms.",
      skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
      pricing: "Hourly Rate",
      priceRange: "$80-120/hr",
      experience: "5+ years",
      portfolio: ["E-commerce Platform for RetailMax", "CRM System for TechCorp", "Mobile App for HealthPlus"],
      rating: 4.8,
      completedProjects: 42,
      activeProjects: 8,
      revenue: "$125,000"
    },
    {
      id: "SRV-002",
      name: "Digital Marketing Strategy",
      category: "Digital Marketing",
      description: "Comprehensive digital marketing services including SEO, content marketing, social media management, and PPC campaigns.",
      skills: ["SEO", "Content Marketing", "Social Media", "Google Ads", "Analytics"],
      pricing: "Monthly Retainer",
      priceRange: "$2,000-5,000/month",
      experience: "3+ years",
      portfolio: ["Marketing Campaign for TechStartup", "SEO Project for LocalBiz", "Social Media Strategy for Fashion Brand"],
      rating: 4.6,
      completedProjects: 28,
      activeProjects: 12,
      revenue: "$89,000"
    },
    {
      id: "SRV-003",
      name: "Brand Identity & Web Design",
      category: "Design & Branding",
      description: "Complete brand identity design including logo, visual guidelines, and responsive website development.",
      skills: ["Graphic Design", "Web Design", "Branding", "UI/UX", "WordPress"],
      pricing: "Fixed Price",
      priceRange: "$3,000-15,000",
      experience: "4+ years",
      portfolio: ["Brand Redesign for StartupXYZ", "Website for ConsultingPro", "Logo Design for TechInnovate"],
      rating: 4.9,
      completedProjects: 35,
      activeProjects: 5,
      revenue: "$78,000"
    },
    {
      id: "SRV-004",
      name: "Business Process Consulting",
      category: "Business Consulting",
      description: "Strategic business consulting focused on process optimization, digital transformation, and operational efficiency.",
      skills: ["Process Optimization", "Digital Transformation", "Project Management", "Strategic Planning"],
      pricing: "Milestone-based",
      priceRange: "$5,000-25,000",
      experience: "7+ years",
      portfolio: ["Process Optimization for ManufactureCorp", "Digital Strategy for RetailChain", "Efficiency Audit for LogisticsPro"],
      rating: 4.7,
      completedProjects: 18,
      activeProjects: 3,
      revenue: "$95,000"
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
              <h1 className="text-3xl font-bold text-gray-900">Services Portfolio</h1>
              <p className="text-gray-600 mt-1">Manage your service offerings and pricing</p>
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
                    <p className="text-2xl font-bold text-gray-900">$387K</p>
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
                    <p className="text-2xl font-bold text-gray-900">28</p>
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
                      placeholder="Search services..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Software Development">Software Development</SelectItem>
                    <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                    <SelectItem value="Design & Branding">Design & Branding</SelectItem>
                    <SelectItem value="Business Consulting">Business Consulting</SelectItem>
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
