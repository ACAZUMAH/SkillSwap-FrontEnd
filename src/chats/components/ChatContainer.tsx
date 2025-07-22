import { Box, Paper, Stack } from "@mantine/core";
import React, { useRef, useState } from "react";

interface Message {
  id: number;
  text: string;
  sender: "me" | "them";
}

interface ChatcontainerProps {
  selectedUser: string;
}

export const ChatContainer: React.FC<ChatcontainerProps> = ({
  selectedUser,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, _setMessages] = useState<{ [user: string]: Message[] }>({
    Mohammed: [
      { id: 1, text: "Hello, how can I help?", sender: "them" },
      { id: 2, text: "I need help with TypeScript.", sender: "me" },
    ],
    Zainab: [],
    "Jane Doe": [],
  });

  return (
    <Box
      style={{
        flex: 1,
        height: "80vh",
        width: "100%",
        padding: "10px 16px",
        overflowY: "auto",
      }}
    >
      <Stack style={{ height: "100%", width: "100%", left: 0, top: 0 }}>
        {(messages[selectedUser] || []).map((msg) => (
          <Paper
            key={msg.id}
            radius="lg"
            px="md"
            py="xs"
            style={{
              maxWidth: "80%",
              alignSelf: msg.sender === "me" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "me" ? "#228be6" : "#228be6",
            }}
          >
            {msg.text}
          </Paper>
        ))}
        <div ref={messagesEndRef} />
      </Stack>
    </Box>
  );
};
