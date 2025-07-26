import { Box, Center, Loader, Stack } from "@mantine/core";
import React, { useEffect, useRef } from "react";
import { Conditional } from "src/components";
import { useAppChats } from "src/hooks/useAppChats";
import { User } from "src/interfaces";
import { MessageBubble } from "./Message";
import { EmptyMessages } from "./EmptyMessages";
import classes from "../styles/index.module.css";

interface ChatcontainerProps {
  currentUser?: User;
  loadingMessages?: boolean;
}

export const ChatContainer: React.FC<ChatcontainerProps> = ({
  currentUser,
  loadingMessages = false,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { chats, activeChat } = useAppChats();
  const currentChat = chats[activeChat!];

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat.messages]);

  return (
    <Box className={classes.chatContainer}>
      <Stack gap="md" className={classes.chatLoader}>
        <Conditional condition={loadingMessages}>
          <Center>
            <Loader size="md" type="dots" />
          </Center>
        </Conditional>
        <Conditional
          condition={!loadingMessages && !currentChat?.messages?.length}
        >
          <EmptyMessages />
        </Conditional>
        <Conditional
          condition={Boolean(
            currentChat &&
              currentChat.messages &&
              currentChat.messages.length > 0
          )}
        >
          {currentChat?.messages?.map((message, index) => (
            <MessageBubble
              key={index}
              message={message}
              currentChat={currentChat}
              currentUser={currentUser}
              index={index}
            />
          ))}
        </Conditional>
        <div ref={messagesEndRef} style={{ marginTop: "20px" }} />
      </Stack>
    </Box>
  );
};
