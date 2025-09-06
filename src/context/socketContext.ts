import { createContext } from "react";
import { Socket } from "socket.io-client";

export interface EmitMassage {
  chatId: string;
  message: any;
  to: string;
  from?: string;
  users: any;
}

export interface TypingData {
  chatId?: string;
  from?: string;
  to?: string;
}

export interface SocketContextType {
  socket?: Socket | null;
  isconnected?: boolean;
  onlineUsers?: string[];
  typingByChat?: Record<string, string[]>;
  emitTyping?: (data: TypingData) => void;
  emitNewMessage?: (data: EmitMassage) => void;
  emitStopTyping?: (data: TypingData) => void;
  isUserOnline?: (userId: string) => boolean;
  isUserTyping?: (chatId: string, userId: string) => boolean;
}

export const SocketContext = createContext<SocketContextType>({});
