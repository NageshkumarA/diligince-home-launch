
import React from 'react';
import { BaseModal } from '@/components/shared/modals/BaseModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Upload, CheckCircle } from 'lucide-react';

interface POTypeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateNew: () => void;
  onUploadManual: () => void;
}

export const POTypeSelectionModal: React.FC<POTypeSelectionModalProps> = ({
  isOpen,
  onClose,
  onCreateNew,
  onUploadManual
}) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Purchase Order Creation"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6 p-6">
        <p className="text-gray-600 text-center">
          Choose how you would like to create your purchase order
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2 border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Create New PO</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Use our ISO 9001 compliant form to generate a professional purchase order with all required terms and conditions.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-green-600 mb-4">
                  <CheckCircle className="h-4 w-4" />
                  <span>ISO 9001 Compliant</span>
                </div>
              </div>
              <Button 
                onClick={onCreateNew}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Create New PO
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-gray-200 hover:border-green-300 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Upload className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Manual PO</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Upload your existing purchase order document (PDF, DOC, DOCX) if you have already prepared one externally.
                </p>
                <div className="text-sm text-gray-500 mb-4">
                  Supported formats: PDF, DOC, DOCX
                </div>
              </div>
              <Button 
                onClick={onUploadManual}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Upload Manual PO
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </BaseModal>
  );
};
