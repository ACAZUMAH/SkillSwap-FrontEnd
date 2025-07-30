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
  const { search, showSidebar, showChat, isMobile } = useResponsive();
  const location = useLocation();
  const { user } = useAppAuthentication();
  const { activeChat, setActiveChat, addMessages, updateRecentMessage } =
    useAppChats();
  const { chat, loading } = useGetMessagesQuery(
    { chatId: activeChat! },
    !activeChat
  );

  useEffect(() => {
    if (!location.pathname.includes("/chats")) {
      setActiveChat(null);
    }
  }, [location.pathname, setActiveChat]);

  useEffect(() => {
    const messages = (chat?.messages || []).filter((msg) => msg !== null);
    addMessages(activeChat!, messages);

    if (chat?.recentMessage) {
      updateRecentMessage(activeChat!, chat.recentMessage);
    }
  }, [user?.id, chat, addMessages, activeChat]);

  return (
    <Box
      style={{
        height: "calc(100vh - 70px)",
        display: "flex",
      }}
    >
      <Conditional condition={showSidebar}>
        <Sidebar currentUser={user} />
      </Conditional>
      <Conditional condition={showChat && Boolean(activeChat)}>
        <Box
          style={{
            display: "flex",
            flex: 1,
            gap: search ? "8px" : "0",
          }}
        >
          <Box
            style={{
              flex: search ? "2" : "1",
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
              <SearchMessages currentUser={user} />
            </Box>
          </Conditional>
        </Box>
      </Conditional>
      <Conditional condition={showChat && !Boolean(activeChat)}>
        <EmptyChat />
      </Conditional>
      <Conditional condition={isMobile && !Boolean(activeChat)}>
        <EmptyChat />
      </Conditional>
    </Box>
  );
};
