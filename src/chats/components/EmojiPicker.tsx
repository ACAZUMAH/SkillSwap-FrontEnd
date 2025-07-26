import React from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useAppSettings } from "src/hooks";
import classes from "../styles/index.module.css";

interface EmojiPickerMenuProps {
  onEmojiClick: (emoji: any) => void;
  pickerRef?: React.RefObject<HTMLDivElement | null>;
}

export const EmojiPickerMenu: React.FC<EmojiPickerMenuProps> = ({ onEmojiClick, pickerRef }) => {
  const { isDarkMode } = useAppSettings();
  const theme = isDarkMode ? Theme.DARK : Theme.LIGHT;

  return (
    <>
      <div className={classes.emojiPickerContainer} ref={pickerRef}>
        <EmojiPicker
          onEmojiClick={(emoji) => onEmojiClick(emoji)}
          width={400}
          height={350}
          previewConfig={{ showPreview: false }}
          theme={theme}
        />
      </div>
    </>
  );
};
