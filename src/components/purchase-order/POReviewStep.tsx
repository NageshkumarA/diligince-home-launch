
import React from 'react';
import { format, differenceInDays } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface FormValues {
  poNumber: string;
  vendor: string;
  projectTitle: string;
  orderValue: number;
  taxPercentage: number;
  totalValue: number;
  startDate: Date;
  endDate: Date;
  paymentTerms: string;
  specialInstructions?: string;
  scopeOfWork: string;
  deliverables: Array<{ id: string; description: string }>;
  paymentMilestones: Array<{
    id: string;
    description: string;
    percentage: number;
    dueDate: Date;
  }>;
  acceptanceCriteria: Array<{ id: string; criteria: string }>;
}

interface POReviewStepProps {
  formData: FormValues;
  selectedISOTerms: string[];
  customISOTerms: string;
  vendors: Array<{ id: string; name: string }>;
}

const POReviewStep: React.FC<POReviewStepProps> = ({
  formData,
  selectedISOTerms,
  customISOTerms,
  vendors
}) => {
  const getVendorName = (vendorId: string) => {
    const vendor = vendors.find(v => v.id === vendorId);
    return vendor ? vendor.name : vendorId;
  };

  const getPaymentTermsDisplay = (terms: string) => {
    const termMap: { [key: string]: string } = {
      '100_advance': '100% advance',
      '50_advance_50_completion': '50% advance, 50% upon completion',
      '30_advance_70_completion': '30% advance, 70% upon completion',
      'net_15': 'Net 15 days',
      'net_30': 'Net 30 days',
      'net_60': 'Net 60 days'
    };
    return termMap[terms] || terms;
  };

  const getDuration = () => {
    if (formData.startDate && formData.endDate) {
      return differenceInDays(formData.endDate, formData.startDate);
    }
    return 0;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Purchase Order</h2>
        <p className="text-gray-600">Please review all details before creating the purchase order</p>
      </div>

      {/* PO Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Purchase Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700">PO Number</p>
              <p className="text-lg font-semibold">{formData.poNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Vendor</p>
              <p className="text-lg">{getVendorName(formData.vendor)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Project Title</p>
              <p className="text-lg">{formData.projectTitle}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Duration</p>
              <p className="text-lg">{getDuration()} days</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Financial Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Order Value:</span>
            <span className="font-semibold">${formData.orderValue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax ({formData.taxPercentage}%):</span>
            <span className="font-semibold">${(formData.orderValue * (formData.taxPercentage / 100)).toLocaleString()}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg">
            <span className="font-semibold">Total Value:</span>
            <span className="font-bold text-blue-600">${formData.totalValue.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Project Timeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Start Date</p>
              <p className="text-lg">{format(formData.startDate, "PPP")}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">End Date</p>
              <p className="text-lg">{format(formData.endDate, "PPP")}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Payment Terms</p>
            <p className="text-lg">{getPaymentTermsDisplay(formData.paymentTerms)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Scope of Work */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Scope of Work</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
            <p className="text-gray-900 whitespace-pre-wrap bg-gray-50 p-3 rounded-md">{formData.scopeOfWork}</p>
          </div>

          {formData.deliverables.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Deliverables</p>
              <ul className="space-y-2">
                {formData.deliverables.map((deliverable, index) => (
                  <li key={deliverable.id} className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-1">{index + 1}</Badge>
                    <span className="text-gray-900">{deliverable.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {formData.acceptanceCriteria.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Acceptance Criteria</p>
              <ul className="space-y-2">
                {formData.acceptanceCriteria.map((criteria, index) => (
                  <li key={criteria.id} className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-1">{index + 1}</Badge>
                    <span className="text-gray-900">{criteria.criteria}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ISO Terms */}
      {(selectedISOTerms.length > 0 || customISOTerms) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">ISO 9001 Terms & Conditions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedISOTerms.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Selected Terms</p>
                <div className="flex flex-wrap gap-2">
                  {selectedISOTerms.map((term, index) => (
                    <Badge key={index} variant="secondary">{term}</Badge>
                  ))}
                </div>
              </div>
            )}
            {customISOTerms && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Custom Terms</p>
                <p className="text-gray-900 whitespace-pre-wrap bg-gray-50 p-3 rounded-md">{customISOTerms}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Special Instructions */}
      {formData.specialInstructions && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Special Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900 whitespace-pre-wrap bg-gray-50 p-3 rounded-md">{formData.specialInstructions}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default POReviewStep;
