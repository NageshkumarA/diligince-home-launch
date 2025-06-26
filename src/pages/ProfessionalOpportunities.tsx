import React, { useState } from "react";
import { Search, Filter, BookmarkPlus, Briefcase, MapPin, Clock, DollarSign, Star, Calendar, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JobApplicationModal } from "@/components/professional/dashboard/JobApplicationModal";
import ProfessionalHeader from "@/components/professional/ProfessionalHeader";
import { Home, MessageSquare, User } from "lucide-react";
import { toast } from "sonner";
const mockJobs = [{
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
  description: "Upgrade existing control systems with latest PLC technology. This project involves modernizing legacy systems and implementing new safety protocols.",
  requirements: ["PLC Programming", "Control Systems", "Industrial Automation", "Safety Systems"],
  companyLogo: "SP",
  urgency: "high",
  applicants: 12,
  saved: false
}, {
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
  description: "Program PLC for new automotive parts production line with quality control integration.",
  requirements: ["PLC Programming", "Manufacturing", "Quality Control", "HMI Design"],
  companyLogo: "AP",
  urgency: "medium",
  applicants: 8,
  saved: true
}, {
  id: 3,
  title: "SCADA System Implementation",
  company: "Power Grid Corp",
  budget: "₹450,000",
  duration: "6 weeks",
  location: "Delhi",
  skillsMatch: 92,
  postedDate: "2024-04-25",
  deadline: "2024-05-20",
  status: "open",
  description: "Implement comprehensive SCADA system for power distribution monitoring and control.",
  requirements: ["SCADA", "Power Systems", "Network Configuration", "Database Management"],
  companyLogo: "PG",
  urgency: "high",
  applicants: 15,
  saved: false
}, {
  id: 4,
  title: "Industrial Automation Consultant",
  company: "Textile Mills Inc",
  budget: "₹200,000",
  duration: "2 weeks",
  location: "Ahmedabad",
  skillsMatch: 78,
  postedDate: "2024-04-30",
  deadline: "2024-05-10",
  status: "open",
  description: "Consulting on automation solutions for textile manufacturing processes.",
  requirements: ["Industrial Automation", "Process Control", "Consulting", "Report Writing"],
  companyLogo: "TM",
  urgency: "low",
  applicants: 5,
  saved: false
}];
const ProfessionalOpportunities = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [budgetFilter, setBudgetFilter] = useState("all");
  const [skillsFilter, setSkillsFilter] = useState("all");
  const [sortBy, setSortBy] = useState("match");
  const headerNavItems = [{
    label: "Dashboard",
    icon: <Home size={18} />,
    href: "/professional-dashboard"
  }, {
    label: "Opportunities",
    icon: <Briefcase size={18} />,
    href: "/professional-opportunities",
    active: true
  }, {
    label: "Calendar",
    icon: <Calendar size={18} />,
    href: "/professional-calendar"
  }, {
    label: "Messages",
    icon: <MessageSquare size={18} />,
    href: "/professional-messages"
  }, {
    label: "Profile",
    icon: <User size={18} />,
    href: "/professional-profile"
  }];
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase()) || job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === "all" || job.location === locationFilter;
    const matchesBudget = budgetFilter === "all" || budgetFilter === "high" && parseInt(job.budget.replace(/[₹,]/g, '')) >= 300000 || budgetFilter === "medium" && parseInt(job.budget.replace(/[₹,]/g, '')) >= 200000 && parseInt(job.budget.replace(/[₹,]/g, '')) < 300000 || budgetFilter === "low" && parseInt(job.budget.replace(/[₹,]/g, '')) < 200000;
    const matchesSkills = skillsFilter === "all" || job.requirements.some(req => req.toLowerCase().includes(skillsFilter.toLowerCase()));
    return matchesSearch && matchesLocation && matchesBudget && matchesSkills;
  }).sort((a, b) => {
    switch (sortBy) {
      case "match":
        return b.skillsMatch - a.skillsMatch;
      case "budget":
        return parseInt(b.budget.replace(/[₹,]/g, '')) - parseInt(a.budget.replace(/[₹,]/g, ''));
      case "deadline":
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case "posted":
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      default:
        return 0;
    }
  });
  const handleJobClick = job => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };
  const handleSaveJob = jobId => {
    setJobs(prev => prev.map(job => job.id === jobId ? {
      ...job,
      saved: !job.saved
    } : job));
    const job = jobs.find(j => j.id === jobId);
    toast.success(job?.saved ? "Job removed from saved" : "Job saved successfully");
  };
  const handleApplicationSubmit = (jobId, applicationData) => {
    console.log(`Application for job ${jobId}:`, applicationData);
    toast.success("Application submitted successfully");
    setIsModalOpen(false);
    setSelectedJob(null);
  };
  const getUrgencyColor = urgency => {
    switch (urgency) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-orange-600 bg-orange-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <ProfessionalHeader navItems={headerNavItems} />
      
      <main className="pt-16 p-6 lg:p-8 mx-0">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Opportunities</h1>
              <p className="text-gray-600">Find and apply to opportunities that match your expertise</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                <BookmarkPlus className="h-4 w-4 mr-2" />
                Saved Jobs
              </Button>
              <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Search & Filter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search jobs, companies, skills..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 border-gray-200 focus:border-purple-300 focus:ring-purple-200" />
                  </div>
                </div>
                
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="border-gray-200 focus:border-purple-300 focus:ring-purple-200">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Pune">Pune</SelectItem>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Ahmedabad">Ahmedabad</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={budgetFilter} onValueChange={setBudgetFilter}>
                  <SelectTrigger className="border-gray-200 focus:border-purple-300 focus:ring-purple-200">
                    <SelectValue placeholder="Budget Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Budgets</SelectItem>
                    <SelectItem value="high">₹3L+ High Budget</SelectItem>
                    <SelectItem value="medium">₹2L-3L Medium</SelectItem>
                    <SelectItem value="low">Under ₹2L</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={skillsFilter} onValueChange={setSkillsFilter}>
                  <SelectTrigger className="border-gray-200 focus:border-purple-300 focus:ring-purple-200">
                    <SelectValue placeholder="Skills" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Skills</SelectItem>
                    <SelectItem value="plc">PLC Programming</SelectItem>
                    <SelectItem value="scada">SCADA</SelectItem>
                    <SelectItem value="automation">Automation</SelectItem>
                    <SelectItem value="control">Control Systems</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="border-gray-200 focus:border-purple-300 focus:ring-purple-200">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="match">Skills Match</SelectItem>
                    <SelectItem value="budget">Budget (High to Low)</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="posted">Recently Posted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              Showing {filteredJobs.length} of {jobs.length} opportunities
            </p>
            <div className="flex gap-2">
              <Badge variant="outline" className="border-purple-200 text-purple-600 bg-purple-50">
                {jobs.filter(j => j.saved).length} Saved
              </Badge>
              <Badge variant="outline" className="border-orange-200 text-orange-600 bg-orange-50">
                {jobs.filter(j => j.urgency === 'high').length} Urgent
              </Badge>
            </div>
          </div>

          {/* Job Listings */}
          <div className="grid gap-6">
            {filteredJobs.map(job => <Card key={job.id} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600 font-semibold">{job.companyLogo}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <Building2 className="h-4 w-4" />
                          <span className="text-sm">{job.company}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {job.budget}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {job.applicants} applicants
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <Button variant="ghost" size="icon" onClick={e => {
                    e.stopPropagation();
                    handleSaveJob(job.id);
                  }} className={job.saved ? "text-purple-600 hover:bg-purple-50" : "text-gray-400 hover:bg-gray-50"}>
                        <Star className={`h-4 w-4 ${job.saved ? "fill-current" : ""}`} />
                      </Button>
                      <Badge className={`${getUrgencyColor(job.urgency)} border-0`}>
                        {job.urgency} priority
                      </Badge>
                      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                        {job.skillsMatch}% match
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-4 line-clamp-2">{job.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.requirements.map((req, index) => <Badge key={index} variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
                        {req}
                      </Badge>)}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      Posted: {new Date(job.postedDate).toLocaleDateString()} • 
                      Deadline: {new Date(job.deadline).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:bg-gray-50">
                        View Details
                      </Button>
                      <Button onClick={e => {
                    e.stopPropagation();
                    handleJobClick(job);
                  }} className="bg-purple-600 hover:bg-purple-700 text-white font-medium" size="sm">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>

          {filteredJobs.length === 0 && <Card className="bg-white border border-gray-100 shadow-sm p-12 text-center">
              <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No opportunities found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </Card>}
        </div>
      </main>

      <JobApplicationModal isOpen={isModalOpen} onClose={() => {
      setIsModalOpen(false);
      setSelectedJob(null);
    }} job={selectedJob} onSubmit={handleApplicationSubmit} />
    </div>;
};
export default ProfessionalOpportunities;