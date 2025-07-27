import { useCallback, useContext } from "react";
import { SocketContext } from "src/context/socketContext";

export const useSocket = () => {
  const socketContext = useContext(SocketContext);

  const { socket, isconnected } = socketContext;

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

  return { socket, isconnected, connectSocket, disconnectSocket };
}