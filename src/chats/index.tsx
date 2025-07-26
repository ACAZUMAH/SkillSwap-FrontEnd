import React from 'react'
import { ChatProvider } from './context/chatcontext'
import { Chats } from './components/Chat'

export const ChatLayout: React.FC = () => {
  return (
    <ChatProvider>
      <Chats />
    </ChatProvider>
  )
}
