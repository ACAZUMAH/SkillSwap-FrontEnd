import { useDisclosure } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";

export const useInputbarActions = () => {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLDivElement>(null);
  const fileMenuRef = useRef<HTMLDivElement>(null);
  const fileButtonRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleEmojiPicker = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEmojiPicker(!showEmojiPicker);
    setShowFileMenu(false);
  };

  const toggleFileMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFileMenu(!showFileMenu);
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emoji: any) => {
    setMessage((prev) => (prev += emoji.emoji));
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(target) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(target)
      ) {
        setShowEmojiPicker(false);
      }

      if (
        fileMenuRef.current &&
        !fileMenuRef.current.contains(target) &&
        fileButtonRef.current &&
        !fileButtonRef.current.contains(target)
      ) {
        setShowFileMenu(false);
      }
    };

    if (showEmojiPicker || showFileMenu) {
      const timer = setTimeout(() => {
        document.addEventListener("click", handleOutsideClick);
      }, 100);
      return () => {
        clearTimeout(timer);
        document.removeEventListener("click", handleOutsideClick);
      };
    }
  }, [showEmojiPicker, showFileMenu]);

  return {
    showEmojiPicker,
    setShowEmojiPicker,
    emojiPickerRef,
    emojiButtonRef,
    showFileMenu,
    setShowFileMenu,
    fileMenuRef,
    fileButtonRef,
    fileInputRef,
    message,
    setMessage,
    toggleEmojiPicker,
    toggleFileMenu,
    handleEmojiClick,
    uploading,
    setUploading,
    selectedFile,
    setSelectedFile,
    previewFile,
    setPreviewFile,
    opened,
    open,
    close,
  };
};
