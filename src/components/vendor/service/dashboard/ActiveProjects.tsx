
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Briefcase, Calendar, Users, Eye } from "lucide-react";
import { ProjectDetailsModal } from "./ProjectDetailsModal";

const mockActiveProjects = [
  {
    id: 1,
    title: "SCADA System Implementation",
    client: "Chem Industries",
    timeline: "Apr 15 - May 20, 2025",
    assignedTeam: ["Sandeep Kumar", "Amit Singh"],
    status: "in-progress",
    progress: 50,
    priority: "high",
    nextMilestone: "System Integration Testing",
    totalValue: "₹450,000",
    remainingDays: 15,
    phases: [
      { name: "Requirements Analysis", status: "completed", progress: 100 },
      { name: "System Design", status: "completed", progress: 100 },
      { name: "Development", status: "in-progress", progress: 75 },
      { name: "Testing", status: "pending", progress: 0 },
      { name: "Deployment", status: "pending", progress: 0 }
    ]
  },
  {
    id: 2,
    title: "Panel Installation & Programming",
    client: "Power Gen Co.",
    timeline: "Apr 28 - May 25, 2025",
    assignedTeam: ["Rohit Verma", "Neha Joshi"],
    status: "in-progress",
    progress: 30,
    priority: "medium",
    nextMilestone: "Panel Assembly Completion",
    totalValue: "₹320,000",
    remainingDays: 8,
    phases: [
      { name: "Design Review", status: "completed", progress: 100 },
      { name: "Panel Assembly", status: "in-progress", progress: 60 },
      { name: "Programming", status: "pending", progress: 0 },
      { name: "Testing", status: "pending", progress: 0 },
      { name: "Commissioning", status: "pending", progress: 0 }
    ]
  }
];

export const ActiveProjects = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const handleViewProject = (project: any) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "delayed":
        return "bg-red-100 text-red-800";
      case "on-hold":
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
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Active Projects
            </CardTitle>
            <Button variant="outline" size="sm">
              View All Projects
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            {mockActiveProjects.map((project) => (
              <div key={project.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">{project.title}</h4>
                      <Badge className={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{project.client}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {project.timeline}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {project.assignedTeam.length} team members
                      </div>
                      <div className="font-medium text-gray-900">
                        {project.totalValue}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status.replace("-", " ")}
                    </Badge>
                    <Button size="sm" variant="outline" onClick={() => handleViewProject(project)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-gray-600">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                
                <div className="mb-3">
                  <h5 className="text-sm font-medium mb-2">Project Phases</h5>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                    {project.phases.map((phase, index) => (
                      <div key={index} className="text-center">
                        <div className={`w-full h-2 rounded-full mb-1 ${
                          phase.status === "completed" ? "bg-green-500" :
                          phase.status === "in-progress" ? "bg-blue-500" :
                          "bg-gray-200"
                        }`}></div>
                        <div className="text-xs text-gray-600">{phase.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-gray-600">Next Milestone: </span>
                    <span className="font-medium">{project.nextMilestone}</span>
                  </div>
                  <div className="text-orange-600">
                    {project.remainingDays} days remaining
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="text-xs text-gray-600 mb-1">Assigned Team:</div>
                  <div className="flex gap-2">
                    {project.assignedTeam.map((member, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {member}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ProjectDetailsModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        project={selectedProject}
      />
    </>
  );
};
