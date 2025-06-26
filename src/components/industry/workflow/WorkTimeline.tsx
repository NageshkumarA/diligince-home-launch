import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Wrench, CheckCircle, Star, FileText } from 'lucide-react';
import { WorkflowEvent } from '@/types/workflow';
interface WorkTimelineProps {
  timeline: WorkflowEvent[];
  workStatus: 'not_started' | 'in_progress' | 'completed' | 'approved';
}
export const WorkTimeline = ({
  timeline,
  workStatus
}: WorkTimelineProps) => {
  const getStatusIcon = (type: WorkflowEvent['type'], status: WorkflowEvent['status']) => {
    if (status === 'completed') {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
    switch (type) {
      case 'work_started':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'milestone_completed':
        return <Wrench className="h-5 w-5 text-orange-600" />;
      case 'work_completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'payment_released':
        return <Star className="h-5 w-5 text-yellow-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };
  const getStatusBadge = (status: WorkflowEvent['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-600">Completed</Badge>;
      case 'current':
        return <Badge className="bg-blue-600">In Progress</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      default:
        return null;
    }
  };
  return <Card className="w-full bg-blue-500">
      <CardHeader className="bg-blue-500">
        <CardTitle className="flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Work Progress Timeline
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-blue-500">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          <div className="space-y-6">
            {timeline.map((event, index) => <div key={event.id} className="relative flex items-start gap-4">
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                  {getStatusIcon(event.type, event.status)}
                </div>
                
                {/* Event content */}
                <div className="flex-1 min-w-0 pb-8">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-xl text-gray-50">{event.title}</h3>
                    {getStatusBadge(event.status)}
                  </div>
                  
                  <p className="text-sm mb-2 text-gray-300">{event.description}</p>
                  
                  {event.timestamp && <p className="text-xs text-gray-300">
                      {new Date(event.timestamp).toLocaleString()}
                    </p>}
                </div>
              </div>)}
          </div>
        </div>
        
        {/* Overall Status */}
        <div className="mt-6 p-4 rounded-lg bg-blue-400">
          <div className="flex items-center justify-between">
            <span className="font-medium">Overall Work Status:</span>
            <Badge className={workStatus === 'approved' ? 'bg-green-600' : workStatus === 'completed' ? 'bg-blue-600' : workStatus === 'in_progress' ? 'bg-orange-600' : 'bg-gray-600'}>
              {workStatus.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>;
};