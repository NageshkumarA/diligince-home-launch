import React, { useState } from "react";
import VendorHeader from "@/components/vendor/VendorHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Filter, Calendar, Users, DollarSign, Clock, Eye, MessageSquare, CheckCircle, AlertCircle, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectDetailsModal } from "@/components/vendor/service/modals/ProjectDetailsModal";
const ServiceVendorProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showProjectDetails, setShowProjectDetails] = useState(false);

  // Mock projects data
  const projects = [{
    id: "PRJ-001",
    name: "E-commerce Platform Development",
    client: "RetailMax Inc.",
    service: "Custom Software Development",
    budget: "$45,000",
    startDate: "2024-01-01",
    endDate: "2024-03-15",
    status: "in-progress",
    priority: "high",
    progress: 65,
    team: ["John Doe", "Sarah Smith", "Mike Johnson"],
    description: "Building a comprehensive e-commerce platform with advanced inventory management and analytics.",
    milestones: 8,
    completedMilestones: 5,
    daysLeft: 28
  }, {
    id: "PRJ-002",
    name: "Brand Identity Redesign",
    client: "TechStartup Pro",
    service: "Brand Identity Design",
    budget: "$8,500",
    startDate: "2024-01-15",
    endDate: "2024-02-28",
    status: "review",
    priority: "medium",
    progress: 90,
    team: ["Emily Davis", "Alex Chen"],
    description: "Complete brand overhaul including logo, guidelines, and marketing materials.",
    milestones: 5,
    completedMilestones: 4,
    daysLeft: 12
  }, {
    id: "PRJ-003",
    name: "Digital Marketing Campaign",
    client: "HealthPlus Solutions",
    service: "Digital Marketing Strategy",
    budget: "$15,000",
    startDate: "2024-02-01",
    endDate: "2024-04-30",
    status: "planning",
    priority: "medium",
    progress: 25,
    team: ["Lisa Wong", "David Rodriguez", "Emma Thompson"],
    description: "Multi-channel marketing campaign for healthcare product launch.",
    milestones: 12,
    completedMilestones: 3,
    daysLeft: 65
  }, {
    id: "PRJ-004",
    name: "Business Process Optimization",
    client: "ManufactureCorp",
    service: "Business Consulting",
    budget: "$12,000",
    startDate: "2023-12-01",
    endDate: "2024-01-31",
    status: "completed",
    priority: "low",
    progress: 100,
    team: ["Robert Kim", "Jennifer Liu"],
    description: "Streamlining manufacturing processes and implementing efficiency improvements.",
    milestones: 6,
    completedMilestones: 6,
    daysLeft: 0
  }];
  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "in-progress":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "review":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "on-hold":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-700 border-red-200";
      case "medium":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "low":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-blue-500";
  };
  const handleViewProject = (project: any) => {
    setSelectedProject(project);
    setShowProjectDetails(true);
  };
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesFilter;
  });
  return <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      
      <main className="pt-32 p-6 lg:p-8 py-[85px]">
        <div className="max-w-7xl mx-auto space-y-6 mt-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Project Management</h1>
              <p className="text-gray-600 mt-1">Track and manage your active projects</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Projects</p>
                    <p className="text-2xl font-bold text-gray-900">15</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">42</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-yellow-50 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Value</p>
                    <p className="text-2xl font-bold text-gray-900">$580K</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">At Risk</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search projects..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Projects List */}
          <div className="space-y-4">
            {filteredProjects.map(project => <Card key={project.id} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                        <Badge className={`${getStatusColor(project.status)} font-semibold text-sm px-3 py-1`}>
                          {project.status}
                        </Badge>
                        <Badge className={`${getPriorityColor(project.priority)} font-semibold text-sm px-3 py-1`}>
                          {project.priority}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Client:</span>
                          <p className="font-semibold text-gray-900">{project.client}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Service:</span>
                          <p className="font-semibold text-gray-900">{project.service}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Budget:</span>
                          <p className="font-bold text-gray-900">{project.budget}</p>
                        </div>
                      </div>

                      <p className="text-base text-gray-700 mb-4 leading-relaxed">{project.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="text-sm">
                          <span className="text-gray-500">Start Date:</span>
                          <p className="font-semibold text-gray-900">{project.startDate}</p>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">End Date:</span>
                          <p className="font-semibold text-gray-900">{project.endDate}</p>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Milestones:</span>
                          <p className="font-semibold text-gray-900">{project.completedMilestones}/{project.milestones}</p>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Days Left:</span>
                          <p className="font-semibold text-gray-900">{project.daysLeft} days</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-gray-700 font-medium">Team:</span>
                        </div>
                        {project.team.map((member, index) => <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 text-sm">
                            {member}
                          </Badge>)}
                      </div>
                    </div>

                    <div className="lg:w-64 space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600 font-medium">Progress</span>
                          <span className="font-bold text-gray-900">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" indicatorClassName={getProgressColor(project.progress)} />
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium" onClick={() => handleViewProject(project)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Chat
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </main>

      {/* Project Details Modal */}
      {selectedProject && <ProjectDetailsModal isOpen={showProjectDetails} onClose={() => setShowProjectDetails(false)} project={selectedProject} />}
    </div>;
};
export default ServiceVendorProjects;