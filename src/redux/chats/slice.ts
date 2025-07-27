import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat, Chats, Message, MessagesStatus } from "src/interfaces";

const initialState: Chats = {
  chats: {},
  activeChat: null,
  loadingChats: false,
  chatsLoaded: false,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<Chat[]>) {
      for (const chat of action.payload || []) {
        state.chats[chat.id] = {
          ...chat,
          recentMessage: chat.recentMessage || undefined,
          loadingMessages: false,
        };
      }
      state.chatsLoaded = true;
    },

    setLoadingChats(state, action: PayloadAction<boolean>) {
      state.loadingChats = action.payload;
    },

    addChat(state, action: PayloadAction<Chat>) {
      const chat = action.payload;
      if (!state.chats[chat.id]) {
        state.chats[chat.id] = {
          ...chat,
          recentMessage: chat.recentMessage || undefined,
          loadingMessages: false,
        };
      }
    },

    setMessages(
      state,
      action: PayloadAction<{ chatId: string; messages: Message[] }>
    ) {
      const { chatId, messages } = action.payload;
      if (state.chats[chatId]) {
        state.chats[chatId].messages = messages;
        state.chats[chatId].recentMessage = messages[messages.length - 1] || undefined;
      }
    },

    setLoadingMessages(
      state,
      action: PayloadAction<{ chatId: string; loading: boolean }>
    ) {
      const { chatId, loading } = action.payload;
      if (state.chats[chatId]) {
        state.chats[chatId].loadingMessages = loading;
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
          message.status = MessagesStatus.Read;
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
        chat.recentMessage = !chat.messages?.length
          ? undefined
          : chat.messages[chat.messages.length - 1] ?? undefined;
      }
    },

    clearActiveChat(state) {
      state.activeChat = null;
    },
  },
});

export default chatsSlice.reducer;

export const chatsActions = chatsSlice.actions;
