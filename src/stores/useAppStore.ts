import {
  ExpenseReport,
  FinancialRecord,
  Group,
  Notification,
  Payment,
  StoreState,
  User,
} from '@/types/types';
import { create } from 'zustand';

const useAppStore = create<StoreState>()((set) => ({
  users: [],
  groups: [],
  financialRecords: [],
  payments: [],
  notifications: [],
  expenseReports: [],

  setGroups: (groups: Group[]) => set({ groups }),
  addGroup: (newGroup: Group) =>
    set((state) => ({ groups: [newGroup, ...state.groups] })),
  deleteGroup: (groupId: string) =>
    set((state) => ({
      groups: state.groups.filter((group: Group) => group.groupId !== groupId),
    })),

  setUsers: (users: User[]) => set({ users }),
  addUser: (newUser: User) =>
    set((state) => ({ users: [newUser, ...state.users] })),
  deleteUser: (userId: string) =>
    set((state) => ({
      users: state.users.filter((user: User) => user.userId !== userId),
    })),

  setFinancialRecords: (financialRecords: FinancialRecord[]) =>
    set({ financialRecords }),
  addFinancialRecord: (newFinancialRecord: FinancialRecord) =>
    set((state) => ({
      financialRecords: [newFinancialRecord, ...state.financialRecords],
    })),
  deleteFinancialRecord: (recordId: string) =>
    set((state) => ({
      financialRecords: state.financialRecords.filter(
        (record: FinancialRecord) => record._id !== recordId,
      ),
    })),

  setPayments: (payments: Payment[]) => set({ payments }),
  addPayment: (newPayment: Payment) =>
    set((state) => ({ payments: [newPayment, ...state.payments] })),
  deletePayment: (paymentId: string) =>
    set((state) => ({
      payments: state.payments.filter(
        (payment: Payment) => payment._id !== paymentId,
      ),
    })),

  setNotifications: (notifications: Notification[]) => set({ notifications }),
  addNotification: (newNotification: Notification) =>
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
    })),
  deleteNotification: (notificationId: string) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification: Notification) => notification._id !== notificationId,
      ),
    })),

  setExpenseReports: (reports: ExpenseReport[]) =>
    set({ expenseReports: reports }),
  addExpenseReport: (newReport: ExpenseReport) =>
    set((state) => ({ expenseReports: [newReport, ...state.expenseReports] })),
  deleteExpenseReport: (reportId: string) =>
    set((state) => ({
      expenseReports: state.expenseReports.filter(
        (report: ExpenseReport) => report._id !== reportId,
      ),
    })),
}));

export default useAppStore;
