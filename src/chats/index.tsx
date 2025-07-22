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

export const Chats: React.FC = () => {
  const [selectedUser, _setSelectedUser] = useState("");
  const location = useLocation();
  const { user } = useAppAuthentication();
  const { activeChat, addChat, setActiveChat } = useAppChats();
  const { chats } = useGetAllChatsQuery();

  useEffect(() => {
    addChat(chats.filter((chat) => chat !== null));
  }, [chats]);

  useEffect(() => {
    if (!location.pathname.includes("/chats")) {
      setActiveChat(null);
    }
  }, [location.pathname, setActiveChat]);

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
