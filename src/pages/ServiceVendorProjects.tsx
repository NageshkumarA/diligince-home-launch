import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  Loader2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectDetailsModal } from "@/components/vendor/service/modals/ProjectDetailsModal";
import { getVendorWorkflows } from "@/services/modules/workflows/workflow.service";
import { toast } from "sonner";

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
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProjectDetails, setShowProjectDetails] = useState<boolean>(false);

  // API state
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  // Determine status filter based on route
  useEffect(() => {
    if (location.pathname.includes('/active')) {
      setStatusFilter('active');
    } else if (location.pathname.includes('/completed')) {
      setStatusFilter('completed');
    } else {
      setStatusFilter('all');
    }
  }, [location.pathname]);

  // Fetch projects from API
  useEffect(() => {
    fetchProjects();
  }, [pagination.page, statusFilter]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await getVendorWorkflows({
        status: statusFilter === 'all' ? undefined : statusFilter,
        page: pagination.page,
        limit: pagination.limit
      });

      if (response.success) {
        // Map API response to Project type
        const mappedProjects: Project[] = response.data.workflows.map(wf => ({
          id: wf.id,
          name: wf.projectTitle,
          client: wf.industryName || 'N/A',
          service: 'Project Workflow',
          budget: `${wf.currency} ${wf.totalValue.toLocaleString()}`,
          startDate: wf.startDate,
          endDate: wf.endDate,
          status: mapWorkflowStatusToProjectStatus(wf.status),
          priority: wf.isOverdue ? 'high' : 'medium',
          progress: wf.progress,
          team: [], // Not available from API
          description: wf.projectTitle,
          milestones: wf.milestones.total,
          completedMilestones: wf.milestones.completed,
          daysLeft: Math.max(0, wf.daysRemaining)
        }));

        setProjects(mappedProjects);
        setPagination(prev => ({
          ...prev,
          total: response.data.pagination.total,
          totalPages: response.data.pagination.totalPages
        }));
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  // Helper to map workflow status to project status
  const mapWorkflowStatusToProjectStatus = (status: string): Project["status"] => {
    const statusMap: Record<string, Project["status"]> = {
      'active': 'in-progress',
      'paused': 'on-hold',
      'completed': 'completed',
      'cancelled': 'on-hold'
    };
    return statusMap[status] || 'planning';
  };

  // ✅ Helpers
  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "planning":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "in-progress":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "review":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "completed":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "on-hold":
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const getPriorityColor = (priority: Project["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "medium":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "low":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
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
    return matchesSearch;
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
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-3 text-gray-600">Loading projects...</span>
            </div>
          ) : filteredProjects.length === 0 ? (
            <Card className="bg-white border border-gray-100">
              <CardContent className="p-12 text-center">
                <div className="flex flex-col items-center">
                  <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No projects found
                  </h3>
                  <p className="text-gray-600">
                    {searchTerm
                      ? "Try adjusting your search terms"
                      : "You don't have any active projects yet"}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
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
          )}
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
