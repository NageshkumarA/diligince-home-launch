import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, FileText, User, Calendar, DollarSign } from 'lucide-react';
import { VendorQuote } from '@/types/workflow';
import { Checkbox } from '@/components/ui/checkbox';
interface POTriggerCardProps {
  acceptedQuote: VendorQuote;
  onGeneratePO: () => void;
}
export const POTriggerCard = ({
  acceptedQuote,
  onGeneratePO
}: POTriggerCardProps) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [paymentTermsAccepted, setPaymentTermsAccepted] = useState(false);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  const handleTermsChange = (checked: boolean | "indeterminate") => {
    setTermsAccepted(checked === true);
  };
  const handlePaymentTermsChange = (checked: boolean | "indeterminate") => {
    setPaymentTermsAccepted(checked === true);
  };
  const canGeneratePO = termsAccepted && paymentTermsAccepted;
  return <Card className="w-full">
      <CardHeader className="bg-blue-400">
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Quote Accepted - Generate Purchase Order
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 bg-blue-400">
        {/* Accepted Quote Summary */}
        <div className="p-4 rounded-lg border border-green-200 bg-blue-400">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-green-800 text-2xl">Accepted Vendor Quote</h3>
            <Badge className="bg-green-600">Accepted</Badge>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-medium">{acceptedQuote.vendorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="font-medium">{formatCurrency(acceptedQuote.quoteAmount)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{acceptedQuote.deliveryTimeWeeks} weeks delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Rating: {acceptedQuote.vendorRating}/5</span>
            </div>
          </div>
          
          <div className="mt-3">
            <p className="text-sm text-gray-700">
              <strong>Proposal Summary:</strong> {acceptedQuote.proposalSummary}
            </p>
          </div>
        </div>

        {/* Payment Schedule Preview */}
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-3">Payment Schedule Preview</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>30% Advance Payment:</span>
              <span className="font-medium">{formatCurrency(acceptedQuote.quoteAmount * 0.3)}</span>
            </div>
            <div className="flex justify-between">
              <span>40% Mid-project Payment:</span>
              <span className="font-medium">{formatCurrency(acceptedQuote.quoteAmount * 0.4)}</span>
            </div>
            <div className="flex justify-between">
              <span>20% Completion Payment:</span>
              <span className="font-medium">{formatCurrency(acceptedQuote.quoteAmount * 0.2)}</span>
            </div>
            <div className="flex justify-between text-orange-600">
              <span>10% Retention (30 days):</span>
              <span className="font-medium">{formatCurrency(acceptedQuote.quoteAmount * 0.1)}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Total Project Value:</span>
              <span>{formatCurrency(acceptedQuote.quoteAmount)}</span>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked={termsAccepted} onCheckedChange={handleTermsChange} />
            <label htmlFor="terms" className="text-sm">
              I accept the standard terms and conditions for this purchase order
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="payment-terms" checked={paymentTermsAccepted} onCheckedChange={handlePaymentTermsChange} />
            <label htmlFor="payment-terms" className="text-sm">
              I agree to the payment schedule and retention terms outlined above
            </label>
          </div>
        </div>

        {/* Generate PO Button */}
        <div className="pt-4">
          <Button onClick={onGeneratePO} disabled={!canGeneratePO} size="lg" className="w-full bg-blue-700 hover:bg-blue-600">
            <FileText className="h-4 w-4 mr-2" />
            Generate Purchase Order
          </Button>
          {!canGeneratePO && <p className="text-sm text-gray-500 mt-2 text-center">
              Please accept both terms and conditions to continue
            </p>}
        </div>
      </CardContent>
    </Card>;
};