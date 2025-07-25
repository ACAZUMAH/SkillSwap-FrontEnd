import { ActionIcon, Group, TextInput } from "@mantine/core";
import { IconMoodSmile, IconPaperclip, IconSend2 } from "@tabler/icons-react";
import React from "react";
import { useAppChats } from "src/hooks/useAppChats";
import classes from "../styles/index.module.css";
import { MessageType, User } from "src/interfaces";
import { useSocket } from "src/hooks";

interface ChatInputBarProps {
  currentUser?: User;
  selectedChat?: any; // TODO: Define a proper type for selectedChat
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({
  currentUser,
  selectedChat,
}) => {
  const [message, setMessage] = React.useState("");
  const { activeChat } = useAppChats();
  const { socket } = useSocket();

  const sendMeassageHandler = async () => {
    socket?.emit("sendMessage", {
      from: currentUser?.id,
      to:
        selectedChat?.users?.sender?.id !== currentUser?.id
          ? selectedChat?.users?.sender?.id
          : selectedChat?.users?.receiver?.id,
      chatId: selectedChat?.id || activeChat!,
      message: {
        messageType: MessageType.Text,
        sender: currentUser?.id!,
        message,
        mediaUrl: "",
      },
      users: {
        sender: selectedChat?.users?.sender.id,
        receiver: selectedChat?.users?.receiver.id,
      },
    });
    setMessage("");
  };

  return (
    <Group
      px="md"
      py="sm"
      style={{ borderTop: "0.1px solid var(--mantine-color-gray-7)" }}
    >
      <ActionIcon variant="transparent" mb="xs">
        <IconMoodSmile stroke={1.5} size={30} />
      </ActionIcon>
      <ActionIcon variant="transparent" mb="xs">
        <IconPaperclip stroke={1.5} size={30} />
      </ActionIcon>
      <TextInput
        placeholder="Type your message..."
        radius="lg"
        style={{ flex: 1 }}
        size="md"
        mb="xs"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMeassageHandler()}
      />

      <ActionIcon
        className={classes.button}
        variant="transparent"
        mb="xs"
        onClick={sendMeassageHandler}
        disabled={!message}
      >
        <IconSend2 stroke={1.5} size={30} />
      </ActionIcon>
    </Group>
  );
};
