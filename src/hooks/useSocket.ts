import { useCallback, useContext } from "react";
import {
  EmitMassage,
  SocketContext,
  TypingData,
} from "src/context/socketContext";

export const useSocket = () => {
  const socketContext = useContext(SocketContext);

  const { socket, isconnected, onlineUsers, typingByChat } = socketContext;

  const connectSocket = useCallback(() => {
    if (socket && !isconnected) {
      socket.connect();
    }
  }, [socket, isconnected]);

  const disconnectSocket = useCallback(() => {
    if (socket && isconnected) {
      socket.disconnect();
    }
  }, [socket, isconnected]);

  const isUserOnline = (userId: string) => onlineUsers?.includes(userId);
  const isUserTyping = (chatId: string, userId: string) =>
    Boolean(
      userId && ((typingByChat && typingByChat[chatId]) || []).includes(userId)
    );

  const emitTyping = (data: TypingData) =>
    socket?.emit("typing", { chatId: data.chatId, to: data.to }); 

  const emitStopTyping = (data: TypingData) =>
    socket?.emit("stop-typing", { chatId: data.chatId, to: data.to });

  const emitNewMessage = (data: EmitMassage) => {
    socket?.emit("sendMessage", {
      chatId: data.chatId,
      message: data.message,
      to: data.to,
      from: data.from,
      users: data.users,
    });
  };

  return {
    socket,
    isconnected,
    isUserOnline,
    isUserTyping,
    emitStopTyping,
    emitTyping,
    emitNewMessage,
    connectSocket,
    disconnectSocket,
  };
};
