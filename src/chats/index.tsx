import { Box, Divider } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { OpenedChat } from "./components/OpenedChat";
import { EmptyChat } from "./components/EmptyChat";
import { Conditional } from "src/components";
import { useGetAllChatsQuery } from "./hooks/useGetAllChatsQuery.ts";
import { useAppAuthentication } from "src/hooks";
import { useAppChats } from "src/hooks/useAppChats";
import { useLocation } from "react-router-dom";
import { useGetMessagesQuery } from "./hooks/useGetMessagesQuery.ts";

export const Chats: React.FC = () => {
  const [selectedUser, _setSelectedUser] = useState("");
  const location = useLocation();
  const { user } = useAppAuthentication();
  const {
    chats,
    activeChat,
    addChat,
    setActiveChat,
    setLoadingChats,
    chatsLoaded,
    addMessages,
  } = useAppChats();
  const { chats: newChats } = useGetAllChatsQuery(chatsLoaded);
  const { chat } = useGetMessagesQuery(
    {
      chatId: activeChat || "",
      from: user?.id!,
      to:
        user?.id !== chats[activeChat || ""]?.users?.receiver?.id
          ? chats[activeChat || ""]?.users?.receiver?.id!
          : chats[activeChat || ""]?.users?.sender?.id!,
    },
    !activeChat
  );

  useEffect(() => {
    if (!location.pathname.includes("/chats")) {
      setActiveChat(null);
    }
  }, [location.pathname, setActiveChat]);

  useEffect(() => {
    if (newChats && Object.keys(newChats).length > 0 && !chatsLoaded) {
      setLoadingChats(true);
      addChat(newChats.filter((chat) => chat !== null));
    } else {
      setLoadingChats(false);
    }
  }, [newChats]);

  useEffect(() => {
    addMessages(
      activeChat || "",
      (chat?.messages || []).filter((msg) => msg !== null)
    );
  }, [activeChat, chat, addMessages]);

  return (
    <Box
      style={{
        height: "calc(100vh - 64px)",
        display: "flex",
      }}
    >
      <Sidebar currentUser={user} />
      <Divider orientation="vertical" />
      <Conditional condition={!Boolean(activeChat)}>
        <EmptyChat />
      </Conditional>
      <Conditional condition={Boolean(activeChat)}>
        <OpenedChat selectedUser={selectedUser} currentUser={user} />
      </Conditional>
    </Box>
  );
};
