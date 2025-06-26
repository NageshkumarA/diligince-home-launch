import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Briefcase, Calendar, Users, MapPin } from "lucide-react";
const projectsData = [{
  id: 1,
  title: "Steel Plant SCADA Implementation",
  client: "Steel Plant Ltd.",
  progress: 65,
  status: "on-track",
  deadline: "2024-06-15",
  teamSize: 4,
  location: "Mumbai, Maharashtra",
  value: "₹750,000",
  nextMilestone: "System Testing"
}, {
  id: 2,
  title: "Power Gen Control Panel Installation",
  client: "Power Gen Co.",
  progress: 30,
  status: "in-progress",
  deadline: "2024-07-10",
  teamSize: 3,
  location: "Pune, Maharashtra",
  value: "₹450,000",
  nextMilestone: "Panel Assembly"
}, {
  id: 3,
  title: "Chemical Plant Automation Upgrade",
  client: "Chem Industries",
  progress: 85,
  status: "near-completion",
  deadline: "2024-05-30",
  teamSize: 2,
  location: "Chennai, Tamil Nadu",
  value: "₹320,000",
  nextMilestone: "Final Documentation"
}];
const getStatusColor = (status: string) => {
  switch (status) {
    case 'on-track':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'in-progress':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'near-completion':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'delayed':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};
const getProgressColor = (progress: number) => {
  if (progress >= 80) return 'bg-green-500';
  if (progress >= 50) return 'bg-blue-500';
  if (progress >= 25) return 'bg-yellow-500';
  return 'bg-red-500';
};
export const ActiveProjects = () => {
  return <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="border-b border-gray-50 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-blue-600" />
            </div>
            Active Projects
          </CardTitle>
          <Button className="text-white font-medium bg-yellow-600 hover:bg-yellow-500">
            View All Projects
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6">
          {projectsData.map(project => <div key={project.id} className="bg-gray-50 border border-gray-100 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">{project.title}</h4>
                  <p className="text-base font-semibold text-gray-700">{project.client}</p>
                </div>
                <Badge className={`${getStatusColor(project.status)} font-semibold text-sm px-3 py-1`}>
                  {project.status.replace('-', ' ').toUpperCase()}
                </Badge>
              </div>
              
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-semibold text-gray-800">Progress</span>
                  <span className="text-base font-bold text-gray-900">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(project.progress)}`} style={{
                width: `${project.progress}%`
              }}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-base mb-5">
                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>Due: <span className="font-semibold text-gray-900">{new Date(project.deadline).toLocaleDateString()}</span></span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span><span className="font-semibold text-gray-900">{project.teamSize}</span> team members</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">{project.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="font-bold text-gray-900">{project.value}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-base text-gray-700">
                  <span>Next: <span className="font-semibold text-gray-900">{project.nextMilestone}</span></span>
                </div>
                <Button size="sm" className="text-white font-medium px-4 bg-yellow-600 hover:bg-yellow-500">
                  View Details
                </Button>
              </div>
            </div>)}
        </div>
        
        <Button className="w-full mt-6 text-white font-semibold py-3 bg-yellow-600 hover:bg-yellow-500">
          View All Projects
        </Button>
      </CardContent>
    </Card>;
};