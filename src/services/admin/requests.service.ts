export type RequestStatus = "NEW" | "IN_REVIEW" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
export type RequestPriority = "LOW" | "MEDIUM" | "HIGH";

export interface ServiceRequest {
  id: string;
  customerName: string;
  customerEmail: string;
  serviceType: string;
  status: RequestStatus;
  priority: RequestPriority;
  assignedTo?: string;
  createdAt: string;
}

export interface RequestFormData {
  label: string;
  value: string;
}

export interface RequestAttachment {
  id: string;
  fileName: string;
  url: string;
  fileSize: string;
}

export interface PaymentRecord {
  id: string;
  amount: number;
  status: "PENDING" | "SENT" | "PAID" | "FAILED";
  date: string;
}

export interface ServiceRequestDetail extends ServiceRequest {
  customerPhone: string;
  formData: RequestFormData[];
  attachments: RequestAttachment[];
  internalNotes?: string;
  paymentHistory: PaymentRecord[];
}

const mockRequests: ServiceRequest[] = [
  { id: "REQ-1042", customerName: "Rahul Sharma", customerEmail: "rahul@techflow.in", serviceType: "Web Development", status: "NEW", priority: "HIGH", createdAt: "2024-03-12T09:30:00Z" },
  { id: "REQ-1041", customerName: "Priya Singh", customerEmail: "priya.s@designco.com", serviceType: "SEO Optimization", status: "IN_PROGRESS", priority: "MEDIUM", assignedTo: "Amit Patel", createdAt: "2024-03-11T14:20:00Z" },
  { id: "REQ-1040", customerName: "Vikram Reddy", customerEmail: "vikram@startup.io", serviceType: "Mobile App Design", status: "IN_REVIEW", priority: "HIGH", assignedTo: "Neha Gupta", createdAt: "2024-03-10T11:15:00Z" },
  { id: "REQ-1039", customerName: "Anita Desai", customerEmail: "anita.d@gmail.com", serviceType: "Social Media Marketing", status: "COMPLETED", priority: "LOW", assignedTo: "Ravi Kumar", createdAt: "2024-03-08T16:45:00Z" },
  { id: "REQ-1038", customerName: "Sanjay Verma", customerEmail: "sanjay.v@enterprise.co.in", serviceType: "Web Development", status: "CANCELLED", priority: "MEDIUM", createdAt: "2024-03-07T10:00:00Z" }
];

export const requestsService = {
  getRequests: async (): Promise<ServiceRequest[]> => {
    // Simulated network delay
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockRequests;
  },

  getRequestDetail: async (id: string): Promise<ServiceRequestDetail | null> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const baseRequest = mockRequests.find(r => r.id === id) || mockRequests[0];
    
    return {
      ...baseRequest,
      customerPhone: "+91 9876543210",
      formData: [
        { label: "Company Name", value: "TechFlow Solutions" },
        { label: "Project Description", value: "We need a complete revamp of our corporate website with modern glassmorphism UI." },
        { label: "Target Audience", value: "B2B Enterprise Clients" },
        { label: "Timeline Expectation", value: "3-4 Weeks" },
        { label: "Budget Range", value: "₹50,000 - ₹1,00,000" }
      ],
      attachments: [
        { id: "att-1", fileName: "project_requirements.pdf", url: "#", fileSize: "2.4 MB" },
        { id: "att-2", fileName: "brand_assets.zip", url: "#", fileSize: "15.8 MB" }
      ],
      internalNotes: "Client wants to focus heavily on the animations. Assigned to senior frontend team.",
      paymentHistory: [
        { id: "INV-2041", amount: 25000, status: "PAID", date: "2024-03-13T10:00:00Z" },
        { id: "INV-2045", amount: 50000, status: "PENDING", date: "2024-03-25T10:00:00Z" }
      ]
    };
  }
};
