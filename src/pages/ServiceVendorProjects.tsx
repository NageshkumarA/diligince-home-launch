
import React, { useState } from "react";
import VendorHeader from "@/components/vendor/VendorHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Filter, Calendar, Users, DollarSign, Clock, Eye, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ServiceVendorProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock projects data
  const projects = [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning": return "bg-blue-100 text-blue-700";
      case "in-progress": return "bg-yellow-100 text-yellow-700";
      case "review": return "bg-purple-100 text-purple-700";
      case "completed": return "bg-green-100 text-green-700";
      case "on-hold": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700";
      case "medium": return "bg-orange-100 text-orange-700";
      case "low": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-blue-500";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      
      <main className="pt-16 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Project Management</h1>
              <p className="text-gray-600 mt-1">Track and manage your active projects</p>
            </div>
            <Button className="bg-yellow-600 hover:bg-yellow-700">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Projects</p>
                    <p className="text-2xl font-bold text-gray-900">15</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">42</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Value</p>
                    <p className="text-2xl font-bold text-gray-900">$580K</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 rounded-lg">
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
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search projects..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
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
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Projects List */}
          <div className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <Badge className={getPriorityColor(project.priority)}>
                          {project.priority}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Client:</span>
                          <p className="font-medium">{project.client}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Service:</span>
                          <p className="font-medium">{project.service}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Budget:</span>
                          <p className="font-medium">{project.budget}</p>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{project.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="text-sm">
                          <span className="text-gray-500">Start Date:</span>
                          <p className="font-medium">{project.startDate}</p>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">End Date:</span>
                          <p className="font-medium">{project.endDate}</p>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Milestones:</span>
                          <p className="font-medium">{project.completedMilestones}/{project.milestones}</p>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Days Left:</span>
                          <p className="font-medium">{project.daysLeft} days</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Team:</span>
                        </div>
                        {project.team.map((member, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {member}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="lg:w-64 space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <Progress 
                          value={project.progress} 
                          className="h-2"
                          indicatorClassName={getProgressColor(project.progress)}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Chat
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServiceVendorProjects;
