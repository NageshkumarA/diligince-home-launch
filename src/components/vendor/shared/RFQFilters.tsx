import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { RFQBrowseFilters, RFQBrowseFiltersResponse } from '@/types/rfq-browse';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface RFQFiltersProps {
  filters: RFQBrowseFilters;
  filterOptions?: RFQBrowseFiltersResponse;
  onFilterChange: (filters: RFQBrowseFilters) => void;
  onClearFilters: () => void;
}

const RFQFiltersComponent: React.FC<RFQFiltersProps> = ({
  filters,
  filterOptions,
  onFilterChange,
  onClearFilters
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [budgetRange, setBudgetRange] = React.useState<[number, number]>([
    filters.minBudget || 0,
    filters.maxBudget || 10000000
  ]);

  const activeFilterCount = Object.entries(filters).filter(
    ([key, value]) => value !== undefined && value !== '' && key !== 'page' && key !== 'limit' && key !== 'sortBy' && key !== 'sortOrder'
  ).length;

  const handleSearchChange = (value: string) => {
    onFilterChange({ ...filters, search: value || undefined, page: 1 });
  };

  const handleSelectChange = (key: keyof RFQBrowseFilters, value: string) => {
    onFilterChange({ 
      ...filters, 
      [key]: value === 'all' ? undefined : value, 
      page: 1 
    });
  };

  const handleBudgetChange = (values: number[]) => {
    setBudgetRange([values[0], values[1]]);
  };

  const handleBudgetCommit = () => {
    onFilterChange({
      ...filters,
      minBudget: budgetRange[0] > 0 ? budgetRange[0] : undefined,
      maxBudget: budgetRange[1] < 10000000 ? budgetRange[1] : undefined,
      page: 1
    });
  };

  const formatBudget = (value: number) => {
    if (value >= 10000000) return '₹1Cr+';
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
    return `₹${value}`;
  };

  return (
    <div className="space-y-4">
      {/* Search and Quick Filters Row */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search RFQs by title, company, or description..."
            value={filters.search || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 flex-wrap">
          <Select
            value={filters.category || 'all'}
            onValueChange={(value) => handleSelectChange('category', value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="service">Service</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="logistics">Logistics</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.priority || 'all'}
            onValueChange={(value) => handleSelectChange('priority', value)}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.sortBy || 'postedDate'}
            onValueChange={(value) => handleSelectChange('sortBy', value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="postedDate">Latest First</SelectItem>
              <SelectItem value="deadline">Deadline</SelectItem>
              <SelectItem value="budget">Budget</SelectItem>
              <SelectItem value="relevance">Relevance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Advanced Filters */}
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <div className="flex items-center justify-between">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Advanced Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </CollapsibleTrigger>

          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              Clear all
            </Button>
          )}
        </div>

        <CollapsibleContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg border">
            {/* Status */}
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={filters.status || 'all'}
                onValueChange={(value) => handleSelectChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closing_soon">Closing Soon</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* State */}
            <div className="space-y-2">
              <Label>State</Label>
              <Select
                value={filters.state || 'all'}
                onValueChange={(value) => handleSelectChange('state', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All States" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {filterOptions?.locations.map((loc) => (
                    <SelectItem key={loc.key} value={loc.key}>
                      {loc.key} ({loc.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort Order */}
            <div className="space-y-2">
              <Label>Sort Order</Label>
              <Select
                value={filters.sortOrder || 'desc'}
                onValueChange={(value) => handleSelectChange('sortOrder', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Descending" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Descending</SelectItem>
                  <SelectItem value="asc">Ascending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Budget Range */}
            <div className="space-y-2 md:col-span-2 lg:col-span-1">
              <Label>Budget Range</Label>
              <div className="pt-2 px-2">
                <Slider
                  value={budgetRange}
                  onValueChange={handleBudgetChange}
                  onValueCommit={handleBudgetCommit}
                  max={10000000}
                  min={0}
                  step={50000}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatBudget(budgetRange[0])}</span>
                  <span>{formatBudget(budgetRange[1])}</span>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Active Filter Tags */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              Search: {filters.search}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => handleSearchChange('')}
              />
            </Badge>
          )}
          {filters.category && (
            <Badge variant="secondary" className="gap-1 capitalize">
              {filters.category}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => handleSelectChange('category', 'all')}
              />
            </Badge>
          )}
          {filters.priority && (
            <Badge variant="secondary" className="gap-1 capitalize">
              {filters.priority} Priority
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => handleSelectChange('priority', 'all')}
              />
            </Badge>
          )}
          {filters.state && (
            <Badge variant="secondary" className="gap-1">
              {filters.state}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => handleSelectChange('state', 'all')}
              />
            </Badge>
          )}
          {(filters.minBudget || filters.maxBudget) && (
            <Badge variant="secondary" className="gap-1">
              Budget: {formatBudget(filters.minBudget || 0)} - {formatBudget(filters.maxBudget || 10000000)}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => {
                  setBudgetRange([0, 10000000]);
                  onFilterChange({ ...filters, minBudget: undefined, maxBudget: undefined, page: 1 });
                }}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default RFQFiltersComponent;
