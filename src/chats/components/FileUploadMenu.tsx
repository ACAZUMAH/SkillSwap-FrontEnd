import React from "react";
import { Paper, Stack, Button, FileButton } from "@mantine/core";
import { IconPhoto, IconVideo, IconFile } from "@tabler/icons-react";
import classes from "../styles/index.module.css";

interface FileUploadMenuProps {
  onFileSelect: (file: File) => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
}

export const FileUploadMenu: React.FC<FileUploadMenuProps> = ({
  onFileSelect,
  menuRef,
}) => {

  const handleFileChange = (file: File | null) => {
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <Paper
      ref={menuRef}
      shadow="md"
      p="sm"
      className={classes.fileMenuContainer}
    >
      <Stack gap="xs">
        <FileButton accept="image/*" onChange={handleFileChange}>
          {(props) => (
            <Button
              variant="subtle"
              leftSection={<IconPhoto size={20} />}
              fullWidth
              justify="flex-start"
              {...props}
            >
              Image
            </Button>
          )}
        </FileButton>

        <FileButton accept="video/*" onChange={handleFileChange}>
          {(props) => (
            <Button
              variant="subtle"
              leftSection={<IconVideo size={20} />}
              fullWidth
              justify="flex-start"
              {...props}
            >
              Video
            </Button>
          )}
        </FileButton>

        <FileButton accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange}>
          {(props) => (
            <Button
              variant="subtle"
              leftSection={<IconFile size={20} />}
              fullWidth
              justify="flex-start"
              {...props}
            >
              Document
            </Button>
          )}
        </FileButton>
      </Stack>
    </Paper>
  );
};
