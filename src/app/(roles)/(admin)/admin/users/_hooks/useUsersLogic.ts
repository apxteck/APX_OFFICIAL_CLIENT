import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { usersService } from "@/services/admin/users.service";
import { useUsersStore } from "../_store/useUsersStore";

export const useUsersLogic = () => {
  const store = useUsersStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, rolesData] = await Promise.all([
          usersService.getUsers(),
          usersService.getRoles()
        ]);
        store.setUsers(usersData);
        store.setRoles(rolesData);
      } catch (error) {
        console.error("Failed to fetch users and roles", error);
        toast.error("Failed to fetch users and roles");
      } finally {
        store.setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredUsers = useMemo(() => {
    return store.users.filter(user => 
      user.fullName.toLowerCase().includes(store.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(store.searchTerm.toLowerCase()) ||
      user.phone.includes(store.searchTerm)
    );
  }, [store.users, store.searchTerm]);

  return {
    ...store,
    filteredUsers,
  };
};
