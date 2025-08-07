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
  users: ChatUsers;
  recentMessage: Message;
  messages?: Message[];
  loadingMessages: boolean;
  unreadCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Chats {
  chats: {
    [chatId: string]: {
      id: string;
      users?: ChatUsers;
      messages?: Maybe<Message>[];
      recentMessage?: Message;
      unreadCount?: number;
      loadingMessages?: boolean;
      createdAt: string;
      updatedAt: string;
    };
  };
  totalUnreadCount: number;
  activeChat: string | null;
  loadingChats: boolean;
  chatsLoaded: boolean;
}

export interface ChatsActions extends PayloadAction<Partial<Chats>> {}


export interface VideoCall {
  chatId?: string;
  users?: ChatUsers;
  type?: "incoming" | "outgoing";
  roomId?: string;
}

export interface IncomingVideoCall {
  from: {
    id: string;
    profile_img?: string;
    firstName?: string;
    lastName?: string;
  };
  callType: string;
  roomId: string;
}
export interface VideoCallState {
  videoCall?: VideoCall | undefined;
  incomingVideoCall?: IncomingVideoCall | undefined;
}

