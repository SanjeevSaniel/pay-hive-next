export enum ExpenseCategory {
  // Expense Categories
  Shopping = 'Shopping',
  Fuel = 'Fuel',
  Bills = 'Bills',
  Travel = 'Travel',
  DiningOut = 'Dining Out',
  Entertainment = 'Entertainment',
  HealthFitness = 'Health Fitness',
  Education = 'Education',
  Groceries = 'Groceries',
  Work = 'Work',
  Insurance = 'Insurance',
  Investment = 'Investment',
  Loans = 'Loans',
  Rent = 'Rent',
  Savings = 'Savings',
  Utilities = 'Utilities',
  Medical = 'Medical',
  Miscellaneous = 'Miscellaneous',

  // Credit Categories
  Salary = 'Salary',
  Freelance = 'Freelance',
  Interest = 'Interest',
  Cashback = 'Cashback',
  Refund = 'Refund',
  Bonus = 'Bonus',
  Gifts = 'Gifts',
  Investments = 'Investments',
  Rentals = 'Rentals',
  Royalties = 'Royalties',
  Reimbursements = 'Reimbursements',
}

export enum SplitMethod {
  Equal = 'Equal',
  Percentage = 'Percentage',
  Custom = 'Custom',
}

export enum TransactionCategory {
  EXPENSE = 'expense', // Regular group expenses
  SETTLEMENT = 'settlement', // Settlements between group members
  PAYMENT = 'payment', // Direct payments between members
  DEBT_SETTLEMENT = 'debt_settlement', // Settling existing debts
}

export interface SplitDetail {
  userId: string; // User ID
  amount: number;
}

export interface Payee {
  userId: string;
  paidAmount: number; // Amount paid by the payee
}

export interface SplitRule {
  type: SplitMethod;
  values: Array<{
    userId: string;
    [key: string]: number | string; // for percentage or amount
  }>;
}

export interface FinancialRecord {
  recordId: string;
  description: string;
  amount: number;
  date: Date;
  category?: ExpenseCategory; // Optional for transactions not classified as expenses
  payees: Payee[]; // Array of Payee objects for multiple payees with paid amounts
  groupId?: string; // Group ID (optional for non-group expenses)
  splitMethod?: SplitMethod; // Optional for transactions not split among members
  splitRules?: SplitRule;
  splitDetails?: SplitDetail[]; // Optional for non-group transactions
  transactionCategory: TransactionCategory; // Optional for expenses, required for transactions
  // For settlements, we might want to track the related expense
  relatedRecordId?: string; // Optional field to link related transactions
  createdAt: Date;
  updatedAt: Date;
}

// Interface for settlement-specific data
export interface SettlementRecord extends FinancialRecord {
  transactionCategory: TransactionCategory.SETTLEMENT;
  fromUserId: string;
  toUserId: string;
  originalExpenseIds?: string[]; // References to original expenses being settled
}

// Interface for payment-specific data
export interface PaymentRecord extends FinancialRecord {
  transactionCategory: TransactionCategory.PAYMENT;
  fromUserId: string;
  toUserId: string;
  note?: string;
}

export interface RawUser {
  userId: string;
  name: string;
  email: string;
  passwordHash: string;
  profileImageUrl?: string;
  createdAt: string; // Initially a string
  updatedAt: string; // Initially a string
  notificationPreferences: NotificationPreferences;
}

export interface User {
  userId: string;
  name: string;
  email: string;
  password: string;
  profileImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  notificationPreferences: NotificationPreferences;
  role: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpires?: Date;
  verifyEmailToken?: string;
  verifyEmailTokenExpires?: Date;
  groupIds: string[]; // List of group IDs the user belongs to
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
}

export interface Group {
  id: string;
  title: string;
  url?: string;
  description: string;
  groupType: string;
  createdDate: string;
  memberIds: string[];
}

export interface Payment {
  paymentId: string;
  fromUserId: string; // User ID
  toUserId: string; // User ID
  amount: number;
  date: Date;
  groupId: string; // Group ID
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  notificationId: string;
  userId: string; // User ID
  type: NotificationType;
  message: string;
  read: boolean;
  createdAt: Date;
}

export enum NotificationType {
  ExpenseAdded = 'ExpenseAdded',
  PaymentMade = 'PaymentMade',
  Reminder = 'Reminder',
  // Add more notification types as needed
}

export interface ExpenseReport {
  reportId: string;
  userId: string; // User ID
  groupId?: string; // Group ID (optional)
  startDate: Date;
  endDate: Date;
  totalExpenses: number;
  categoryBreakdown: CategoryBreakdown[];
  createdAt: Date;
}

export interface CategoryBreakdown {
  category: ExpenseCategory;
  totalAmount: number;
}

// New interface for GroupType
export interface GroupType {
  typeId: string;
  typeName: string;
  description: string;
  createdDate: Date;
  updatedDate: Date;
}

// Store state interface
export interface StoreState {
  users: User[];
  groups: Group[];
  defaultGroup: Group | null;
  financialRecords: FinancialRecord[];
  payments: Payment[];
  notifications: Notification[];
  expenseReports: ExpenseReport[];
  groupTypes: GroupType[];

  setGroups: (groups: Group[]) => void;
  addGroup: (newGroup: Group) => void;
  deleteGroup: (groupId: string) => void;
  restoreGroup: (group: Group) => void;
  setDefaultGroup: (defaultGroup: Group) => void;

  setUsers: (users: User[]) => void;
  addUser: (newUser: User) => void;
  deleteUser: (userId: string) => void;

  setFinancialRecords: (financialRecords: FinancialRecord[]) => void;
  addFinancialRecord: (newFinancialRecord: FinancialRecord) => void;
  deleteFinancialRecord: (recordId: string) => void;

  setPayments: (payments: Payment[]) => void;
  addPayment: (newPayment: Payment) => void;
  deletePayment: (paymentId: string) => void;

  setNotifications: (notifications: Notification[]) => void;
  addNotification: (newNotification: Notification) => void;
  deleteNotification: (notificationId: string) => void;

  setExpenseReports: (reports: ExpenseReport[]) => void;
  addExpenseReport: (newReport: ExpenseReport) => void;
  deleteExpenseReport: (reportId: string) => void;

  setGroupTypes: (groupTypes: GroupType[]) => void;
  addGroupType: (newGroupType: GroupType) => void;
  deleteGroupType: (typeId: string) => void;
}
