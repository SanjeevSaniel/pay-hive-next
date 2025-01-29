import useAppStore from '@/stores/useAppStore';
import { Group } from '@/types/types';
import { User } from '@/types/types';

// Function to get users by their IDs
export const getUsersByIds = (userIds: string[], users: User[]): User[] => {
  return users.filter((user: User) => userIds.includes(user.userId));
};

export const getGroupById = (groupId: string) => {
  const { groups } = useAppStore.getState();
  return groups.find((group: Group) => group.groupId === groupId);
};
