import {
  Box,
  Button,
  Divider,
  Group,
  Modal,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useUpdateAdditionalInfoForm } from "../hooks/useUpdateAdditionalInfoForm";
import { User } from "src/interfaces";
import { Conditional } from "src/components";
import { useUpdateUserProfileMutation } from "../hooks/useUpdateUserProfileMutation";

interface Props {
  opened: boolean;
  onClose: () => void;
  user?: User;
}

export const UpdateAditionalInfo: React.FC<Props> = ({
  opened,
  onClose,
  user,
}) => {
  const [addLinks, setAddlinks] = useState(false);

  const form = useUpdateAdditionalInfoForm(user);

  const { updateUser, loading } = useUpdateUserProfileMutation();

  const handleUpdate = async () => {
    const res = await updateUser({
      bio: form.values.bio,
      linkedIn: form.values.linkedIn,
      gitHub: form.values.gitHub,
      portfolio: form.values.portfolio,
    });

    if (res?.id) {
      form.resetForm();
      onClose();
    }
  };

  useEffect(() => {
    if (
      form.values.gitHub !== "" ||
      form.values.linkedIn !== "" ||
      form.values.portfolio !== ""
    ) {
      setAddlinks(true);
    }
  }, [form]);

  return (
    <Modal
      onClose={onClose}
      opened={opened}
      size="lg"
      title="Additional Information"
    >
      <Box p="md">
        <Title order={5} mb="xs">
          About you
        </Title>
        <Text mb="xs">
          Tell us a bit about yourself, your interests, and what you hope to
          achieve through SkillSwap. This helps other swappers understand you
          better.
        </Text>
        <Textarea
          label="About"
          name="bio"
          radius="md"
          placeholder="Include a few brief about yourself."
          minRows={4}
          value={form.values.bio}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.bio && form.errors.bio}
        />
        <Divider my="xl" />
        <Title order={5} mt="md" mb="xs">
          Links
        </Title>
        <Text>
          Already have a LinkedIn profile, GitHub account, or personal
          portfolio? Add up the links to make it easier for other swappers to
          view your work.
        </Text>

        <Conditional condition={addLinks}>
          <Group mt="md">
            <TextInput
              radius="xl"
              w={100}
              value={"LinkedIn"}
              readOnly
              disabled
            />
            <TextInput
              flex={1}
              radius="xl"
              name="linkedIn"
              placeholder="https://"
              value={form.values.linkedIn}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.linkedIn && form.errors.linkedIn}
            />
          </Group>
          <Group mt="md">
            <TextInput radius="xl" w={100} value={"gitHub"} readOnly disabled />
            <TextInput
              flex={1}
              name="gitHub"
              radius="xl"
              placeholder="https://"
              value={form.values.gitHub}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.gitHub && form.errors.gitHub}
            />
          </Group>
          <Group mt="md">
            <TextInput
              radius="xl"
              w={100}
              value={"Portfolio"}
              readOnly
              disabled
            />
            <TextInput
              flex={1}
              radius="xl"
              name="portfolio"
              placeholder="https://"
              value={form.values.portfolio}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.portfolio && form.errors.portfolio}
            />
          </Group>
        </Conditional>
        <Conditional condition={!addLinks}>
          <Button
            mt="md"
            radius="xl"
            size="sm"
            variant="light"
            leftSection={<IconPlus size={16} />}
            onClick={() => setAddlinks(true)}
          >
            Add Link
          </Button>
        </Conditional>
        <Divider my="xl" />

        <Group justify="flex-end">
          <Button radius="xl" onClick={handleUpdate} loading={loading}>
            Save Changes
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};
