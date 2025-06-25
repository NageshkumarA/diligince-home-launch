
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { PaymentMilestone } from '@/types/workflow';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface PaymentMilestoneTrackerProps {
  milestones: PaymentMilestone[];
  onReleasePayment: (milestoneId: string) => void;
  totalProjectValue: number;
}

export const PaymentMilestoneTracker = ({ 
  milestones, 
  onReleasePayment, 
  totalProjectValue 
}: PaymentMilestoneTrackerProps) => {
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const completedPayments = milestones.filter(m => m.status === 'completed').length;
  const totalPaymentsReleased = milestones
    .filter(m => m.status === 'completed')
    .reduce((sum, m) => sum + m.amount, 0);
  
  const progressPercentage = (totalPaymentsReleased / totalProjectValue) * 100;

  const getStatusIcon = (status: PaymentMilestone['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'released':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: PaymentMilestone['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-600">Completed</Badge>;
      case 'released':
        return <Badge className="bg-blue-600">Processing</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Payment Milestone Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Payment Progress</span>
            <span>{formatCurrency(totalPaymentsReleased)} of {formatCurrency(totalProjectValue)}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs text-gray-500">
            {completedPayments} of {milestones.length} milestones completed
          </p>
        </div>

        {/* Milestone Cards */}
        <div className="space-y-4">
          {milestones.map((milestone) => (
            <div 
              key={milestone.id} 
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(milestone.status)}
                  <h3 className="font-medium">{milestone.name}</h3>
                </div>
                {getStatusBadge(milestone.status)}
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="font-medium">{formatCurrency(milestone.amount)}</p>
                  <p className="text-xs text-gray-500">({milestone.percentage}% of total)</p>
                </div>
                
                {milestone.dueDate && (
                  <div>
                    <p className="text-sm text-gray-600">Due Date</p>
                    <p className="font-medium">{new Date(milestone.dueDate).toLocaleDateString()}</p>
                  </div>
                )}
                
                {milestone.releasedDate && (
                  <div>
                    <p className="text-sm text-gray-600">Released</p>
                    <p className="font-medium">{new Date(milestone.releasedDate).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{milestone.description}</p>
              
              {milestone.status === 'pending' && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => setSelectedMilestone(milestone.id)}
                    >
                      Release Payment
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Release Payment</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to release the payment of {formatCurrency(milestone.amount)} 
                        for "{milestone.name}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => onReleasePayment(milestone.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Release Payment
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
