
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DollarSign, Clock, CheckCircle, Shield, FileText, AlertTriangle, Award } from 'lucide-react';
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

  const getQualityGateRequirements = (milestoneName: string) => {
    const requirements = {
      'Advance Payment': [
        'Purchase Order ISO 9001 Compliance Verification',
        'Vendor Quality Agreement Signed',
        'Quality Plan Approval'
      ],
      'Mid-project Payment': [
        'Quality Inspection Report Submitted',
        'Work Progress Documentation Review',
        'ISO 9001 Interim Compliance Check'
      ],
      'Completion Payment': [
        'Final Quality Audit Completed',
        'ISO 9001 Completion Certificate Issued',
        'Customer Acceptance Documentation'
      ]
    };
    return requirements[milestoneName as keyof typeof requirements] || [
      'Standard Quality Review',
      'Documentation Verification'
    ];
  };

  const getRiskAssessment = (milestone: PaymentMilestone) => {
    if (milestone.status === 'released') return 'low';
    if (milestone.name.includes('Completion')) return 'high';
    if (milestone.name.includes('Mid-project')) return 'medium';
    return 'low';
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'high':
        return (
          <Badge className="bg-red-50 text-red-700 border border-red-200 flex items-center gap-1 text-xs">
            <AlertTriangle className="h-3 w-3" />
            High Risk
          </Badge>
        );
      case 'medium':
        return (
          <Badge className="bg-yellow-50 text-yellow-700 border border-yellow-200 flex items-center gap-1 text-xs">
            <Clock className="h-3 w-3" />
            Medium Risk
          </Badge>
        );
      case 'low':
        return (
          <Badge className="bg-green-50 text-green-700 border border-green-200 flex items-center gap-1 text-xs">
            <Shield className="h-3 w-3" />
            Low Risk
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-green-50 to-blue-50">
        <CardTitle className="text-xl font-semibold text-blue-900 flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Payment Milestone Tracker
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1 ml-2">
            <Award className="h-3 w-3" />
            Quality Gated
          </Badge>
        </CardTitle>
        <p className="text-sm text-blue-700 mt-1">
          ISO 9001 compliant payment release with quality gate approvals
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-600" />
              Payment Progress
            </span>
            <span className="text-lg font-bold text-blue-600">
              ${totalPaid.toLocaleString()} of ${totalProjectValue.toLocaleString()}
            </span>
          </div>
          <Progress value={paymentProgress} className="h-4 bg-gray-100" />
          <div className="flex justify-between items-center mt-3">
            <p className="text-sm text-gray-600">
              {completedMilestones} of {milestones.length} milestones completed
            </p>
            <p className="text-sm font-medium text-blue-600">
              {Math.round(paymentProgress)}% Complete
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {milestones.map((milestone, index) => {
            const qualityRequirements = getQualityGateRequirements(milestone.name);
            const riskLevel = getRiskAssessment(milestone);
            
            return (
              <div key={milestone.id} className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-white to-gray-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      milestone.status === 'released' 
                        ? 'bg-green-100 border-2 border-green-300' 
                        : 'bg-blue-100 border-2 border-blue-300'
                    }`}>
                      {milestone.status === 'released' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg">{milestone.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {getRiskBadge(riskLevel)}
                    <Badge className={
                      milestone.status === 'released' 
                        ? 'bg-green-100 text-green-700 font-medium' 
                        : 'bg-blue-100 text-blue-700 font-medium'
                    }>
                      {milestone.status === 'released' ? 'Released' : 'Pending'}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="space-y-2">
                    <span className="text-sm text-gray-600 font-medium">Payment Details</span>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <div className="font-semibold text-xl text-gray-900">
                        ${milestone.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        ({milestone.percentage}% of total project value)
                      </div>
                    </div>
                  </div>
                  
                  {milestone.releasedDate && (
                    <div className="space-y-2">
                      <span className="text-sm text-gray-600 font-medium">Release Information</span>
                      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <div className="font-medium text-gray-900 flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Released
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(milestone.releasedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
                    {milestone.description}
                  </p>
                </div>

                {/* Quality Gate Requirements */}
                <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-yellow-600" />
                    ISO 9001 Quality Gate Requirements
                  </h4>
                  <div className="space-y-2">
                    {qualityRequirements.map((requirement, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className={`w-2 h-2 rounded-full ${
                          milestone.status === 'released' ? 'bg-green-400' : 'bg-yellow-400'
                        }`}></div>
                        <span className={
                          milestone.status === 'released' 
                            ? 'text-green-700 line-through' 
                            : 'text-gray-700'
                        }>
                          {requirement}
                        </span>
                        {milestone.status === 'released' && (
                          <CheckCircle className="h-3 w-3 text-green-600 ml-auto" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {milestone.status === 'pending' && (
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">Quality gate approval required before payment release</p>
                    </div>
                    <Button 
                      onClick={() => onReleasePayment(milestone.id)}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-6"
                      size="sm"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Release Payment
                    </Button>
                  </div>
                )}
                
                {milestone.status === 'released' && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-green-700">
                        <Award className="h-4 w-4" />
                        <span className="font-medium">Quality gates passed • Payment released</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        ISO 9001 Compliant ✓
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* ISO 9001 Compliance Summary */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-6 w-6 text-blue-600" />
            <h3 className="font-semibold text-gray-900 text-lg">ISO 9001:2015 Compliance</h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            All payment milestones are governed by ISO 9001:2015 quality management standards. 
            Each payment release requires completion of quality gates, documentation verification, 
            and compliance approval to ensure project quality and risk management.
          </p>
          <div className="mt-3 flex items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Award className="h-3 w-3" />
              Quality Assured
            </div>
            <div className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              Documented Process
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Risk Managed
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
