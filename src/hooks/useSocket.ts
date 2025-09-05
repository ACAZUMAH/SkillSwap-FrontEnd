import { useCallback, useContext } from "react";
import { SocketContext } from "src/context/socketContext";

export const useSocket = () => {
  const socketContext = useContext(SocketContext);

  const {
    socket,
    isconnected,
    isUserOnline,
    isUserTyping,
    emitTyping,
    emitStopTyping,
  } = socketContext;

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

  return {
    socket,
    isconnected,
    isUserOnline,
    isUserTyping,
    emitStopTyping,
    emitTyping,
    connectSocket,
    disconnectSocket,
  };
};
