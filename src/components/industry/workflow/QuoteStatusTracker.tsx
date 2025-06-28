
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Mail, Eye } from 'lucide-react';

interface RFQStatus {
  stakeholderName: string;
  stakeholderType: string;
  rfqSentDate: string;
  quoteStatus: 'sent' | 'received' | 'pending';
  expectedDate?: string;
  quoteAmount?: number;
}

interface QuoteStatusTrackerProps {
  rfqStatuses: RFQStatus[];
  totalRFQsSent: number;
  quotesReceived: number;
}

export const QuoteStatusTracker: React.FC<QuoteStatusTrackerProps> = ({
  rfqStatuses,
  totalRFQsSent,
  quotesReceived
}) => {
  const getStatusIcon = (status: RFQStatus['quoteStatus']) => {
    switch (status) {
      case 'received':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-600" />;
      case 'sent':
        return <Mail className="h-4 w-4 text-blue-600" />;
    }
  };

  const getStatusBadge = (status: RFQStatus['quoteStatus']) => {
    switch (status) {
      case 'received':
        return <Badge className="bg-green-100 text-green-800">Quote Received</Badge>;
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-800">Awaiting Response</Badge>;
      case 'sent':
        return <Badge className="bg-blue-100 text-blue-800">RFQ Sent</Badge>;
    }
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Eye className="h-5 w-5 text-blue-600" />
          Quote Status Tracker
        </CardTitle>
        <div className="flex gap-4 text-sm">
          <span className="text-gray-600">
            RFQs Sent: <span className="font-semibold text-blue-600">{totalRFQsSent}</span>
          </span>
          <span className="text-gray-600">
            Quotes Received: <span className="font-semibold text-green-600">{quotesReceived}</span>
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {rfqStatuses.map((rfq, index) => (
            <div key={index} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
              <div className="flex items-center gap-3">
                {getStatusIcon(rfq.quoteStatus)}
                <div>
                  <div className="font-semibold text-gray-900">{rfq.stakeholderName}</div>
                  <div className="text-sm text-gray-600">{rfq.stakeholderType}</div>
                </div>
              </div>
              <div className="text-right">
                {getStatusBadge(rfq.quoteStatus)}
                <div className="text-sm text-gray-500 mt-1">
                  {rfq.quoteStatus === 'received' && rfq.quoteAmount ? (
                    `Quote: $${rfq.quoteAmount.toLocaleString()}`
                  ) : rfq.quoteStatus === 'pending' && rfq.expectedDate ? (
                    `Expected: ${rfq.expectedDate}`
                  ) : (
                    `Sent: ${rfq.rfqSentDate}`
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
