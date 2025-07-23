import { useCallback } from "react";
import { useAppDispatch, useAppSelctor } from "./useReduxHooks";
import { Chat, Message } from "src/interfaces";
import { chatsActions } from "src/redux/chats/slice";

export const useAppChats = () => {
  const dispatch = useAppDispatch();
  const chats = useAppSelctor((state) => state.chats);
  const chatsLoaded = useAppSelctor((state) => state.chats.chatsLoaded);

  const loadInitialChats = useCallback((chats: Chat[]) => {
    if (!chatsLoaded) {
      dispatch(chatsActions.setChats(chats));
    }
  }, [dispatch, chatsLoaded]);

  const addNewChat = useCallback(
    (chat: Chat) => {
      dispatch(chatsActions.addChat(chat));
    },
    [dispatch]
  );

  const setLoadingChats = useCallback(
    (loading: boolean) => {
      dispatch(chatsActions.setLoadingChats(loading));
    },
    [dispatch]
  );

  const setActiveChat = useCallback(
    (chatId: string | null) => {
      dispatch(chatsActions.setActiveChat(chatId));
    },
    [dispatch]
  );

  const addMessages = useCallback(
    (chatId: string, messages: Message[]) => {
      dispatch(chatsActions.setMessages({ chatId, messages }));
    },
    [dispatch]
  );

  const removeMessage = useCallback(
    (chatId: string, messageId: string) => {
      dispatch(chatsActions.deleteMessage({ chatId, messageId }));
    },
    [dispatch]
  );

  return {
    ...chats,
    chatsLoaded,
    loadInitialChats,
    addNewChat,
    setLoadingChats,
    setActiveChat,
    addMessages,
    removeMessage,
  };
};
