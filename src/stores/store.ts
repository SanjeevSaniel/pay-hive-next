import { create } from 'zustand';
import { StoreState, Group } from './types';

const useAppStore = create<StoreState>()((set) => ({
  groups: [],

  setGroups: (groups: Group[]) => set({ groups }),
  addGroup: (newGroup: Group) =>
    set((state) => ({ groups: [newGroup, ...state.groups] })),
  deleteGroup: (groupId: string) =>
    set((state) => ({
      groups: state.groups.filter((group: Group) => group.groupId !== groupId),
    })),
}));

export default useAppStore;
