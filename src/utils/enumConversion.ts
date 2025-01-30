import { ExpenseCategory, SplitMethod } from '@/types/types';

// Function to convert ExpenseCategory enum to string
export const enumToString = (
  category: ExpenseCategory | SplitMethod,
): string => {
  return category.toString();
};

// Function to convert string to ExpenseCategory enum
export const stringToExpenseCategory = (
  categoryStr: string,
): ExpenseCategory => {
  return ExpenseCategory[categoryStr as keyof typeof ExpenseCategory];
};

// Function to convert string to SplitMethod enum
export const stringToSplitMethod = (methodStr: string): SplitMethod => {
  return SplitMethod[methodStr as keyof typeof SplitMethod];
};
