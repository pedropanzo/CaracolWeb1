import { useNotificationsStore } from '../stores/notification.store'

export const useNotification = () => {
  const {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  } = useNotificationsStore()

  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  }
}
