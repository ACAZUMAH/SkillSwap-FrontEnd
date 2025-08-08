import { useMemo, useState } from "react";
import { useAppChats } from "src/hooks";

export const useSideBarActions = () => {
  const [search, setSearch] = useState("");
  const { chats, setActiveChat, activeChat, loadingChats } = useAppChats();
  const filteredChats = useMemo(() => {
    const chatList = Object.values(chats);
    if (!search.trim()) {
      return chatList;
    }
    return chatList.filter((chat) => {
      const senderName =
        `${chat?.users?.sender?.firstName} ${chat?.users?.sender?.lastName}`.toLowerCase();
      const receiverName =
        `${chat?.users?.receiver?.firstName} ${chat?.users?.receiver?.lastName}`.toLowerCase();
      return (
        senderName.includes(search.toLowerCase()) ||
        receiverName.includes(search.toLowerCase())
      );
    });
  }, [search]);

  // console.log('chat list', JSON.stringify(chats, null, 2));
  const sortedChats = useMemo(() => {
    const chatList = Object.values(chats);
    return chatList.sort((a, b) => {
      const aDate = new Date(a.recentMessage?.createdAt || 0);
      const bDate = new Date(b.recentMessage?.createdAt || 0);
      return bDate.getTime() - aDate.getTime();
    });
  }, [chats]);

  // console.log("Sorted Chats", JSON.stringify(sortedChats, null, 2));

  const unreadCounts = useMemo(() => {
    const chatsList = Object.values(chats);
    return chatsList.reduce((acc: { [key: string]: number }, chat) => {
      if (chat.unreadCount) {
        acc[chat.id] = chat.unreadCount;
      }
      return acc;
    }, {} as { [key: string]: number });
  }, [chats]);

  const sortedFilteredChats = useMemo(() => {
    if (!search.trim()) {
      return sortedChats;
    }
    return filteredChats.sort((a, b) => {
      const aDate = new Date(a.recentMessage?.createdAt || 0);
      const bDate = new Date(b.recentMessage?.createdAt || 0);
      return bDate.getTime() - aDate.getTime();
    });
  }, [search, sortedChats, filteredChats]);

  return {
    search,
    setSearch,
    chats,
    sortedChats,
    sortedFilteredChats,
    activeChat,
    setActiveChat,
    loadingChats,
    unreadCounts,
  };
};
