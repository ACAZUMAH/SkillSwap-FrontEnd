import { Box } from "@mantine/core";
import React, { useEffect } from "react";
import { Conditional } from "src/components";
import { useAppAuthentication } from "src/hooks";
import { useAppChats } from "src/hooks/useAppChats";
import { useLocation } from "react-router-dom";
//import classes from "../styles/index.module.css";
import { useGetMessagesQuery } from "../hooks/useGetMessagesQuery";
import { Sidebar } from "./Sidebar";
import { EmptyChat } from "./EmptyChat";
import { OpenedChat } from "./OpenedChat";
//import { useResponsive } from "../context/chatcontext";

export const Chats: React.FC = () => {
  //const { isMobile, isSidebarOpen, closeSidebar } = useResponsive();
  const location = useLocation();
  const { user } = useAppAuthentication();
  const { chats, activeChat, setActiveChat, addMessages } = useAppChats();
  const { chat, loading } = useGetMessagesQuery(
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
    addMessages(
      activeChat || "",
      (chat?.messages || []).filter((msg) => msg !== null)
    );
  }, [activeChat, chat, addMessages, loading]);

  return (
    <Box
      style={{
        height: "calc(100vh - 64px)",
        display: "flex",
      }}
    >
      <Sidebar currentUser={user} />
      <Conditional condition={!Boolean(activeChat)}>
        <EmptyChat />
      </Conditional>
      <Conditional condition={Boolean(activeChat)}>
        <OpenedChat currentUser={user} loadingMessages={loading} />
      </Conditional>
    </Box>
  );
};
