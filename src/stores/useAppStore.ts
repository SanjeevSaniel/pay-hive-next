import { create } from 'zustand';
import {
  ExpenseReport,
  FinancialRecord,
  Group,
  GroupType,
  Notification,
  Payment,
  StoreState,
  User,
} from '@/types/types';

const useAppStore = create<StoreState>((set) => ({
  users: [],
  groups: [],
  defaultGroup: null as Group | null,
  financialRecords: [],
  payments: [],
  notifications: [],
  expenseReports: [],
  groupTypes: [],

  // Group management
  setGroups: (groups: Group[]) => set({ groups }),
  addGroup: (newGroup: Group) =>
    set((state) => ({
      groups:
        newGroup.groupType === 'default'
          ? state.groups
          : [newGroup, ...state.groups],
      defaultGroup:
        newGroup.groupType === 'default' ? newGroup : state.defaultGroup,
    })),
  deleteGroup: (groupId: string) =>
    set((state) => ({
      groups: state.groups.filter((group: Group) => group.groupId !== groupId),
    })),
  setDefaultGroup: (defaultGroup: Group) => set(() => ({ defaultGroup })),

  // User management
  setUsers: (users: User[]) => set({ users }),
  addUser: (newUser: User) =>
    set((state) => ({ users: [...state.users, newUser] })),
  deleteUser: (userId: string) =>
    set((state) => ({
      users: state.users.filter((user: User) => user.userId !== userId),
    })),
  restoreGroup: (group: Group) =>
    set((state) => ({
      groups: [...state.groups, group],
    })),

  // Financial record management
  setFinancialRecords: (financialRecords: FinancialRecord[]) =>
    set({ financialRecords }),
  addFinancialRecord: (newFinancialRecord: FinancialRecord) =>
    set((state) => ({
      financialRecords: [newFinancialRecord, ...state.financialRecords],
    })),
  deleteFinancialRecord: (recordId: string) =>
    set((state) => ({
      financialRecords: state.financialRecords.filter(
        (record: FinancialRecord) => record.recordId !== recordId,
      ),
    })),

  // Payment management
  setPayments: (payments: Payment[]) => set({ payments }),
  addPayment: (newPayment: Payment) =>
    set((state) => ({ payments: [newPayment, ...state.payments] })),
  deletePayment: (paymentId: string) =>
    set((state) => ({
      payments: state.payments.filter(
        (payment: Payment) => payment.paymentId !== paymentId,
      ),
    })),

  // Notification management
  setNotifications: (notifications: Notification[]) => set({ notifications }),
  addNotification: (newNotification: Notification) =>
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
    })),
  deleteNotification: (notificationId: string) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification: Notification) =>
          notification.notificationId !== notificationId,
      ),
    })),

  // Expense report management
  setExpenseReports: (reports: ExpenseReport[]) =>
    set({ expenseReports: reports }),
  addExpenseReport: (newReport: ExpenseReport) =>
    set((state) => ({ expenseReports: [newReport, ...state.expenseReports] })),
  deleteExpenseReport: (reportId: string) =>
    set((state) => ({
      expenseReports: state.expenseReports.filter(
        (report: ExpenseReport) => report.reportId !== reportId,
      ),
    })),

  // Group type management
  setGroupTypes: (groupTypes: GroupType[]) => set({ groupTypes }),
  addGroupType: (newGroupType: GroupType) =>
    set((state) => ({ groupTypes: [...state.groupTypes, newGroupType] })),
  deleteGroupType: (typeId: string) =>
    set((state) => ({
      groupTypes: state.groupTypes.filter(
        (groupType: GroupType) => groupType.typeId !== typeId,
      ),
    })),
}));

export default useAppStore;
