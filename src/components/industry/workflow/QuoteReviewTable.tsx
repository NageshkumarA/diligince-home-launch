
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Clock, Star, Eye } from 'lucide-react';
import { VendorQuote } from '@/types/workflow';

interface QuoteReviewTableProps {
  quotes: VendorQuote[];
  onAcceptQuote: (quoteId: string) => void;
}

export const QuoteReviewTable: React.FC<QuoteReviewTableProps> = ({ quotes, onAcceptQuote }) => {
  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader className="border-b border-gray-100 bg-blue-50">
        <CardTitle className="text-xl font-semibold text-blue-900 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Vendor Quotes Comparison
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-700">Vendor</TableHead>
              <TableHead className="font-semibold text-gray-700">Quote Amount</TableHead>
              <TableHead className="font-semibold text-gray-700">Delivery</TableHead>
              <TableHead className="font-semibold text-gray-700">Rating</TableHead>
              <TableHead className="font-semibold text-gray-700">Proposal</TableHead>
              <TableHead className="font-semibold text-gray-700">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotes.map((quote) => (
              <TableRow key={quote.id} className="hover:bg-gray-50">
                <TableCell>
                  <div>
                    <div className="font-semibold text-gray-900">{quote.vendorName}</div>
                    <div className="text-sm text-gray-500">Submitted {quote.submittedDate}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-semibold text-lg text-gray-900">
                    ${quote.quoteAmount.toLocaleString()}
                  </div>
                  {quote.quoteAmount === Math.min(...quotes.map(q => q.quoteAmount)) && (
                    <Badge className="bg-green-100 text-green-700 text-xs mt-1">Lowest</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{quote.deliveryTimeWeeks} weeks</span>
                  </div>
                  {quote.deliveryTimeWeeks === Math.min(...quotes.map(q => q.deliveryTimeWeeks)) && (
                    <Badge className="bg-blue-100 text-blue-700 text-xs mt-1">Fastest</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium text-gray-700">{quote.vendorRating}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    <p className="text-sm text-gray-700 truncate" title={quote.proposalSummary}>
                      {quote.proposalSummary}
                    </p>
                    <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700 text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Button 
                    onClick={() => onAcceptQuote(quote.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    size="sm"
                  >
                    Accept Quote
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
