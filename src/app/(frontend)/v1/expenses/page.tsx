'use client';

import { getFinancialRecords } from '@/services/financialRecordService';
import useAppStore from '@/stores/useAppStore';
import { FinancialRecord } from '@/types/types';
import { useEffect } from 'react';

const FinancialRecordsPage = () => {
  const financialRecords = useAppStore((state) => state.financialRecords);
  const setFinancialRecords = useAppStore((state) => state.setFinancialRecords);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await getFinancialRecords();
        setFinancialRecords(response.data);
      } catch (error) {
        console.error('Failed to fetch financial records', error);
      }
    };

    fetchRecords();
  }, [setFinancialRecords]);

  return (
    <div>
      <h1>Financial Records</h1>
      <ul>
        {financialRecords.map((record: FinancialRecord) => (
          <li key={record.recordId}>{record.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default FinancialRecordsPage;
