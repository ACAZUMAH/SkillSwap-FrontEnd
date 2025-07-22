import { useCallback } from "react";
import { useAppDispatch, useAppSelctor } from "./useReduxHooks";
import { Chat, Message } from "src/interfaces";
import { chatsActions } from "src/redux/chats/slice";

export const useAppChats = () => {
  const dispatch = useAppDispatch();
  const chats = useAppSelctor((state) => state.chats);

  const addChat = useCallback(
    (chat: Chat[]) => {
      dispatch(chatsActions.setChats(chat));
    },
    [dispatch]
  );

  const setActiveChat = useCallback(
    (chatId: string | null) => {
      dispatch(chatsActions.setActiveChat(chatId));
    },
    [dispatch]
  );

  const addMessage = useCallback(
    (chatId: string, message: Message) => {
      dispatch(chatsActions.addMessage({ chatId, message }));
    },
    [dispatch]
  );

  const removeMessage = useCallback(
    (chatId: string, messageId: string) => {
      dispatch(chatsActions.deleteMessage({ chatId, messageId }));
    },
    [dispatch]
  );

  return { ...chats, addChat, setActiveChat, addMessage, removeMessage };
};
