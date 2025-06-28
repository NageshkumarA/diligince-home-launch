
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Wrench, FileText, Shield, AlertTriangle, Info } from 'lucide-react';
import { WorkflowEvent } from '@/types/workflow';

interface WorkTimelineProps {
  timeline: WorkflowEvent[];
  workStatus: string;
}

export const WorkTimeline: React.FC<WorkTimelineProps> = ({
  timeline,
  workStatus
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'not_started':
        return <Badge className="bg-gray-100 text-gray-700 font-medium">NOT STARTED</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-700 font-medium">IN PROGRESS</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-700 font-medium">COMPLETED</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700 font-medium">NOT STARTED</Badge>;
    }
  };

  const getComplianceLevel = (eventType: string) => {
    const complianceLevels = {
      'quote_submitted': 'medium',
      'quote_accepted': 'low',
      'po_generated': 'low',
      'work_started': 'medium',
      'milestone_completed': 'high',
      'work_completed': 'high',
      'payment_released': 'low'
    };
    return complianceLevels[eventType as keyof typeof complianceLevels] || 'low';
  };

  const getComplianceBadge = (level: string) => {
    switch (level) {
      case 'high':
        return (
          <Badge className="bg-red-50 text-red-700 border border-red-200 flex items-center gap-1 text-xs">
            <Shield className="h-3 w-3" />
            High ISO Compliance
          </Badge>
        );
      case 'medium':
        return (
          <Badge className="bg-yellow-50 text-yellow-700 border border-yellow-200 flex items-center gap-1 text-xs">
            <AlertTriangle className="h-3 w-3" />
            Medium Compliance
          </Badge>
        );
      case 'low':
        return (
          <Badge className="bg-green-50 text-green-700 border border-green-200 flex items-center gap-1 text-xs">
            <Info className="h-3 w-3" />
            Standard Process
          </Badge>
        );
      default:
        return null;
    }
  };

  const getQualityCheckpoints = (eventType: string) => {
    const checkpoints = {
      'quote_submitted': ['Vendor Qualification Review', 'Technical Specification Compliance'],
      'quote_accepted': ['Quality Agreement Verification', 'ISO 9001 Certification Check'],
      'po_generated': ['Purchase Order Compliance Review', 'Terms & Conditions Verification'],
      'work_started': ['Quality Plan Approval', 'Work Instructions Review'],
      'milestone_completed': ['Quality Inspection Report', 'Compliance Documentation'],
      'work_completed': ['Final Quality Audit', 'ISO 9001 Completion Certificate'],
      'payment_released': ['Payment Authorization', 'Financial Compliance Check']
    };
    return checkpoints[eventType as keyof typeof checkpoints] || [];
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-xl font-semibold text-blue-900 flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Work Progress Timeline
          <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1 ml-2">
            <Shield className="h-3 w-3" />
            ISO 9001 Compliant
          </Badge>
        </CardTitle>
        <p className="text-sm text-blue-700 mt-1">
          Quality-controlled workflow with ISO 9001 compliance checkpoints
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-8">
          {timeline.map((event, index) => {
            const complianceLevel = getComplianceLevel(event.type);
            const qualityCheckpoints = getQualityCheckpoints(event.type);
            
            return (
              <div key={event.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    event.status === 'completed' 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-blue-50 border-blue-200'
                  }`}>
                    {event.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Clock className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-16 bg-gradient-to-b from-gray-300 to-gray-100 mt-2"></div>
                  )}
                </div>
                
                <div className="flex-1 pb-8">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
                        {event.title}
                        {event.status === 'completed' && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </h3>
                      <div className="flex items-center gap-2">
                        {getComplianceBadge(complianceLevel)}
                        <Badge className={
                          event.status === 'completed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }>
                          {event.status === 'completed' ? 'Completed' : 'In Progress'}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{event.description}</p>
                    
                    {qualityCheckpoints.length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          Quality Checkpoints:
                        </h4>
                        <div className="space-y-1">
                          {qualityCheckpoints.map((checkpoint, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <div className={`w-2 h-2 rounded-full ${
                                event.status === 'completed' ? 'bg-green-400' : 'bg-gray-300'
                              }`}></div>
                              <span className={
                                event.status === 'completed' 
                                  ? 'text-green-700' 
                                  : 'text-gray-600'
                              }>
                                {checkpoint}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <p className="text-sm text-gray-500">
                        {new Date(event.timestamp).toLocaleDateString()} at{' '}
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </p>
                      {event.status === 'completed' && (
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <Shield className="h-3 w-3" />
                          ISO 9001 Verified
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-gray-900">Overall Work Status:</span>
            </div>
            {getStatusBadge(workStatus)}
          </div>
          <div className="mt-3 text-sm text-gray-600">
            <p>All work stages follow ISO 9001:2015 quality management standards with documented evidence and compliance verification.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
