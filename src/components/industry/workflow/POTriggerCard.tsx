
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Building, DollarSign, Calendar, Star } from 'lucide-react';
import { VendorQuote } from '@/types/workflow';

interface POTriggerCardProps {
  acceptedQuote: VendorQuote;
  onGeneratePO: () => void;
}

export const POTriggerCard: React.FC<POTriggerCardProps> = ({ acceptedQuote, onGeneratePO }) => {
  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader className="border-b border-gray-100 bg-green-50">
        <CardTitle className="text-xl font-semibold text-green-900 flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Quote Accepted - Generate Purchase Order
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="bg-green-50 rounded-lg p-6 mb-6 border border-green-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Accepted Vendor Quote</h3>
              <Badge className="bg-green-100 text-green-700 font-medium">Accepted</Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Building className="h-5 w-5 text-gray-600" />
                <div>
                  <div className="font-semibold text-gray-900">{acceptedQuote.vendorName}</div>
                  <div className="text-sm text-gray-600">Selected Vendor</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-gray-600" />
                <div>
                  <div className="font-semibold text-xl text-gray-900">
                    ${acceptedQuote.quoteAmount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Contract Value</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-600" />
                <div>
                  <div className="font-semibold text-gray-900">{acceptedQuote.deliveryTimeWeeks} weeks delivery</div>
                  <div className="text-sm text-gray-600">Expected Timeline</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <div>
                  <div className="font-semibold text-gray-900">Rating: {acceptedQuote.vendorRating}/5</div>
                  <div className="text-sm text-gray-600">Vendor Performance</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-white rounded border border-green-200">
            <h4 className="font-medium text-gray-900 mb-2">Proposal Summary:</h4>
            <p className="text-gray-700">{acceptedQuote.proposalSummary}</p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Payment Schedule Preview</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">30% Advance Payment:</span>
              <span className="font-semibold text-gray-900">
                ${(acceptedQuote.quoteAmount * 0.3).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">40% Mid-project Payment:</span>
              <span className="font-semibold text-gray-900">
                ${(acceptedQuote.quoteAmount * 0.4).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">20% Completion Payment:</span>
              <span className="font-semibold text-gray-900">
                ${(acceptedQuote.quoteAmount * 0.2).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center border-t border-blue-200 pt-3">
              <span className="text-gray-700">10% Retention (30 days):</span>
              <span className="font-semibold text-gray-900">
                ${(acceptedQuote.quoteAmount * 0.1).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button 
            onClick={onGeneratePO}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3"
          >
            Generate Purchase Order
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
