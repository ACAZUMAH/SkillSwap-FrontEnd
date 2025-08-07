import {
  Badge,
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
import { formatSideBarChatDate } from "src/helpers/date";
import { useAppSettings } from "src/hooks";
import { MessageType, User } from "src/interfaces";
import { useResponsive } from "../context";
import { UserAvatar } from "src/components/Avatar/UserAvatar";
import {  IconCamera, IconFile, IconVideo } from "@tabler/icons-react";

interface ChatListitemProps {
  chat: any; // TODO: Define a proper type for chat
  currentUser?: User;
  setActiveChat: (chatId: string) => void;
  activeChat: string | null;
  unreadCount?: number;
}

export const ChatListitem: React.FC<ChatListitemProps> = ({
  chat,
  currentUser,
  setActiveChat,
  activeChat,
  unreadCount,
}) => {
  const { isMobile, setShowSidebar, setShowChat } = useResponsive();
  const settings = useAppSettings();
  const { hovered, ref } = useHover();
  const { ref: currentRef, width } = useElementSize();
  const fullName =
    chat?.users?.sender?.id !== currentUser?.id
      ? chat?.users?.sender?.firstName + " " + chat?.users?.sender?.lastName
      : chat?.users?.receiver?.firstName +
        " " +
        chat?.users?.receiver?.lastName;

  const handleChatClick = () => {
    setActiveChat(chat.id);

    if (isMobile) {
      setShowSidebar(false);
      setShowChat(true);
    }
  };

  return (
    <>
      <UnstyledButton
        ref={ref}
        key={chat?.id}
        onClick={handleChatClick}
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
        <UserAvatar
          url={
            chat?.users?.sender?.id !== currentUser?.id
              ? chat?.users?.sender?.profile_img
              : chat?.users?.receiver?.profile_img
          }
          name={
            chat?.users?.sender?.id !== currentUser?.id
              ? chat?.users?.sender?.firstName!
              : chat?.users?.receiver?.firstName!
          }
        />
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
          <Conditional condition={chat?.recentMessage?.message || unreadCount}>
            <Group wrap="nowrap" justify="space-between">
              <Conditional
                condition={
                  chat?.recentMessage?.messageType === MessageType.Text
                }
              >
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
              <Conditional
                condition={
                  chat?.recentMessage?.messageType ===
                  MessageType.Image
                }
              >
                <Group gap="3" align="center">
                  <IconCamera size={15} />
                  <Text size="xs" c="dimmed">
                    Image
                  </Text>
                </Group>
              </Conditional>
              <Conditional
                condition={
                  chat?.recentMessage?.messageType ===
                  MessageType.Video
                }
              >
                <Group gap="3" align="center">
                  <IconVideo size={15} />
                  <Text size="xs" c="dimmed">
                    Video
                  </Text>
                </Group>
              </Conditional>
              <Conditional
                condition={
                  chat?.recentMessage?.messageType ===
                  MessageType.Document
                }
              >
                <Group gap="3" align="center">
                  <IconFile size={15} />
                  <Text size="xs" c="dimmed">
                    Document
                  </Text>
                </Group>
              </Conditional>
              <Conditional condition={Boolean(unreadCount && unreadCount > 0)}>
                <Badge size="xs" circle>
                  {unreadCount}
                </Badge>
              </Conditional>
            </Group>
          </Conditional>
        </Box>
      </UnstyledButton>
    </>
  );
};
