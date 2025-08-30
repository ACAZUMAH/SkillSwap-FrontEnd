import {
  ActionIcon,
  Box,
  Divider,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useResponsive } from "../context";
import { Message, User } from "src/interfaces";
import { useAppChats, useAppSettings } from "src/hooks";
import { Conditional } from "src/components";
import classes from "../styles/index.module.css";
import { formatMessageDate } from "src/helpers/date";

interface SearchMessagesProps {
  currentUser?: User;
}

export const SearchMessages: React.FC<SearchMessagesProps> = ({
  currentUser,
}) => {
  const [search, setSearch] = useState("");
  const [searchedMessages, setSearchedMessages] = useState<Message[]>([]);
  const { chats, activeChat } = useAppChats();
  const currentChat = chats[activeChat!];
  const { closeSearch } = useResponsive();
  const { isDarkMode } = useAppSettings();
  const chatUser =
    currentChat?.users?.sender?.id !== currentUser?.id
      ? currentChat?.users?.sender?.firstName!
      : currentChat?.users?.receiver?.firstName!;

  useEffect(() => {
    if (search.trim()) {
      const filteredMessages = currentChat?.messages?.filter((message) =>
        message?.message?.toLowerCase().includes(search.toLowerCase())
      );
      setSearchedMessages((filteredMessages || []).filter((msg) => !!msg));
    } else {
      setSearchedMessages([]);
    }
  }, [search, currentChat?.messages]);

  return (
    <>
      <Box ml="0">
        <Group justify="space-between" mt="xs" mb="sm" p="4px 7px">
          <Text>Search Messages</Text>
          <ActionIcon variant="subtle" onClick={closeSearch}>
            <IconX size={16} />
          </ActionIcon>
        </Group>
        <Divider mb="md" />
        <ScrollArea style={{ maxHeight: "calc(100vh - 200px)" }}>
          <TextInput
            pr="7px"
            placeholder="Search messages"
            radius="lg"
            rightSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Conditional condition={!Boolean(search.trim())}>
            <Text
              mt="md"
              ta="center"
              c="dimmed"
              size="sm"
              fw={500}
            >{`Search for messages with ${chatUser}`}</Text>
          </Conditional>
          <Conditional
            condition={Boolean(search.trim() && !searchedMessages.length)}
          >
            <Text
              mt="md"
              ta="center"
              c="dimmed"
              size="sm"
              fw={500}
            >{`No messages found`}</Text>
          </Conditional>

          <Conditional condition={Boolean(searchedMessages.length)}>
            <Stack mt="md" gap={3} pr="7px">
              {searchedMessages.map((message, index) => (
                <Paper
                  key={index}
                  px="sm"
                  py="sm"
                  className={classes.searchMessage}
                >
                  <Text size="xs" c={isDarkMode ? "gray.5" : "gray.6"}>
                    {formatMessageDate(message?.createdAt)}
                  </Text>
                  <Text size="md" c={isDarkMode ? "dark.0" : "dark.9"}>
                    {message?.message}
                  </Text>
                </Paper>
              ))}
            </Stack>
          </Conditional>
        </ScrollArea>
      </Box>
    </>
  );
};
