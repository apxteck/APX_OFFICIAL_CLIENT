export type RequestStatus = 'NEW' | 'IN_REVIEW' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface ServiceRequest {
  id: number;
  status: RequestStatus;
  priority: string;
  createdAt: string;
  service: { id: number; name: string };
  assignedTo?: { id: number; fullName: string };
}

export interface ServiceRequestDetails {
  id: number;
  status: RequestStatus;
  priority: string;
  createdAt: string;
  service?: {
    name: string;
    fields?: any[];
  };
  requestData?: any[];
  fileUploads?: any[];
  payments?: any[];
  assignedTo?: {
    fullName: string;
  };
}
