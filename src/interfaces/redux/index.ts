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

export interface Chats {
  chats: {
    [chatId: string]: {
      id: string;
      users?: ChatUsers;
      messages?: Maybe<Message>[];
      recentMessage?: Message | null;
      loadingMessages?: boolean;
      createdAt?: string;
      updatedAt?: string;
    };
  };
  activeChat: string | null;
  loadingChats: boolean;
}

export interface ChatsActions extends PayloadAction<Partial<Chats>> {}
