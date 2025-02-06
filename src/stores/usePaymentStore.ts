import { Payment, StoreState } from '@/types/types';
import { StateCreator } from 'zustand';

export const usePaymentStore: StateCreator<
  StoreState,
  [],
  [],
  {
    payments: Payment[];
    setPayments: (payments: Payment[]) => void;
    addPayment: (newPayment: Payment) => void;
    deletePayment: (paymentId: string) => void;
  }
> = (set) => ({
  payments: [],
  setPayments: (payments) => set({ payments }),
  addPayment: (newPayment) =>
    set((state) => ({ payments: [newPayment, ...state.payments] })),
  deletePayment: (paymentId) =>
    set((state) => ({
      payments: state.payments.filter(
        (payment) => payment.paymentId !== paymentId,
      ),
    })),
});
