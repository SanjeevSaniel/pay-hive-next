import { useCallback } from 'react';
import { getGroups } from '@/services/groupService';
import { getFinancialRecords } from '@/services/financialRecordService';
import useAppStore from '@/stores/useAppStore';

const useFetchGroupsAndRecords = () => {
  const setGroups = useAppStore((state) => state.setGroups);
  const setFinancialRecords = useAppStore((state) => state.setFinancialRecords);

  const fetchGroups = useCallback(async () => {
    try {
      const response = await getGroups();
      setGroups(response.data);
    } catch (error) {
      console.error('Failed to fetch groups:', error);
    }
  }, [setGroups]);

  const fetchFinancialRecords = useCallback(async () => {
    try {
      const response = await getFinancialRecords();
      setFinancialRecords(response.data);
    } catch (error) {
      console.error('Failed to fetch financial records:', error);
    }
  }, [setFinancialRecords]);

  return { fetchGroups, fetchFinancialRecords };
};

export default useFetchGroupsAndRecords;
