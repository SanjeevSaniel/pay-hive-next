import { create } from 'zustand';
import { StoreState } from '@/types/types';
import { useGroupStore } from './useGroupStore';
import { useUserStore } from './useUserStore';
import { useFinancialRecordStore } from './useFinancialRecordStore';
import { useNotificationStore } from './useNotificationStore';
import { usePaymentStore } from './usePaymentStore';
import { useExpenseReportStore } from './useExpenseReportStore';
import { useGroupTypeStore } from './useGroupTypeStore';

const useAppStore = create<StoreState>()((...a) => ({
  ...useGroupStore(...a),
  ...useUserStore(...a),
  ...useFinancialRecordStore(...a),
  ...useNotificationStore(...a),
  ...usePaymentStore(...a),
  ...useExpenseReportStore(...a),
  ...useGroupTypeStore(...a),
}));

export default useAppStore;
