import React from 'react'
import { ChatProvider } from './context/chatContext'
import { Chats } from './components/Chat'

export const ChatLayout: React.FC = () => {
  return (
    <ChatProvider>
      <Chats />
    </ChatProvider>
  )
}
