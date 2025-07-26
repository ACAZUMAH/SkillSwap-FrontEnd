import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useMediaQuery } from "@mantine/hooks"

interface ResponsiveContextType {
  isMobile: boolean
  isSidebarOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void
  toggleSidebar: () => void
}

const ResponsiveContext = createContext<ResponsiveContextType | undefined>(undefined)

export const useResponsive = () => {
  const context = useContext(ResponsiveContext)
  if (!context) {
    throw new Error("useResponsive must be used within ResponsiveProvider")
  }
  return context
}

interface ResponsiveProviderProps {
  children: React.ReactNode
}

export const ChatProvider: React.FC<ResponsiveProviderProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const openSidebar = () => setIsSidebarOpen(true)
  const closeSidebar = () => setIsSidebarOpen(false)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  // Close sidebar when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsSidebarOpen(false)
    }
  }, [isMobile])

  return (
    <ResponsiveContext.Provider
      value={{
        isMobile,
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        toggleSidebar,
      }}
    >
      {children}
    </ResponsiveContext.Provider>
  )
}