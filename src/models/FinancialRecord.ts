import {
  ExpenseCategory,
  SplitDetail,
  SplitMethod,
  TransactionCategory,
} from '@/types/types';
import mongoose, { Document, Schema } from 'mongoose';

// Base interface for split rule values
interface SplitRuleValue {
  userId: string;
  amount?: number;
  percentage?: number;
}

// Interface for the document
export interface FinancialRecordDocument extends Document {
  recordId: string;
  description: string;
  amount: number;
  date: Date;
  category?: ExpenseCategory;
  transactionCategory: TransactionCategory;
  payees: { userId: string; paidAmount: number }[];
  groupId?: string;
  fromUserId?: string;
  toUserId?: string;
  note?: string;
  originalExpenseIds?: string[];
  splitMethod?: SplitMethod;
  splitDetails?: SplitDetail[];
  splitRules?: {
    type: SplitMethod;
    values: SplitRuleValue[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const splitRuleValueSchema = new Schema<SplitRuleValue>(
  {
    userId: { type: String, required: true },
    amount: { type: Number },
    percentage: { type: Number },
  },
  // { _id: false },
);

const financialRecordSchema = new Schema<FinancialRecordDocument>(
  {
    recordId: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    category: {
      type: String,
      enum: Object.values(ExpenseCategory),
    },
    transactionCategory: {
      type: String,
      enum: Object.values(TransactionCategory),
      required: true,
      index: true,
    },
    payees: [
      {
        userId: { type: String, required: true },
        paidAmount: { type: Number, required: true, min: 0 },
        _id: false,
      },
    ],
    groupId: {
      type: String,
      index: true,
    },
    fromUserId: {
      type: String,
      index: true,
    },
    toUserId: {
      type: String,
      index: true,
    },
    note: {
      type: String,
      trim: true,
    },
    originalExpenseIds: [
      {
        type: String,
        ref: 'FinancialRecord',
      },
    ],
    splitMethod: {
      type: String,
      enum: Object.values(SplitMethod),
    },
    splitDetails: [
      {
        userId: { type: String, required: true },
        amount: { type: Number, required: true },
        _id: false,
      },
    ],
    splitRules: {
      type: {
        type: String,
        enum: Object.values(SplitMethod),
        required: true,
      },
      values: [splitRuleValueSchema],
    },
    // type: {
    //   type: String,
    //   enum: Object.values(TransactionCategory),
    //   required: true,
    // },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Indexes for common queries
financialRecordSchema.index({ groupId: 1, date: -1 });
financialRecordSchema.index({ fromUserId: 1, toUserId: 1, date: -1 });

// Validation middleware
financialRecordSchema.pre('save', function (next) {
  const doc = this as FinancialRecordDocument;

  try {
    switch (doc.transactionCategory) {
      case TransactionCategory.SETTLEMENT:
      case TransactionCategory.PAYMENT:
        if (!doc.fromUserId || !doc.toUserId) {
          throw new Error(
            'fromUserId and toUserId are required for settlements and payments',
          );
        }
        break;

      case TransactionCategory.EXPENSE:
        if (!doc.category) {
          throw new Error('category is required for expenses');
        }
        if (!doc.splitMethod || !doc.splitRules) {
          throw new Error(
            'splitMethod and splitRules are required for expenses',
          );
        }

        // Validate split rules total
        if (doc.splitRules.type === SplitMethod.Percentage) {
          const totalPercentage = doc.splitRules.values.reduce(
            (sum, value) => sum + (value.percentage || 0),
            0,
          );
          if (Math.abs(totalPercentage - 100) > 0.01) {
            throw new Error('Percentage split must total 100%');
          }
        }

        if (doc.splitRules.type === SplitMethod.Custom) {
          const totalAmount = doc.splitRules.values.reduce(
            (sum, value) => sum + (value.amount || 0),
            0,
          );
          if (Math.abs(totalAmount - doc.amount) > 0.01) {
            throw new Error('Custom split amounts must equal total amount');
          }
        }
        break;
    }

    next();
  } catch (error) {
    next(error as Error);
  }
});

// Hook for updating related documents if needed
financialRecordSchema.post('save', async function (doc) {
  if (
    doc.transactionCategory === TransactionCategory.SETTLEMENT &&
    doc.originalExpenseIds?.length
  ) {
    // You could update the original expenses to mark them as settled
    // await FinancialRecord.updateMany(
    //   { recordId: { $in: doc.originalExpenseIds } },
    //   { $set: { isSettled: true } }
    // );
  }
});

// Virtual for calculating total paid amount
financialRecordSchema
  .virtual('totalPaidAmount')
  .get(function (this: FinancialRecordDocument) {
    return this.payees.reduce((sum, payee) => sum + payee.paidAmount, 0);
  });

const FinancialRecord =
  mongoose.models.FinancialRecord ||
  mongoose.model<FinancialRecordDocument>(
    'FinancialRecord',
    financialRecordSchema,
  );

export default FinancialRecord;
