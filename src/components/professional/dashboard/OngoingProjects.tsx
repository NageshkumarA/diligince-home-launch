
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, User, Clock } from "lucide-react";
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

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Ongoing Projects</h3>
        </div>
        
        <div className="space-y-4">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 cursor-pointer transition-colors"
              onClick={() => handleProjectClick(project)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{project.title}</h4>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                    <User size={14} />
                    {project.client}
                  </p>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status.replace('-', ' ')}
                </Badge>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-gray-900 font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {project.remainingDays} days left
                </span>
                <span>{project.totalValue}</span>
              </div>
            </div>
          ))}
          
          {projects.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No ongoing projects</p>
            </div>
          )}
        </div>
      </Card>

      <ProjectDetailsModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        project={selectedProject}
        onUpdate={onProjectUpdate}
      />
    </>
  );
};
