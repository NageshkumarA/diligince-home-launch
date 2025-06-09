
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, DollarSign, Briefcase, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { JobApplicationModal } from "./JobApplicationModal";

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
}

interface JobOpportunitiesProps {
  jobs: Job[];
  onApplicationSubmit: (jobId: number, applicationData: any) => void;
}

export const JobOpportunities = ({ jobs, onApplicationSubmit }: JobOpportunitiesProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewAndApply = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleApplicationSubmit = (applicationData: any) => {
    if (selectedJob) {
      onApplicationSubmit(selectedJob.id, applicationData);
      setIsModalOpen(false);
      setSelectedJob(null);
    }
  };

  const getSkillsMatchColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 bg-green-100";
    if (percentage >= 80) return "text-blue-600 bg-blue-100";
    if (percentage >= 70) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Job Opportunities</CardTitle>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                  <p className="text-sm text-gray-500 line-clamp-2">{job.description}</p>
                </div>
                <Badge className={`${getSkillsMatchColor(job.skillsMatch)} font-medium`}>
                  {job.skillsMatch}% match
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  <span>{job.budget}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{job.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {job.requirements.slice(0, 3).map((req, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {req}
                  </Badge>
                ))}
                {job.requirements.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{job.requirements.length - 3} more
                  </Badge>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleViewAndApply(job)}
                  className="flex-1 bg-[#722ed1] hover:bg-[#722ed1]/90"
                >
                  View & Apply
                </Button>
                <Button variant="outline" size="sm">
                  Save
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-4">
          View All Opportunities
        </Button>
      </CardContent>
      
      {selectedJob && (
        <JobApplicationModal
          job={selectedJob}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleApplicationSubmit}
        />
      )}
    </Card>
  );
};
