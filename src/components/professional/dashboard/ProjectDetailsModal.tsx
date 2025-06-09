
import React from "react";
import { BaseModal } from "@/components/shared/modals/BaseModal";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, MapPin, DollarSign, Clock, User } from "lucide-react";

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

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onUpdate: (projectId: number, updates: any) => void;
}

export const ProjectDetailsModal = ({
  isOpen,
  onClose,
  project,
  onUpdate
}: ProjectDetailsModalProps) => {
  if (!project) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Project Details"
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Project Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
            <p className="text-gray-600 flex items-center gap-2 mt-1">
              <User size={16} />
              {project.client}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge className={getStatusColor(project.status)}>
              {project.status.replace('-', ' ')}
            </Badge>
            <Badge className={getPriorityColor(project.priority)}>
              {project.priority} priority
            </Badge>
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Calendar size={16} />
              Timeline
            </div>
            <p className="font-semibold text-gray-900 mt-1">{project.timeline}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <DollarSign size={16} />
              Total Value
            </div>
            <p className="font-semibold text-gray-900 mt-1">{project.totalValue}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Clock size={16} />
              Days Left
            </div>
            <p className="font-semibold text-gray-900 mt-1">{project.remainingDays}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              Progress
            </div>
            <p className="font-semibold text-gray-900 mt-1">{project.progress}%</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Project Progress</span>
            <span className="text-gray-900 font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        {/* Next Milestone */}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h4 className="font-medium text-purple-900 mb-2">Next Milestone</h4>
          <p className="text-purple-700">{project.nextMilestone}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button 
            className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            onClick={() => {
              onUpdate(project.id, { progress: Math.min(project.progress + 10, 100) });
              onClose();
            }}
          >
            Update Progress
          </button>
          <button 
            className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
