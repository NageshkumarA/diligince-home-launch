import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, User, FileText, CheckCircle, XCircle, Edit, Upload } from 'lucide-react';
import { ActivityLog } from '@/services/modules/purchase-orders';
import { format } from 'date-fns';

interface POActivityTabProps {
  orderId: string;
  activities: ActivityLog[];
}

export const POActivityTab: React.FC<POActivityTabProps> = ({ orderId, activities }) => {
  const getActivityIcon = (action: string) => {
    const icons = {
      created: FileText,
      updated: Edit,
      approved: CheckCircle,
      rejected: XCircle,
      milestone_completed: CheckCircle,
      invoice_created: FileText,
      invoice_paid: CheckCircle,
      delivery_updated: Upload,
      document_uploaded: Upload,
    };
    const Icon = icons[action as keyof typeof icons] || Activity;
    return <Icon className="h-4 w-4" />;
  };

  const getActivityColor = (action: string) => {
    const colors = {
      created: 'bg-blue-100 text-blue-800',
      updated: 'bg-purple-100 text-purple-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      milestone_completed: 'bg-green-100 text-green-800',
      invoice_created: 'bg-blue-100 text-blue-800',
      invoice_paid: 'bg-green-100 text-green-800',
      delivery_updated: 'bg-orange-100 text-orange-800',
      document_uploaded: 'bg-purple-100 text-purple-800',
    };
    return colors[action as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (!activities || activities.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No activity recorded yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Activity Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                  {getActivityIcon(activity.action)}
                </div>
                {index < activities.length - 1 && (
                  <div className="w-0.5 h-full bg-border min-h-[40px]" />
                )}
              </div>
              <div className="flex-1 pb-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={getActivityColor(activity.action)} variant="secondary">
                        {activity.action.replace(/_/g, ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium mb-1">{activity.details}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{activity.performedBy}</span>
                      <span>•</span>
                      <span>{format(new Date(activity.timestamp), 'PPp')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
