import adminApi from "./api";

export interface Role {
  id: number;
  name: string;
  description: string;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
}

export interface UserDocument {
  id: number;
  type: string;
  number: string;
  status: "PENDING" | "VERIFIED" | "REJECTED";
  frontUrl: string;
  backUrl?: string;
  reviewNote?: string;
}

export interface ModuleAccess {
  module: string;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  source: "Role Default" | "User Override";
}

export interface UserDetail extends User {
  address: string;
  city: string;
  state: string;
  pincode: string;
  dob: string;
  profilePhotoUrl?: string;
  employeeId?: string;
  department?: string;
  designation?: string;
  joiningDate?: string;
  bankDetails?: {
    accountName: string;
    accountNumber: string;
    ifsc: string;
    bankName: string;
    upiId: string;
  };
  documents: UserDocument[];
  permissions: ModuleAccess[];
}

export const usersService = {
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await adminApi.get("/auth/getAllUsers");
      return response.data?.data?.data || [];
    } catch (error) {
      console.error("Failed to fetch users", error);
      return [];
    }
  },

  getRoles: async (): Promise<Role[]> => {
    try {
      const response = await adminApi.get("/role/roles");
      return response.data?.data || [];
    } catch (error) {
      console.error("Failed to fetch roles", error);
      return [];
    }
  },

  // Mock function for getting a specific user's detailed profile
  getUserDetail: async (id: string | number): Promise<UserDetail> => {
    // Simulated network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    return {
      id: Number(id),
      fullName: "Ganesh Sharma",
      email: "ganesh.sharma@example.com",
      phone: "+91 9876543210",
      role: { id: 3, name: "EMPLOYEE", description: "Internal Staff" },
      isActive: true,
      createdAt: "2024-01-15T10:30:00Z",
      address: "402, Skyline Towers, Tech Park Road",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411057",
      dob: "1992-08-14",
      profilePhotoUrl: "https://i.pravatar.cc/150?u=ganesh",
      employeeId: "APX-EMP-042",
      department: "Engineering",
      designation: "Frontend Lead",
      joiningDate: "2024-01-15",
      bankDetails: {
        accountName: "Ganesh Sharma",
        accountNumber: "501002349876",
        ifsc: "HDFC0001234",
        bankName: "HDFC Bank",
        upiId: "ganesh.sharma@okhdfc"
      },
      documents: [
        {
          id: 1,
          type: "Aadhar Card",
          number: "xxxx-xxxx-4592",
          status: "VERIFIED",
          frontUrl: "https://placehold.co/600x400?text=Aadhar+Front",
          backUrl: "https://placehold.co/600x400?text=Aadhar+Back"
        },
        {
          id: 2,
          type: "PAN Card",
          number: "ABCDE1234F",
          status: "PENDING",
          frontUrl: "https://placehold.co/600x400?text=PAN+Card"
        }
      ],
      permissions: [
        { module: "BLOG_MANAGEMENT", canCreate: true, canRead: true, canUpdate: true, canDelete: false, source: "User Override" },
        { module: "TASK_NOTIFICATION_MANAGEMENT", canCreate: false, canRead: true, canUpdate: true, canDelete: false, source: "Role Default" },
        { module: "CONTENT_MANAGEMENT", canCreate: false, canRead: true, canUpdate: false, canDelete: false, source: "Role Default" }
      ]
    };
  }
};
