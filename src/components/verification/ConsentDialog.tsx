import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Lock, FileCheck } from "lucide-react";

interface ConsentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userType: 'industry' | 'vendor' | 'professional';
  documentsToSubmit: string[];
  isLoading?: boolean;
}

export const ConsentDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  userType,
  documentsToSubmit,
  isLoading = false 
}: ConsentDialogProps) => {
  const [consentChecked, setConsentChecked] = useState(false);
  
  // Reset consent when dialog opens/closes
  useEffect(() => {
    if (!isOpen) setConsentChecked(false);
  }, [isOpen]);

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-xl">
            <Shield className="h-6 w-6 text-primary" />
            Data & Policies Consent
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            Please review and confirm your consent before submitting for verification
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-6 py-4">
          {/* Security Information */}
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Data Security</h3>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Your information is encrypted and stored securely. We use industry-standard 
                  security protocols to protect your data. All documents are stored in 
                  encrypted cloud storage with restricted access.
                </p>
              </div>
            </div>
          </div>

          {/* Documents Being Submitted */}
          <div className="bg-muted border border-border rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FileCheck className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">Documents Being Submitted</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {documentsToSubmit.map((doc, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">What Happens Next?</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">1.</span>
                <span>Your profile will be locked for editing during verification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">2.</span>
                <span>Our team will review your documents (typically 2-5 business days)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">3.</span>
                <span>You'll be notified via email once verification is complete</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">4.</span>
                <span>If approved, full platform access will be granted immediately</span>
              </li>
            </ul>
          </div>

          {/* Privacy & Terms */}
          <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Data Usage & Privacy</h3>
            <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-3">
              By submitting your information, you acknowledge that:
            </p>
            <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1.5 ml-4">
              <li>• Your data will be used solely for verification purposes</li>
              <li>• Documents will be reviewed by authorized personnel only</li>
              <li>• Your information will not be shared with third parties</li>
              <li>• You can request data deletion by contacting support</li>
            </ul>
            <div className="mt-3 text-sm">
              <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank">
                Privacy Policy
              </a>
              {" | "}
              <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="bg-background border-2 border-primary rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="consent"
                checked={consentChecked}
                onCheckedChange={(checked) => setConsentChecked(checked as boolean)}
                className="mt-1"
              />
              <label
                htmlFor="consent"
                className="text-sm font-medium leading-relaxed cursor-pointer"
              >
                I confirm that I have read and understood the above information. 
                I consent to the collection, processing, and verification of my 
                submitted documents and information. I understand that all information 
                provided is accurate and complete to the best of my knowledge.
              </label>
            </div>
          </div>
        </div>

        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={!consentChecked || isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            {isLoading ? "Submitting..." : "I Agree - Submit for Verification"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
