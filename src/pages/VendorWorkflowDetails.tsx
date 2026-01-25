import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
    ArrowLeft,
    Calendar,
    Clock,
    CheckCircle,
    DollarSign,
    FileText,
    Download,
    AlertTriangle,
    Loader2,
    IndianRupee,
    Building2
} from 'lucide-react';

import {
    getVendorWorkflowDetails,
    markMilestoneComplete,
    formatCurrency,
    getMilestoneStatusColor,
    type WorkflowDetail,
    type WorkflowMilestone
} from '@/services/modules/workflows';

interface VendorMilestoneCardProps {
    milestone: WorkflowMilestone;
    workflowId: string;
    currency: string;
    onMilestoneUpdate: () => void;
}

const VendorMilestoneCard: React.FC<VendorMilestoneCardProps> = ({
    milestone,
    workflowId,
    currency,
    onMilestoneUpdate
}) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [notes, setNotes] = useState('');
    const [showNotes, setShowNotes] = useState(false);

    const handleMarkComplete = async () => {
        try {
            setIsProcessing(true);
            const response = await markMilestoneComplete(workflowId, milestone.id, { notes });

            if (response.success) {
                toast.success('Milestone marked as complete!');
                onMilestoneUpdate();
                setShowNotes(false);
                setNotes('');
            }
        } catch (error) {
            toast.error('Failed to mark milestone complete');
            console.error(error);
        } finally {
            setIsProcessing(false);
        }
    };

    const getMilestoneIcon = () => {
        switch (milestone.status) {
            case 'completed':
                return <CheckCircle className="h-5 w-5 text-green-600" />;
            case 'paid':
                return <DollarSign className="h-5 w-5 text-blue-600" />;
            case 'payment_pending':
                return <Clock className="h-5 w-5 text-yellow-600" />;
            default:
                return <Clock className="h-5 w-5 text-gray-400" />;
        }
    };

    const canMarkComplete = milestone.status === 'paid' && milestone.payment?.uploadedReceipt;

    return (
        <div className="border border-border/60 rounded-xl p-4 bg-card/50">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                    <div className="mt-0.5">{getMilestoneIcon()}</div>
                    <div className="flex-1">
                        <h4 className="font-medium text-foreground">
                            {milestone.name || milestone.description}
                        </h4>
                        {milestone.name && milestone.description !== milestone.name && (
                            <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                Due: {new Date(milestone.dueDate).toLocaleDateString('en-IN')}
                            </span>
                            <span className="flex items-center gap-1">
                                <IndianRupee className="h-3.5 w-3.5" />
                                {formatCurrency(milestone.amount, currency)}
                            </span>
                            <span className="text-muted-foreground/70">({milestone.percentage}%)</span>
                        </div>
                    </div>
                </div>
                <Badge className={getMilestoneStatusColor(milestone.status)}>
                    {milestone.status.replace('_', ' ').toUpperCase()}
                </Badge>
            </div>

            {/* Payment info */}
            {milestone.payment && (
                <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                        {milestone.payment.status === 'paid' && (
                            <>
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-green-700">
                                    Payment received on {new Date(milestone.payment.paidAt || '').toLocaleDateString('en-IN')}
                                </span>
                            </>
                        )}
                        {milestone.payment.uploadedReceipt && (
                            <Button
                                size="sm"
                                variant="ghost"
                                className="ml-auto h-7 text-xs"
                                onClick={() => window.open(milestone.payment?.uploadedReceipt?.url, '_blank')}
                            >
                                <Download className="h-3 w-3 mr-1" />
                                View Receipt
                            </Button>
                        )}
                    </div>
                </div>
            )}

            {/* Action buttons */}
            <div className="mt-4 flex flex-col gap-3">
                {/* Can mark complete when payment is made and receipt uploaded */}
                {canMarkComplete && !showNotes && (
                    <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => setShowNotes(true)}
                    >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Verify & Mark Complete
                    </Button>
                )}

                {showNotes && (
                    <div className="space-y-3">
                        <Textarea
                            placeholder="Add completion notes (optional)..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={2}
                            className="text-sm"
                        />
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={handleMarkComplete}
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                ) : (
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                )}
                                Confirm Complete
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                    setShowNotes(false);
                                    setNotes('');
                                }}
                                disabled={isProcessing}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}

                {milestone.status === 'completed' && (
                    <span className="text-sm text-green-600 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Completed on {milestone.completedAt ?
                            new Date(milestone.completedAt).toLocaleDateString('en-IN') : ''}
                    </span>
                )}

                {milestone.status === 'pending' && (
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Awaiting payment from buyer
                    </span>
                )}

                {milestone.status === 'paid' && !milestone.payment?.uploadedReceipt && (
                    <span className="text-sm text-yellow-600 flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Payment received - awaiting receipt upload from buyer
                    </span>
                )}
            </div>
        </div>
    );
};

const VendorWorkflowDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [workflowData, setWorkflowData] = useState<WorkflowDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWorkflowDetails = async () => {
        if (!id) return;

        try {
            setIsLoading(true);
            setError(null);
            const response = await getVendorWorkflowDetails(id);
            if (response.success) {
                setWorkflowData(response.data);
            } else {
                setError('Failed to load workflow details');
            }
        } catch (err) {
            setError('Failed to load workflow details');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkflowDetails();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !workflowData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
                <p className="text-lg text-muted-foreground">{error || 'Workflow not found'}</p>
                <Button variant="outline" className="mt-4" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Go Back
                </Button>
            </div>
        );
    }

    const { workflow, linkedEntities, stakeholder, milestones, stats } = workflowData;

    return (
        <div className="min-h-screen bg-gray-50">
            <Helmet>
                <title>{workflow.projectTitle} | Project | Diligence</title>
            </Helmet>

            <main className="container mx-auto px-4 py-8 pt-20">
                {/* Header */}
                <div className="mb-6">
                    <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Projects
                    </Button>

                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">{workflow.projectTitle}</h1>
                            <p className="text-muted-foreground mt-1">
                                Project ID: {workflow.workflowId}
                            </p>
                        </div>
                        <Badge
                            className={
                                workflow.status === 'completed'
                                    ? 'bg-green-100 text-green-700'
                                    : workflow.status === 'active'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'bg-gray-100 text-gray-700'
                            }
                        >
                            {workflow.status.toUpperCase()}
                        </Badge>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Progress card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Project Progress</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium">Overall Completion</span>
                                    <span className="text-sm font-semibold">{workflow.progress}%</span>
                                </div>
                                <Progress value={workflow.progress} className="h-3" />

                                <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                                    <div className="p-3 bg-muted/30 rounded-lg">
                                        <p className="text-2xl font-bold text-green-600">{stats.completedMilestones}</p>
                                        <p className="text-xs text-muted-foreground">Completed</p>
                                    </div>
                                    <div className="p-3 bg-muted/30 rounded-lg">
                                        <p className="text-2xl font-bold text-blue-600">{stats.paidMilestones}</p>
                                        <p className="text-xs text-muted-foreground">Paid</p>
                                    </div>
                                    <div className="p-3 bg-muted/30 rounded-lg">
                                        <p className="text-2xl font-bold text-gray-600">{stats.pendingMilestones}</p>
                                        <p className="text-xs text-muted-foreground">Pending</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Milestones */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Project Milestones
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {milestones.map((milestone) => (
                                    <VendorMilestoneCard
                                        key={milestone.id}
                                        milestone={milestone}
                                        workflowId={workflow.id}
                                        currency={workflow.currency}
                                        onMilestoneUpdate={fetchWorkflowDetails}
                                    />
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Earnings summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <IndianRupee className="h-5 w-5" />
                                    Earnings Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Total Contract</span>
                                    <span className="font-semibold">
                                        {formatCurrency(workflow.totalValue, workflow.currency)}
                                    </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Received</span>
                                    <span className="font-semibold text-green-600">
                                        {formatCurrency(stats.paidAmount, workflow.currency)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Pending</span>
                                    <span className="font-semibold text-blue-600">
                                        {formatCurrency(stats.remainingAmount, workflow.currency)}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Timeline */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Timeline
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Start Date</span>
                                    <span>{new Date(workflow.startDate).toLocaleDateString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">End Date</span>
                                    <span>{new Date(workflow.endDate).toLocaleDateString('en-IN')}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Days Remaining</span>
                                    <span className={workflow.isOverdue ? 'text-red-600 font-semibold' : ''}>
                                        {workflow.isOverdue ? 'Overdue' : `${workflow.daysRemaining} days`}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Client info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Building2 className="h-5 w-5" />
                                    Client Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="font-medium">{linkedEntities.purchaseOrder?.projectTitle || stakeholder.name}</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    PO: {linkedEntities.purchaseOrder?.poNumber || 'N/A'}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VendorWorkflowDetails;
