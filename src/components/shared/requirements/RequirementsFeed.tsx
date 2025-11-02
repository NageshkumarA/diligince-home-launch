import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, TrendingUp } from 'lucide-react';
import { RequirementCard } from './RequirementCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { RequirementWithAI, RequirementCategory } from '@/types/requirement-feed';
import { requirementsFeedService } from '@/services/modules/requirements/requirements-feed.service';
import { useToast } from '@/hooks/use-toast';

interface RequirementsFeedProps {
  userType: 'professional' | 'service-vendor' | 'product-vendor' | 'logistics-vendor';
  categoryFilter?: RequirementCategory;
  showAIRecommendations?: boolean;
  maxRecommendations?: number;
  onViewDetails?: (id: string) => void;
  onSubmitQuote?: (id: string) => void;
}

export const RequirementsFeed: React.FC<RequirementsFeedProps> = ({
  userType,
  categoryFilter,
  showAIRecommendations = true,
  maxRecommendations = 5,
  onViewDetails,
  onSubmitQuote,
}) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [isLoading, setIsLoading] = useState(true);
  const [recommendedRequirements, setRecommendedRequirements] = useState<RequirementWithAI[]>([]);
  const [allRequirements, setAllRequirements] = useState<RequirementWithAI[]>([]);
  const [showRecommendedOnly, setShowRecommendedOnly] = useState(false);

  useEffect(() => {
    loadRequirements();
  }, [categoryFilter, statusFilter, searchTerm, userType]);

  const loadRequirements = async () => {
    setIsLoading(true);
    try {
      // Load AI recommendations if enabled
      if (showAIRecommendations) {
        const recommended = await requirementsFeedService.getRecommendedRequirements(userType);
        setRecommendedRequirements(recommended.slice(0, maxRecommendations));
      }

      // Load all requirements with filters
      const response = await requirementsFeedService.getBrowseRequirements({
        category: categoryFilter,
        status: statusFilter === 'all' ? undefined : statusFilter as any,
        search: searchTerm || undefined,
      });
      
      setAllRequirements(response.requirements);
    } catch (error) {
      console.error('Error loading requirements:', error);
      toast({
        title: 'Error',
        description: 'Failed to load requirements. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (id: string) => {
    if (onViewDetails) {
      onViewDetails(id);
    } else {
      toast({
        title: 'View Details',
        description: `Opening details for requirement ${id}`,
      });
    }
  };

  const handleSubmitQuote = (id: string) => {
    if (onSubmitQuote) {
      onSubmitQuote(id);
    } else {
      toast({
        title: 'Submit Quote',
        description: `Opening quote form for requirement ${id}`,
      });
    }
  };

  const displayedRequirements = showRecommendedOnly 
    ? recommendedRequirements 
    : allRequirements;

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search requirements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="closing-soon">Closing Soon</SelectItem>
            <SelectItem value="invited">Invited</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="deadline">Deadline</SelectItem>
            <SelectItem value="budget">Budget</SelectItem>
            <SelectItem value="posted">Posted Date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* AI Recommendations Section */}
      {showAIRecommendations && recommendedRequirements.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">
                AI Recommended for You
              </h2>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {recommendedRequirements.length}
              </Badge>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowRecommendedOnly(!showRecommendedOnly)}
            >
              {showRecommendedOnly ? 'Show All' : 'Show Recommended Only'}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Based on your profile, expertise, and past performance, these requirements are most relevant to you.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {isLoading ? (
              <>
                <Skeleton className="h-[400px]" />
                <Skeleton className="h-[400px]" />
              </>
            ) : (
              recommendedRequirements.map((requirement) => (
                <RequirementCard
                  key={requirement.id}
                  requirement={requirement}
                  userType={userType}
                  onViewDetails={handleViewDetails}
                  onSubmitQuote={handleSubmitQuote}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* All Requirements Section */}
      {!showRecommendedOnly && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              {showAIRecommendations ? 'All Available Requirements' : 'Requirements'}
            </h2>
            <Badge variant="outline">
              {allRequirements.length} total
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {isLoading ? (
              <>
                <Skeleton className="h-[350px]" />
                <Skeleton className="h-[350px]" />
                <Skeleton className="h-[350px]" />
                <Skeleton className="h-[350px]" />
              </>
            ) : displayedRequirements.length === 0 ? (
              <div className="col-span-2 text-center py-12">
                <p className="text-muted-foreground">No requirements found matching your filters.</p>
              </div>
            ) : (
              displayedRequirements.map((requirement) => (
                <RequirementCard
                  key={requirement.id}
                  requirement={requirement}
                  userType={userType}
                  onViewDetails={handleViewDetails}
                  onSubmitQuote={handleSubmitQuote}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
