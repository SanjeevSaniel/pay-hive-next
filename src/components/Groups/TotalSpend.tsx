'use client';

import { useMemo } from 'react';
import useAppStore from '@/stores/useAppStore';
import TotalGroupSpendCard from '@/components/Groups/TotalGroupSpendCard';

const TotalSpend = () => {
  const financialRecords = useAppStore((state) => state.financialRecords);

  const totalSpend = useMemo(() => {
    const groupSpendMap = financialRecords.reduce((acc, record) => {
      if (record.groupId) {
        acc[record.groupId] = (acc[record.groupId] || 0) + record.amount;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.values(groupSpendMap).reduce(
      (total, spend) => total + spend,
      0,
    );
  }, [financialRecords]);

  return (
    <div className='p-2'>
      <TotalGroupSpendCard totalSpend={totalSpend} />
    </div>
  );
};

export default TotalSpend;
