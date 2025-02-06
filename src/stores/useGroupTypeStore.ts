import { GroupType, StoreState } from '@/types/types';
import { StateCreator } from 'zustand';

export const useGroupTypeStore: StateCreator<
  StoreState,
  [],
  [],
  {
    groupTypes: GroupType[];
    setGroupTypes: (groupTypes: GroupType[]) => void;
    addGroupType: (newGroupType: GroupType) => void;
    deleteGroupType: (typeId: string) => void;
  }
> = (set) => ({
  groupTypes: [],
  setGroupTypes: (groupTypes) => set({ groupTypes }),
  addGroupType: (newGroupType) =>
    set((state) => ({
      groupTypes: [...state.groupTypes, newGroupType],
    })),
  deleteGroupType: (typeId) =>
    set((state) => ({
      groupTypes: state.groupTypes.filter(
        (groupType) => groupType.typeId !== typeId,
      ),
    })),
});
