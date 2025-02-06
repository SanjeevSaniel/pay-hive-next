'use client';

import { FinancialRecord, TransactionType } from '@/types/types';
import { Fragment, ReactNode } from 'react';
import { Separator } from '../ui/separator';
import { Calendar } from 'lucide-react';
import { Card } from '@heroui/card';
import { clsx } from 'clsx';

interface FinancialRecordsListProps {
  records: FinancialRecord[];
}

// Define a type for the grouped records object
interface GroupedRecords {
  [date: string]: FinancialRecord[];
}

export const ListboxWrapper = ({ children }: { children: ReactNode }) => (
  <div>{children}</div>
);

const formatDate = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }
};

const GroupTransactions = ({ records }: FinancialRecordsListProps) => {
  // const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set(['']));

  // const selectedValue = useMemo(
  //   () => Array.from(selectedKeys).join(', '),
  //   [selectedKeys],
  // );

  // const sampleRecords: FinancialRecord[] = [
  //   {
  //     recordId: '1',
  //     description: 'Grocery shopping at SuperMart',
  //     amount: 1500,
  //     date: new Date('2025-01-15'),
  //     category: ExpenseCategory.Groceries,
  //     payerId: 'user1',
  //     groupId: 'group1',
  //     splitMethod: SplitMethod.Equal,
  //     splitDetails: [
  //       { userId: 'user1', amount: 750 },
  //       { userId: 'user2', amount: 750 },
  //     ],
  //     type: TransactionType.Debit,
  //     createdAt: new Date('2025-01-15'),
  //     updatedAt: new Date('2025-01-15'),
  //   },
  //   {
  //     recordId: '2',
  //     description: 'Dinner at Restaurant',
  //     amount: 3000,
  //     date: new Date('2025-02-01'),
  //     category: ExpenseCategory.DiningOut,
  //     payerId: 'user2',
  //     groupId: 'group1',
  //     splitMethod: SplitMethod.Percentage,
  //     splitDetails: [
  //       { userId: 'user1', amount: 1200 },
  //       { userId: 'user2', amount: 1800 },
  //     ],
  //     type: TransactionType.Debit,
  //     createdAt: new Date('2025-02-01'),
  //     updatedAt: new Date('2025-02-01'),
  //   },
  //   {
  //     recordId: '3',
  //     description: 'Monthly Rent',
  //     amount: 25000,
  //     date: new Date('2025-01-01'),
  //     category: ExpenseCategory.Bills,
  //     payerId: 'user1',
  //     groupId: 'group1',
  //     splitMethod: SplitMethod.Equal,
  //     splitDetails: [
  //       { userId: 'user1', amount: 12500 },
  //       { userId: 'user2', amount: 12500 },
  //     ],
  //     type: TransactionType.Debit,
  //     createdAt: new Date('2025-01-01'),
  //     updatedAt: new Date('2025-01-01'),
  //   },
  //   {
  //     recordId: '4',
  //     description: 'Utility Bill',
  //     amount: 5000,
  //     date: new Date('2025-01-25'),
  //     category: ExpenseCategory.Bills,
  //     payerId: 'user2',
  //     groupId: 'group1',
  //     splitMethod: SplitMethod.Equal,
  //     splitDetails: [
  //       { userId: 'user1', amount: 2500 },
  //       { userId: 'user2', amount: 2500 },
  //     ],
  //     type: TransactionType.Debit,
  //     createdAt: new Date('2025-01-25'),
  //     updatedAt: new Date('2025-01-25'),
  //   },
  //   {
  //     recordId: '5',
  //     description: 'Movie Night',
  //     amount: 2000,
  //     date: new Date('2025-01-20'),
  //     category: ExpenseCategory.Entertainment,
  //     payerId: 'user1',
  //     groupId: 'group1',
  //     splitMethod: SplitMethod.Equal,
  //     splitDetails: [
  //       { userId: 'user1', amount: 1000 },
  //       { userId: 'user2', amount: 1000 },
  //     ],
  //     type: TransactionType.Debit,
  //     createdAt: new Date('2025-01-20'),
  //     updatedAt: new Date('2025-01-20'),
  //   },
  //   {
  //     recordId: '6',
  //     description: 'Gym Membership',
  //     amount: 6000,
  //     date: new Date('2025-01-10'),
  //     category: ExpenseCategory.HealthFitness,
  //     payerId: 'user2',
  //     groupId: 'group1',
  //     splitMethod: SplitMethod.Equal,
  //     splitDetails: [
  //       { userId: 'user1', amount: 3000 },
  //       { userId: 'user2', amount: 3000 },
  //     ],
  //     type: TransactionType.Debit,
  //     createdAt: new Date('2025-01-10'),
  //     updatedAt: new Date('2025-01-10'),
  //   },
  //   {
  //     recordId: '7',
  //     description: 'Office Supplies',
  //     amount: 1500,
  //     date: new Date('2025-01-18'),
  //     category: ExpenseCategory.Work,
  //     payerId: 'user1',
  //     groupId: 'group1',
  //     splitMethod: SplitMethod.Equal,
  //     splitDetails: [
  //       { userId: 'user1', amount: 750 },
  //       { userId: 'user2', amount: 750 },
  //     ],
  //     type: TransactionType.Debit,
  //     createdAt: new Date('2025-01-18'),
  //     updatedAt: new Date('2025-01-18'),
  //   },
  //   {
  //     recordId: '8',
  //     description: 'Birthday Gift',
  //     amount: 5000,
  //     date: new Date('2025-01-05'),
  //     category: ExpenseCategory.Entertainment,
  //     payerId: 'user2',
  //     groupId: 'group1',
  //     splitMethod: SplitMethod.Equal,
  //     splitDetails: [
  //       { userId: 'user1', amount: 2500 },
  //       { userId: 'user2', amount: 2500 },
  //     ],
  //     type: TransactionType.Debit,
  //     createdAt: new Date('2025-01-05'),
  //     updatedAt: new Date('2025-01-05'),
  //   },
  //   {
  //     recordId: '9',
  //     description: 'Internet Bill',
  //     amount: 2000,
  //     date: new Date('2025-01-12'),
  //     category: ExpenseCategory.Bills,
  //     payerId: 'user1',
  //     groupId: 'group1',
  //     splitMethod: SplitMethod.Equal,
  //     splitDetails: [
  //       { userId: 'user1', amount: 1000 },
  //       { userId: 'user2', amount: 1000 },
  //     ],
  //     type: TransactionType.Debit,
  //     createdAt: new Date('2025-01-12'),
  //     updatedAt: new Date('2025-01-12'),
  //   },
  //   {
  //     recordId: '10',
  //     description: 'Travel Expenses',
  //     amount: 10000,
  //     date: new Date('2025-01-22'),
  //     category: ExpenseCategory.Travel,
  //     payerId: 'user2',
  //     groupId: 'group1',
  //     splitMethod: SplitMethod.Equal,
  //     splitDetails: [
  //       { userId: 'user1', amount: 5000 },
  //       { userId: 'user2', amount: 5000 },
  //     ],
  //     type: TransactionType.Debit,
  //     createdAt: new Date('2025-01-22'),
  //     updatedAt: new Date('2025-01-22'),
  //   },
  //   {
  //     recordId: '11',
  //     description: 'Lunch with Colleagues',
  //     amount: 1500,
  //     date: new Date('2025-01-20'),
  //     category: ExpenseCategory.DiningOut,
  //     payerId: 'user1',
  //     groupId: 'group1',
  //     splitMethod: SplitMethod.Equal,
  //     splitDetails: [
  //       { userId: 'user1', amount: 750 },
  //       { userId: 'user2', amount: 750 },
  //     ],
  //     type: TransactionType.Debit,
  //     createdAt: new Date('2025-01-20'),
  //     updatedAt: new Date('2025-01-20'),
  //   },
  //   {
  //     recordId: '12',
  //     description: 'Taxi Fare',
  //     amount: 500,
  //     date: new Date('2025-01-20'),
  //     category: ExpenseCategory.Travel,
  //     payerId: 'user2',
  //     groupId: 'group1',
  //     splitMethod: SplitMethod.Equal,
  //     splitDetails: [
  //       { userId: 'user1', amount: 250 },
  //       { userId: 'user2', amount: 250 },
  //     ],
  //     type: TransactionType.Debit,
  //     createdAt: new Date('2025-01-20'),
  //     updatedAt: new Date('2025-01-20'),
  //   },
  //   {
  //     recordId: '13',
  //     description: 'Salary Credit',
  //     amount: 50000,
  //     date: new Date('2025-01-31'),
  //     category: ExpenseCategory.Salary,
  //     payerId: 'employer1',
  //     groupId: 'group1',
  //     splitMethod: SplitMethod.Equal,
  //     splitDetails: [{ userId: 'user1', amount: 50000 }],
  //     type: TransactionType.Credit,
  //     createdAt: new Date('2025-01-31'),
  //     updatedAt: new Date('2025-01-31'),
  //   },
  //   {
  //     recordId: '14',
  //     description: 'Freelance Payment',
  //     amount: 8000,
  //     date: new Date('2025-01-15'),
  //     category: ExpenseCategory.Freelance,
  //     payerId: 'client1',
  //     groupId: 'group1',
  //     splitMethod: SplitMethod.Equal,
  //     splitDetails: [{ userId: 'user1', amount: 8000 }],
  //     type: TransactionType.Credit,
  //     createdAt: new Date('2025-01-15'),
  //     updatedAt: new Date('2025-01-15'),
  //   },
  //   {
  //     recordId: '15',
  //     description: 'Bank Interest',
  //     amount: 500,
  //     date: new Date('2025-02-01'),
  //     category: ExpenseCategory.Interest,
  //     payerId: 'bank1',
  //     groupId: 'group1',
  //     splitMethod: SplitMethod.Equal,
  //     splitDetails: [{ userId: 'user1', amount: 500 }],
  //     type: TransactionType.Credit,
  //     createdAt: new Date('2025-02-01'),
  //     updatedAt: new Date('2025-02-01'),
  //   },
  //   {
  //     recordId: '16',
  //     description: 'Cashback',
  //     amount: 200,
  //     date: new Date('2025-01-25'),
  //     category: ExpenseCategory.Cashback,
  //     payerId: 'store1',
  //     groupId: 'group1',
  //     splitMethod: SplitMethod.Equal,
  //     splitDetails: [{ userId: 'user1', amount: 200 }],
  //     type: TransactionType.Credit,
  //     createdAt: new Date('2025-01-25'),
  //     updatedAt: new Date('2025-01-25'),
  //   },
  //   {
  //     recordId: '17',
  //     description: 'Refund',
  //     amount: 1500,
  //     date: new Date('2025-01-20'),
  //     category: ExpenseCategory.Refund,
  //     payerId: 'store2',
  //     groupId: 'group1',
  //     splitMethod: SplitMethod.Equal,
  //     splitDetails: [{ userId: 'user1', amount: 1500 }],
  //     type: TransactionType.Credit,
  //     createdAt: new Date('2025-01-20'),
  //     updatedAt: new Date('2025-01-20'),
  //   },
  // ];

  // Group records by month
  const groupedRecords: GroupedRecords = records.reduce((acc, record) => {
    const month = new Date(record.date).toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(record);
    return acc;
  }, {} as GroupedRecords);

  // Get sorted months in descending order
  const sortedMonths = Object.keys(groupedRecords).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime();
  });

  const recordsWithSeparators: JSX.Element[] = sortedMonths.reduce(
    (acc: JSX.Element[], month, index) => {
      acc.push(
        <li
          key={month}
          className='flex items-center px-2 py-1 font-bold list-none'>
          <Calendar
            size={16}
            className='mr-2'
          />
          <span className='mt-1'>{month}</span>
        </li>,
      );

      acc.push(
        <div
          key={`card-${month}`}
          className='flex flex-col gap-2 border rounded-lg'>
          {groupedRecords[month].map((record) => (
            <Fragment key={record.recordId}>
              <Card className='grid grid-cols-3 px-3 py-2 bg-[#1c2429] rounded-xl'>
                <div className='col-span-2'>
                  <p className='text-[#f7f9fd] text-md'>{record.description}</p>
                  <p className='text-[#a6a8ae] text-sm'>{record.category}</p>
                </div>
                <div className='flex flex-col items-end'>
                  <span
                    className={clsx({
                      'text-[#f03e6e]': record.type === TransactionType.Debit,
                      'text-[#75ee30]': record.type === TransactionType.Credit,
                      'text-md font-bold': true,
                    })}>
                    {`₹${record.amount}`}
                  </span>

                  <span className='mr-1 text-sm text-[#a6a8ae]'>
                    {formatDate(new Date(record.date))}
                  </span>
                </div>
              </Card>
              {/* {recordIndex < groupedRecords[month].length - 1 && (
                <Separator className='my-2' />
              )} */}
            </Fragment>
          ))}
        </div>,
      );

      // if (index < sortedMonths.length - 1) {
      //   acc.push(
      //     <Separator
      //       key={`separator-month-${index}`}
      //       className='my-8'
      //     />,
      //   );
      // }

      return acc;
    },
    [],
  );

  return (
    <ul className='list-decimal list-inside space-y-2'>
      {recordsWithSeparators}
    </ul>
  );
};

export default GroupTransactions;
