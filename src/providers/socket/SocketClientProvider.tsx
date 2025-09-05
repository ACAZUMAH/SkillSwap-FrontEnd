import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SocketContext, SocketContextType } from "src/context/socketContext";
import { useAppAuthentication } from "src/hooks";
import { useAppChats } from "src/hooks/useAppChats";
import { useAppVideoCall } from "src/hooks/useAppvideoCall";

interface SocketClientProviderProps {
  children?: React.ReactNode;
}

export const SocketClientProvider: React.FC<SocketClientProviderProps> = ({
  children,
}) => {
  const socket = useRef<Socket | null>(null);
  const [socketEvent, setSocketEvent] = useState(false);
  const [isConnected, setIsConnected] = React.useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [typingByChat, setTypingByChat] = useState<Record<string, string[]>>(
    {}
  );
  const { user } = useAppAuthentication();
  const { addMessage } = useAppChats();
  const { setIncomingVideoCall, resetVideoCall } = useAppVideoCall();

  useEffect(() => {
    if (!user) return;

    socket.current = io(`${import.meta.env.VITE_API_BASE_URL}`, {
      transports: ["polling"],
      auth: {
        userId: user.id,
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
    });

    const onConnect = () => {
      setIsConnected(true);
      console.log("Socket connected:", socket.current?.id);

      if (!socketEvent) {
        console.log("Setting up socket event listeners");

        socket.current?.on("online-users", (data: string[]) => {
          console.log("Online users:", data);
          setOnlineUsers(Array.isArray(data) ? data : []);
        });

        socket.current?.on("user-online", (data) => {
          console.log("User online:", data);
          setOnlineUsers((prev) =>
            prev.includes(data.userId) ? prev : [...prev, data.userId]
          );
        });

        socket.current?.on("user-offline", (data) => {
          console.log("User offline:", data);
          setOnlineUsers((prev) =>
            prev.filter((userId) => userId !== data.userId)
          );
        });

        socket.current?.on("typing", (data) => {
          console.log("User typing:", data);
          setTypingByChat((prev) => {
            const arr = prev[data.chatId] || [];
            if (arr.includes(data.from)) return prev;
            return { ...prev, [data.chatId]: [...arr, data.from] };
          });
        });

        socket.current?.on("stop-typing", (data) => {
          console.log("User stopped typing:", data);
          setTypingByChat((prev) => {
            const arr = (prev[data.chatId] || []).filter(
              (id) => id !== data.from
            );
            if (arr.length === 0) {
              const copy = { ...prev };
              delete copy[data.chatId];
              return copy;
            }
            return { ...prev, [data.chatId]: arr };
          });
        });

        socket.current?.on("receivedMessage", (data) => {
          console.log("Received message:", data);
          addMessage(data.chatId, data.message);
        });

        socket.current?.on("sentMessage", (data) => {
          addMessage(data.chatId, data.message);
        });

        socket.current?.on("incoming-call", (data) => {
          console.log("Incoming call received");
          setIncomingVideoCall({ ...data });
        });

        socket.current?.on("call-rejected", () => {
          console.log("Call rejected");
          resetVideoCall();
        });

        setSocketEvent(true);
      }
    };

    const onDisconnect = () => {
      setIsConnected(false);
      console.log("Socket disconnected");
    };

    const onConnectError = () => {
      setIsConnected(false);
      console.log("Socket connection error");
    };

    socket.current?.on("connect", onConnect);

    socket.current.emit("add-online-user", user.id);

    socket.current.on("disconnect", onDisconnect);

    socket.current.on("connect_error", onConnectError);

    return () => {
      if (socket.current) {
        socket.current.off("connect", onConnect);
        socket.current.off("disconnect", onDisconnect);
        socket.current.off("connect_error", onConnectError);
        socket.current.removeAllListeners("online-users");
        socket.current.removeAllListeners("user-online");
        socket.current.removeAllListeners("user-offline");
        socket.current.removeAllListeners("typing");
        socket.current.removeAllListeners("stop-typing");
        socket.current.removeAllListeners("receivedMessage");
        socket.current.removeAllListeners("sentMessage");
        socket.current.removeAllListeners("incoming-call");
        socket.current.removeAllListeners("call-rejected");

        socket.current.disconnect();
        socket.current = null;
        setIsConnected(false);
        setSocketEvent(false);
        console.log("Socket disconnected due to user logout");
      }
    };
  }, [user?.id, addMessage]);

  const emitTyping = (chatId?: string, to?: string) =>
    socket.current?.emit("typing", { chatId, to });
  const emitStopTyping = (chatId?: string, to?: string) =>
    socket.current?.emit("stop-typing", { chatId, to });
  const emitNewMessage = (chatId: string, message: any, to: string) =>
    socket.current?.emit("sendMessage", { chatId, message, to });
  // const emitCallUser = (data: {
  //   to: string;
  //   from: string;
  //   signal: any;
  //   callType: string;
  // }) => socket.current?.emit("call-user", data);
  // const emitRejectCall = (data: { to: string; from: string }) =>
  //   socket.current?.emit("reject-call", data);

  const isUserOnline = (userId: string) => onlineUsers.includes(userId);
  const isUserTyping = (chatId: string, userId: string) => 
    Boolean(userId && (typingByChat[chatId] ?? []).includes(userId));

  const value: SocketContextType = {
    socket: socket.current,
    isconnected: isConnected,
    onlineUsers,
    typingByChat,
    emitTyping,
    emitNewMessage,
    isUserOnline,
    isUserTyping,
    emitStopTyping
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
