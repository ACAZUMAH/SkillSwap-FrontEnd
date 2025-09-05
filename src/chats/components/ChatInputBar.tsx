import { ActionIcon, Group, TextInput } from "@mantine/core";
import { IconMoodSmile, IconPaperclip, IconSend2 } from "@tabler/icons-react";
import React from "react";
import { useAppChats } from "src/hooks/useAppChats";
import { MessageType, User } from "src/interfaces";
import { useSocket } from "src/hooks";
import { Conditional } from "src/components";
import { EmojiPickerMenu } from "./EmojiPicker";
import classes from "../styles/index.module.css";
import { FileUploadMenu } from "./FileUploadMenu";
import { useInputBarActions } from "../hooks/useChatInputBarActions";
import { useUploadFile } from "../hooks/useUploadFile";
import { getMessageType } from "../helper";
import { FilePreview } from "./FilePreview";

interface ChatInputBarProps {
  currentUser?: User;
  selectedChat?: any; // TODO: Define a proper type for selectedChat
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({
  currentUser,
  selectedChat,
}) => {
  const {
    showEmojiPicker,
    showFileMenu,
    emojiButtonRef,
    emojiPickerRef,
    fileMenuRef,
    fileButtonRef,
    message,
    setMessage,
    toggleEmojiPicker,
    toggleFileMenu,
    handleEmojiClick,
    uploading,
    setUploading,
    setSelectedFile,
    selectedFile,
    setPreviewFile,
    previewFile,
    opened,
    open,
    close,
    setShowFileMenu,
  } = useInputBarActions();

  const { activeChat } = useAppChats();
  const { socket } = useSocket();
  const { uploadFile } = useUploadFile();

  const sendTextMessageHandler = async () => {
    socket?.emit("sendMessage", {
      from: currentUser?.id,
      to:
        selectedChat?.users?.sender?.id !== currentUser?.id
          ? selectedChat?.users?.sender?.id
          : selectedChat?.users?.receiver?.id,
      chatId: selectedChat?.id || activeChat!,
      message: {
        messageType: MessageType.Text,
        senderId: currentUser?.id!,
        message,
        mediaUrl: "",
      },
      users: {
        senderId: selectedChat?.users?.sender.id,
        receiverId: selectedChat?.users?.receiver.id,
      },
    });
    setMessage("");
  };

  const sendFileMessageHandler = async (file: File) => {
    setUploading(true);
    const mediaUrl = await uploadFile(file);
    const messageType = getMessageType(file);

    socket?.emit("sendMessage", {
      from: currentUser?.id,
      to:
        selectedChat?.users?.sender?.id !== currentUser?.id
          ? selectedChat?.users?.sender?.id
          : selectedChat?.users?.receiver?.id,
      chatId: selectedChat?.id || activeChat!,
      message: {
        messageType,
        senderId: currentUser?.id!,
        message: file.name,
        mediaUrl,
      },
      users: {
        senderId: selectedChat?.users?.sender.id,
        receiverId: selectedChat?.users?.receiver.id,
      },
    });
    setSelectedFile(null);
    setUploading(false);
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setPreviewFile(file);
    setShowFileMenu(false);
    open();
  };

  return (
    <>
      <Group px="md" py="sm" className={classes.chatInputBar}>
        <div ref={emojiButtonRef}>
          <ActionIcon variant="transparent" mb="xs" onClick={toggleEmojiPicker}>
            <IconMoodSmile stroke={1.5} size={30} />
          </ActionIcon>
          <Conditional condition={showEmojiPicker}>
            <EmojiPickerMenu
              onEmojiClick={handleEmojiClick}
              pickerRef={emojiPickerRef}
            />
          </Conditional>
        </div>
        <div ref={fileButtonRef}>
          <ActionIcon variant="transparent" mb="xs" onClick={toggleFileMenu}>
            <IconPaperclip stroke={1.5} size={30} />
          </ActionIcon>
          <Conditional condition={showFileMenu}>
            <FileUploadMenu
              menuRef={fileMenuRef}
              onFileSelect={handleFileSelect}
            />
          </Conditional>
        </div>
        <TextInput
          placeholder="Type your message..."
          radius="lg"
          style={{ flex: 1 }}
          size="md"
          mb="xs"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendTextMessageHandler()}
        />
        <ActionIcon
          className={classes.button}
          variant="transparent"
          mb="xs"
          onClick={sendTextMessageHandler}
          disabled={!message.trim()}
        >
          <IconSend2 stroke={1.5} size={30} />
        </ActionIcon>
      </Group>

      <Conditional condition={Boolean(selectedFile)}>
        <FilePreview
          file={previewFile}
          opened={opened}
          onClose={close}
          uploading={uploading}
          onSend={sendFileMessageHandler}
        />
      </Conditional>
    </>
  );
};
