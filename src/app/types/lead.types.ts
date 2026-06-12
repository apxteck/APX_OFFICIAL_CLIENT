export interface EnquiryPayload {
  fullName: string;
  email: string;
  phone?: string;
  businessName?: string;
  serviceInterest?: string;
  message: string;
}

export type LeadStatus = "NEW" | "SEEN" | "CONVERTED" | "CONTACTED" | "INTERESTED" | "NEGOTIATING" | "LOST";

export interface Lead {
  id: number;
  fullName: string;
  email: string | null;
  phone: string;
  businessName: string | null;
  serviceInterest: string | null;
  status: LeadStatus;
  assignedToId: number | null;
  assignedTo?: { fullName: string; email?: string }; // From API
  source: string | null;
  message?: string;
  createdAt: string;
  updatedAt: string;
}
