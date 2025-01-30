import mongoose, { Document, Schema } from 'mongoose';
import {
  ExpenseCategory,
  SplitMethod,
  SplitDetail,
  TransactionType,
} from '@/types/types'; // Import necessary types

export interface FinancialRecordDocument extends Document {
  recordId: string;
  description: string;
  amount: number;
  date: Date;
  category?: ExpenseCategory;
  payerId?: string;
  groupId?: string;
  splitMethod?: SplitMethod;
  splitDetails?: SplitDetail[];
  type?: TransactionType;
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
  payerId: {
    type: String,
  },
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
  type: {
    type: String,
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
