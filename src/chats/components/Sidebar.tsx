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
import {
  IconArrowLeft,
  IconDotsVertical,
  IconSearch,
} from "@tabler/icons-react";
import React from "react";
import { User } from "src/interfaces";
import { ChatListitem } from "./ChatListitem";
import { Conditional } from "src/components";
import classes from "../styles/index.module.css";
import { useSideBarActions } from "../hooks/useSideBarActions";
import { useResponsive } from "../context";
interface SidebarProps {
  currentUser?: User;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentUser }) => {
  const {
    search,
    setSearch,
    chats,
    sortedChats,
    sortedFilteredChats,
    activeChat,
    setActiveChat,
    loadingChats,
    unreadCounts,
  } = useSideBarActions();
  const { isMobile, setShowChat, setShowSidebar } = useResponsive();

  const handleBackToChat = () => {
    if (isMobile && activeChat) {
      setShowChat(true);
      setShowSidebar(false);
    }
  };

  return (
    <Box className={classes.chatSidebar}>
      <Group justify="space-between" mb="md">
        <Group gap="sm">
          <Conditional condition={isMobile && Boolean(activeChat)}>
            <ActionIcon
              variant="transparent"
              size="md"
              onClick={handleBackToChat}
            >
              <IconArrowLeft />
            </ActionIcon>
          </Conditional>
          <Title order={3} fw={500}>
            Chats
          </Title>
        </Group>
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
      <Conditional condition={!search.trim()}>
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
            {sortedChats.map((chat) => (
              <ChatListitem
                key={chat.id}
                chat={chat}
                currentUser={currentUser}
                setActiveChat={setActiveChat}
                activeChat={activeChat}
                unreadCount={unreadCounts[chat.id] || 0}
              />
            ))}
          </Stack>
        </Conditional>
      </Conditional>
      <Conditional condition={Boolean(search.trim())}>
        <Conditional
          condition={Boolean(search.trim()) && sortedFilteredChats.length === 0}
        >
          <Text mt="lg" ta="center" c="dimmed" size="md" fw={500}>
            No chats found for "{search}"
          </Text>
        </Conditional>
        <Conditional condition={sortedFilteredChats.length > 0}>
          <Stack gap="xs" mt="md">
            {sortedFilteredChats.map((chat) => (
              <ChatListitem
                key={chat.id}
                chat={chat}
                currentUser={currentUser}
                setActiveChat={setActiveChat}
                activeChat={activeChat}
                unreadCount={unreadCounts[chat.id] || 0}
              />
            ))}
          </Stack>
        </Conditional>
      </Conditional>
    </Box>
  );
};
