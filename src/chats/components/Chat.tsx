import { Box } from "@mantine/core";
import React, { useEffect } from "react";
import { Conditional } from "src/components";
import { useAppAuthentication } from "src/hooks";
import { useAppChats } from "src/hooks/useAppChats";
import { useLocation } from "react-router-dom";
import { useGetMessagesQuery } from "../hooks/useGetMessagesQuery";
import { Sidebar } from "./Sidebar";
import { EmptyChat } from "./EmptyChat";
import { OpenedChat } from "./OpenedChat";
import { SearchMessages } from "./SearchMessages";
import { useResponsive } from "../context";

export const Chats: React.FC = () => {
  const { search } = useResponsive();
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
  }, [user?.id, chat, addMessages, loading]);

  return (
    <Box
      style={{
        height: "calc(100vh - 64px)",
        display: "flex",
      }}
    >
      <Sidebar currentUser={user} />
      <Conditional condition={Boolean(activeChat)}>
        <Box
          style={{
            display: "flex",
            flex: 1,
            gap: search ? "8px" : "0",
          }}
        >
          <Box
            style={{
              flex: search ? "1" : "1",
              minWidth: 0,
            }}
          >
            <OpenedChat currentUser={user} loadingMessages={loading} />
          </Box>
          <Conditional condition={search}>
            <Box
              style={{
                flex: "1",
                minWidth: 0,
              }}
            >
              <SearchMessages />
            </Box>
          </Conditional>
        </Box>
      </Conditional>
      <Conditional condition={!Boolean(activeChat)}>
        <EmptyChat />
      </Conditional>
    </Box>
  );
};
