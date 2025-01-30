'use client';

import { useEffect } from 'react';
import useAppStore from '@/stores/useAppStore';
import { RawUser, User } from '@/types/types';
import rawUsers from '@/data/users.json'; // Adjust the import paths as necessary

// Utility function to parse date strings into Date objects
const parseUserDates = (users: RawUser[]): User[] => {
  return users.map((user) => ({
    ...user,
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt),
  }));
};

const useFetchInitialData = () => {
  const setUsers = useAppStore((state) => state.setUsers);

  useEffect(() => {
    // Parse and set initial user data
    const parsedUsers = parseUserDates(rawUsers);
    setUsers(parsedUsers);
  }, [setUsers]);
};

export default useFetchInitialData;
