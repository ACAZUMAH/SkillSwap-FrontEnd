import {
  Group,
  Paper,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import { Conditional } from "src/components";
import { MessageType, User } from "src/interfaces";
import { createMessageStatus } from "../helper";
import { formatMessageDate } from "src/helpers/date";
import { useAppSettings } from "src/hooks";

interface MessageBubbleProps {
  currentUser?: User;
  message: any; // TODO: Define a proper type for message
  currentChat: any; // TODO: Define a proper type for currentChat
  index: number;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, currentUser }) => {
  const { isDarkMode } = useAppSettings();
  const isCurrentUser = message?.senderId === currentUser?.id;
  const theme = useMantineTheme();
  return (
    <Group
      gap="sm"
      align="flex-end"
      justify={isCurrentUser ? "flex-end" : "flex-start"}
      style={{
        maxWidth: "70%",
        alignSelf: isCurrentUser ? "flex-end" : "flex-start",
      }}
    >
      <Stack gap={4} style={{ maxWidth: "100%" }}>
        <Conditional condition={message?.messageType === MessageType.Text}>
          <Paper
            p="sm"
            radius="lg"
            style={{
              maxWidth: "100%",
              wordWrap: "break-word",
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
              backgroundColor: isCurrentUser
                ? theme.colors.blue[6]
                : isDarkMode
                ? theme.colors.dark[6]
                : theme.colors.gray[1],
              borderBottomRightRadius: isCurrentUser ? 4 : undefined,
              borderBottomLeftRadius: !isCurrentUser ? 4 : undefined,
            }}
          >
            <Text
              size="sm"
              style={{
                color: isCurrentUser
                  ? "white"
                  : isDarkMode
                  ? theme.colors.dark[0]
                  : theme.colors.dark[9],
                lineHeight: 1.4,
              }}
            >
              {message?.message}
            </Text>
          </Paper>
        </Conditional>
        <Group
          gap={4}
          justify={isCurrentUser ? "flex-end" : "flex-start"}
          style={{ paddingLeft: 4, paddingRight: 4 }}
        >
          <Text size="xs" c={isDarkMode ? "gray.5" : "gray.6"}>
            {createMessageStatus(message)}
          </Text>
          <Text size="xs" c={isDarkMode ? "gray.5" : "gray.6"}>
            •
          </Text>
          <Text size="xs" c={isDarkMode ? "gray.5" : "gray.6"}>
            {formatMessageDate(message?.createdAt)}
          </Text>
        </Group>
      </Stack>
    </Group>
  );
};
