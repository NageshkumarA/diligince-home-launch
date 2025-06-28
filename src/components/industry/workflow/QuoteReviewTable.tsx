
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Clock, Star, Eye, Trophy, TrendingUp, Zap, Target, Brain } from 'lucide-react';
import { VendorQuote } from '@/types/workflow';

interface AIEvaluation {
  overallScore: number;
  priceScore: number;
  deliveryScore: number;
  ratingScore: number;
  specializationScore: number;
  performanceScore: number;
  recommendation: 'top_pick' | 'best_value' | 'fastest_delivery' | 'highest_rated' | 'best_match' | null;
  reasoning: string;
  riskLevel: 'low' | 'medium' | 'high';
}

interface QuoteReviewTableProps {
  quotes: VendorQuote[];
  onAcceptQuote: (quoteId: string) => void;
  aiEvaluations?: Map<string, AIEvaluation>;
}

export const QuoteReviewTable: React.FC<QuoteReviewTableProps> = ({ 
  quotes, 
  onAcceptQuote, 
  aiEvaluations = new Map() 
}) => {
  const getRecommendationBadge = (recommendation: AIEvaluation['recommendation']) => {
    switch (recommendation) {
      case 'top_pick':
        return <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1 text-xs"><Trophy className="h-3 w-3" />AI Top Pick</Badge>;
      case 'best_value':
        return <Badge className="bg-green-100 text-green-800 flex items-center gap-1 text-xs"><TrendingUp className="h-3 w-3" />Best Value</Badge>;
      case 'fastest_delivery':
        return <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1 text-xs"><Zap className="h-3 w-3" />Fastest</Badge>;
      case 'highest_rated':
        return <Badge className="bg-purple-100 text-purple-800 flex items-center gap-1 text-xs"><Star className="h-3 w-3" />Highest Rated</Badge>;
      case 'best_match':
        return <Badge className="bg-orange-100 text-orange-800 flex items-center gap-1 text-xs"><Target className="h-3 w-3" />Best Match</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader className="border-b border-gray-100 bg-blue-50">
        <CardTitle className="text-xl font-semibold text-blue-900 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Vendor Quotes Comparison
          {aiEvaluations.size > 0 && (
            <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1 ml-2">
              <Brain className="h-3 w-3" />
              AI Analyzed
            </Badge>
          )}
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
              {aiEvaluations.size > 0 && <TableHead className="font-semibold text-gray-700">AI Score</TableHead>}
              <TableHead className="font-semibold text-gray-700">Proposal</TableHead>
              <TableHead className="font-semibold text-gray-700">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotes.map((quote) => {
              const aiEvaluation = aiEvaluations.get(quote.id);
              const isTopPick = aiEvaluation?.recommendation === 'top_pick';
              
              return (
                <TableRow 
                  key={quote.id} 
                  className={`hover:bg-gray-50 ${isTopPick ? 'bg-yellow-50 ring-1 ring-yellow-200' : ''}`}
                >
                  <TableCell>
                    <div>
                      <div className="font-semibold text-gray-900 flex items-center gap-2">
                        {quote.vendorName}
                        {isTopPick && <Trophy className="h-4 w-4 text-yellow-600" />}
                      </div>
                      <div className="text-sm text-gray-500">Submitted {quote.submittedDate}</div>
                      {aiEvaluation && (
                        <div className="mt-1">
                          {getRecommendationBadge(aiEvaluation.recommendation)}
                        </div>
                      )}
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
                  {aiEvaluations.size > 0 && (
                    <TableCell>
                      {aiEvaluation ? (
                        <div>
                          <div className="font-bold text-blue-600 text-lg">
                            {aiEvaluation.overallScore}/10
                          </div>
                          <div className="text-xs text-gray-500">
                            {aiEvaluation.riskLevel === 'low' ? '🟢' : aiEvaluation.riskLevel === 'medium' ? '🟡' : '🔴'} 
                            {aiEvaluation.riskLevel} risk
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                  )}
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
                      className={`font-medium ${
                        isTopPick 
                          ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                      size="sm"
                    >
                      {isTopPick ? '🏆 Accept Top Pick' : 'Accept Quote'}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
