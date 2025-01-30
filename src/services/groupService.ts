import useAppStore from '@/stores/useAppStore';
import { Group } from '@/types/types';
import { User } from '@/types/types';
import axios from 'axios';

// Function to fetch groups from the API
export const getGroups = async (): Promise<{ data: Group[] }> => {
  return await axios.get('/api/groups');
};

// Function to get users by their IDs
export const getUsersByIds = (userIds: string[], users: User[]): User[] => {
  return users.filter((user: User) => userIds.includes(user.userId));
};

export const getGroupById = (groupId: string) => {
  const { groups } = useAppStore.getState();
  return groups.find((group: Group) => group.groupId === groupId);
};
