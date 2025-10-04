import React, { useState } from "react";
import {
  Search,
  Filter,
  BookmarkPlus,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Calendar,
  Building2,
  Home,
  MessageSquare,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobApplicationModal } from "@/components/professional/dashboard/JobApplicationModal";
import ProfessionalHeader from "@/components/professional/ProfessionalHeader";
import { toast } from "sonner";

// ---- Types ----
interface Job {
  id: number;
  title: string;
  company: string;
  budget: string;
  duration: string;
  location: string;
  skillsMatch: number;
  postedDate: string;
  deadline: string;
  status: string;
  description: string;
  requirements: string[];
  companyLogo: string;
  urgency: "high" | "medium" | "low";
  applicants: number;
  saved: boolean;
}

interface ApplicationData {
  coverLetter: string;
  resume: string;
}

// ---- Mock Data ----
const mockJobs: Job[] = [
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
    description:
      "Upgrade existing control systems with latest PLC technology. This project involves modernizing legacy systems and implementing new safety protocols.",
    requirements: [
      "PLC Programming",
      "Control Systems",
      "Industrial Automation",
      "Safety Systems",
    ],
    companyLogo: "SP",
    urgency: "high",
    applicants: 12,
    saved: false,
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
    description:
      "Program PLC for new automotive parts production line with quality control integration.",
    requirements: [
      "PLC Programming",
      "Manufacturing",
      "Quality Control",
      "HMI Design",
    ],
    companyLogo: "AP",
    urgency: "medium",
    applicants: 8,
    saved: true,
  },
];

// ---- Component ----
const ProfessionalOpportunities = () => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [budgetFilter, setBudgetFilter] = useState("all");
  const [skillsFilter, setSkillsFilter] = useState("all");
  const [sortBy, setSortBy] = useState("match");

  const headerNavItems = [
    {
      label: "Dashboard",
      icon: <Home size={18} />,
      href: "/dashboard/professional",
    },
    {
      label: "Opportunities",
      icon: <Briefcase size={18} />,
      href: "/dashboard/professional-opportunities",
      active: true,
    },
    {
      label: "Calendar",
      icon: <Calendar size={18} />,
      href: "/dashboard/professional-calendar",
    },
    {
      label: "Messages",
      icon: <MessageSquare size={18} />,
      href: "/dashboard/professional-messages",
    },
    {
      label: "Profile",
      icon: <User size={18} />,
      href: "/dashboard/professional-profile",
    },
  ];

  const filteredJobs = jobs
    .filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation =
        locationFilter === "all" || job.location === locationFilter;

      const budget = parseInt(job.budget.replace(/[₹,]/g, ""));
      const matchesBudget =
        budgetFilter === "all" ||
        (budgetFilter === "high" && budget >= 300000) ||
        (budgetFilter === "medium" && budget >= 200000 && budget < 300000) ||
        (budgetFilter === "low" && budget < 200000);

      const matchesSkills =
        skillsFilter === "all" ||
        job.requirements.some((req) =>
          req.toLowerCase().includes(skillsFilter.toLowerCase())
        );

      return matchesSearch && matchesLocation && matchesBudget && matchesSkills;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "match":
          return b.skillsMatch - a.skillsMatch;
        case "budget":
          return (
            parseInt(b.budget.replace(/[₹,]/g, "")) -
            parseInt(a.budget.replace(/[₹,]/g, ""))
          );
        case "deadline":
          return (
            new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
          );
        case "posted":
          return (
            new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
          );
        default:
          return 0;
      }
    });

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleSaveJob = (jobId: number) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, saved: !job.saved } : job
      )
    );
    const job = jobs.find((j) => j.id === jobId);
    toast.success(
      job?.saved ? "Job removed from saved" : "Job saved successfully"
    );
  };

  const handleApplicationSubmit = (
    jobId: number,
    applicationData: ApplicationData
  ) => {
    console.log(`Application for job ${jobId}:`, applicationData);
    toast.success("Application submitted successfully");
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const getUrgencyColor = (urgency: Job["urgency"]) => {
    switch (urgency) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-orange-600 bg-orange-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* // <ProfessionalHeader navItems={headerNavItems} /> */}
      {/* --- Rest of your JSX remains unchanged --- */}
      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedJob(null);
        }}
        job={selectedJob}
        onSubmit={handleApplicationSubmit}
      />
    </div>
  );
};

export default ProfessionalOpportunities;
