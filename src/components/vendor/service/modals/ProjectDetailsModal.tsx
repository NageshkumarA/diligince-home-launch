
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, DollarSign, Users, Clock, FileText, MessageSquare, CheckCircle } from "lucide-react";

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    name: string;
    client: string;
    service: string;
    budget: string;
    startDate: string;
    endDate: string;
    status: string;
    priority: string;
    progress: number;
    team: string[];
    description: string;
    milestones: number;
    completedMilestones: number;
    daysLeft: number;
  };
}

export const ProjectDetailsModal = ({ isOpen, onClose, project }: ProjectDetailsModalProps) => {
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

  const mockMilestones = [
    { name: "Project Setup & Planning", status: "completed", dueDate: "2024-01-05", completion: 100 },
    { name: "UI/UX Design", status: "completed", dueDate: "2024-01-15", completion: 100 },
    { name: "Frontend Development", status: "completed", dueDate: "2024-02-01", completion: 100 },
    { name: "Backend Development", status: "in-progress", dueDate: "2024-02-15", completion: 65 },
    { name: "Integration & Testing", status: "pending", dueDate: "2024-02-28", completion: 0 },
    { name: "Deployment & Launch", status: "pending", dueDate: "2024-03-15", completion: 0 }
  ];

  const mockActivities = [
    { date: "Today, 2:30 PM", user: "John Doe", action: "Updated milestone progress", description: "Backend API development - 65% complete" },
    { date: "Yesterday, 4:15 PM", user: "Sarah Smith", action: "Uploaded design files", description: "Final UI mockups approved by client" },
    { date: "2 days ago", user: "Mike Johnson", action: "Code review completed", description: "Frontend components reviewed and approved" },
    { date: "3 days ago", user: "Client", action: "Milestone approved", description: "UI/UX designs approved with minor feedback" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Project Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">{project.name}</h2>
            <div className="flex gap-2 mb-4">
              <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
              <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-gray-600">Budget</p>
              <p className="font-semibold">{project.budget}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-sm text-gray-600">Days Left</p>
              <p className="font-semibold">{project.daysLeft} days</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <CheckCircle className="h-6 w-6 mx-auto mb-2 text-purple-600" />
              <p className="text-sm text-gray-600">Milestones</p>
              <p className="font-semibold">{project.completedMilestones}/{project.milestones}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Users className="h-6 w-6 mx-auto mb-2 text-orange-600" />
              <p className="text-sm text-gray-600">Team Size</p>
              <p className="font-semibold">{project.team.length} members</p>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Overall Progress</span>
              <span className="font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-3" />
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Project Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Client:</span>
                      <span>{project.client}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span>{project.service}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Start Date:</span>
                      <span>{project.startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">End Date:</span>
                      <span>{project.endDate}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="milestones" className="space-y-3">
              {mockMilestones.map((milestone, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{milestone.name}</h4>
                    <Badge className={getStatusColor(milestone.status)}>
                      {milestone.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Due: {milestone.dueDate}</span>
                    <span>{milestone.completion}% complete</span>
                  </div>
                  <Progress value={milestone.completion} className="h-2" />
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="team" className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.team.map((member, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-700 font-medium text-sm">
                        {member.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{member}</p>
                      <p className="text-sm text-gray-600">Team Member</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="activity" className="space-y-3">
              {mockActivities.map((activity, index) => (
                <div key={index} className="border-l-2 border-yellow-200 pl-4 py-2">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-sm">{activity.action}</h4>
                    <span className="text-xs text-gray-500">{activity.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
                  <p className="text-xs text-gray-500">by {activity.user}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>

          <div className="flex gap-3 pt-4">
            <Button className="bg-yellow-600 hover:bg-yellow-700">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message Client
            </Button>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
