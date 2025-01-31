'use client';

import { getFinancialRecords } from '@/services/financialRecordService';
import useAppStore from '@/stores/useAppStore';
import { FinancialRecord } from '@/types/types';
import { useEffect } from 'react';

interface FinancialRecordWithTimestamp extends FinancialRecord {
  lastUpdated: string; // ISO date string
}

const fetchRecordsIfNeeded = async (
  financialRecords: FinancialRecordWithTimestamp[],
  setFinancialRecords: (records: FinancialRecordWithTimestamp[]) => void,
) => {
  if (
    !financialRecords ||
    financialRecords.length === 0 ||
    isDataStale(financialRecords)
  ) {
    try {
      const response = await getFinancialRecords();
      const recordsWithTimestamp = addTimestampToRecords(response.data);
      setFinancialRecords(recordsWithTimestamp);
    } catch (error) {
      console.error('Failed to fetch financial records', error);
    }
  }
};

const addTimestampToRecords = (
  records: FinancialRecord[],
): FinancialRecordWithTimestamp[] => {
  return records.map((record) => ({
    ...record,
    lastUpdated: new Date().toISOString(),
  }));
};

const isDataStale = (data: FinancialRecordWithTimestamp[]): boolean => {
  const timeLimit = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const currentTime = new Date().getTime();
  const lastUpdateTime = new Date(data[0]?.lastUpdated || 0).getTime();
  return currentTime - lastUpdateTime > timeLimit;
};

const FinancialRecordsPage = () => {
  const financialRecords = useAppStore(
    (state) => state.financialRecords as FinancialRecordWithTimestamp[],
  );
  const setFinancialRecords = useAppStore((state) => state.setFinancialRecords);

  useEffect(() => {
    fetchRecordsIfNeeded(financialRecords, setFinancialRecords);
  }, [financialRecords, setFinancialRecords]);

  return (
    <div>
      <h1>Financial Records</h1>
      <ul>
        {financialRecords.map((record) => (
          <li key={record.recordId}>{record.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default FinancialRecordsPage;
