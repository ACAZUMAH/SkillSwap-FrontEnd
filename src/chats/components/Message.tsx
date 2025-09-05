import {
  ActionIcon,
  Box,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import { Conditional } from "src/components";
import { Message, MessageType, User } from "src/interfaces";
import { createMessageStatus } from "../helper";
import { formatMessageDate } from "src/helpers/date";
import { useAppSettings } from "src/hooks";
import { IconArrowDown, IconFile } from "@tabler/icons-react";
import { useUploadFile } from "../hooks/useUploadFile";
import { UserAvatar } from "src/components/Avatar/UserAvatar";

interface MessageBubbleProps {
  currentUser?: User;
  message: Message;
  currentChat: any; // TODO: Define a proper type for currentChat
  index: number;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  currentUser,
}) => {
  const [downloading, setDownloading] = useState(false);
  const { isDarkMode } = useAppSettings();
  const isCurrentUser = message?.senderId === currentUser?.id;
  const theme = useMantineTheme();
  const { downloadFile } = useUploadFile();

  const handledownloadFile = async (url: string) => {
    setDownloading(true);
    const download = await downloadFile(url);
    if (download) {
      setDownloading(false);
    }
  };

  return (
    <Group
      gap="0"
      align="flex-end"
      justify={isCurrentUser ? "flex-end" : "flex-start"}
      style={{
        maxWidth: "70%",
        alignSelf: isCurrentUser ? "flex-end" : "flex-start",
      }}
    >
      <Conditional condition={!isCurrentUser}>
        <Box style={{ width: 32, display: "flex", justifyContent: "center" }}>
          <UserAvatar
            url={message?.sender?.profile_img!}
            name={message?.sender?.firstName!}
            size="sm"
            radius="xl"
            style={{ flexShrink: 0 }}
          />
        </Box>
      </Conditional>
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
        <Conditional condition={message?.messageType === MessageType.Image}>
          <Paper
            p="4px"
            radius="lg"
            style={{
              maxWidth: "100%",
              backgroundColor: isCurrentUser
                ? theme.colors.blue[6]
                : isDarkMode
                ? theme.colors.dark[6]
                : theme.colors.gray[1],
              borderBottomRightRadius: isCurrentUser ? 4 : undefined,
              borderBottomLeftRadius: !isCurrentUser ? 4 : undefined,
            }}
          >
            <Image
              src={message?.mediaUrl}
              style={{ maxHeight: "200px", maxWidth: "100%" }}
              fit="contain"
              radius="lg"
            />
          </Paper>
        </Conditional>

        <Conditional condition={message?.messageType === MessageType.Video}>
          <Paper
            p="4px"
            radius="lg"
            style={{
              maxWidth: "100%",
              backgroundColor: isCurrentUser
                ? theme.colors.blue[6]
                : isDarkMode
                ? theme.colors.dark[6]
                : theme.colors.gray[1],
              borderBottomRightRadius: isCurrentUser ? 4 : undefined,
              borderBottomLeftRadius: !isCurrentUser ? 4 : undefined,
            }}
          >
            <video
              width="100%"
              src={message?.mediaUrl!}
              controls
              style={{
                maxHeight: "200px",
                maxWidth: "100%",
                borderRadius: "8px",
              }}
            />
          </Paper>
        </Conditional>

        <Conditional condition={message?.messageType === MessageType.Document}>
          <Paper
            p="md"
            radius="lg"
            style={{
              textAlign: "center",
              backgroundColor: isCurrentUser
                ? theme.colors.blue[6]
                : isDarkMode
                ? theme.colors.dark[6]
                : theme.colors.gray[1],
              borderBottomRightRadius: isCurrentUser ? 4 : undefined,
              borderBottomLeftRadius: !isCurrentUser ? 4 : undefined,
            }}
          >
            <Paper p="md" style={{ textAlign: "center" }} radius="lg">
              <Group>
                <IconFile size={30} stroke={1.5} />
                <Text fw={500}>{message?.message || "Document"}</Text>
                <ActionIcon
                  variant="outline"
                  size="sm"
                  radius="xl"
                  onClick={() => handledownloadFile(message?.mediaUrl!)}
                  loading={downloading}
                  disabled={downloading}
                >
                  <IconArrowDown stroke={1.5} size={30} />
                </ActionIcon>
              </Group>
            </Paper>
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
      <Conditional condition={isCurrentUser}>
        <Box style={{ width: 32, display: "flex", justifyContent: "center" }}>
          <UserAvatar
            url={currentUser?.profile_img!}
            name={currentUser?.firstName!}
            size="sm"
            radius="xl"
            style={{ flexShrink: 0 }}
          />
        </Box>
      </Conditional>
    </Group>
  );
};
