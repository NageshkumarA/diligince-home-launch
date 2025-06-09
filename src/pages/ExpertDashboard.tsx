
import React, { useState, useEffect } from "react";
import { Home, Briefcase, Calendar, MessageSquare, User, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import ExpertHeader from "@/components/expert/ExpertHeader";
import { DashboardStats } from "@/components/expert/dashboard/DashboardStats";
import { AvailabilityCalendar } from "@/components/expert/dashboard/AvailabilityCalendar";
import { JobOpportunities } from "@/components/expert/dashboard/JobOpportunities";
import { OngoingProjects } from "@/components/expert/dashboard/OngoingProjects";
import { MessageCenter } from "@/components/expert/dashboard/MessageCenter";

// Mock data
const mockMessages = [
  {
    id: 1,
    sender: "Chem Industries",
    initials: "CI",
    message: "The valve inspection is scheduled for tomorrow. Please confirm...",
    timestamp: "10:42 AM",
    priority: "high",
    color: "green",
    unread: true,
    type: "project-update"
  },
  {
    id: 2,
    sender: "Power Gen Co.",
    initials: "PG",
    message: "We've prepared all documentation for your audit next week...",
    timestamp: "Yesterday",
    priority: "medium", 
    color: "blue",
    unread: true,
    type: "project-preparation"
  },
  {
    id: 3,
    sender: "Steel Plant Ltd.",
    initials: "SP",
    message: "Thank you for your application. We'd like to schedule an interview...",
    timestamp: "2d ago",
    priority: "high",
    color: "orange", 
    unread: false,
    type: "job-response"
  },
  {
    id: 4,
    sender: "AutoParts Ltd.",
    initials: "AP",
    message: "We're interested in your profile for our PLC programming project...",
    timestamp: "3d ago",
    priority: "medium",
    color: "pink",
    unread: false,
    type: "job-inquiry"
  },
  {
    id: 5,
    sender: "Diligince.ai",
    initials: "DL",
    message: "We've found 3 new job opportunities matching your skills profile...",
    timestamp: "5d ago",
    priority: "low",
    color: "purple",
    unread: false,
    type: "system-notification"
  }
];

const mockProjects = [
  {
    id: 1,
    title: "Valve System Inspection",
    client: "Chem Industries",
    timeline: "May 7-8, 2025",
    status: "in-progress",
    progress: 50,
    priority: "high",
    nextMilestone: "Complete initial assessment",
    totalValue: "₹85,000",
    remainingDays: 2
  },
  {
    id: 2,
    title: "Electrical System Audit", 
    client: "Power Gen Co.",
    timeline: "May 12-13, 2025",
    status: "scheduled",
    progress: 0,
    priority: "medium",
    nextMilestone: "Project kickoff meeting",
    totalValue: "₹120,000",
    remainingDays: 5
  }
];

const mockJobs = [
  {
    id: 1,
    title: "Control System Upgrade",
    company: "Steel Plant Ltd.",
    budget: "₹350,000",
    duration: "4 weeks",
    location: "Mumbai",
    skillsMatch: 95,
    postedDate: "2024-05-01",
    deadline: "2024-05-15",
    status: "open",
    description: "Upgrade existing control systems with latest PLC technology",
    requirements: ["PLC Programming", "Control Systems", "Industrial Automation"]
  },
  {
    id: 2,
    title: "PLC Programming for New Line",
    company: "AutoParts Ltd.", 
    budget: "₹280,000",
    duration: "3 weeks",
    location: "Pune",
    skillsMatch: 88,
    postedDate: "2024-04-28",
    deadline: "2024-05-12",
    status: "open",
    description: "Program PLC for new automotive parts production line",
    requirements: ["PLC Programming", "Manufacturing", "Quality Control"]
  }
];

const ExpertDashboard = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [projects, setProjects] = useState(mockProjects);
  const [jobs, setJobs] = useState(mockJobs);

  useEffect(() => {
    toast.success("Welcome to your Expert Dashboard");
  }, []);

  // Header navigation items
  const headerNavItems = [
    { label: "Dashboard", icon: <Home size={18} />, active: true },
    { label: "Opportunities", icon: <Briefcase size={18} /> },
    { label: "Calendar", icon: <Calendar size={18} /> },
    { label: "Messages", icon: <MessageSquare size={18} /> },
    { label: "Profile", icon: <User size={18} /> },
  ];

  const handleMessageReply = (messageId: number, reply: string) => {
    console.log(`Reply to message ${messageId}: ${reply}`);
    toast.success("Reply sent successfully");
  };

  const handleJobApplication = (jobId: number, applicationData: any) => {
    console.log(`Application for job ${jobId}:`, applicationData);
    toast.success("Application submitted successfully");
  };

  const handleProjectUpdate = (projectId: number, updates: any) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, ...updates }
        : project
    ));
    toast.success("Project updated successfully");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ExpertHeader navItems={headerNavItems} />
      
      <main className="pt-16 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back, Rahul! Here's your expert activity overview.</p>
          </div>

          {/* Stats Cards */}
          <DashboardStats />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Availability Calendar */}
            <AvailabilityCalendar />
            
            {/* Job Opportunities */}
            <JobOpportunities 
              jobs={jobs}
              onApplicationSubmit={handleJobApplication}
            />
          </div>

          {/* Ongoing Projects */}
          <OngoingProjects 
            projects={projects}
            onProjectUpdate={handleProjectUpdate}
          />

          {/* Message Center */}
          <MessageCenter 
            messages={messages}
            onReply={handleMessageReply}
          />
        </div>
      </main>
    </div>
  );
};

export default ExpertDashboard;
