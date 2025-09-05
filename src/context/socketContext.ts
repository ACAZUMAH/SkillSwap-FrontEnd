import { createContext } from "react";
import { Socket } from "socket.io-client";

export interface SocketContextType {
    socket?: Socket | null;
    isconnected?: boolean;
    onlineUsers?: string[];
    typingByChat?: Record<string, string[]>;
    emitTyping?: (chatId: string, to: string) => void;
    emitNewMessage?: (chatId: string, message: string, to: string) => void;
    emitStopTyping?: (chatId: string, to: string) => void;
    isUserOnline?: (userId: string) => boolean;
    isUserTyping?: (chatId: string, userId: string) => boolean;
}

export const SocketContext = createContext<SocketContextType>({});
