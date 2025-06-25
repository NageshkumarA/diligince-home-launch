
import React, { useState, useEffect, Suspense, memo } from "react";
import { Home, Briefcase, Calendar, MessageSquare, User, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import ProfessionalHeader from "@/components/professional/ProfessionalHeader";
import { FastLoadingState } from "@/components/shared/loading/FastLoadingState";
import { SkeletonLoader } from "@/components/shared/loading/SkeletonLoader";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { perfUtils } from "@/utils/performance";
import { useAsyncOperation } from "@/hooks/useAsyncOperation";

// Lazy load dashboard components for better performance
const DashboardStats = React.lazy(() => 
  import("@/components/professional/dashboard/DashboardStats").then(module => ({
    default: module.DashboardStats
  }))
);

const AvailabilityCalendar = React.lazy(() => 
  import("@/components/professional/dashboard/AvailabilityCalendar").then(module => ({
    default: module.AvailabilityCalendar
  }))
);

const JobOpportunities = React.lazy(() => 
  import("@/components/professional/dashboard/JobOpportunities").then(module => ({
    default: module.JobOpportunities
  }))
);

const OngoingProjects = React.lazy(() => 
  import("@/components/professional/dashboard/OngoingProjects").then(module => ({
    default: module.OngoingProjects
  }))
);

const MessageCenter = React.lazy(() => 
  import("@/components/professional/dashboard/MessageCenter").then(module => ({
    default: module.MessageCenter
  }))
);

// Mock data - moved to module level for better performance
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

// Header navigation items - moved to module level
const headerNavItems = [
  { label: "Dashboard", icon: <Home size={18} />, href: "/professional-dashboard", active: true },
  { label: "Opportunities", icon: <Briefcase size={18} />, href: "/professional-opportunities" },
  { label: "Calendar", icon: <Calendar size={18} />, href: "/professional-calendar" },
  { label: "Messages", icon: <MessageSquare size={18} />, href: "/professional-messages" },
  { label: "Profile", icon: <User size={18} />, href: "/professional-profile" },
];

// Memoized dashboard container
const DashboardContainer = memo(() => {
  const [messages, setMessages] = useState(mockMessages);
  const [projects, setProjects] = useState(mockProjects);
  const [jobs, setJobs] = useState(mockJobs);

  const { loading: dashboardLoading, execute: loadDashboardData } = useAsyncOperation({
    successMessage: "Dashboard data loaded successfully"
  });

  const handleMessageReply = async (messageId: number, reply: string) => {
    await loadDashboardData(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log(`Reply to message ${messageId}: ${reply}`);
      return { success: true };
    });
  };

  const handleJobApplication = async (jobId: number, applicationData: any) => {
    await loadDashboardData(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log(`Application for job ${jobId}:`, applicationData);
      return { success: true };
    });
  };

  const handleProjectUpdate = async (projectId: number, updates: any) => {
    await loadDashboardData(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 400));
      setProjects(prev => prev.map(project => 
        project.id === projectId 
          ? { ...project, ...updates }
          : project
      ));
      return { success: true };
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Professional Dashboard</h1>
        <p className="text-gray-600">Welcome back, Rahul! Here's your professional activity overview.</p>
      </div>

      {/* Stats Cards - Load first for immediate feedback */}
      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg border border-gray-100">
              <SkeletonLoader lines={2} height="20px" />
            </div>
          ))}
        </div>
      }>
        <DashboardStats />
      </Suspense>

      {/* Main Content Grid - Progressive loading */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <SkeletonLoader lines={6} />
          </div>
        }>
          <AvailabilityCalendar />
        </Suspense>
        
        <Suspense fallback={
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <SkeletonLoader lines={6} />
          </div>
        }>
          <JobOpportunities 
            jobs={jobs}
            onApplicationSubmit={handleJobApplication}
          />
        </Suspense>
      </div>

      {/* Secondary Content - Load after main content */}
      <Suspense fallback={
        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <SkeletonLoader lines={8} />
        </div>
      }>
        <OngoingProjects 
          projects={projects}
          onProjectUpdate={handleProjectUpdate}
        />
      </Suspense>

      <Suspense fallback={
        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <SkeletonLoader lines={5} />
        </div>
      }>
        <MessageCenter 
          messages={messages}
          onReply={handleMessageReply}
        />
      </Suspense>
    </div>
  );
});

DashboardContainer.displayName = "DashboardContainer";

const ProfessionalDashboard = () => {
  console.log("ProfessionalDashboard rendering - optimized version");
  usePerformanceMonitor("ProfessionalDashboard");
  const [initialLoading, setInitialLoading] = useState(true);

  // Initialize performance monitoring
  useEffect(() => {
    perfUtils.measureCoreWebVitals();
  }, []);

  // Simulate initial data loading - optimized for faster load
  useEffect(() => {
    const loadInitialData = async () => {
      // Reduced loading time for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      setInitialLoading(false);
      toast.success("Welcome to your Professional Dashboard");
    };

    loadInitialData();
  }, []);

  if (initialLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <ProfessionalHeader navItems={headerNavItems} />
        
        <main className="pt-16 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <FastLoadingState message="Loading your dashboard..." size="lg" />
            
            {/* Loading skeleton for main content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg border border-gray-100">
                  <SkeletonLoader lines={2} height="20px" />
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-100">
                <SkeletonLoader lines={4} />
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-100">
                <SkeletonLoader lines={4} />
              </div>
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
        <DashboardContainer />
      </main>
    </div>
  );
};

export default memo(ProfessionalDashboard);
