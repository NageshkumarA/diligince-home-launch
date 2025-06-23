
import IndustryHeader from "@/components/industry/IndustryHeader";
import { MessageCenter } from "@/components/industry/messages/MessageCenter";

const IndustryMessages = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <IndustryHeader />
      
      <main className="pt-32 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 mt-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
            <p className="text-gray-600">Communicate with vendors, professionals, and logistics partners.</p>
          </div>

          <MessageCenter />
        </div>
      </main>
    </div>
  );
};

export default IndustryMessages;
