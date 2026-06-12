import { create } from "zustand";
import { User, Role } from "@/services/admin/users.service";

interface UsersState {
  users: User[];
  roles: Role[];
  isLoading: boolean;
  searchTerm: string;

  setUsers: (users: User[]) => void;
  setRoles: (roles: Role[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setSearchTerm: (term: string) => void;
}

export const useUsersStore = create<UsersState>((set) => ({
  users: [],
  roles: [],
  isLoading: true,
  searchTerm: "",

  setUsers: (users) => set({ users }),
  setRoles: (roles) => set({ roles }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
}));
