import {
  Box,
  Button,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { useChangePasswordForm } from "../hooks/useChangePasswordForm";
import { useChangePasswordMutation } from "../hooks/useChangePasswordMutation";
import { PasswordOtpModal } from "./PasswordOtpModal";

export const PasswordSettingsTab: React.FC = () => {
  const [showOtpModal, setShowOtpModal] = React.useState(false);

  const form = useChangePasswordForm();
  const { updateHandler, loading } = useChangePasswordMutation();

  const handleSubmit = async () => {
    const res = await updateHandler({
      oldPassword: form.values.currentPassword,
      newPassword: form.values.confirmNewPassword,
    })

    if(res){
      setShowOtpModal(true);
      form.resetForm();
    }
  }

  return (
    <>
      <Paper withBorder p="xl" h="100%">
        <Title order={3} mb="md" fw={500}>
          PASSWORD SETTINGS
        </Title>
        <Box>
          <PasswordInput
            withAsterisk
            c="dimmed"
            name="currentPassword"
            label="Current Password"
            placeholder="Enter your current password"
            type="password"
            mt="md"
            value={form.values.currentPassword}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.currentPassword && form.errors.currentPassword}
          />
          <PasswordInput
            withAsterisk
            c="dimmed"
            name="newPassword"
            label="New Password"
            placeholder="Enter your new password"
            type="password"
            mt="md"
            value={form.values.newPassword}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.newPassword && form.errors.newPassword}
          />
          <PasswordInput
            withAsterisk
            c="dimmed"
            name="confirmNewPassword"
            label="Confirm New Password"
            placeholder="Confirm your new password"
            type="password"
            mt="md"
            value={form.values.confirmNewPassword}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={
              form.touched.confirmNewPassword && form.errors.confirmNewPassword
            }
          />
          <Text mt="md" c="gray.6">
            Password must be at least 8 characters long, include (A-Z), (a-z),
            (1-9), and a special character
          </Text>
          <Group justify="flex-end" mt="md">
            <Button variant="outline" mt="sm" onClick={handleSubmit} loading={loading}>
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

      <PasswordOtpModal opened={showOtpModal} onClose={() => setShowOtpModal(!showOtpModal)}/>
    </>
  );
};
