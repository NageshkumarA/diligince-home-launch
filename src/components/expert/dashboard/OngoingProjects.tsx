
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, DollarSign, Clock, MessageSquare, FileText } from "lucide-react";
import { ProjectDetailsModal } from "./ProjectDetailsModal";

interface Project {
  id: number;
  title: string;
  client: string;
  timeline: string;
  status: string;
  progress: number;
  priority: string;
  nextMilestone: string;
  totalValue: string;
  remainingDays: number;
}

interface OngoingProjectsProps {
  projects: Project[];
  onProjectUpdate: (projectId: number, updates: any) => void;
}

export const OngoingProjects = ({ projects, onProjectUpdate }: OngoingProjectsProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleProjectUpdate = (updates: any) => {
    if (selectedProject) {
      onProjectUpdate(selectedProject.id, updates);
      setIsModalOpen(false);
      setSelectedProject(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Ongoing Projects</CardTitle>
          <Button variant="outline" size="sm">
            View All Projects
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => handleProjectClick(project)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{project.title}</h3>
                    <Badge className={getPriorityColor(project.priority)}>
                      {project.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{project.client}</p>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status.replace("-", " ")}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{project.timeline}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  <span>{project.totalValue}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{project.remainingDays} days remaining</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>Next: {project.nextMilestone}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message Client
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Documents
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      
      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleProjectUpdate}
        />
      )}
    </Card>
  );
};
