import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, DollarSign, FileText } from 'lucide-react';
import { VendorQuote } from '@/types/workflow';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
interface QuoteReviewTableProps {
  quotes: VendorQuote[];
  onAcceptQuote: (quoteId: string) => void;
}
export const QuoteReviewTable = ({
  quotes,
  onAcceptQuote
}: QuoteReviewTableProps) => {
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  const getLowestPrice = () => Math.min(...quotes.map(q => q.quoteAmount));
  const getFastestDelivery = () => Math.min(...quotes.map(q => q.deliveryTimeWeeks));
  return <Card className="w-full">
      <CardHeader className="bg-gray-500">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Vendor Quotes Comparison
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-blue-500">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium bg-blue-500">Vendor</th>
                <th className="text-left p-4 font-medium bg-blue-500">Quote Amount</th>
                <th className="text-left p-4 font-medium bg-blue-500">Delivery</th>
                <th className="text-left p-4 font-medium bg-blue-500">Rating</th>
                <th className="text-left p-4 font-medium bg-blue-500">Proposal</th>
                <th className="text-left p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map(quote => <tr key={quote.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 bg-blue-500">
                    <div>
                      <div className="font-medium">{quote.vendorName}</div>
                      <div className="text-sm text-gray-500">
                        Submitted: {new Date(quote.submittedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 bg-blue-500">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span className={quote.quoteAmount === getLowestPrice() ? 'font-bold text-green-600' : ''}>
                        {formatCurrency(quote.quoteAmount)}
                      </span>
                      {quote.quoteAmount === getLowestPrice() && <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Lowest
                        </Badge>}
                    </div>
                  </td>
                  <td className="p-4 bg-blue-500">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className={quote.deliveryTimeWeeks === getFastestDelivery() ? 'font-bold text-blue-600' : ''}>
                        {quote.deliveryTimeWeeks} weeks
                      </span>
                      {quote.deliveryTimeWeeks === getFastestDelivery() && <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          Fastest
                        </Badge>}
                    </div>
                  </td>
                  <td className="p-4 bg-blue-500">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{quote.vendorRating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="p-4 bg-blue-500">
                    <div className="max-w-xs">
                      <p className="text-sm truncate">{quote.proposalSummary}</p>
                      <Button variant="link" className="p-0 h-auto text-xs">
                        View Details
                      </Button>
                    </div>
                  </td>
                  <td className="p-4 bg-blue-500">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button onClick={() => setSelectedQuote(quote.id)} className="text-gray-50 bg-blue-900 hover:bg-blue-800">
                          Accept Quote
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-gray-50">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Accept Quote</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to accept the quote from {quote.vendorName} for {formatCurrency(quote.quoteAmount)}? 
                            This will proceed to purchase order generation.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => onAcceptQuote(quote.id)} className="bg-blue-600 hover:bg-blue-700">
                            Accept Quote
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>;
};