import { ActionIcon, Avatar, Group, Menu, Stack, Text } from "@mantine/core";
import {
  IconDotsVertical,
  IconSearch,
  IconTrash,
  IconVideo,
} from "@tabler/icons-react";
import React from "react";
import { getInitialsNameLatter } from "src/helpers";
import { User } from "src/interfaces";

interface ChatHeaderProps {
  selectedChat?: any // TODO: Define a proper type for selectedChat
  currentUser?: User;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  selectedChat,
  currentUser,
}) => {
  return (
    <Group px="sm" py="xs" justify="space-between">
      <Group>
        <Avatar
          src={
            selectedChat?.users?.sender?.id !== currentUser?.id
              ? selectedChat?.users?.sender?.profile_img
              : selectedChat?.users?.receiver?.profile_img
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
              selectedChat?.users?.sender?.id !== selectedChat?.id
                ? selectedChat?.users?.sender?.firstName!
                : selectedChat?.users?.receiver?.firstName!
            )}
          </Text>
        </Avatar>
        <Stack gap={0}>
          <Text size="lg" fw={600}>
            {selectedChat?.users?.sender?.id !== selectedChat?.id
              ? selectedChat?.users?.sender?.firstName!
              : selectedChat?.users?.receiver?.firstName!}
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
