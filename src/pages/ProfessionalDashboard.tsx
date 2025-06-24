import React, { useState, useEffect } from "react";
import { Home, Briefcase, Calendar, MessageSquare, User, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import ProfessionalHeader from "@/components/professional/ProfessionalHeader";
import { DashboardStats } from "@/components/professional/dashboard/DashboardStats";
import { AvailabilityCalendar } from "@/components/professional/dashboard/AvailabilityCalendar";
import { JobOpportunities } from "@/components/professional/dashboard/JobOpportunities";
import { OngoingProjects } from "@/components/professional/dashboard/OngoingProjects";
import { MessageCenter } from "@/components/professional/dashboard/MessageCenter";
import { LoadingState } from "@/components/shared/loading/LoadingState";
import { LoadingCard } from "@/components/shared/loading/LoadingCard";
import { useAsyncOperation } from "@/hooks/useAsyncOperation";

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

const ProfessionalDashboard = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [projects, setProjects] = useState(mockProjects);
  const [jobs, setJobs] = useState(mockJobs);
  const [initialLoading, setInitialLoading] = useState(true);

  const { loading: dashboardLoading, execute: loadDashboardData } = useAsyncOperation({
    successMessage: "Dashboard data loaded successfully"
  });

  // Simulate initial data loading
  useEffect(() => {
    const loadInitialData = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setInitialLoading(false);
      toast.success("Welcome to your Professional Dashboard");
    };

    loadInitialData();
  }, []);

  // Header navigation items
  const headerNavItems = [
    { label: "Dashboard", icon: <Home size={18} />, href: "/professional-dashboard", active: true },
    { label: "Opportunities", icon: <Briefcase size={18} />, href: "/professional-opportunities" },
    { label: "Calendar", icon: <Calendar size={18} />, href: "/professional-calendar" },
    { label: "Messages", icon: <MessageSquare size={18} />, href: "/professional-messages" },
    { label: "Profile", icon: <User size={18} />, href: "/professional-profile" },
  ];

  const handleMessageReply = async (messageId: number, reply: string) => {
    await loadDashboardData(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Reply to message ${messageId}: ${reply}`);
      return { success: true };
    });
  };

  const handleJobApplication = async (jobId: number, applicationData: any) => {
    await loadDashboardData(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(`Application for job ${jobId}:`, applicationData);
      return { success: true };
    });
  };

  const handleProjectUpdate = async (projectId: number, updates: any) => {
    await loadDashboardData(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setProjects(prev => prev.map(project => 
        project.id === projectId 
          ? { ...project, ...updates }
          : project
      ));
      return { success: true };
    });
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <ProfessionalHeader navItems={headerNavItems} />
        
        <main className="pt-16 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <LoadingState message="Loading your dashboard..." size="lg" />
            
            {/* Loading skeleton for main content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <LoadingCard key={i} showHeader={false} lines={2} />
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LoadingCard lines={4} />
              <LoadingCard lines={4} />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ProfessionalHeader navItems={headerNavItems} />
      
      <main className="pt-16 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back, Rahul! Here's your professional activity overview.</p>
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

export default ProfessionalDashboard;
