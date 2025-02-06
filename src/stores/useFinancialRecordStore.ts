import { FinancialRecord, StoreState } from '@/types/types';
import { StateCreator } from 'zustand';

export const useFinancialRecordStore: StateCreator<
  StoreState,
  [],
  [],
  {
    financialRecords: FinancialRecord[];
    setFinancialRecords: (financialRecords: FinancialRecord[]) => void;
    addFinancialRecord: (newFinancialRecord: FinancialRecord) => void;
    deleteFinancialRecord: (recordId: string) => void;
  }
> = (set) => ({
  financialRecords: [],
  setFinancialRecords: (financialRecords) => set({ financialRecords }),
  addFinancialRecord: (newFinancialRecord) =>
    set((state) => ({
      financialRecords: [newFinancialRecord, ...state.financialRecords],
    })),
  deleteFinancialRecord: (recordId) =>
    set((state) => ({
      financialRecords: state.financialRecords.filter(
        (record) => record.recordId !== recordId,
      ),
    })),
});
