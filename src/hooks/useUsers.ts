import { useEffect } from 'react';
import useAppStore from '@/stores/useAppStore';
import { getUsers } from '@/services/userService';

const useUsers = () => {
  const users = useAppStore((state) => state.users);
  const setUsers = useAppStore((state) => state.setUsers);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers(); // Fetch users from the API
        setUsers(response.data); // Update the Zustand store with the fetched data
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };

    if (users.length === 0) {
      fetchUsers(); // Fetch users if Zustand store is empty
    }
  }, [users.length, setUsers]);

  return users;
};

export default useUsers;
