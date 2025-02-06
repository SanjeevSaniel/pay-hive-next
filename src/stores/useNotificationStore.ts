import { Notification, StoreState } from '@/types/types';
import { StateCreator } from 'zustand';

export const useNotificationStore: StateCreator<
  StoreState,
  [],
  [],
  {
    notifications: Notification[];
    setNotifications: (notifications: Notification[]) => void;
    addNotification: (newNotification: Notification) => void;
    deleteNotification: (notificationId: string) => void;
  }
> = (set) => ({
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
  addNotification: (newNotification) =>
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
    })),
  deleteNotification: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.notificationId !== notificationId,
      ),
    })),
});
