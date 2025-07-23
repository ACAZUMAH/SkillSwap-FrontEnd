import {
  ActionIcon,
  Box,
  Center,
  Group,
  Loader,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { IconDotsVertical, IconSearch } from "@tabler/icons-react";
import React from "react";
import { User } from "src/interfaces";
import { ChatListitem } from "./ChatListitem";
import { useAppChats } from "src/hooks/useAppChats";
import { Conditional } from "src/components";

interface SidebarProps {
  currentUser?: User;
  //chats?: Chats;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentUser }) => {
  const { chats, setActiveChat, activeChat, loadingChats } = useAppChats();
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
      <Conditional condition={loadingChats}>
        <Center>
          <Loader size="md" type="dots" />
        </Center>
      </Conditional>
      <Conditional condition={!loadingChats && Object.keys(chats).length === 0}>
        <Box p="md" style={{ textAlign: "center" }}>
          <Title order={4} c="dimmed">
            No chats available
          </Title>
        </Box>
      </Conditional>
      <Conditional condition={!loadingChats && Object.keys(chats).length > 0}>
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
      </Conditional>
    </Box>
  );
};
