import { ChatMessage } from './types';

// ============================================================
// API CONFIGURATION - UNCOMMENT AND CONFIGURE WHEN API IS READY
// ============================================================

// const CHATBOT_API_URL = 'YOUR_API_ENDPOINT_HERE';
// const CHATBOT_API_KEY = 'YOUR_API_KEY_HERE';

// interface ChatbotApiResponse {
//   message: string;
//   success: boolean;
// }

// /**
//  * Send message to the actual chatbot API
//  * Uncomment and use this function when API is ready
//  */
// export const sendChatMessageToApi = async (
//   query: string,
//   conversationHistory?: ChatMessage[]
// ): Promise<string> => {
//   try {
//     const response = await fetch(CHATBOT_API_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${CHATBOT_API_KEY}`,
//       },
//       body: JSON.stringify({
//         query,
//         history: conversationHistory?.map(msg => ({
//           role: msg.role,
//           content: msg.content,
//         })),
//       }),
//     });
//
//     if (!response.ok) {
//       throw new Error('Failed to get response from chatbot API');
//     }
//
//     const data: ChatbotApiResponse = await response.json();
//     return data.message;
//   } catch (error) {
//     console.error('Chatbot API error:', error);
//     throw error;
//   }
// };

// ============================================================
// MOCK IMPLEMENTATION - FOR DEVELOPMENT/TESTING
// ============================================================

const MOCK_RESPONSES: Record<string, string> = {
  approval: `**Approval Metrics in Diligince.ai**

Approval metrics are essential for monitoring and tracking the status and efficiency of the approval process within the Diligince.ai platform. Here's how it works:

### **1. Approval Matrix**
- The approval matrix is a configuration defining the hierarchy of approvers required to review and approve a requirement before publication.
- It consists of multiple **levels**, each with designated **approvers**.

### **2. Approval Levels**
- Each requirement moves through the approval levels **sequentially**:
  - **Level 1**: Reviewed by the Department Manager
  - **Level 2**: Reviewed by the Procurement Head
  - **Level 3**: Reviewed by the Finance Director

### **3. Approval Status Indicators**
The approval status will display one of the following indicators to help track progress:
- **✅ Approved**: This level has fully approved the requirement.
- **⏳ Pending**: Awaiting decision at this level.
- **⭕ Not Started**: Previous levels have not been completed.
- **❌ Rejected**: Rejected at this level, and comments are provided.

### **4. How to Track Approval Progress**
- Check the **Dashboard** for the pending approval count or navigate to the respective module's **Pending** section to view details of items awaiting action.
  
### **5. Requirements for Publishing**
To publish a requirement, it must meet the following criteria:
- Must have an **Approved** status.
- All levels of the approval matrix must be completed.

### **6. Summary of Key Features**
- **Hierarchical Structure**: Ensures appropriate review based on organizational roles.
- **Visibility of Status**: Real-time indicators show where each requirement stands in the approval process.
- **Streamlined Process**: Facilitates faster approvals through predefined workflows.

Understanding approval metrics can enhance workflow efficiency and facilitate better decision-making within the procurement process.`,

  requirement: `## Creating a New Requirement

To create a new procurement requirement in Diligince.ai:

### **Step 1: Navigate to Requirements**
Click on **Requirements** in the sidebar, then select **Create New**.

### **Step 2: Fill Basic Information**
- **Title**: Enter a clear, descriptive title
- **Category**: Select Product, Service, or Logistics
- **Priority**: Choose Low, Medium, High, or Critical
- **Department**: Select your department

### **Step 3: Add Details**
Provide comprehensive specifications based on your category.

### **Step 4: Attach Documents**
Upload relevant specifications, drawings, or compliance documents.

### **Step 5: Review & Submit**
Review all information and submit for approval.

> 💡 **Tip**: Use the auto-save feature to prevent data loss!`,

  quotation: `## Managing Quotations

Quotations in Diligince.ai help you compare vendor responses efficiently.

### **Key Features**
| Feature | Description |
|---------|-------------|
| **Side-by-side Comparison** | Compare multiple quotes at once |
| **Scoring Matrix** | Evaluate based on price, quality, delivery |
| **Negotiation Tools** | Request revisions from vendors |

### **Workflow**
1. Receive quotations from vendors
2. Review and compare offerings
3. Request clarifications if needed
4. Approve or reject quotations
5. Generate purchase orders`,

  default: `Hello! I'm **Diligince AI**, your intelligent procurement assistant. 👋

I can help you with:
- 📋 **Requirements** - Creating and managing procurement requirements
- 📊 **Quotations** - Comparing vendor quotes and making decisions
- 📦 **Purchase Orders** - Tracking orders and deliveries
- ✅ **Approvals** - Understanding approval workflows
- 📈 **Analytics** - Insights into your procurement performance

What would you like to know more about?`
};

/**
 * Simulated delay to mimic API response time
 */
const simulateDelay = (ms: number = 1500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Get mock response based on keywords in the query
 */
const getMockResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('approval') || lowerQuery.includes('matrix') || lowerQuery.includes('publish')) {
    return MOCK_RESPONSES.approval;
  }
  if (lowerQuery.includes('requirement') || lowerQuery.includes('create') || lowerQuery.includes('new')) {
    return MOCK_RESPONSES.requirement;
  }
  if (lowerQuery.includes('quotation') || lowerQuery.includes('quote') || lowerQuery.includes('vendor')) {
    return MOCK_RESPONSES.quotation;
  }
  
  return MOCK_RESPONSES.default;
};

/**
 * Send chat message - currently uses mock, will use API when ready
 */
export const sendChatMessage = async (
  query: string,
  _conversationHistory?: ChatMessage[]
): Promise<string> => {
  // Simulate network delay
  await simulateDelay(1000 + Math.random() * 1000);
  
  // Return mock response
  // TODO: Replace with sendChatMessageToApi when API is ready
  return getMockResponse(query);
};

/**
 * Generate unique message ID
 */
export const generateMessageId = (): string => {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
