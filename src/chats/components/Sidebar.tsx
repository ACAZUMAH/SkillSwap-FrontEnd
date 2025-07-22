import { ActionIcon, Box, Group, Stack, TextInput, Title } from "@mantine/core";
import { IconDotsVertical, IconSearch } from "@tabler/icons-react";
import React from "react";
import { User } from "src/interfaces";
import { ChatListitem } from "./ChatListitem";
import { useAppChats } from "src/hooks/useAppChats";

interface SidebarProps {
  currentUser?: User;
  //chats?: Chats;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentUser }) => {
  const { chats, setActiveChat, activeChat } = useAppChats();
  return (
    <Box
      w="25%"
      p="sm"
      style={{
        overflowY: "auto",
      }}
    >
      <Group justify="space-between" mb="md">
        <Title order={3} fw={500}>
          Chats
        </Title>
        <ActionIcon variant="transparent" size="md">
          <IconDotsVertical />
        </ActionIcon>
      </Group>
      <TextInput
        placeholder="Search"
        mb="md"
        leftSection={<IconSearch stroke={1.5} size={20} />}
      />
      <Stack gap="xs">
        {Object.entries(chats).map(([chatId, chat]) => (
          <ChatListitem
            key={chatId}
            chat={chat}
            currentUser={currentUser}
            setActiveChat={setActiveChat}
            activeChat={activeChat}
          />
        ))}
      </Stack>
    </Box>
  );
};
