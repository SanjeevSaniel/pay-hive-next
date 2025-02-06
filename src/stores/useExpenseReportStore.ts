import { ExpenseReport, StoreState } from '@/types/types';
import { StateCreator } from 'zustand';

export const useExpenseReportStore: StateCreator<
  StoreState,
  [],
  [],
  {
    expenseReports: ExpenseReport[];
    setExpenseReports: (reports: ExpenseReport[]) => void;
    addExpenseReport: (newReport: ExpenseReport) => void;
    deleteExpenseReport: (reportId: string) => void;
  }
> = (set) => ({
  expenseReports: [],
  setExpenseReports: (reports) => set({ expenseReports: reports }),
  addExpenseReport: (newReport) =>
    set((state) => ({
      expenseReports: [newReport, ...state.expenseReports],
    })),
  deleteExpenseReport: (reportId) =>
    set((state) => ({
      expenseReports: state.expenseReports.filter(
        (report) => report.reportId !== reportId,
      ),
    })),
});
