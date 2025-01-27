// src/stores/types.ts

export interface Transaction {
  transactionId: string;
  description: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
}

export interface Group {
  groupId: string;
  groupName: string;
  description: string;
  owedAmount: number;
  borrowedAmount: number;
  isGroup: boolean;
  createdDate: string;
  membersCount: number;
  memberIds: string[];
  transactions: Transaction[];
}

export interface StoreState {
  groups: Group[];
  setGroups: (groups: Group[]) => void;
  addGroup: (group: Group) => void;
  deleteGroup: (groupId: string) => void;
}
