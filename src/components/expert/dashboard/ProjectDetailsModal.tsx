import React, { useState } from "react";
import { DetailsModal } from "@/components/shared/modals/DetailsModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, DollarSign, Clock, Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updates: any) => void;
}

export const ProjectDetailsModal = ({ project, isOpen, onClose, onUpdate }: ProjectDetailsModalProps) => {
  const [updates, setUpdates] = useState({
    progress: project.progress,
    nextMilestone: project.nextMilestone,
    statusUpdate: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(updates);
  };

  const handleChange = (field: string, value: string | number) => {
    setUpdates(prev => ({ ...prev, [field]: value }));
  };

  return (
    <DetailsModal
      isOpen={isOpen}
      onClose={onClose}
      title={project.title}
      maxWidth="max-w-3xl"
    >
      <div className="mb-4">
        <p className="text-base text-gray-600">{project.client}</p>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Timeline</Label>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                {project.timeline}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Total Value</Label>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4" />
                {project.totalValue}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Remaining Days</Label>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                {project.remainingDays} days
              </div>
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Badge className={
                project.priority === "high" ? "bg-red-100 text-red-800" :
                project.priority === "medium" ? "bg-orange-100 text-orange-800" :
                "bg-green-100 text-green-800"
              }>
                {project.priority}
              </Badge>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Progress</Label>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Completion</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Next Milestone</Label>
            <p className="text-sm text-gray-600">{project.nextMilestone}</p>
          </div>
        </TabsContent>
        
        <TabsContent value="tasks" className="space-y-4">
          <div className="space-y-3">
            {[
              { task: "Initial site assessment", status: "completed", progress: 100 },
              { task: "System analysis and planning", status: "completed", progress: 100 },
              { task: "Equipment inspection", status: "in-progress", progress: 60 },
              { task: "Report generation", status: "pending", progress: 0 },
              { task: "Client presentation", status: "pending", progress: 0 }
            ].map((item, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{item.task}</span>
                  <Badge variant={
                    item.status === "completed" ? "default" :
                    item.status === "in-progress" ? "secondary" : "outline"
                  }>
                    {item.status}
                  </Badge>
                </div>
                <Progress value={item.progress} className="h-1" />
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4">
          <div className="space-y-3">
            {[
              { name: "Project Contract.pdf", size: "2.4 MB", uploaded: "May 1, 2025" },
              { name: "Site Photos.zip", size: "15.2 MB", uploaded: "May 3, 2025" },
              { name: "Initial Assessment.docx", size: "1.8 MB", uploaded: "May 5, 2025" }
            ].map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-gray-500">{doc.size} • {doc.uploaded}</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </TabsContent>
        
        <TabsContent value="updates" className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="progress">Update Progress (%)</Label>
              <Input
                id="progress"
                type="number"
                min="0"
                max="100"
                value={updates.progress}
                onChange={(e) => handleChange("progress", parseInt(e.target.value))}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="nextMilestone">Next Milestone</Label>
              <Input
                id="nextMilestone"
                value={updates.nextMilestone}
                onChange={(e) => handleChange("nextMilestone", e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="statusUpdate">Status Update</Label>
              <Textarea
                id="statusUpdate"
                placeholder="Provide an update on project progress..."
                value={updates.statusUpdate}
                onChange={(e) => handleChange("statusUpdate", e.target.value)}
                className="mt-1 min-h-[100px]"
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1 bg-[#722ed1] hover:bg-[#722ed1]/90">
                Update Project
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </DetailsModal>
  );
};
