import { Box, Text } from "@mantine/core";
import React from "react";
import { useAppSettings } from "src/hooks";

export const EmptyMessages: React.FC = () => {
  const { isDarkMode } = useAppSettings();
  return (
    <Box
      style={{
        flex: 1,
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <Text size="lg" c={isDarkMode ? "gray.4" : "gray.6"} ta="center">
        No messages yet. Start a conversation!
      </Text>
    </Box>
  );
};
