import mongoose, { Document, Schema } from 'mongoose';
import {
  ExpenseCategory,
  SplitMethod,
  SplitDetail,
  SplitRule,
  TransactionType,
} from '@/types/types';

export interface FinancialRecordDocument extends Document {
  recordId: string;
  description: string;
  amount: number;
  date: Date;
  category?: ExpenseCategory;
  payees: { userId: string; paidAmount: number }[]; // Updated payees field
  groupId?: string;
  splitMethod?: SplitMethod;
  splitDetails?: SplitDetail[];
  splitRules?: SplitRule; // Optional split rules for splitting logic
  type: TransactionType;
  createdAt: Date;
  updatedAt: Date;
}

const financialRecordSchema = new Schema<FinancialRecordDocument>({
  recordId: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
  },
  payees: [
    {
      userId: { type: String, required: true },
      paidAmount: { type: Number, required: true },
    },
  ], // Updated payees field as an array of objects with userId and paidAmount
  groupId: {
    type: String,
  },
  splitMethod: {
    type: String,
  },
  splitDetails: [
    {
      userId: String,
      amount: Number,
    },
  ],
  splitRules: {
    type: {
      type: String,
    },
    values: [
      {
        userId: String,
        amount: Number,
        percentage: Number,
      },
    ],
  },
  type: {
    type: String,
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const FinancialRecord =
  mongoose.models.FinancialRecord ||
  mongoose.model<FinancialRecordDocument>(
    'FinancialRecord',
    financialRecordSchema,
  );

export default FinancialRecord;
