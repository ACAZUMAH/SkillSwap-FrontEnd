import { Box } from "@mantine/core";
import { ChatInputBar } from "./ChatInputBar";
import { ChatHeader } from "./ChatHeader";
import { ChatContainer } from "./ChatContainer";
import { useAppChats } from "src/hooks/useAppChats";
import { User } from "src/interfaces";
import classes from "../styles/index.module.css";

interface OpenedChatProps {
  currentUser?: User;
  loadingMessages?: boolean;
}

export const OpenedChat: React.FC<OpenedChatProps> = ({
  currentUser,
  loadingMessages,
}) => {
  const { chats, activeChat } = useAppChats();
  return (
    <>
      <Box className={classes.openedChat}>
        {/* Header */}
        <ChatHeader currentUser={currentUser} />
        {/* Messages */}
        <ChatContainer
          currentUser={currentUser}
          loadingMessages={loadingMessages}
        />
        {/* Input */}
        <ChatInputBar
          currentUser={currentUser}
          selectedChat={chats[activeChat!]}
        />
      </Box>
    </>
  );
};
