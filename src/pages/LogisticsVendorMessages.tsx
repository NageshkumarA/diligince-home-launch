
import React from "react";
import { LogisticsVendorHeader } from "@/components/vendor/LogisticsVendorHeader";
import { MessageCenter as SharedMessageCenter } from "@/components/shared/messages/MessageCenter";
import { logisticsVendorMessageConfig } from "@/utils/messageConfigs";
import { useToast } from "@/hooks/use-toast";

const LogisticsVendorMessages = () => {
  const { toast } = useToast();

  const messages = [
    {
      id: 1,
      sender: "Steel Industries Ltd.",
      initials: "SI",
      message: "We need to confirm the crane availability for our plant expansion project. The equipment must be delivered by January 20th for the installation schedule.",
      timestamp: "10:42 AM",
      priority: "high",
      color: "green",
      unread: true,
      type: "transport-request",
      attachments: ["equipment-specs.pdf"],
      orderId: "REQ-001"
    },
    {
      id: 2,
      sender: "Chemical Corp",
      initials: "CC",
      message: "Please provide an update on the chemical tank delivery. Our production team needs to know the exact ETA for coordination with safety protocols.",
      timestamp: "Yesterday",
      priority: "urgent",
      color: "blue",
      unread: true,
      type: "delivery-update",
      orderId: "DEL-002"
    },
    {
      id: 3,
      sender: "Power Generation Co.",
      initials: "PG",
      message: "Thank you for the successful delivery of turbine components. The quality of transport and handling was excellent. We'll have more projects coming up.",
      timestamp: "2d ago",
      priority: "low",
      color: "orange",
      unread: false,
      type: "delivery-update",
      orderId: "DEL-003"
    },
    {
      id: 4,
      sender: "Auto Manufacturing",
      initials: "AM",
      message: "We're planning a complete factory relocation next quarter. Could you provide a detailed quote for moving our production equipment?",
      timestamp: "3d ago",
      priority: "medium",
      color: "pink",
      unread: false,
      type: "transport-request",
      attachments: ["factory-layout.pdf", "equipment-list.xlsx"]
    },
    {
      id: 5,
      sender: "Mining Operations Ltd.",
      initials: "MO",
      message: "We need specialized transport for our excavator and bulldozers from our closed site to the new mining location. Heavy equipment transport required.",
      timestamp: "4d ago",
      priority: "medium",
      color: "purple",
      unread: false,
      type: "transport-request"
    },
    {
      id: 6,
      sender: "Cement Industries",
      initials: "CI",
      message: "Route optimization suggestion: Could we use the new highway bypass for faster delivery of raw materials? It might reduce transit time by 3 hours.",
      timestamp: "5d ago",
      priority: "low",
      color: "indigo",
      unread: false,
      type: "delivery-update"
    },
    {
      id: 7,
      sender: "Pharma Solutions",
      initials: "PS",
      message: "Emergency transport needed for temperature-controlled pharmaceutical equipment. Can you arrange refrigerated transport within 24 hours?",
      timestamp: "1w ago",
      priority: "urgent",
      color: "red",
      unread: false,
      type: "transport-request"
    },
    {
      id: 8,
      sender: "Textile Manufacturing",
      initials: "TM",
      message: "The textile machinery delivery was completed successfully. However, we noticed minor scratches on one unit. Please check your handling procedures.",
      timestamp: "1w ago",
      priority: "medium",
      color: "yellow",
      unread: false,
      type: "delivery-update",
      orderId: "DEL-007"
    }
  ];

  const handleReply = (messageId: number, reply: string) => {
    const message = messages.find(m => m.id === messageId);
    toast({
      title: "Message Sent",
      description: `Your reply to ${message?.sender} has been sent successfully.`,
    });
  };

  const handleFilter = (filterType: string) => {
    console.log("Filter applied:", filterType);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LogisticsVendorHeader />
      
      <main className="pt-32 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 mt-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages Hub</h1>
            <p className="text-gray-600">Communicate with industrial clients and manage transport-related inquiries.</p>
          </div>

          {/* Message Center */}
          <SharedMessageCenter 
            messages={messages}
            config={logisticsVendorMessageConfig}
            onReply={handleReply}
            onFilter={handleFilter}
          />
        </div>
      </main>
    </div>
  );
};

export default LogisticsVendorMessages;
