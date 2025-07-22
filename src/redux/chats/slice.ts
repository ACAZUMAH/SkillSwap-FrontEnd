import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat, Chats, Message } from "src/interfaces";

const initialState: Chats = {
  chats: {},
  activeChat: null,
  loadingChats: false,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<Chat[]>) {
      for (const chat of action.payload || []) {
        state.chats[chat.id] = {
          ...chat,
          loadingMessages: false,
        };
      }
    },
    setActiveChat(state, action: PayloadAction<string | null>) {
      state.activeChat = action.payload;
    },
    addMessage(
      state,
      action: PayloadAction<{ chatId: string; message: Message }>
    ) {
      const { chatId, message } = action.payload;
      if (state.chats[chatId]) {
        state.chats[chatId]?.messages?.push(message);
        state.chats[chatId].recentMessage = message;
      }
    },
    markMessageAsRead(
      state,
      action: PayloadAction<{ chatId: string; messageId: string }>
    ) {
      const { chatId, messageId } = action.payload;
      const chat = state.chats[chatId];
      if (chat) {
        const message = chat.messages?.find((msg) => msg?.id === messageId);
        if (message) {
          message.isRead = true;
        }
      }
    },

    deleteMessage(
      state,
      action: PayloadAction<{ chatId: string; messageId: string }>
    ) {
      const { chatId, messageId } = action.payload;
      const chat = state.chats[chatId];
      if (chat) {
        chat.messages = chat.messages?.filter((msg) => msg?.id !== messageId);
        chat.recentMessage = chat.messages?.[chat.messages.length - 1] || null;
      }
    },

    clearActiveChat(state) {
      state.activeChat = null;
    }
  },
});

export default chatsSlice.reducer;

export const chatsActions = chatsSlice.actions;