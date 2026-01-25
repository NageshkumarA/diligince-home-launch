import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
    ArrowLeft,
    Calendar,
    Clock,
    CheckCircle,
    DollarSign,
    FileText,
    Upload,
    Download,
    AlertTriangle,
    Loader2,
    CreditCard,
    IndianRupee
} from 'lucide-react';

import {
    getIndustryWorkflowDetails,
    initiateMilestonePayment,
    verifyMilestonePayment,
    openRazorpayCheckout,
    formatCurrency,
    getMilestoneStatusColor,
    uploadPaymentReceipt,
    downloadPaymentReceipt,
    type WorkflowDetail,
    type WorkflowMilestone
} from '@/services/modules/workflows';

interface MilestoneCardProps {
    milestone: WorkflowMilestone;
    workflowId: string;
    currency: string;
    razorpayLoaded: boolean;
    onPaymentComplete: () => void;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({
    milestone,
    workflowId,
    currency,
    razorpayLoaded,
    onPaymentComplete
}) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handlePayNow = async () => {
        try {
            setIsProcessing(true);

            // Initiate payment to get Razorpay order
            const response = await initiateMilestonePayment(workflowId, milestone.id);

            if (!response.success) {
                throw new Error('Failed to initiate payment');
            }

            // Open Razorpay checkout
            openRazorpayCheckout(
                response.data,
                async (paymentResult) => {
                    try {
                        // Verify payment
                        const verifyResponse = await verifyMilestonePayment({
                            razorpayOrderId: paymentResult.razorpay_order_id,
                            razorpayPaymentId: paymentResult.razorpay_payment_id,
                            razorpaySignature: paymentResult.razorpay_signature
                        });

                        if (verifyResponse.success) {
                            toast.success('Payment completed! Receipt generated.');
                            onPaymentComplete();
                        }
                    } catch (error) {
                        toast.error('Payment verification failed');
                        console.error(error);
                    } finally {
                        setIsProcessing(false);
                    }
                },
                (error) => {
                    setIsProcessing(false);
                    if (error?.message !== 'Payment was cancelled') {
                        toast.error('Payment failed');
                    }
                }
            );
        } catch (error) {
            setIsProcessing(false);
            toast.error('Failed to initiate payment');
            console.error(error);
        }
    };

    const handleUploadReceipt = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const response = await uploadPaymentReceipt(milestone.payment?.paymentId || '', file);

            if (response.success) {
                toast.success('Receipt uploaded! Vendor can now verify.');
                onPaymentComplete();
            }
        } catch (error) {
            toast.error('Failed to upload receipt');
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDownloadReceipt = async () => {
        try {
            if (!milestone.payment?.paymentId) return;

            const blob = await downloadPaymentReceipt(milestone.payment.paymentId);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `receipt-${milestone.payment.receipt?.receiptNumber || 'payment'}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error('Failed to download receipt');
            console.error(error);
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

            {/* Action buttons based on status */}
            <div className="mt-4 flex items-center gap-2 flex-wrap">
                {milestone.status === 'pending' && (
                    <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90"
                        onClick={handlePayNow}
                        disabled={isProcessing || !razorpayLoaded}
                    >
                        {isProcessing ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                            <CreditCard className="h-4 w-4 mr-2" />
                        )}
                        Pay Now
                    </Button>
                )}

                {milestone.status === 'paid' && !milestone.payment?.uploadedReceipt && (
                    <>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => document.getElementById(`receipt-upload-${milestone.id}`)?.click()}
                            disabled={isUploading}
                        >
                            {isUploading ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                                <Upload className="h-4 w-4 mr-2" />
                            )}
                            Upload Receipt for Vendor
                        </Button>
                        <input
                            id={`receipt-upload-${milestone.id}`}
                            type="file"
                            accept=".pdf,.png,.jpg,.jpeg"
                            className="hidden"
                            onChange={handleUploadReceipt}
                        />
                    </>
                )}

                {milestone.payment?.receipt && (
                    <Button size="sm" variant="outline" onClick={handleDownloadReceipt}>
                        <Download className="h-4 w-4 mr-2" />
                        Download Receipt
                    </Button>
                )}

                {milestone.status === 'completed' && (
                    <span className="text-sm text-green-600 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Verified by vendor
                    </span>
                )}

                {milestone.payment?.uploadedReceipt && !milestone.payment.vendorVerification?.verified && (
                    <span className="text-sm text-yellow-600 flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Awaiting vendor verification
                    </span>
                )}
            </div>
        </div>
    );
};

const IndustryWorkflowDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [workflowData, setWorkflowData] = useState<WorkflowDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);

    // Load Razorpay script
    useEffect(() => {
        const loadRazorpay = () => {
            if ((window as any).Razorpay) {
                setRazorpayLoaded(true);
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = () => setRazorpayLoaded(true);
            script.onerror = () => console.error('Failed to load Razorpay script');
            document.body.appendChild(script);
        };

        loadRazorpay();
    }, []);

    const fetchWorkflowDetails = async () => {
        if (!id) return;

        try {
            setIsLoading(true);
            setError(null);
            const response = await getIndustryWorkflowDetails(id);
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
                <title>{workflow.projectTitle} | Workflow | Diligence</title>
            </Helmet>

            <main className="container mx-auto px-4 py-8 pt-20">
                {/* Header */}
                <div className="mb-6">
                    <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Workflows
                    </Button>

                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">{workflow.projectTitle}</h1>
                            <p className="text-muted-foreground mt-1">
                                Workflow ID: {workflow.workflowId}
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
                                        <p className="text-2xl font-bold text-primary">{stats.completedMilestones}</p>
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
                                    Payment Milestones
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {milestones.map((milestone) => (
                                    <MilestoneCard
                                        key={milestone.id}
                                        milestone={milestone}
                                        workflowId={workflow.id}
                                        currency={workflow.currency}
                                        razorpayLoaded={razorpayLoaded}
                                        onPaymentComplete={fetchWorkflowDetails}
                                    />
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Financial summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <IndianRupee className="h-5 w-5" />
                                    Financial Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Total Value</span>
                                    <span className="font-semibold">
                                        {formatCurrency(workflow.totalValue, workflow.currency)}
                                    </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Paid</span>
                                    <span className="font-semibold text-green-600">
                                        {formatCurrency(stats.paidAmount, workflow.currency)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Remaining</span>
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

                        {/* Vendor info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Vendor Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="font-medium">{stakeholder.name}</p>
                                <p className="text-sm text-muted-foreground capitalize">{stakeholder.type}</p>
                                {stakeholder.contact?.email && (
                                    <p className="text-sm text-muted-foreground mt-2">{stakeholder.contact.email}</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default IndustryWorkflowDetails;
