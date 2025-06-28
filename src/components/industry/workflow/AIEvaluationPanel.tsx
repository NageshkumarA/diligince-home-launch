
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, Clock, Star, Target, Award } from 'lucide-react';

interface AIEvaluationCriteria {
  name: string;
  weight: number;
  description: string;
  icon: React.ElementType;
}

const evaluationCriteria: AIEvaluationCriteria[] = [
  {
    name: 'Price Competitiveness',
    weight: 30,
    description: 'Cost-effectiveness and value for money',
    icon: TrendingUp
  },
  {
    name: 'Delivery Speed',
    weight: 25,
    description: 'Timeline efficiency and delivery reliability',
    icon: Clock
  },
  {
    name: 'Vendor Rating',
    weight: 20,
    description: 'Historical performance and reputation',
    icon: Star
  },
  {
    name: 'Specialization Match',
    weight: 15,
    description: 'Expertise alignment with requirements',
    icon: Target
  },
  {
    name: 'Past Performance',
    weight: 10,
    description: 'Track record and completion history',
    icon: Award
  }
];

export const AIEvaluationPanel: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-blue-900 flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-600" />
          AI Evaluation Methodology
        </CardTitle>
        <p className="text-sm text-blue-700">
          Our AI analyzes quotes based on the following weighted criteria to provide intelligent recommendations
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {evaluationCriteria.map((criteria) => {
          const IconComponent = criteria.icon;
          return (
            <div key={criteria.name} className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <IconComponent className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{criteria.name}</div>
                  <div className="text-sm text-gray-600">{criteria.description}</div>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-800 font-semibold">
                {criteria.weight}%
              </Badge>
            </div>
          );
        })}
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> AI recommendations are suggestions to assist your decision-making. 
            You can always override AI rankings based on your specific requirements.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
