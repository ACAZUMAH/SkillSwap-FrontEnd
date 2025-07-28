import {
  ActionIcon,
  Box,
  Center,
  Group,
  Loader,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconDotsVertical, IconSearch } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { User } from "src/interfaces";
import { ChatListitem } from "./ChatListitem";
import { useAppChats } from "src/hooks/useAppChats";
import { Conditional } from "src/components";
import classes from "../styles/index.module.css";
interface SidebarProps {
  currentUser?: User;
  //chats?: Chats;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentUser }) => {
  const [search, setSearch] = useState("");
  const [filteredChats, setFilteredChats] = useState<any[]>([]);
  const { chats, setActiveChat, activeChat, loadingChats } = useAppChats();

  useEffect(() => {
    if (search) {
      const filteredChats = Object.values(chats).filter(
        (chat) =>
          chat?.users?.sender?.firstName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          chat?.users?.receiver?.firstName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          chat?.users?.sender?.lastName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          chat?.users?.receiver?.lastName
            ?.toLowerCase()
            .includes(search.toLowerCase())
      );
      setFilteredChats(filteredChats);
    } else {
      setFilteredChats(Object.values(chats));
    }
  }, [search]);

  return (
    <Box className={classes.chatSidebar}>
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
        radius="lg"
        leftSection={<IconSearch stroke={1.5} size={20} />}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Conditional condition={!filteredChats.length && !search.trim()}>
        <Conditional condition={loadingChats}>
          <Center>
            <Loader size="md" type="dots" />
          </Center>
        </Conditional>
        <Conditional
          condition={!loadingChats && Object.keys(chats).length === 0}
        >
          <Text ta="center" c="dimmed" size="md" fw={500}>
            No chats available
          </Text>
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
      </Conditional>

      <Conditional
        condition={Boolean(search.trim()) && filteredChats.length === 0}
      >
        <Text mt="lg" ta="center" c="dimmed" size="md" fw={500}>
          No chats found for "{search}"
        </Text>
      </Conditional>

      <Conditional condition={filteredChats.length > 0}>
        <Stack gap="xs" mt="md">
          {filteredChats.map((chat) => (
            <ChatListitem
              key={chat.id}
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
