import {
  Avatar,
  Box,
  Group,
  rem,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useElementSize, useHover } from "@mantine/hooks";
import React from "react";
import { Conditional } from "src/components";
import { getInitialsNameLatter } from "src/helpers";
import { formatSideBarChatDate } from "src/helpers/date";
import { useAppSettings } from "src/hooks";
import { User } from "src/interfaces";

interface ChatListitemProps {
  chat: any; // TODO: Define a proper type for chat
  currentUser?: User;
  setActiveChat: (chatId: string) => void;
  activeChat: string | null;
}

export const ChatListitem: React.FC<ChatListitemProps> = ({
  chat,
  currentUser,
  setActiveChat,
  activeChat,
}) => {
  const settings = useAppSettings();
  const { hovered, ref } = useHover();
  const { ref: currentRef, width } = useElementSize();
  const fullName =
    chat?.users?.sender?.id !== currentUser?.id
      ? chat?.users?.sender?.firstName + " " + chat?.users?.sender?.lastName
      : chat?.users?.receiver?.firstName +
        " " +
        chat?.users?.receiver?.lastName;
  return (
    <>
      <UnstyledButton
        ref={ref}
        key={chat?.id}
        onClick={() => setActiveChat(chat?.id || "")}
        style={{
          backgroundColor:
            hovered || chat?.id === activeChat
              ? settings.isDarkMode
                ? "#2d2d2d"
                : "#f1f5f9"
              : "transparent",
          padding: rem(10),
          borderRadius: rem(8),
          width: "100%",
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: rem(12),
          alignItems: "center",
        }}
      >
        <Avatar
          src={
            chat?.users?.sender?.id !== currentUser?.id
              ? chat?.users?.sender?.profile_img
              : chat?.users?.receiver?.profile_img
          }
          style={{
            background: "#1f5de5",
            borderRadius: "var(--mantine-radius-xl)",
            cursor: "pointer",
          }}
          size="md"
        >
          <Text c="white" fw="bold" size="xl">
            {getInitialsNameLatter(
              chat?.users?.sender?.id !== currentUser?.id
                ? chat?.users?.sender?.firstName!
                : chat?.users?.receiver?.firstName!
            )}
          </Text>
        </Avatar>

        <Box ref={currentRef} style={{ minWidth: 0 }}>
          <Group justify="space-between" wrap="nowrap" mb={2}>
            <Title
              order={4}
              fw={500}
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: `${Math.max(width - 80, 100)}px`,
              }}
            >
              {fullName}
            </Title>
            <Conditional condition={chat?.recentMessage?.updatedAt}>
              <Text size="xs" c="dimmed" style={{ flexShrink: 0 }}>
                {formatSideBarChatDate(chat?.recentMessage?.createdAt)}
              </Text>
            </Conditional>
          </Group>
          <Conditional condition={chat?.recentMessage?.message}>
            <Text
              size="xs"
              c="dimmed"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: `${Math.max(width - 20, 100)}px`,
              }}
            >
              {chat?.recentMessage?.message}
            </Text>
          </Conditional>
        </Box>
      </UnstyledButton>
    </>
  );
};
