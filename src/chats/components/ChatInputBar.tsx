import { ActionIcon, Group, TextInput } from "@mantine/core";
import { IconMoodSmile, IconPaperclip, IconSend2 } from "@tabler/icons-react";
import React from "react";

export const ChatInputBar: React.FC = () => {
  return (
    <Group px="md" py="sm">
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
        onChange={() => {}}
        onKeyDown={(e) => e.key === "Enter"}
      />

      <ActionIcon variant="transparent" mb="xs" onClick={() => {}}>
        <IconSend2 stroke={1.5} size={30} />
      </ActionIcon>
    </Group>
  );
};
