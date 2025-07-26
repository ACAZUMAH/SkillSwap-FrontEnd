import { Box, Text } from "@mantine/core";
import React from "react";
import { useAppSettings } from "src/hooks";
import classes from "../styles/index.module.css";
export const EmptyMessages: React.FC = () => {
  const { isDarkMode } = useAppSettings();
  return (
    <Box className={classes.emptyMessages}>
      <Text size="lg" c={isDarkMode ? "gray.4" : "gray.6"} ta="center">
        No messages yet. Start a conversation!
      </Text>
    </Box>
  );
};
