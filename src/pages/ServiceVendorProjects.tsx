import React, { useState } from "react";
import VendorHeader from "@/components/vendor/VendorHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Filter,
  Users,
  DollarSign,
  Clock,
  Eye,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Plus,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectDetailsModal } from "@/components/vendor/service/modals/ProjectDetailsModal";

// ✅ Define project type
type Project = {
  id: string;
  name: string;
  client: string;
  service: string;
  budget: string;
  startDate: string;
  endDate: string;
  status: "planning" | "in-progress" | "review" | "completed" | "on-hold";
  priority: "high" | "medium" | "low";
  progress: number;
  team: string[];
  description: string;
  milestones: number;
  completedMilestones: number;
  daysLeft: number;
};

const ServiceVendorProjects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProjectDetails, setShowProjectDetails] = useState<boolean>(false);

  // ✅ Mock projects data
  const projects: Project[] = [
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
      description:
        "Building a comprehensive e-commerce platform with advanced inventory management and analytics.",
      milestones: 8,
      completedMilestones: 5,
      daysLeft: 28,
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
      description:
        "Complete brand overhaul including logo, guidelines, and marketing materials.",
      milestones: 5,
      completedMilestones: 4,
      daysLeft: 12,
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
      description:
        "Multi-channel marketing campaign for healthcare product launch.",
      milestones: 12,
      completedMilestones: 3,
      daysLeft: 65,
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
      description:
        "Streamlining manufacturing processes and implementing efficiency improvements.",
      milestones: 6,
      completedMilestones: 6,
      daysLeft: 0,
    },
  ];

  // ✅ Helpers
  const getStatusColor = (status: Project["status"]) => {
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

  const getPriorityColor = (priority: Project["priority"]) => {
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

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setShowProjectDetails(true);
  };

  // ✅ Filtering
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <VendorHeader /> */}

      <main className="pt-32 p-6 lg:p-8 py-[85px]">
        <div className="max-w-7xl mx-auto space-y-6 mt-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Project Management
              </h1>
              <p className="text-gray-600 mt-1">
                Track and manage your active projects
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>

          {/* Projects List */}
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold text-gray-900">
                          {project.name}
                        </h3>
                        <Badge
                          className={`${getStatusColor(
                            project.status
                          )} font-semibold text-sm px-3 py-1`}
                        >
                          {project.status}
                        </Badge>
                        <Badge
                          className={`${getPriorityColor(
                            project.priority
                          )} font-semibold text-sm px-3 py-1`}
                        >
                          {project.priority}
                        </Badge>
                      </div>

                      <p className="text-base text-gray-700 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Right Side */}
                    <div className="lg:w-64 space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600 font-medium">
                            Progress
                          </span>
                          <span className="font-bold text-gray-900">
                            {project.progress}%
                          </span>
                        </div>
                        <Progress
                          value={project.progress}
                          className="h-2"
                          indicatorClassName={getProgressColor(
                            project.progress
                          )}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                          onClick={() => handleViewProject(project)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                        >
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

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectDetailsModal
          isOpen={showProjectDetails}
          onClose={() => setShowProjectDetails(false)}
          project={selectedProject}
        />
      )}
    </div>
  );
};

export default ServiceVendorProjects;
