import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, CheckCircle, AlertCircle } from 'lucide-react';
interface ISO9001TermsSectionProps {
  selectedTerms: string[];
  onTermsChange: (terms: string[]) => void;
  customTerms: string;
  onCustomTermsChange: (terms: string) => void;
}
const ISO_TERMS_CATEGORIES = {
  'Quality Management Requirements': ['Supplier must maintain ISO 9001:2015 certification or demonstrate equivalent quality management system', 'All products/services must meet specified quality standards and customer requirements', 'Supplier must implement documented quality control procedures and maintain quality records', 'Non-conforming products must be identified, controlled, and corrected according to ISO 9001 standards'],
  'Supplier Qualifications': ['Supplier must provide current certificates of quality management system compliance', 'Technical documentation and specifications must be available for all delivered items', 'Supplier personnel must be qualified and competent for assigned tasks', 'Subcontractors used by supplier must meet the same quality requirements'],
  'Delivery and Performance Standards': ['Products must be delivered according to agreed schedule and specifications', 'Packaging must protect products and comply with applicable standards and regulations', 'Delivery must include all required documentation, certificates, and test reports', 'Supplier must notify buyer immediately of any potential delays or quality issues'],
  'Inspection and Testing Rights': ['Buyer reserves the right to inspect products at supplier\'s premises during production', 'Buyer may conduct audits of supplier\'s quality management system', 'Products are subject to incoming inspection and testing by buyer', 'Supplier must provide access to quality records and documentation upon request'],
  'Risk Management and Compliance': ['Supplier must maintain adequate insurance coverage for liability and product defects', 'Supplier must comply with all applicable laws, regulations, and industry standards', 'Environmental and safety requirements must be met according to applicable standards', 'Supplier must have documented procedures for handling emergencies and force majeure events'],
  'Continuous Improvement': ['Supplier must participate in periodic performance reviews and improvement initiatives', 'Customer feedback and complaints must be addressed promptly and effectively', 'Supplier must implement corrective and preventive actions when required', 'Performance metrics and key performance indicators must be monitored and reported']
};
export const ISO9001TermsSection: React.FC<ISO9001TermsSectionProps> = ({
  selectedTerms,
  onTermsChange,
  customTerms,
  onCustomTermsChange
}) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
  };
  const handleTermToggle = (term: string) => {
    if (selectedTerms.includes(term)) {
      onTermsChange(selectedTerms.filter(t => t !== term));
    } else {
      onTermsChange([...selectedTerms, term]);
    }
  };
  const getCategoryProgress = (category: string) => {
    const categoryTerms = ISO_TERMS_CATEGORIES[category];
    const selectedCategoryTerms = categoryTerms.filter(term => selectedTerms.includes(term));
    return selectedCategoryTerms.length;
  };
  return <Card className="bg-white border border-gray-100 shadow-sm">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          ISO 9001:2015 Terms and Conditions
        </CardTitle>
        <p className="text-sm text-gray-600">
          Select applicable terms and conditions to ensure ISO 9001 compliance for your purchase order.
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {Object.entries(ISO_TERMS_CATEGORIES).map(([category, terms]) => {
        const progress = getCategoryProgress(category);
        const isExpanded = expandedCategories.includes(category);
        return <Collapsible key={category} open={isExpanded} onOpenChange={() => toggleCategory(category)}>
              <CollapsibleTrigger className="w-full">
                <Card className="bg-gray-50 hover:bg-gray-100 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900 text-sm">{category}</h3>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          {progress}/{terms.length} selected
                        </Badge>
                      </div>
                      <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="mt-2">
                <div className="space-y-3 ml-4 p-4 border-l-2 border-gray-200">
                  {terms.map((term, index) => <div key={index} className="flex items-start gap-3">
                      <Checkbox id={`${category}-${index}`} checked={selectedTerms.includes(term)} onCheckedChange={() => handleTermToggle(term)} className="mt-1" />
                      <label htmlFor={`${category}-${index}`} className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                        {term}
                      </label>
                    </div>)}
                </div>
              </CollapsibleContent>
            </Collapsible>;
      })}

        {/* Custom Terms Section */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-md font-semibold text-blue-900 text-lg">
              Additional Custom Terms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={customTerms} onChange={e => onCustomTermsChange(e.target.value)} placeholder="Add any additional terms and conditions specific to this purchase order..." className="min-h-[100px] bg-white border-blue-200" />
          </CardContent>
        </Card>

        {/* Compliance Summary */}
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="text-sm text-green-700 font-medium">
            {selectedTerms.length} ISO 9001 compliance terms selected
          </span>
        </div>
      </CardContent>
    </Card>;
};