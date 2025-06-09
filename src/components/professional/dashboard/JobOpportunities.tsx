
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Clock, DollarSign } from "lucide-react";
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
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Job Opportunities</h3>
        </div>
        
        <div className="space-y-4">
          {jobs.slice(0, 3).map((job) => (
            <div 
              key={job.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 cursor-pointer transition-colors"
              onClick={() => handleJobClick(job)}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{job.title}</h4>
                <Badge variant="outline" className="text-green-600 border-green-200">
                  {job.skillsMatch}% match
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{job.company}</p>
              
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <DollarSign size={12} />
                  {job.budget}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  {job.duration}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  {job.location}
                </div>
              </div>
            </div>
          ))}
          
          <div className="pt-2">
            <button className="w-full text-purple-600 text-sm font-medium hover:text-purple-700">
              View All Opportunities →
            </button>
          </div>
        </div>
      </Card>

      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        job={selectedJob}
        onSubmit={onApplicationSubmit}
      />
    </>
  );
};
