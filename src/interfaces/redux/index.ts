import type { PayloadAction } from "@reduxjs/toolkit";
import { ChatUsers, Message, User } from "../graphql/graphql";
import { Maybe } from "graphql/jsutils/Maybe";

export interface Authentication {
  user?: User;
  token?: string | null;
  isAuthenticated: boolean;
}

export interface AuthenticationsActions
  extends PayloadAction<Partial<Authentication>> {}

export interface Settings {
  isDarkMode: boolean;
}

export interface SettingsActions extends PayloadAction<Partial<Settings>> {}

export interface StateChat {
  id: string;
  users: {
    sender: User;
    receiver: User;
  };
  recentMessage?: Message;
  messages?: Message[];
  loadingMessages: boolean;
  unreadCount?: number; // Add this
  lastReadMessageId?: string; // Optional: track last read message
}

export interface Chats {
  chats: {
    [chatId: string]: {
      id: string;
      users?: ChatUsers;
      messages?: Maybe<Message>[];
      recentMessage?: Message;
      loadingMessages?: boolean;
      createdAt: string;
      updatedAt: string;
    };
  };
  totalUnReadCount?: number;
  activeChat: string | null;
  loadingChats: boolean;
  chatsLoaded: boolean;
}

export interface ChatsActions extends PayloadAction<Partial<Chats>> {}
