import {
  Box,
  Button,
  Divider,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import React from "react";

export const PasswordSettingsTab: React.FC = () => {
  return (
    <Paper withBorder p="xl" h="100%">
      <Title order={3} mb="md" fw={500}>
        PASSWORD SETTINGS
      </Title>
      <Box>
        <TextInput
          withAsterisk
          c="dimmed"
          label="Current Password"
          placeholder="Enter your current password"
          type="password"
          mt="md"
        />
        <TextInput
          withAsterisk
          c="dimmed"
          label="New Password"
          placeholder="Enter your new password"
          type="password"
          mt="md"
        />
        <TextInput
          withAsterisk
          c="dimmed"
          label="Confirm New Password"
          placeholder="Confirm your new password"
          type="password"
          mt="md"
        />
        <Text mt="md" c="gray.6">
          Password must be at least 8 characters long, include (A-Z), (a-z),
          (1-9), and a special character
        </Text>
        <Group justify="flex-end" mt="md">
          <Button variant="outline" mt="sm">
            Save Password
          </Button>
        </Group>
      </Box>

      <Divider my="xl" />

      <Box>
        <Title order={4} mt="sm" fw={450}>
          EMAIL VERIFICATION
        </Title>
        <Text c="dimmed" mt="xs">
          Your email is not verified with SkillSwap. Click Verify Now to
          complete email verification
        </Text>
        <Button variant="outline" mt="md">
          Verify Now
        </Button>
      </Box>
    </Paper>
  );
};
