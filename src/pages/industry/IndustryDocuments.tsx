
import IndustryHeader from "@/components/industry/IndustryHeader";
import { DocumentManager } from "@/components/industry/documents/DocumentManager";

const IndustryDocuments = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <IndustryHeader />
      
      <main className="pt-32 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 mt-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Management</h1>
            <p className="text-gray-600">Manage contracts, certificates, and project documents.</p>
          </div>

          <DocumentManager />
        </div>
      </main>
    </div>
  );
};

export default IndustryDocuments;
