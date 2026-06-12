import { create } from "zustand";
import { Role, PermRow } from "@/services/admin/roles.service";

interface PermissionsState {
  roles: Role[];
  selectedRoleId: number | "";
  permissions: PermRow[];
  isLoadingRoles: boolean;
  isLoadingPerms: boolean;
  isSaving: boolean;
  isResetting: boolean;
  
  setRoles: (roles: Role[]) => void;
  setSelectedRoleId: (id: number | "") => void;
  setPermissions: (permissions: PermRow[] | ((prev: PermRow[]) => PermRow[])) => void;
  setIsLoadingRoles: (isLoading: boolean) => void;
  setIsLoadingPerms: (isLoading: boolean) => void;
  setIsSaving: (isSaving: boolean) => void;
  setIsResetting: (isResetting: boolean) => void;
}

export const usePermissionsStore = create<PermissionsState>((set) => ({
  roles: [],
  selectedRoleId: "",
  permissions: [],
  isLoadingRoles: true,
  isLoadingPerms: false,
  isSaving: false,
  isResetting: false,
  
  setRoles: (roles) => set({ roles }),
  setSelectedRoleId: (selectedRoleId) => set({ selectedRoleId }),
  setPermissions: (permissions) => set((state) => ({ 
    permissions: typeof permissions === "function" ? permissions(state.permissions) : permissions 
  })),
  setIsLoadingRoles: (isLoadingRoles) => set({ isLoadingRoles }),
  setIsLoadingPerms: (isLoadingPerms) => set({ isLoadingPerms }),
  setIsSaving: (isSaving) => set({ isSaving }),
  setIsResetting: (isResetting) => set({ isResetting }),
}));
