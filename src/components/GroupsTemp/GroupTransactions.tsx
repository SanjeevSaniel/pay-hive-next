'use client';

import { FinancialRecord, TransactionCategory } from '@/types/types';
import { Fragment, ReactNode } from 'react';
// import { Separator } from '../ui/separator';
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

import {
  GiExpense,
  GiReceiveMoney,
  GiPayMoney,
  GiMoneyStack,
} from 'react-icons/gi';

export const Transaction_Icons = {
  [TransactionCategory.EXPENSE]: <GiExpense />,
  [TransactionCategory.SETTLEMENT]: <GiReceiveMoney />,
  [TransactionCategory.PAYMENT]: <GiPayMoney />,
  [TransactionCategory.DEBT_SETTLEMENT]: <GiMoneyStack />,
};

const GroupTransactions = ({ records }: FinancialRecordsListProps) => {
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
    (acc: JSX.Element[], month) => {
      // Sort transactions within each month by date
      const sortedRecords = groupedRecords[month].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

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
          {sortedRecords.map((record) => (
            <Fragment key={record.recordId}>
              <Card className='grid grid-cols-6 py-2 bg-[#1c2429] rounded-xl'>
                <div className='flex justify-center items-center'>
                  {Transaction_Icons[record.transactionCategory]}
                </div>
                <div className='col-span-4'>
                  <p className='text-[#f7f9fd] text-md font-bold capitalize text-wrap'>
                    {record.description}
                  </p>
                  <p className='text-[#a6a8ae] text-sm'>
                    {formatDate(new Date(record.date))}
                  </p>
                </div>
                <div className='flex flex-col justify-center items-end px-2'>
                  <span
                    className={clsx({
                      'text-[#f03e6e]':
                        record.transactionCategory ===
                        TransactionCategory.EXPENSE,
                      'text-[#75ee30]':
                        record.transactionCategory ===
                          TransactionCategory.SETTLEMENT ||
                        record.transactionCategory ===
                          TransactionCategory.PAYMENT ||
                        record.transactionCategory ===
                          TransactionCategory.DEBT_SETTLEMENT,
                      'text-md font-bold': true,
                    })}>
                    {`₹${record.amount}`}
                  </span>

                  {/* <span className='mr-1 text-sm text-[#a6a8ae]'>
                    {formatDate(new Date(record.date))}
                  </span> */}
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
    <ul className='list-decimal list-inside space-y-2 p-1'>
      {recordsWithSeparators}
    </ul>
  );
};

export default GroupTransactions;
