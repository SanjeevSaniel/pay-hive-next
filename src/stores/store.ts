import { create } from 'zustand';
import { StoreState, Group } from './types';

const useStore = create<StoreState>()((set) => ({
  groups: [],

  setGroups: (groups: Group[]) => set({ groups }),
  addGroup: (group: Group) =>
    set((state) => ({ groups: [...state.groups, group] })),
  deleteGroup: (groupId: string) =>
    set((state) => ({
      groups: state.groups.filter((group: Group) => group.groupId !== groupId),
    })),
}));

export default useStore;
