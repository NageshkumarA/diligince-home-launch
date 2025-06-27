
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Wrench } from 'lucide-react';
import { WorkflowEvent } from '@/types/workflow';

interface WorkTimelineProps {
  timeline: WorkflowEvent[];
  workStatus: string;
}

export const WorkTimeline: React.FC<WorkTimelineProps> = ({ timeline, workStatus }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'not_started':
        return <Badge className="bg-gray-100 text-gray-700">NOT STARTED</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-700">IN PROGRESS</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-700">COMPLETED</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700">NOT STARTED</Badge>;
    }
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader className="border-b border-gray-100 bg-blue-50">
        <CardTitle className="text-xl font-semibold text-blue-900 flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Work Progress Timeline
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {timeline.map((event, index) => (
            <div key={event.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  event.status === 'completed' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {event.status === 'completed' ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Clock className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                {index < timeline.length - 1 && (
                  <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                )}
              </div>
              
              <div className="flex-1 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{event.title}</h3>
                  <Badge className={
                    event.status === 'completed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }>
                    {event.status === 'completed' ? 'Completed' : 'In Progress'}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-2">{event.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(event.timestamp).toLocaleDateString()} at{' '}
                  {new Date(event.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900">Overall Work Status:</span>
            {getStatusBadge(workStatus)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
