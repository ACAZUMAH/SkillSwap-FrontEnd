import { Box, Divider } from "@mantine/core";
import { ChatInputBar } from "./ChatInputBar";
import { ChatHeader } from "./ChatHeader";
import { ChatContainer } from "./ChatContainer";
import { useAppChats } from "src/hooks/useAppChats";
import { User } from "src/interfaces";

interface OpenedChatProps {
  selectedUser: string;
  currentUser?: User;
}

export const OpenedChat: React.FC<OpenedChatProps> = ({ currentUser }) => {
  const { chats, activeChat } = useAppChats();
  return (
    <>
      <Box style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <ChatHeader currentUser={currentUser} />
        <Divider />
        {/* Messages */}
        <ChatContainer currentUser={currentUser} />
        {/* Input */}
        <Divider />
        <ChatInputBar
          currentUser={currentUser}
          selectedChat={chats[activeChat!]}
        />
      </Box>
    </>
  );
};
