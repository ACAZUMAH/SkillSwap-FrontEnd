import {
  Avatar,
  Group,
  rem,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
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

  return (
    <>
      {" "}
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
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
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
        <Stack gap={0} ml="sm" style={{ flex: 1 }}>
          <Group>
            <Title order={4} fw={500}>
              {chat?.users?.sender?.id !== currentUser?.id
                ? chat?.users?.sender?.firstName
                : chat?.users?.receiver?.firstName}
            </Title>
            <Conditional condition={chat?.recentMessage?.updatedAt}>
              <Text ml="auto" size="xs" c="dimmed">
                {formatSideBarChatDate(chat?.recentMessage?.updatedAt)}
              </Text>
            </Conditional>
          </Group>
          <Conditional condition={chat?.recentMessage?.message}>
            <Text
              size="xs"
              c="dimmed"
              style={{
                maxWidth: rem(200),
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {chat?.recentMessage?.message}
            </Text>
          </Conditional>
        </Stack>
      </UnstyledButton>
    </>
  );
};
