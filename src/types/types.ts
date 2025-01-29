export enum ExpenseCategory {
  Shopping = 'Shopping',
  Fuel = 'Fuel',
  Bills = 'Bills',
  Travel = 'Travel',
  DiningOut = 'DiningOut',
  Entertainment = 'Entertainment',
  HealthFitness = 'HealthFitness',
  Education = 'Education',
  Groceries = 'Groceries',
  Work = 'Work',
}

export enum SplitMethod {
  Equal = 'Equal',
  Percentage = 'Percentage',
  Custom = 'Custom',
}

export enum TransactionType {
  Debit = 'debit',
  Credit = 'credit',
}

export interface SplitDetail {
  userId: string; // User ID
  amount: number;
}

export interface FinancialRecord {
  recordId: string;
  description: string;
  amount: number;
  date: Date;
  category?: ExpenseCategory; // Optional for transactions not classified as expenses
  payerId?: string; // User ID, optional for transactions where the payer is not specified
  groupId?: string; // Group ID (optional for non-group expenses)
  splitMethod?: SplitMethod; // Optional for transactions not split among members
  splitDetails?: SplitDetail[]; // Optional for non-group transactions
  type?: TransactionType; // Optional for expenses, required for transactions
  createdAt: Date;
  updatedAt: Date;
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
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
}

export interface Group {
  groupId: string;
  groupName: string;
  description: string;
  owedAmount: number;
  borrowedAmount: number;
  isGroup: boolean;
  createdDate: string;
  memberIds: string[];
}

export interface Payment {
  fromUserId: string; // User ID
  toUserId: string; // User ID
  amount: number;
  date: Date;
  groupId: string; // Group ID
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
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

export interface StoreState {
  users: User[];
  groups: Group[];
  financialRecords: FinancialRecord[];
  payments: Payment[];
  notifications: Notification[];
  expenseReports: ExpenseReport[];

  setGroups: (groups: Group[]) => void;
  addGroup: (newGroup: Group) => void;
  deleteGroup: (groupId: string) => void;

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
}
