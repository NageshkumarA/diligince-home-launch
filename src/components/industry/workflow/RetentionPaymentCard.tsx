
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lock, Unlock, Clock, Star, Download } from 'lucide-react';
import { RetentionPayment } from '@/types/workflow';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface RetentionPaymentCardProps {
  retentionPayment: RetentionPayment;
  onReleaseRetention: () => void;
  onDownloadCertificate: () => void;
  projectCompleted: boolean;
}

export const RetentionPaymentCard = ({ 
  retentionPayment, 
  onReleaseRetention, 
  onDownloadCertificate,
  projectCompleted 
}: RetentionPaymentCardProps) => {
  const [timeRemaining, setTimeRemaining] = useState<{
    days: number;
    hours: number;
    minutes: number;
  }>({ days: 0, hours: 0, minutes: 0 });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const releaseDate = new Date(retentionPayment.releaseDate);
      const now = new Date();
      const timeDiff = releaseDate.getTime() - now.getTime();

      if (timeDiff <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0 });
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeRemaining({ days, hours, minutes });
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [retentionPayment.releaseDate]);

  const isReleaseAvailable = retentionPayment.status === 'available' || 
    (timeRemaining.days === 0 && timeRemaining.hours === 0 && timeRemaining.minutes === 0);

  const totalDelayDays = retentionPayment.delayPeriodDays;
  const elapsedDays = totalDelayDays - timeRemaining.days;
  const progressPercentage = Math.min((elapsedDays / totalDelayDays) * 100, 100);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {retentionPayment.status === 'released' ? (
            <Unlock className="h-5 w-5 text-green-600" />
          ) : (
            <Lock className="h-5 w-5 text-orange-600" />
          )}
          Retention Payment ({retentionPayment.percentage}%)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Retention Amount */}
        <div className="text-center p-6 bg-orange-50 rounded-lg border border-orange-200">
          <div className="text-3xl font-bold text-orange-800 mb-2">
            {formatCurrency(retentionPayment.amount)}
          </div>
          <div className="text-sm text-orange-600">
            {retentionPayment.percentage}% Retention Payment
          </div>
          <Badge 
            className={
              retentionPayment.status === 'released' ? 'bg-green-600 mt-2' :
              retentionPayment.status === 'available' ? 'bg-blue-600 mt-2' :
              'bg-orange-600 mt-2'
            }
          >
            {retentionPayment.status === 'released' ? 'Released' :
             retentionPayment.status === 'available' ? 'Available for Release' :
             'Locked'}
          </Badge>
        </div>

        {/* Countdown Timer */}
        {retentionPayment.status !== 'released' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 justify-center">
              <Clock className="h-4 w-4" />
              <span className="font-medium">
                {isReleaseAvailable ? 'Ready for Release!' : 'Release Available In:'}
              </span>
            </div>
            
            {!isReleaseAvailable && (
              <>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-gray-100 rounded">
                    <div className="text-2xl font-bold">{timeRemaining.days}</div>
                    <div className="text-sm text-gray-600">Days</div>
                  </div>
                  <div className="p-3 bg-gray-100 rounded">
                    <div className="text-2xl font-bold">{timeRemaining.hours}</div>
                    <div className="text-sm text-gray-600">Hours</div>
                  </div>
                  <div className="p-3 bg-gray-100 rounded">
                    <div className="text-2xl font-bold">{timeRemaining.minutes}</div>
                    <div className="text-sm text-gray-600">Minutes</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Retention Period Progress</span>
                    <span>{elapsedDays} of {totalDelayDays} days</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              </>
            )}
          </div>
        )}

        {/* Project Rating Section */}
        {projectCompleted && retentionPayment.status !== 'released' && (
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Star className="h-4 w-4" />
              Rate Project Completion
            </h4>
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className="h-6 w-6 text-yellow-400 cursor-pointer hover:text-yellow-500" 
                />
              ))}
            </div>
            <Button variant="outline" className="w-full">
              Submit Rating & Feedback
            </Button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {retentionPayment.status === 'released' ? (
            <>
              <div className="flex items-center justify-center gap-2 p-4 bg-green-50 rounded-lg border border-green-200">
                <Unlock className="h-5 w-5 text-green-600" />
                <span className="text-green-800 font-medium">Retention Payment Released</span>
              </div>
              <Button 
                onClick={onDownloadCertificate}
                variant="outline" 
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Completion Certificate
              </Button>
            </>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400"
                  disabled={!isReleaseAvailable}
                >
                  <Unlock className="h-4 w-4 mr-2" />
                  {isReleaseAvailable ? 'Release Retention Payment' : 'Release Not Yet Available'}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Release Retention Payment</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to release the retention payment of {formatCurrency(retentionPayment.amount)}? 
                    This will complete the project payment cycle and cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={onReleaseRetention}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    Release Payment
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {/* Release Instructions */}
        {retentionPayment.status === 'locked' && (
          <div className="text-xs text-gray-500 text-center">
            Retention will be automatically available for release after {retentionPayment.delayPeriodDays} days 
            from project completion
          </div>
        )}
      </CardContent>
    </Card>
  );
};
