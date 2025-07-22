import { Avatar, rem, Stack, Text, Title, UnstyledButton } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import React from "react";
import { getInitialsNameLatter } from "src/helpers";
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
              ? "rgba(0, 0, 0, 0.15)"
              : "transparent",
          padding: rem(8),
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
          <>
            <Title order={4} fw={500}>
              {chat?.users?.sender?.id !== currentUser?.id
                ? chat?.users?.sender?.firstName
                : chat?.users?.receiver?.firstName}
            </Title>
            <Text ml="auto" size="xs" c="dimmed">
              {chat?.updatedAt && chat?.recentMessage
                ? new Date(chat.updatedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""}
            </Text>
          </>
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
            {chat?.recentMessage?.message || "No messages yet"}
          </Text>
        </Stack>
      </UnstyledButton>
    </>
  );
};
