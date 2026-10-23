import { useUserStore } from '../stores/user.store'

export const useUser = () => {
  const {
    user,
    setUser,
    clearUser,
  } = useUserStore()

  return {
    user,
    setUser,
    clearUser,
  }
}
