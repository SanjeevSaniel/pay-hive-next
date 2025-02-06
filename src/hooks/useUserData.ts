import { useEffect, useState } from 'react';
import { User } from '@/types/types';
import useUsers from '@/hooks/useUsers';

const useUserData = (userId: string | undefined): User | null => {
  const users = useUsers();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (userId && users.length) {
      const user = users.find((user) => user.userId === userId) || null;
      setCurrentUser(user);
    }
  }, [userId, users]);

  return currentUser;
};

export default useUserData;
