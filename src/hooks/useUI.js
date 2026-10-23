import { useUIStore } from '../stores/ui.store'

export const useUI = () => {
  const {
    theme,
    sidebarOpen,
    toggleTheme,
    toggleSidebar,
  } = useUIStore()

  return {
    theme,
    sidebarOpen,
    toggleTheme,
    toggleSidebar,
  }
}
