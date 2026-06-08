export type LeadStatus = "NEW" | "CONTACTED" | "INTERESTED" | "NEGOTIATING" | "CONVERTED" | "LOST";
export type LeadPriority = "LOW" | "MEDIUM" | "HIGH";

export interface LeadFollowUp {
  id: string;
  note: string;
  authorName: string;
  createdAt: string;
  nextFollowUpAt?: string;
}

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  businessName?: string;
  serviceInterest: string;
  status: LeadStatus;
  priority: LeadPriority;
  source: string;
  assignedTo?: string;
  createdAt: string;
  convertedAt?: string;
}

export interface LeadDetail extends Lead {
  followUps: LeadFollowUp[];
}

const mockLeads: Lead[] = [
  { id: "LD-501", fullName: "Arjun Mehta", email: "arjun.m@example.com", phone: "+91 98765 11111", businessName: "Mehta Logistics", serviceInterest: "Custom Web App", status: "NEGOTIATING", priority: "HIGH", source: "Website Contact Form", assignedTo: "Rahul Sharma", createdAt: "2024-03-10T10:00:00Z" },
  { id: "LD-502", fullName: "Sneha Kapoor", email: "sneha.k@retailer.in", phone: "+91 98765 22222", serviceInterest: "E-commerce SEO", status: "INTERESTED", priority: "MEDIUM", source: "Instagram Ad", assignedTo: "Priya Singh", createdAt: "2024-03-12T14:30:00Z" },
  { id: "LD-503", fullName: "Rohan Das", email: "rohan.d@startup.co", phone: "+91 98765 33333", businessName: "FinTech Neo", serviceInterest: "Mobile App Development", status: "NEW", priority: "HIGH", source: "Direct Email", createdAt: "2024-03-14T09:15:00Z" },
  { id: "LD-504", fullName: "Neha Joshi", email: "neha@joshi-designs.com", phone: "+91 98765 44444", serviceInterest: "Social Media Marketing", status: "CONTACTED", priority: "LOW", source: "Google Search", assignedTo: "Amit Patel", createdAt: "2024-03-11T16:45:00Z" },
  { id: "LD-505", fullName: "Karan Singh", email: "karan@buildco.in", phone: "+91 98765 55555", businessName: "BuildCo Constructions", serviceInterest: "Corporate Website", status: "CONVERTED", priority: "MEDIUM", source: "Referral", assignedTo: "Rahul Sharma", createdAt: "2024-02-28T10:00:00Z", convertedAt: "2024-03-05T15:30:00Z" }
];

export const crmService = {
  getLeads: async (): Promise<Lead[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockLeads;
  },

  getLeadDetail: async (id: string): Promise<LeadDetail | null> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const baseLead = mockLeads.find(l => l.id === id) || mockLeads[0];
    
    return {
      ...baseLead,
      followUps: [
        {
          id: "FU-001",
          note: "Had an initial discovery call. Client is looking for a comprehensive logistics dashboard to track fleet vehicles.",
          authorName: "Rahul Sharma",
          createdAt: "2024-03-10T14:00:00Z",
          nextFollowUpAt: "2024-03-12T10:00:00Z"
        },
        {
          id: "FU-002",
          note: "Sent over the initial proposal and pricing tier. They mentioned budget might be tight but are highly interested in the architecture.",
          authorName: "Rahul Sharma",
          createdAt: "2024-03-12T11:30:00Z",
          nextFollowUpAt: "2024-03-15T15:00:00Z"
        }
      ]
    };
  }
};
