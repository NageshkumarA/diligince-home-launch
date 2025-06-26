
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Calendar, DollarSign, Eye, Users } from "lucide-react";
import { ProjectDetailsModal } from "../modals/ProjectDetailsModal";

const projectsData = [
  {
    id: 1,
    title: "Industrial Safety Audit - Chemical Plant",
    client: "ChemCorp Industries",
    status: "in-progress",
    progress: 65,
    budget: "₹350,000",
    deadline: "2024-06-15",
    team: ["Rajesh Kumar", "Priya Sharma"],
    priority: "high",
    description: "Comprehensive safety audit and compliance assessment for chemical processing facility."
  },
  {
    id: 2,
    title: "SCADA System Upgrade",
    client: "Steel Manufacturing Ltd",
    status: "planning",
    progress: 25,
    budget: "₹800,000",
    deadline: "2024-07-30",
    team: ["Amit Patel", "Rajesh Kumar"],
    priority: "medium",
    description: "Upgrading existing SCADA systems with modern industrial automation solutions."
  },
  {
    id: 3,
    title: "Equipment Maintenance Contract",
    client: "Power Generation Co",
    status: "completed",
    progress: 100,
    budget: "₹450,000",
    deadline: "2024-05-20",
    team: ["Priya Sharma"],
    priority: "low",
    description: "Preventive maintenance and calibration of power generation equipment."
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'in-progress':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'planning':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'completed':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'on-hold':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

export const ActiveProjects = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewAllProjects = () => {
    navigate('/service-vendor-projects');
  };

  const handleViewDetails = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b border-gray-50 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              Active Projects
            </CardTitle>
            <Button 
              className="text-white font-medium bg-yellow-600 hover:bg-yellow-500"
              onClick={handleViewAllProjects}
            >
              View All Projects
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-6 max-h-96 overflow-y-auto">
            {projectsData.map(project => (
              <div key={project.id} className="bg-gray-50 border border-gray-100 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-lg mb-2">{project.title}</h4>
                    <p className="text-base font-semibold text-gray-700 mb-1">{project.client}</p>
                    <p className="text-sm text-gray-600">{project.description}</p>
                  </div>
                  <Badge className={`${getStatusColor(project.status)} font-semibold text-sm px-3 py-1`}>
                    {project.status.replace('-', ' ').toUpperCase()}
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-gray-900 font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-semibold">{project.budget}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-gray-600">{project.team.length} team members</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-gray-200 text-gray-700 hover:bg-gray-50"
                    onClick={() => handleViewDetails(project)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            className="w-full mt-6 text-white font-semibold py-3 bg-yellow-600 hover:bg-yellow-500"
            onClick={handleViewAllProjects}
          >
            View All Projects
          </Button>
        </CardContent>
      </Card>

      {selectedProject && (
        <ProjectDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          project={selectedProject}
        />
      )}
    </>
  );
};
