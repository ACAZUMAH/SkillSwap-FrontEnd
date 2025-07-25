import { ActionIcon, Avatar, Group, Menu, Stack, Text } from "@mantine/core";
import {
  IconDotsVertical,
  IconSearch,
  IconTrash,
  IconVideo,
} from "@tabler/icons-react";
import React from "react";
import { getInitialsNameLatter } from "src/helpers";
import { useAppChats } from "src/hooks/useAppChats";
import { User } from "src/interfaces";

interface ChatHeaderProps {
  currentUser?: User;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  currentUser,
}) => {
  const { chats, activeChat } = useAppChats();
  const currentChat = chats[activeChat!];
  return (
    <Group px="sm" py="xs" justify="space-between" style={{ borderBottom: "0.1px solid var(--mantine-color-gray-7)" }}>
      <Group>
        <Avatar
          src={
            currentChat?.users?.sender?.id !== currentUser?.id
              ? currentChat?.users?.sender?.profile_img
              : currentChat?.users?.receiver?.profile_img
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
              currentChat?.users?.sender?.id !== currentUser?.id
                ? currentChat?.users?.sender?.firstName!
                : currentChat?.users?.receiver?.firstName!
            )}
          </Text>
        </Avatar>
        <Stack gap={0}>
          <Text size="lg" fw={600}>
            {currentChat?.users?.sender?.id !== currentUser?.id
              ? currentChat?.users?.sender?.firstName!
              : currentChat?.users?.receiver?.firstName!}
          </Text>
          <Text size="sm" c="dimmed">
            online/offline
          </Text>
        </Stack>
      </Group>

      <Group gap="xs">
        <ActionIcon variant="subtle">
          <IconVideo size={25} />
        </ActionIcon>
        <ActionIcon variant="subtle">
          <IconSearch size={20} />
        </ActionIcon>
        <Menu shadow="md" width={160}>
          <Menu.Target>
            <ActionIcon variant="subtle">
              <IconDotsVertical size={18} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconTrash size={16} />}
              color="red"
              onClick={() => {}}
            >
              Delete chat
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
};
