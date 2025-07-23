import { Box, Flex, Paper, Stack, } from "@mantine/core";
import React, { useRef } from "react";
import { Conditional } from "src/components";
import { formatMessageDate } from "src/helpers/date";
import { useAppSettings } from "src/hooks";
import { useAppChats } from "src/hooks/useAppChats";
import { MessageType, User } from "src/interfaces";
import { createMessageStatus } from "../helper";
interface ChatcontainerProps {
  currentUser?: User;
}

export const ChatContainer: React.FC<ChatcontainerProps> = ({
  currentUser,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useAppSettings();
  const { chats, activeChat } = useAppChats();
  const currentChat = chats[activeChat!];

  console.log(currentChat.messages)
  
  return (
    <Box
      style={{
        flex: 1,
        height: "80vh",
        width: "100%",
        padding: "10px 16px",
        overflowY: "auto",
      }}
    >
      <Stack style={{ height: "100%", width: "100%", left: 0, top: 0 }}>
        <Conditional
          condition={Boolean(
            currentChat &&
              currentChat.messages &&
              currentChat.messages.length > 0
          )}
        >
          {currentChat?.messages?.map((message, _index) => (
            <Paper
              key={message?.id}
              style={{
                alignSelf:
                  message?.sender?.id === currentUser?.id
                    ? "flex-end"
                    : "flex-start",
                // backgroundColor:
                //   message?.sender?.id === currentUser?.id
                //     ? "#1f5de5"
                //     : "#f0f0f0",
                // color:
                //   message?.sender?.id === currentUser?.id ? "#fff" : "#000",
                // padding: "8px 12px",
                // borderRadius: "8px",
                // maxWidth: "70%",
              }}
            >
              <Conditional
                condition={message?.messageType === MessageType.Text}
              >
                <Paper
                  style={{
                    padding: "3px 8px",
                    fontSize: "var(--mantine-font-size-md)",
                    borderRadius: "8px",
                    display: "flex",
                    gap: "2px",
                    alignItems: "flex-end",
                    maxWidth: "100%",
                    backgroundColor:
                      message?.sender?.id === currentUser?.id
                        ? "#1f5de5"
                        : isDarkMode
                        ? "#2d2d2d"
                        : "#f1f5f9",
                  }}
                >
                  <span
                    style={{
                      fontSize: "var(--mantine-font-size-lg)",
                      fontWeight: "450",
                      color:
                        message?.sender?.id === currentUser?.id ? "#fff" : "",
                    }}
                  >
                    {message?.message}
                  </span>
                </Paper>
                <Flex mt="3px">
                  <span
                    style={{
                      fontSize: "9px",
                      color: isDarkMode ? "#9ca3af" : "#6b7280",
                      marginRight: "auto",
                    }}
                  >
                    Message {createMessageStatus(message!)}
                  </span>
                  <span
                    style={{
                      fontSize: "9px",
                      color: isDarkMode ? "#9ca3af" : "#6b7280",
                      marginLeft: "auto",
                    }}
                  >
                    {formatMessageDate(message?.updatedAt)}
                  </span>
                </Flex>
              </Conditional>
            </Paper>
          ))}
        </Conditional>
        <div ref={messagesEndRef} />
      </Stack>
    </Box>
  );
};
