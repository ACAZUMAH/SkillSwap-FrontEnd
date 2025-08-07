import { ActionIcon, Group, Stack, Text } from "@mantine/core";
import {
  IconArrowLeft,
  IconDotsVertical,
  IconSearch,
  IconVideo,
} from "@tabler/icons-react";
import React from "react";
import { useAppChats } from "src/hooks/useAppChats";
import { User } from "src/interfaces";
import classes from "../styles/index.module.css";
import { useResponsive } from "../context";
import { Conditional } from "src/components";
import { useDisclosure } from "@mantine/hooks";
import { UserAvatar } from "src/components/Avatar/UserAvatar";
import { SwapModal } from "src/swapManagement";
import { useAppVideoCall } from "src/hooks/useAppvideoCall";

interface ChatHeaderProps {
  currentUser?: User;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ currentUser }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { chats, activeChat } = useAppChats();
  const { setVideoCall } = useAppVideoCall();
  const { toggleSearch, isMobile, setShowSidebar, setShowChat } =
    useResponsive();
  const currentChat = chats[activeChat!];

  const handleBackToSidebar = () => {
    if (isMobile) {
      setShowChat(false);
      setShowSidebar(true);
    }
  };

  const handleVideoCall = () => {
    if (currentChat) {
      setVideoCall({
        roomId: currentChat.id,
        chatId: currentChat.id,
        users: currentChat.users,
        type: "outgoing",
      });
    }
  }
  return (
    <>
      <Group
        px="sm"
        py="xs"
        justify="space-between"
        className={classes.chatHeader}
      >
        <Group gap="sm">
          <Conditional condition={isMobile}>
            <ActionIcon
              variant="transparent"
              size="md"
              onClick={handleBackToSidebar}
              style={{ marginRight: "8px" }}
            >
              <IconArrowLeft />
            </ActionIcon>
          </Conditional>
          <Group>
            <UserAvatar
              url={
                currentChat?.users?.sender?.id !== currentUser?.id
                  ? currentChat?.users?.sender?.profile_img!
                  : currentChat?.users?.receiver?.profile_img!
              }
              name={
                currentChat?.users?.sender?.id !== currentUser?.id
                  ? currentChat?.users?.sender?.firstName!
                  : currentChat?.users?.receiver?.firstName!
              }
            />
            <Stack gap={0}>
              <Text size="lg" fw={600}>
                {currentChat?.users?.sender?.id !== currentUser?.id
                  ? currentChat?.users?.sender?.firstName!
                  : currentChat?.users?.receiver?.firstName!}
              </Text>
              {/* <Text size="sm" c="dimmed">
                online/offline
              </Text> */}
            </Stack>
          </Group>
        </Group>

        <Group gap="xs">
          <ActionIcon variant="subtle" onClick={handleVideoCall}>
            <IconVideo size={25} />
          </ActionIcon>
          <ActionIcon variant="subtle" onClick={toggleSearch}>
            <IconSearch size={20} />
          </ActionIcon>
          <ActionIcon variant="subtle" onClick={open}>
            <IconDotsVertical size={18} />
          </ActionIcon>
        </Group>
      </Group>
      <SwapModal
        opened={opened}
        onClose={close}
        senderId={currentChat.users?.senderId!}
        receiverId={currentChat.users?.receiverId!}
      />
    </>
  );
};
