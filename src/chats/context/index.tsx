import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useMediaQuery } from "@mantine/hooks"

interface ResponsiveContextType {
  search: boolean
  openSearch: () => void
  closeSearch: () => void
  toggleSearch: () => void
  isMobile: boolean
  isChatOpen: boolean
  openChat: () => void
  closeChat: () => void
  toggleChat: () => void
  showSidebar: boolean
  showChat: boolean
  setShowSidebar: (show: boolean) => void
  setShowChat: (show: boolean) => void
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
  const [isChatOpen, setIsChatOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [search, setOpenSearch] = useState(false)
  
  const [showSidebar, setShowSidebar] = useState(true)
  const [showChat, setShowChat] = useState(false)

  const openChat = () => setIsChatOpen(true)
  const closeChat = () => setIsChatOpen(false)
  const toggleChat = () => setIsChatOpen(!isChatOpen)

  const openSearch = () => setOpenSearch(true)
  const closeSearch = () => setOpenSearch(false)
  const toggleSearch = () => setOpenSearch(!search)

  useEffect(() => {
    if (!isMobile) {
      setShowSidebar(true)
      setShowChat(true)
      setIsChatOpen(false)
    } else {
      setShowSidebar(true)
      setShowChat(false)
    }
  }, [isMobile])

  return (
    <ResponsiveContext.Provider
      value={{
        search,
        openSearch,
        closeSearch,
        toggleSearch,
        isMobile,
        isChatOpen,
        openChat,
        closeChat,
        toggleChat,
        showSidebar,
        showChat,
        setShowSidebar,
        setShowChat,
      }}
    >
      {children}
    </ResponsiveContext.Provider>
  )
}
