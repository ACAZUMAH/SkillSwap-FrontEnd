import { Image, Modal, Paper, Stack, Text } from "@mantine/core";
import React from "react";
import { formatFileSize, getFileIcon, getMessageType } from "../helper";
import { Conditional } from "src/components";
import { MessageType } from "src/interfaces";

interface FilePreviewProps {
  file: File | null;
  opened: boolean;
  onClose: () => void;
  onSend: (file: File) => void;
  uploading: boolean;
}

export const FilePreview: React.FC<FilePreviewProps> = ({
  file,
  opened,
  onClose,
}) => {
  const FileIcon = getFileIcon(file!);
  const filesize = formatFileSize(file!.size);
  const messageType = getMessageType(file!);

  return (
    <Modal opened={opened} onClose={onClose}>
      <Conditional condition={messageType === MessageType.Image}>
        <Image
          src={URL.createObjectURL(file!)}
          style={{ maxHeight: "300px", maxWidth: "100%" }}
          fit="contain"
        />
      </Conditional>
      <Conditional condition={messageType === MessageType.Video}>
        <video
          src={URL.createObjectURL(file!)}
          controls
          style={{ maxHeight: "300px", maxWidth: "100%" }}
        />
      </Conditional>
      <Conditional condition={messageType === MessageType.Document}>
        <Paper p="xl" style={{ textAlign: "center" }}>
          {FileIcon ? <FileIcon size={48} /> : null}
          <Text mt="md" size="lg" fw={500}>
            {file?.name}
          </Text>
        </Paper>
      </Conditional>
      <Paper p="sm" style={{ backgroundColor: "var(--mantine-color-gray-0)" }}>
        <Stack gap="xs">
          <Text fw={500} truncate>
            {file?.name}
          </Text>
          <Text size="sm" c="dimmed">
            {filesize} • {file?.type || "Unknown type"}
          </Text>
        </Stack>
      </Paper>
    </Modal>
  );
};
