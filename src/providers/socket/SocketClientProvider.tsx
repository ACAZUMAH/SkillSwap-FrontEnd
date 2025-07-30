import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SocketContext, SocketContextType } from "src/context/socketContext";
import { useAppAuthentication } from "src/hooks";
import { useAppChats } from "src/hooks/useAppChats";

interface SocketClientProviderProps {
  children?: React.ReactNode;
}

export const SocketClientProvider: React.FC<SocketClientProviderProps> = ({
  children,
}) => {
  const socket = useRef<Socket | null>(null);
  const [socketEvent, setSocketEvent] = useState(false);
  const [isConnected, setIsConnected] = React.useState(false);
  const { user } = useAppAuthentication();
  const { addMessage } = useAppChats();

  useEffect(() => {
    if (user) {
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

      socket.current.on("connect", () => {
        setIsConnected(true);
        console.log("Socket connected:", socket.current?.id);

        if (!socketEvent) {
          console.log("Setting up socket event listeners");

          socket.current?.on("receivedMessage", (data) => {
            addMessage(data.chatId, data.message);
          });

          socket.current?.on("sentMessage", (data) => {
            addMessage(data.chatId, data.message);
          });

          setSocketEvent(true);
        }
      });
      
      socket.current.emit("add-online-user", user.id);

      socket.current.on("disconnect", () => {
        setIsConnected(false);
        console.log("Socket disconnected");
      });

      socket.current.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        setIsConnected(false);
      });

      return () => {
        if (socket.current) {
          socket.current.disconnect();
          socket.current = null;
          setIsConnected(false);
          setSocketEvent(false);
          console.log("Socket disconnected due to user logout");
        }
      };
    }
  }, [user?.id, addMessage]);

  // useEffect(() => {
  //   if (socket.current && !socketEvent) {
  //     socket.current.on("receivedMessage", (data) => {
  //       console.log("Received message:", data);
  //       addMessage(data.chatId, data.message);
  //     });

  //     socket.current.on("sentMessage", (data) => {
  //       console.log("Sent message:", data);
  //       addMessage(data.chatId, data.message);
  //     });

  //     setSocketEvent(true);
  //   }
  // }, [socket.current]);

  const value: SocketContextType = {
    socket: socket.current,
    isconnected: isConnected,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
