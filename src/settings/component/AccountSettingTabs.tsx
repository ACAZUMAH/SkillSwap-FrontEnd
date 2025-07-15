import {
  Box,
  Button,
  Divider,
  Group,
  List,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import React from "react";
import { useAppAuthentication } from "src/hooks";
import { usePersonalInfoForm } from "../hooks/usePersonalInfoForm";
import { getPhoneNumberWithoutCode } from "src/helpers/phone-numbers";
import { usePersonalInfoMutation } from "../hooks/usePersonalInfoMutation";

export const AccountSettingTabs: React.FC = () => {
  const { user } = useAppAuthentication();

  const form = usePersonalInfoForm(user);

  const { updateHandler, loading } = usePersonalInfoMutation()

  const handleSubmit = async () => {
    const update =  await updateHandler({
        firstName: form.values.firstName,
        lastName: form.values.lastName,
        email: form.values.email,
    })

    if (update?.id) {
      form.resetForm();
    }
  }

  return (
    <Paper withBorder p="xl" h="100%">
      <Title order={3} mb="md" fw={500}>
        ACCOUNT SETTINGS
      </Title>
      <Box mt="lg">
        <Group grow>
          <TextInput
            withAsterisk
            c="dimmed"
            label="First Name"
            name="firstName"
            placeholder="Enter your first name"
            value={form.values.firstName}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.firstName ? form.errors.firstName : ''}
          />
          <TextInput
            withAsterisk
            c="dimmed"
            label="Last Name"
            name="lastName"
            placeholder="Enter your last name"
            value={form.values.lastName}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.lastName ? form.errors.lastName : ''}
          />
        </Group>
        <Group grow mt="md">
          <TextInput
            withAsterisk
            c="dimmed"
            label="Email"
            name="email"
            placeholder="Enter your email"
            value={form.values.email}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.email ? form.errors.email : ''}
          />
          <TextInput
            withAsterisk
            c="dimmed"
            label="Phone Number"
            name="phoneNumber"
            placeholder="Enter your phone number"
            value={getPhoneNumberWithoutCode(form.values.phoneNumber)}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.phoneNumber ? form.errors.phoneNumber : ''}
            disabled
          />
        </Group>
        <Group justify="flex-end" mt="md" mb="md">
          <Button variant="outline" mt="sm" onClick={handleSubmit} loading={loading}>
            Save Changes
          </Button>
        </Group>
      </Box>
      <Divider my="xl" />

      <Box>
        <Title order={4} mb="sm" fw={450}>
          DELETE ACCOUNT
        </Title>
        <Text mb="xs" c="gray.6">
          What happens when you delete your account?
        </Text>
        <List mb="md" size="sm" spacing="xs">
          <List.Item c="gray.6">
            Your profile and all associated data will be permanently deleted.
          </List.Item>
          <List.Item c="gray.6">
            You will lose access to your swaps and any content you created.
          </List.Item>
          <List.Item c="gray.6">
            This action cannot be undone. Please proceed with caution.
          </List.Item>
        </List>
        <TextInput
          withAsterisk
          c="dimmed"
          label="Reason for Deletion"
          placeholder="Why are you deleting your account?"
          mb="md"
        />
        <Group justify="flex-end" mt="md">
          <Button variant="outline" color="red" mt="sm">
            Delete Account
          </Button>
        </Group>
      </Box>
    </Paper>
  );
};
