
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Calendar, Users, DollarSign, MessageSquare, Clock, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  isOpen,
  onClose,
  project
}) => {
  const { toast } = useToast();
  const [statusUpdate, setStatusUpdate] = useState("");

  const handleStatusUpdate = () => {
    toast({
      title: "Status Updated",
      description: "Project status has been updated successfully.",
    });
    setStatusUpdate("");
  };

  if (!project) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            {project.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Overview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="text-xs text-gray-500">Timeline</div>
                  <div className="text-sm font-medium">{project.timeline}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="text-xs text-gray-500">Team Size</div>
                  <div className="text-sm font-medium">{project.assignedTeam.length} members</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="text-xs text-gray-500">Total Value</div>
                  <div className="text-sm font-medium">{project.totalValue}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="text-xs text-gray-500">Days Remaining</div>
                  <div className="text-sm font-medium">{project.remainingDays} days</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Overall Progress</h3>
              <span className="text-sm text-gray-600">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-3" />
          </div>

          <Tabs defaultValue="phases" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="phases">Phases</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
            </TabsList>

            <TabsContent value="phases" className="space-y-4">
              <h3 className="font-medium">Project Phases</h3>
              <div className="space-y-3">
                {project.phases.map((phase: any, index: number) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{phase.name}</h4>
                      <Badge className={getStatusColor(phase.status)}>
                        {phase.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={phase.progress} className="flex-1 h-2" />
                      <span className="text-sm text-gray-600">{phase.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="team" className="space-y-4">
              <h3 className="font-medium">Assigned Team Members</h3>
              <div className="space-y-3">
                {project.assignedTeam.map((member: string, index: number) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{member}</h4>
                        <p className="text-sm text-gray-600">Senior Engineer</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">85% Utilization</div>
                        <div className="text-xs text-gray-500">40 hrs/week</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              <h3 className="font-medium">Project Timeline</h3>
              <div className="space-y-3">
                <div className="p-3 border-l-4 border-green-500 bg-green-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Project Started</h4>
                      <p className="text-sm text-gray-600">Initial requirements gathering completed</p>
                    </div>
                    <div className="text-sm text-gray-500">Apr 15, 2025</div>
                  </div>
                </div>
                <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Development Phase</h4>
                      <p className="text-sm text-gray-600">Currently in progress - 75% complete</p>
                    </div>
                    <div className="text-sm text-gray-500">Current</div>
                  </div>
                </div>
                <div className="p-3 border-l-4 border-gray-300 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Testing Phase</h4>
                      <p className="text-sm text-gray-600">Scheduled to begin next week</p>
                    </div>
                    <div className="text-sm text-gray-500">May 10, 2025</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="updates" className="space-y-4">
              <h3 className="font-medium">Project Updates</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Add Status Update</label>
                  <Textarea
                    placeholder="Enter project update..."
                    value={statusUpdate}
                    onChange={(e) => setStatusUpdate(e.target.value)}
                    rows={3}
                  />
                  <Button 
                    className="mt-2 bg-[#fa8c16] hover:bg-[#fa8c16]/90" 
                    onClick={handleStatusUpdate}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Post Update
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Development Progress Update</h4>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Completed the SCADA interface design and began integration testing. 
                      All modules are functioning correctly.
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Client Meeting Notes</h4>
                      <span className="text-xs text-gray-500">1 day ago</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Client requested additional safety features. Updated requirements 
                      and adjusted timeline accordingly.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button className="bg-[#fa8c16] hover:bg-[#fa8c16]/90">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Client
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
