import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Download, 
  Receipt, 
  CreditCard, 
  Calendar, 
  Building,
  FileText,
  Copy,
  CheckCircle
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { TransactionStatusBadge } from '@/components/subscription';
import { getTransactionById, formatCurrency } from '@/data/mockSubscriptionData';
import { toast } from 'sonner';

const TransactionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const transaction = getTransactionById(id || '');

  if (!transaction) {
    return (
      <div className="p-6 bg-background min-h-screen">
        <div className="max-w-3xl mx-auto text-center py-12">
          <Receipt className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Transaction Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The transaction you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate('/dashboard/subscription/transactions')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Transactions
          </Button>
        </div>
      </div>
    );
  }

  const handleCopyId = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const handleExportPDF = () => {
    toast.info('Export feature coming soon!', {
      description: 'PDF export will be available shortly.'
    });
  };

  const getPaymentMethodLabel = () => {
    const { paymentMethod } = transaction;
    switch (paymentMethod.type) {
      case 'card':
        return `${paymentMethod.brand} •••• ${paymentMethod.last4}`;
      case 'upi':
        return `UPI - ${paymentMethod.upiId}`;
      case 'netbanking':
        return `Net Banking - ${paymentMethod.bankName}`;
      case 'wallet':
        return 'Digital Wallet';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard/subscription/transactions')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Transactions
          </Button>
          <Button onClick={handleExportPDF} className="gap-2">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
        </div>

        {/* Transaction Header Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Receipt className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl mb-1">
                    {transaction.transactionNumber}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <TransactionStatusBadge status={transaction.status} />
                    {transaction.status === 'failed' && transaction.failureReason && (
                      <span className="text-sm text-red-600">
                        {transaction.failureReason}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">{formatCurrency(transaction.amount)}</p>
                <p className="text-sm text-muted-foreground">
                  {format(parseISO(transaction.date), 'MMMM d, yyyy • h:mm a')}
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Payment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Payment Date</p>
                <p className="font-medium">
                  {format(parseISO(transaction.date), 'MMMM d, yyyy')}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Time</p>
                <p className="font-medium">
                  {format(parseISO(transaction.date), 'h:mm a')}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p className="font-medium">{getPaymentMethodLabel()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Razorpay ID</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium font-mono text-sm">{transaction.razorpayId}</p>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => handleCopyId(transaction.razorpayId || '')}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              Plan Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Plan</p>
                <p className="font-medium">{transaction.planName}</p>
              </div>
              {transaction.expiryDate && (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">Billing Period</p>
                    <p className="font-medium">
                      {format(parseISO(transaction.date), 'MMM d')} -{' '}
                      {format(parseISO(transaction.expiryDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Expiry Date</p>
                    <p className="font-medium">
                      {format(parseISO(transaction.expiryDate), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Building className="h-5 w-5 text-muted-foreground" />
              Cost Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transaction.breakdown.planAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{transaction.planName}</span>
                  <span className="font-medium">
                    {formatCurrency(transaction.breakdown.planAmount)}
                  </span>
                </div>
              )}
              
              {transaction.breakdown.addOnsDetails?.map((addon, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-muted-foreground">{addon.name}</span>
                  <span className="font-medium">{formatCurrency(addon.amount)}</span>
                </div>
              ))}

              {transaction.breakdown.addOnsAmount > 0 && !transaction.breakdown.addOnsDetails && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Add-ons</span>
                  <span className="font-medium">
                    {formatCurrency(transaction.breakdown.addOnsAmount)}
                  </span>
                </div>
              )}

              <Separator className="my-3" />

              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">
                  {formatCurrency(transaction.breakdown.subtotal)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  GST ({transaction.breakdown.gstRate}%)
                </span>
                <span className="font-medium">
                  {formatCurrency(transaction.breakdown.gstAmount)}
                </span>
              </div>

              <Separator className="my-3" />

              <div className="flex justify-between text-lg">
                <span className="font-semibold">Total Paid</span>
                <span className="font-bold text-primary">
                  {formatCurrency(transaction.breakdown.total)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Message for completed transactions */}
        {transaction.status === 'success' && (
          <Card className="border-green-200 bg-green-50/50 dark:bg-green-900/10 dark:border-green-800">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-green-800 dark:text-green-400">
                    Payment Successful
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-500">
                    Your subscription has been activated and is valid until{' '}
                    {transaction.expiryDate 
                      ? format(parseISO(transaction.expiryDate), 'MMMM d, yyyy')
                      : 'N/A'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TransactionDetail;
