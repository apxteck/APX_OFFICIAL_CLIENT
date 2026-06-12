import { create } from "zustand";
import { Role } from "@/services/admin/roles.service";

interface RolesState {
  roles: Role[];
  isLoading: boolean;
  
  isModalOpen: boolean;
  modalMode: "CREATE" | "EDIT";
  selectedRole: Role | null;
  formData: { name: string; description: string };
  isSubmitting: boolean;

  setRoles: (roles: Role[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setModalMode: (mode: "CREATE" | "EDIT") => void;
  setSelectedRole: (role: Role | null) => void;
  setFormData: (data: { name: string; description: string }) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export const useRolesStore = create<RolesState>((set) => ({
  roles: [],
  isLoading: true,
  
  isModalOpen: false,
  modalMode: "CREATE",
  selectedRole: null,
  formData: { name: "", description: "" },
  isSubmitting: false,

  setRoles: (roles) => set({ roles }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsModalOpen: (isModalOpen) => set({ isModalOpen }),
  setModalMode: (modalMode) => set({ modalMode }),
  setSelectedRole: (selectedRole) => set({ selectedRole }),
  setFormData: (formData) => set({ formData }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
}));
