import React, { useRef } from "react";
import { Paper, Stack, Button } from "@mantine/core";
import { IconPhoto, IconVideo, IconFile } from "@tabler/icons-react";
import classes from "../styles/index.module.css";

interface FileUploadMenuProps {
  onFileSelect?: (file: File) => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
}

export const FileUploadMenu: React.FC<FileUploadMenuProps> = ({
  onFileSelect,
  menuRef,
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
    // Reset input
    event.target.value = "";
  };

  return (
    <Paper
      ref={menuRef}
      shadow="md"
      p="sm"
      className={classes.fileMenuContainer}
    >
      <Stack gap="xs">
        <Button
          variant="subtle"
          leftSection={<IconPhoto size={20} />}
          onClick={() => imageInputRef.current?.click()}
          fullWidth
          justify="flex-start"
        >
          Image
        </Button>

        <Button
          variant="subtle"
          leftSection={<IconVideo size={20} />}
          onClick={() => videoInputRef.current?.click()}
          fullWidth
          justify="flex-start"
        >
          Video
        </Button>

        <Button
          variant="subtle"
          leftSection={<IconFile size={20} />}
          onClick={() => fileInputRef.current?.click()}
          fullWidth
          justify="flex-start"
        >
          Document
        </Button>
      </Stack>

      {/* Hidden file inputs */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </Paper>
  );
};
