import { useState, useMemo } from "react";
import { User, Role } from "@/services/admin/users.service";

export const useUsersLogic = (initialUsers: User[], initialRoles: Role[]) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSort, setCurrentSort] = useState("newest");

  const filteredUsers = useMemo(() => {
    let result = users.filter(user => 
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone && user.phone.includes(searchTerm))
    );

    result.sort((a, b) => {
      switch (currentSort) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "name_asc":
          return a.fullName.localeCompare(b.fullName);
        case "name_desc":
          return b.fullName.localeCompare(a.fullName);
        default:
          return 0;
      }
    });

    return result;
  }, [users, searchTerm, currentSort]);

  return {
    users,
    roles,
    searchTerm,
    setSearchTerm,
    currentSort,
    setCurrentSort,
    filteredUsers,
  };
};
