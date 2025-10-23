import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Upload, FileText } from 'lucide-react';
import { PaymentMilestone } from '@/services/modules/purchase-orders';
import { format } from 'date-fns';

interface POMilestonesTabProps {
  orderId: string;
  milestones: PaymentMilestone[];
}

export const POMilestonesTab: React.FC<POMilestonesTabProps> = ({ orderId, milestones }) => {
  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-gray-100 text-gray-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (!milestones || milestones.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No milestones available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {milestones.map((milestone, index) => (
        <Card key={milestone.id}>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">
                  {index + 1}
                </div>
                <div>
                  <CardTitle className="text-lg">{milestone.description}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Due: {format(new Date(milestone.dueDate), 'PPP')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(milestone.status)}>
                  {milestone.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Payment Percentage</p>
                <p className="text-2xl font-bold text-primary">{milestone.percentage}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="text-2xl font-bold">
                  ${milestone.amount?.toLocaleString() || 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className={getStatusColor(milestone.status)} variant="secondary">
                  {milestone.status.toUpperCase()}
                </Badge>
              </div>
            </div>

            {milestone.invoiceId && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>Linked to Invoice #{milestone.invoiceId}</span>
              </div>
            )}

            {milestone.status !== 'completed' && (
              <div className="flex gap-2">
                <Button size="sm" className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Mark Complete
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Proof
                </Button>
              </div>
            )}

            {milestone.completedAt && (
              <div className="text-sm text-muted-foreground">
                Completed on: {format(new Date(milestone.completedAt), 'PPP')}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
