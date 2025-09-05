import { ActionIcon, Group, Menu, Stack, Text } from "@mantine/core";
import {
  IconArrowLeft,
  IconBook,
  IconDotsVertical,
  IconEye,
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
import { ReviewModal } from "src/components/reviews/components/ReviewsModal";
import { useSocket } from "src/hooks";

interface ChatHeaderProps {
  currentUser?: User;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ currentUser }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedReview, { open: openReview, close: closeReview }] =
    useDisclosure(false);
  const { toggleSearch, isMobile, setShowSidebar, setShowChat } =
    useResponsive();
  const { isUserOnline, isUserTyping } = useSocket();
  const { chats, activeChat } = useAppChats();
  const { setVideoCall } = useAppVideoCall();
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
  };
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
              <Text size="sm" c="dimmed">
                {isUserOnline &&
                isUserOnline(
                  currentChat?.users?.sender?.id !== currentUser?.id
                    ? currentChat.users?.senderId!
                    : currentChat.users?.receiverId!
                )
                  ? isUserTyping &&
                    isUserTyping(
                      currentChat.id,
                      currentChat?.users?.sender?.id !== currentUser?.id
                        ? currentChat.users?.senderId!
                        : currentChat.users?.receiverId!
                    )
                    ? "typing..."
                    : "Online"
                  : "Offline"}
              </Text>
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
          <Menu trigger="hover" width={150} offset={10}>
            <Menu.Target>
              <ActionIcon variant="subtle">
                <IconDotsVertical size={18} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconEye stroke={1} />}
                onClick={open}
                mb="4px"
              >
                View Swap
              </Menu.Item>
              <Menu.Item
                leftSection={<IconBook stroke={1} />}
                onClick={openReview}
                mb="4px"
              >
                Review
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
      <SwapModal
        opened={opened}
        onClose={close}
        senderId={currentChat.users?.senderId!}
        receiverId={currentChat.users?.receiverId!}
      />

      <ReviewModal
        isOpen={openedReview}
        onClose={closeReview}
        revieweeName={
          currentChat?.users?.sender?.id !== currentUser?.id
            ? `${currentChat?.users?.sender?.firstName!} ${currentChat?.users
                ?.sender?.lastName!}`
            : `${currentChat?.users?.receiver?.firstName!} ${currentChat?.users
                ?.receiver?.lastName!}`
        }
        revieweeId={
          currentChat?.users?.senderId !== currentUser?.id
            ? currentChat?.users?.senderId!
            : currentChat?.users?.receiverId!
        }
      />
    </>
  );
};
