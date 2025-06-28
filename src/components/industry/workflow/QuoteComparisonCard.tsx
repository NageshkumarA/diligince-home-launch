
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, TrendingUp, AlertTriangle, CheckCircle, Trophy, Zap, Target } from 'lucide-react';
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

interface QuoteComparisonCardProps {
  quote: VendorQuote;
  aiEvaluation: AIEvaluation;
  onAcceptQuote: (quoteId: string) => void;
  isLowestPrice?: boolean;
  isFastestDelivery?: boolean;
}

export const QuoteComparisonCard: React.FC<QuoteComparisonCardProps> = ({
  quote,
  aiEvaluation,
  onAcceptQuote,
  isLowestPrice,
  isFastestDelivery
}) => {
  const getRecommendationBadge = (recommendation: AIEvaluation['recommendation']) => {
    switch (recommendation) {
      case 'top_pick':
        return <Badge className="bg-gold-100 text-gold-800 flex items-center gap-1"><Trophy className="h-3 w-3" />AI Top Pick</Badge>;
      case 'best_value':
        return <Badge className="bg-green-100 text-green-800 flex items-center gap-1"><TrendingUp className="h-3 w-3" />Best Value</Badge>;
      case 'fastest_delivery':
        return <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1"><Zap className="h-3 w-3" />Fastest Delivery</Badge>;
      case 'highest_rated':
        return <Badge className="bg-purple-100 text-purple-800 flex items-center gap-1"><Star className="h-3 w-3" />Highest Rated</Badge>;
      case 'best_match':
        return <Badge className="bg-orange-100 text-orange-800 flex items-center gap-1"><Target className="h-3 w-3" />Best Match</Badge>;
      default:
        return null;
    }
  };

  const getRiskBadge = (riskLevel: AIEvaluation['riskLevel']) => {
    switch (riskLevel) {
      case 'low':
        return <Badge className="bg-green-100 text-green-800 flex items-center gap-1"><CheckCircle className="h-3 w-3" />Low Risk</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1"><AlertTriangle className="h-3 w-3" />Medium Risk</Badge>;
      case 'high':
        return <Badge className="bg-red-100 text-red-800 flex items-center gap-1"><AlertTriangle className="h-3 w-3" />High Risk</Badge>;
    }
  };

  return (
    <Card className={`hover:shadow-lg transition-shadow ${aiEvaluation.recommendation === 'top_pick' ? 'ring-2 ring-yellow-400 bg-yellow-50' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">{quote.vendorName}</CardTitle>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="font-medium text-gray-700">{quote.vendorRating}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">${quote.quoteAmount.toLocaleString()}</div>
            <div className="text-sm text-gray-600">{quote.deliveryTimeWeeks} weeks delivery</div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {getRecommendationBadge(aiEvaluation.recommendation)}
          {getRiskBadge(aiEvaluation.riskLevel)}
          {isLowestPrice && <Badge className="bg-green-100 text-green-700">Lowest Price</Badge>}
          {isFastestDelivery && <Badge className="bg-blue-100 text-blue-700">Fastest</Badge>}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* AI Score */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">AI Overall Score</span>
            <span className="text-lg font-bold text-blue-600">{aiEvaluation.overallScore}/10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${aiEvaluation.overallScore * 10}%` }}
            ></div>
          </div>
        </div>

        {/* Evaluation Breakdown */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-800">Evaluation Breakdown</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Price:</span>
              <span className="font-medium">{aiEvaluation.priceScore}/10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery:</span>
              <span className="font-medium">{aiEvaluation.deliveryScore}/10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rating:</span>
              <span className="font-medium">{aiEvaluation.ratingScore}/10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Match:</span>
              <span className="font-medium">{aiEvaluation.specializationScore}/10</span>
            </div>
          </div>
        </div>

        {/* AI Reasoning */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-1">AI Analysis</h4>
          <p className="text-sm text-blue-700">{aiEvaluation.reasoning}</p>
        </div>

        {/* Proposal Summary */}
        <div>
          <h4 className="font-medium text-gray-800 mb-1">Proposal Summary</h4>
          <p className="text-sm text-gray-600">{quote.proposalSummary}</p>
        </div>

        {/* Action Button */}
        <Button 
          onClick={() => onAcceptQuote(quote.id)}
          className={`w-full font-medium ${
            aiEvaluation.recommendation === 'top_pick' 
              ? 'bg-yellow-600 hover:bg-yellow-700' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {aiEvaluation.recommendation === 'top_pick' ? '🏆 Accept AI Top Pick' : 'Accept Quote'}
        </Button>
      </CardContent>
    </Card>
  );
};
