import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ArrowLeft, 
  MessageSquare, 
  Shield,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ReadOnlyVerticalStepper } from './ReadOnlyVerticalStepper';
import { ViewBasicInfoSection } from './ViewBasicInfoSection';
import { ViewDetailsSection } from './ViewDetailsSection';
import { ViewDocumentsSection } from './ViewDocumentsSection';
import { ViewApprovalSection } from './ViewApprovalSection';
import { InlineCommentsPanel } from './InlineCommentsPanel';
import { InlineApprovalStatusPanel } from './InlineApprovalStatusPanel';
import { RequirementApprovalActions } from '@/components/requirement/RequirementApprovalActions';

interface RequirementViewLayoutProps {
  requirement: any;
  canShowApprovalActions: boolean;
  onActionComplete?: () => void;
}

export const RequirementViewLayout: React.FC<RequirementViewLayoutProps> = ({
  requirement,
  canShowApprovalActions,
  onActionComplete
}) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [activePanel, setActivePanel] = useState<'comments' | 'approval' | null>(null);

  const togglePanel = (panel: 'comments' | 'approval') => {
    setActivePanel(current => current === panel ? null : panel);
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'published': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority?.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ViewBasicInfoSection requirement={requirement} />;
      case 2:
        return <ViewDetailsSection requirement={requirement} />;
      case 3:
        return <ViewDocumentsSection documents={requirement.documents} />;
      case 4:
        return <ViewApprovalSection requirement={requirement} />;
      default:
        return <ViewBasicInfoSection requirement={requirement} />;
    }
  };

  const requirementId = requirement?.id || requirement?.draftId || requirement?.requirementId || '';

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
              className="flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="min-w-0">
              <h1 className="text-lg font-semibold truncate">
                {requirement?.title || 'Requirement Details'}
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge className={getStatusColor(requirement?.status)}>
                  {requirement?.status || 'Draft'}
                </Badge>
                {requirement?.priority && (
                  <Badge className={getPriorityColor(requirement.priority)}>
                    {requirement.priority}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant={activePanel === 'comments' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => togglePanel('comments')}
              className="gap-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Comments</span>
              <ChevronDown className={cn(
                "w-3 h-3 transition-transform",
                activePanel === 'comments' && "rotate-180"
              )} />
            </Button>
            <Button
              variant={activePanel === 'approval' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => togglePanel('approval')}
              className="gap-1.5"
            >
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Approval Status</span>
              <ChevronDown className={cn(
                "w-3 h-3 transition-transform",
                activePanel === 'approval' && "rotate-180"
              )} />
            </Button>
          </div>
        </div>

        {/* Inline Panels */}
        <div className="mt-3">
          <InlineCommentsPanel
            requirementId={requirementId}
            isOpen={activePanel === 'comments'}
            onClose={() => setActivePanel(null)}
          />
          <InlineApprovalStatusPanel
            isOpen={activePanel === 'approval'}
            onClose={() => setActivePanel(null)}
            approvalProgress={requirement?.approvalProgress}
            matrixName={requirement?.selectedApprovalMatrix?.name}
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col border-r bg-muted/30 p-4">
          <ReadOnlyVerticalStepper
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </aside>

        {/* Mobile Step Selector */}
        <div className="lg:hidden fixed bottom-20 left-0 right-0 z-10 px-4">
          <div className="bg-background/95 backdrop-blur border rounded-lg shadow-lg p-2 flex justify-around">
            {[1, 2, 3, 4].map((step) => (
              <button
                key={step}
                onClick={() => setCurrentStep(step)}
                className={cn(
                  "flex-1 py-2 px-3 text-xs font-medium rounded-md transition-colors",
                  currentStep === step 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {step === 1 && 'Info'}
                {step === 2 && 'Details'}
                {step === 3 && 'Docs'}
                {step === 4 && 'Approval'}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6 pb-32 lg:pb-24 max-w-3xl mx-auto">
              {renderStepContent()}
            </div>
          </ScrollArea>
        </main>
      </div>

      {/* Footer */}
      <footer className="sticky bottom-0 z-20 bg-background/95 backdrop-blur border-t px-4 py-3">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard/requirements/pending')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to List
          </Button>

          {canShowApprovalActions ? (
            <RequirementApprovalActions
              requirementId={requirementId}
              onActionComplete={onActionComplete}
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              {requirement?.status === 'approved' 
                ? 'This requirement has been approved'
                : requirement?.status === 'rejected'
                ? 'This requirement was rejected'
                : 'You are not an approver for the current level'}
            </p>
          )}
        </div>
      </footer>
    </div>
  );
};

export default RequirementViewLayout;
