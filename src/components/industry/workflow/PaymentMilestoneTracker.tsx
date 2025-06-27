import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DollarSign, Clock, CheckCircle } from 'lucide-react';
import { PaymentMilestone } from '@/types/workflow';
interface PaymentMilestoneTrackerProps {
  milestones: PaymentMilestone[];
  onReleasePayment: (milestoneId: string) => void;
  totalProjectValue: number;
}
export const PaymentMilestoneTracker: React.FC<PaymentMilestoneTrackerProps> = ({
  milestones,
  onReleasePayment,
  totalProjectValue
}) => {
  const totalPaid = milestones.filter(m => m.status === 'released').reduce((sum, m) => sum + m.amount, 0);
  const paymentProgress = totalPaid / totalProjectValue * 100;
  const completedMilestones = milestones.filter(m => m.status === 'released').length;
  return <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader className="border-b border-gray-100 bg-blue-50">
        <CardTitle className="text-xl font-semibold text-blue-900 flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Payment Milestone Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-gray-900">Payment Progress</span>
            <span className="text-lg font-bold text-blue-600">
              ${totalPaid.toLocaleString()} of ${totalProjectValue.toLocaleString()}
            </span>
          </div>
          <Progress value={paymentProgress} className="h-3 bg-gray-100" />
          <p className="text-sm text-gray-600 mt-2">
            {completedMilestones} of {milestones.length} milestones completed
          </p>
        </div>

        <div className="space-y-4">
          {milestones.map(milestone => <div key={milestone.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {milestone.status === 'released' ? <CheckCircle className="h-5 w-5 text-green-600" /> : <Clock className="h-5 w-5 text-blue-600" />}
                  <h3 className="font-semibold text-gray-900 text-lg">{milestone.name}</h3>
                </div>
                <Badge className={milestone.status === 'released' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>
                  {milestone.status === 'released' ? 'Released' : 'Pending'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <span className="text-sm text-gray-600">Amount</span>
                  <div className="font-semibold text-lg text-gray-900">
                    ${milestone.amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    ({milestone.percentage}% of total)
                  </div>
                </div>
                
                {milestone.releasedDate && <div>
                    <span className="text-sm text-gray-600">Released Date</span>
                    <div className="font-medium text-gray-900">
                      {new Date(milestone.releasedDate).toLocaleDateString()}
                    </div>
                  </div>}
              </div>
              
              <p className="text-gray-700 text-sm mb-4">{milestone.description}</p>
              
              {milestone.status === 'pending' && <Button onClick={() => onReleasePayment(milestone.id)} className="bg-blue-600 hover:bg-blue-700 text-white font-medium" size="sm">
                  Release Payment
                </Button>}
            </div>)}
        </div>
      </CardContent>
    </Card>;
};