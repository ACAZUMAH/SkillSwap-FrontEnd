import { IconFile, IconHome2, IconVideo } from "@tabler/icons-react";
import { Message, MessagesStatus, MessageType } from "src/interfaces";

export const createMessageStatus = (message: Message) => {
  if (message?.status === MessagesStatus.Delivered) {
    return "Delivered";
  } else if (message?.status === MessagesStatus.Read) {
    return "Read";
  } else {
    return "Sent";
  }
};

export const getMessageType = (file: File): MessageType => {
  const fileType = file.type;

  if (fileType.startsWith("image/")) return MessageType.Image;

  if (fileType.startsWith("video/")) return MessageType.Video;

  return MessageType.Document;
};

export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const getFileIcon = (file: File): typeof IconHome2 | null => {
  if (file.type.startsWith("image/")) return null;
  if (file.type.startsWith("video/")) return IconVideo;
  return IconFile;
};
