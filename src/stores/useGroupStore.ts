import { Group, StoreState } from '@/types/types';
import { StateCreator } from 'zustand';

export const useGroupStore: StateCreator<
  StoreState,
  [],
  [],
  {
    groups: Group[];
    defaultGroup: Group | null;
    setGroups: (groups: Group[]) => void;
    addGroup: (newGroup: Group) => void;
    deleteGroup: (groupId: string) => void;
    setDefaultGroup: (defaultGroup: Group) => void;
    restoreGroup: (group: Group) => void;
  }
> = (set) => ({
  groups: [],
  defaultGroup: null,
  setGroups: (groups) => set({ groups }),
  addGroup: (newGroup) =>
    set((state) => ({
      groups:
        newGroup.groupType === 'default'
          ? state.groups
          : [newGroup, ...state.groups],
      defaultGroup:
        newGroup.groupType === 'default' ? newGroup : state.defaultGroup,
    })),
  deleteGroup: (groupId) =>
    set((state) => ({
      groups: state.groups.filter((group) => group.id !== groupId),
    })),
  setDefaultGroup: (defaultGroup) => set(() => ({ defaultGroup })),
  restoreGroup: (group) =>
    set((state) => ({
      groups: [...state.groups, group],
    })),
});
