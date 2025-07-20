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
          placeholder="Include a few brief about yourself."
          maxRows={6}
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
            <TextInput w={100} value={"LinkedIn"} readOnly disabled />
            <TextInput
              flex={1}
              name="linkedIn"
              placeholder="https://"
              value={form.values.linkedIn}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.linkedIn && form.errors.linkedIn}
            />
          </Group>
          <Group mt="md">
            <TextInput w={100} value={"gitHub"} readOnly disabled />
            <TextInput
              flex={1}
              name="gitHub"
              placeholder="https://"
              value={form.values.gitHub}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.gitHub && form.errors.gitHub}
            />
          </Group>
          <Group mt="md">
            <TextInput w={100} value={"Portfolio"} readOnly disabled />
            <TextInput
              flex={1}
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

        <Button radius="xl">Save</Button>
      </Box>
    </Modal>
  );
};
