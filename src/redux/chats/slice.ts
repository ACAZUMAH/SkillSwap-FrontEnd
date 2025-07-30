import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat, Chats, Message, MessagesStatus } from "src/interfaces";

const initialState: Chats = {
  chats: {},
  activeChat: null,
  loadingChats: false,
  chatsLoaded: false,
  totalUnreadCount: 0,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<Chat[]>) {
      for (const chat of action.payload || []) {
        state.chats[chat.id] = {
          ...chat,
          recentMessage: chat.recentMessage!,
          loadingMessages: false,
        };
      }
      state.chatsLoaded = true;
    },

    setMessages(
      state,
      action: PayloadAction<{
        chatId: string;
        messages: Message[];
      }>
    ) {
      const { chatId, messages } = action.payload;
      if (state.chats[chatId]) {
        state.chats[chatId].messages = messages;
        state.chats[chatId].loadingMessages = false;

        // state.chats[chatId].recentMessage = recentMessage;

        // if (messages.length > 0) {
        //   const latestMessage = messages[messages.length - 1];
        //   if (
        //     !state.chats[chatId].recentMessage ||
        //     new Date(latestMessage.createdAt) >
        //       new Date(state.chats[chatId].recentMessage!.createdAt)
        //   ) {
        //     state.chats[chatId].recentMessage = latestMessage;
        //   }
        // }
      }
    },

    updateRecentMessage(state, action: PayloadAction<{ 
      chatId: string; 
      recentMessage: Message 
    }>) {
      const { chatId, recentMessage } = action.payload;
      if (state.chats[chatId]) {
        state.chats[chatId].recentMessage = recentMessage;
      }
    },

    setUnreadMessagesCount(
      state,
      action: PayloadAction<{ chatId: string; count: number }>
    ) {
      const { chatId, count } = action.payload;
      if (state.chats[chatId]) {
        state.chats[chatId].unreadCount = count;
        state.totalUnreadCount = Object.values(state.chats).reduce(
          (total, chat) => total + (chat.unreadCount || 0),
          0
        );
      }
    },

    setLoadingChats(state, action: PayloadAction<boolean>) {
      state.loadingChats = action.payload;
    },

    addChat(state, action: PayloadAction<Chat>) {
      const chat = action.payload;
      if (!state.chats[chat.id]) {
        state.chats[chat.id] = {
          ...chat,
          recentMessage: chat.recentMessage!,
          loadingMessages: false,
        };
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
        if (!state.chats[chatId].messages) {
          state.chats[chatId].messages = [];
        }
        state.chats[chatId]?.messages!.push(message);
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
      }
    },

    clearActiveChat(state) {
      state.activeChat = null;
    },

    reset(state) {
      state.chats = {};
      state.activeChat = null;
      state.loadingChats = false;
      state.chatsLoaded = false;
      state.totalUnreadCount = 0;
    },
  },
});

export default chatsSlice.reducer;

export const chatsActions = chatsSlice.actions;
