import axios from 'axios';
import { FinancialRecord } from '@/types/types';

export const getFinancialRecords = async (): Promise<{
  data: FinancialRecord[];
}> => {
  return await axios.get('/api/financial-records');
};
