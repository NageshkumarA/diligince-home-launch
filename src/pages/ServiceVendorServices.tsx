
import React, { useState } from "react";
import VendorHeader from "@/components/vendor/VendorHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, Edit, Eye, Star, TrendingUp, Users, DollarSign, Building2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ServiceModal } from "@/components/vendor/service/modals/ServiceModal";

const ServiceVendorServices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Comprehensive industrial services data
  const services = [
    {
      id: "SRV-001",
      name: "Oil & Gas Plant EPC Services",
      category: "EPC Services (Engineering, Procurement, Construction)",
      industry: "Oil & Gas",
      description: "Complete EPC services for oil & gas facilities including refineries, petrochemical plants, and offshore platforms. From FEED studies to commissioning and start-up.",
      skills: ["Process Engineering", "HAZOP Studies", "API Standards", "Piping Design", "Instrumentation", "Project Management", "HSE Management"],
      pricing: "LSTK (Lump Sum Turn Key)",
      priceRange: "$50M-500M",
      experience: "15+ years",
      portfolio: ["Refinery Expansion - Petrotech Corp", "Offshore Platform EPC - MarineOil Ltd", "Gas Processing Plant - EnergyMax Industries"],
      rating: 4.9,
      completedProjects: 45,
      activeProjects: 8,
      revenue: "$2.8M",
      certifications: ["API 570", "ASME Section VIII", "ISO 9001"]
    },
    {
      id: "SRV-002",
      name: "Power Plant Construction & Commissioning",
      category: "EPC Services (Engineering, Procurement, Construction)",
      industry: "Power Generation",
      description: "Complete construction and commissioning services for thermal, renewable, and nuclear power plants including civil works, mechanical installation, and grid connection.",
      skills: ["Power Systems", "Turbine Installation", "Boiler Technology", "Grid Integration", "SCADA Systems", "Commissioning", "Quality Control"],
      pricing: "Cost-Plus-Fee",
      priceRange: "$100M-1B",
      experience: "20+ years",
      portfolio: ["Coal Power Plant - PowerGen Corp", "Solar Farm EPC - SolarTech Ltd", "Gas Turbine Installation - EnergyPro Industries"],
      rating: 4.8,
      completedProjects: 32,
      activeProjects: 6,
      revenue: "$3.2M",
      certifications: ["NECA", "IEEE Standards", "NERC Certified"]
    },
    {
      id: "SRV-003",
      name: "Industrial Mechanical Contracting",
      category: "Specialized Industrial Contracting",
      industry: "Manufacturing",
      description: "Specialized mechanical installation and maintenance services for heavy industrial equipment, piping systems, and rotating machinery across multiple industries.",
      skills: ["Heavy Rigging", "Precision Alignment", "Pipe Welding", "Equipment Installation", "Millwright Services", "Hydraulic Systems"],
      pricing: "Time & Material",
      priceRange: "$500K-25M",
      experience: "12+ years",
      portfolio: ["Steel Mill Equipment - MetalWorks Corp", "Chemical Plant Piping - ChemProcess Ltd", "Mining Equipment Install - MineMax Industries"],
      rating: 4.7,
      completedProjects: 178,
      activeProjects: 15,
      revenue: "$1.8M",
      certifications: ["AWS D1.1", "ASME B31.3", "OSHA 30-Hour"]
    },
    {
      id: "SRV-004",
      name: "Process Engineering Consultancy",
      category: "Consultancy Services",
      industry: "Petrochemicals",
      description: "Advanced process engineering consultancy for chemical and petrochemical industries including process optimization, HAZOP studies, and technology selection.",
      skills: ["Process Simulation", "HAZOP Leader", "Process Safety", "Distillation Design", "Reaction Engineering", "Mass Transfer", "Heat Integration"],
      pricing: "Professional Hourly Rate",
      priceRange: "$200-350/hr",
      experience: "18+ years",
      portfolio: ["Process Optimization - ChemCorp Industries", "HAZOP Study - Petrochemical Plant", "Technology Selection - Polymer Manufacturing"],
      rating: 4.9,
      completedProjects: 95,
      activeProjects: 12,
      revenue: "$1.2M",
      certifications: ["PE License", "CCPS Member", "HAZOP Leader Certified"]
    },
    {
      id: "SRV-005",
      name: "Turnaround & Shutdown Services",
      category: "Maintenance & Operations",
      industry: "Oil & Gas",
      description: "Comprehensive turnaround and shutdown planning and execution services for refineries, chemical plants, and industrial facilities with focus on safety and schedule optimization.",
      skills: ["Turnaround Planning", "Critical Path Management", "Scaffold Services", "Hot Work Permits", "Confined Space", "Multi-Craft Coordination"],
      pricing: "Fixed Price Contract",
      priceRange: "$5M-50M",
      experience: "25+ years",
      portfolio: ["Refinery Turnaround - PetroMax Corp", "Chemical Plant Shutdown - ChemTech Industries", "Power Plant Outage - EnergyGen Ltd"],
      rating: 4.8,
      completedProjects: 67,
      activeProjects: 4,
      revenue: "$2.1M",
      certifications: ["STAA Certified", "ISA Certified", "NACE Certified"]
    },
    {
      id: "SRV-006",
      name: "Non-Destructive Testing Services",
      category: "Specialized Technical Services",
      industry: "Multiple Industries",
      description: "Comprehensive NDT services including ultrasonic, radiographic, magnetic particle, and dye penetrant testing for critical industrial equipment and infrastructure.",
      skills: ["Ultrasonic Testing", "Radiographic Testing", "Magnetic Particle", "Dye Penetrant", "Eddy Current", "Phased Array", "Digital Radiography"],
      pricing: "Per Inspection Rate",
      priceRange: "$150-300/hr",
      experience: "10+ years",
      portfolio: ["Pipeline Inspection - OilTrans Corp", "Pressure Vessel Testing - ChemSafe Industries", "Structural Steel Inspection - BuildTech Ltd"],
      rating: 4.7,
      completedProjects: 234,
      activeProjects: 18,
      revenue: "$850K",
      certifications: ["ASNT Level III", "AWS CWI", "API 510"]
    },
    {
      id: "SRV-007",
      name: "Environmental Impact Assessment",
      category: "Consultancy Services",
      industry: "Environmental",
      description: "Comprehensive environmental impact assessment and regulatory compliance consulting for industrial projects including air quality, water resources, and ecological studies.",
      skills: ["Environmental Modeling", "Air Quality Assessment", "Water Resource Studies", "Ecological Surveys", "Regulatory Compliance", "Permitting"],
      pricing: "Project-Based Fee",
      priceRange: "$50K-500K",
      experience: "15+ years",
      portfolio: ["Mining Project EIA - MineCorps Ltd", "Industrial Complex Assessment - ManufacturingPro", "Waste Treatment Facility - EcoSolutions Corp"],
      rating: 4.6,
      completedProjects: 89,
      activeProjects: 11,
      revenue: "$720K",
      certifications: ["Professional Engineer", "Certified Environmental Professional", "NEPA Specialist"]
    },
    {
      id: "SRV-008",
      name: "Industrial Insulation & Fireproofing",
      category: "Specialized Industrial Contracting",
      industry: "Multiple Industries",
      description: "Specialized industrial insulation and fireproofing services for high-temperature equipment, piping systems, and structural steel in industrial facilities.",
      skills: ["Thermal Insulation", "Fireproofing Application", "Refractory Installation", "Cryogenic Insulation", "Personnel Protection", "Energy Conservation"],
      pricing: "Square Footage Rate",
      priceRange: "$15-35/sq ft",
      experience: "12+ years",
      portfolio: ["Refinery Insulation - PetroChem Corp", "Power Plant Fireproofing - EnergyMax Ltd", "LNG Terminal Cryogenic - CryoTech Industries"],
      rating: 4.5,
      completedProjects: 156,
      activeProjects: 9,
      revenue: "$980K",
      certifications: ["CINI Certified", "FSTI Member", "OSHA Certified"]
    }
  ];

  const serviceCategories = [
    "EPC Services (Engineering, Procurement, Construction)",
    "Specialized Industrial Contracting", 
    "Consultancy Services",
    "Maintenance & Operations",
    "Specialized Technical Services"
  ];

  const industries = [
    "Oil & Gas",
    "Petrochemicals",
    "Power Generation", 
    "Manufacturing",
    "Mining & Metals",
    "Pharmaceuticals",
    "Food & Beverage",
    "Water Treatment",
    "Environmental",
    "Multiple Industries"
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
    const matchesIndustry = industryFilter === "all" || service.industry === industryFilter;
    return matchesSearch && matchesCategory && matchesIndustry;
  });

  const totalRevenue = services.reduce((sum, service) => {
    const revenue = parseFloat(service.revenue.replace(/[$MK,]/g, ''));
    const multiplier = service.revenue.includes('M') ? 1000000 : 1000;
    return sum + (revenue * multiplier);
  }, 0);

  const totalActiveProjects = services.reduce((sum, service) => sum + service.activeProjects, 0);
  const avgRating = services.reduce((sum, service) => sum + service.rating, 0) / services.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      
      <main className="pt-20 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Industrial Services Portfolio</h1>
              <p className="text-gray-600 mt-1">EPC, Contracting & Consultancy Services for Industrial Clients</p>
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
                    <p className="text-2xl font-bold text-gray-900">{services.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">${(totalRevenue / 1000000).toFixed(1)}M</p>
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
                    <p className="text-2xl font-bold text-gray-900">{totalActiveProjects}</p>
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
                    <p className="text-2xl font-bold text-gray-900">{avgRating.toFixed(1)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
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
                  <SelectTrigger className="w-full lg:w-80">
                    <SelectValue placeholder="Filter by service category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Service Categories</SelectItem>
                    {serviceCategories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={industryFilter} onValueChange={setIndustryFilter}>
                  <SelectTrigger className="w-full lg:w-64">
                    <SelectValue placeholder="Filter by industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
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
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="secondary" className="bg-yellow-50 text-yellow-700">
                          {service.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Building2 className="w-3 h-3 mr-1" />
                          {service.industry}
                        </Badge>
                      </div>
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
                      <p className="text-xs text-gray-500 mb-1">Value Range</p>
                      <p className="font-semibold text-sm">{service.priceRange}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Key Capabilities</p>
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

                  {service.certifications && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Certifications</p>
                      <div className="flex flex-wrap gap-1">
                        {service.certifications.slice(0, 3).map((cert, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-green-50 text-green-700">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

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

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No services found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
            </div>
          )}
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
