import { User, StoreState } from '@/types/types';
import { StateCreator } from 'zustand';

export const useUserStore: StateCreator<
  StoreState,
  [],
  [],
  {
    users: User[];
    setUsers: (users: User[]) => void;
    addUser: (newUser: User) => void;
    deleteUser: (userId: string) => void;
  }
> = (set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  addUser: (newUser) => set((state) => ({ users: [...state.users, newUser] })),
  deleteUser: (userId) =>
    set((state) => ({
      users: state.users.filter((user) => user.userId !== userId),
    })),
});
