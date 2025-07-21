import {
  Box,
  Button,
  Divider,
  Group,
  Modal,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import React from "react";
import { createSelectDegreeData } from "src/profile/helpers";
import { degrees } from "../constants";
import { User } from "src/interfaces";
import { useUpdateEducationForm } from "../hooks/useUpdateEducationForm";
import { useUpdateUserProfileMutation } from "../hooks/useUpdateUserProfileMutation";

interface UpdateEducationModalProps {
  opened: boolean;
  onClose: () => void;
  user?: User;
}

export const UpdateEducationModal: React.FC<UpdateEducationModalProps> = ({
  opened,
  onClose,
  user,
}) => {
  const form = useUpdateEducationForm(user);

  const { updateUser, loading } = useUpdateUserProfileMutation();

  const handleUpdate = async () => {
    const update = await updateUser({
      education: {
        institution: form.values.institution,
        degree: form.values.degree,
        fieldOfStudy: form.values.fieldOfStudy,
        level: form.values.level,
        ...(form.values.startDate && {
          startDate: new Date(form.values.startDate),
        }),
        ...(form.values.endDate && {
          endDate: new Date(form.values.endDate),
        }),
      },
    });

    if (update?.id) {
      form.resetForm();
      onClose();
    }
  };
  return (
    <Modal onClose={onClose} opened={opened} title="Education" size="lg">
      <Box p="md">
        <Text>
          Update your education details here. This section allows others to you
          where studied or is currently studying, including degrees,
          institutions, and years attended.
        </Text>

        <TextInput
          mt="md"
          radius="xl"
          withAsterisk
          label="Name of institution"
          name="institution"
          placeholder="Enter the name of your institution"
          value={form.values.institution}
          onChange={(event) =>
            form.setFieldValue("institution", event.currentTarget.value)
          }
          onBlur={form.handleBlur}
          error={form.touched.institution && form.errors.institution}
        />

        <Select
          mt="md"
          radius="xl"
          label="Degree"
          name="degree"
          withAsterisk
          placeholder="Select Degree"
          data={createSelectDegreeData(degrees)}
          value={form.values.degree}
          onChange={(value) => form.setFieldValue("degree", value)}
          onBlur={form.handleBlur}
          error={form.touched.degree && form.errors.degree}
        />

        <TextInput
          mt="md"
          radius="xl"
          label="Field of Study"
          name="fieldOfStudy"
          placeholder="Enter your field of study"
          value={form.values.fieldOfStudy}
          onChange={(event) =>
            form.setFieldValue("fieldOfStudy", event.currentTarget.value)
          }
          onBlur={form.handleBlur}
          error={form.touched.fieldOfStudy && form.errors.fieldOfStudy}
        />

        <TextInput
          mt="md"
          radius="xl"
          label="Level of Education"
          name="level"
          withAsterisk
          placeholder="Enter your level of education"
          value={form.values.level}
          onChange={(event) =>
            form.setFieldValue("level", event.currentTarget.value)
          }
          onBlur={form.handleBlur}
          error={form.touched.level && form.errors.level}
        />

        <Divider my="xl" />
        <Group grow>
          <DateInput
            radius="xl"
            label="Start Date"
            name="startDate"
            placeholder="Select start date"
            value={form.values.startDate}
            onChange={(date) => {
              if (date) {
                form.setFieldValue("startDate", new Date(date));
              }
            }}
            onBlur={form.handleBlur}
            error={form.touched.startDate && (form.errors.startDate as string)}
          />
          <DateInput
            radius="xl"
            label="Graduation Date"
            name="endDate"
            placeholder="Select graduation date"
            value={form.values.endDate ? new Date(form.values.endDate) : null}
            onChange={(date) => {
              if (date) {
                form.setFieldValue("endDate", new Date(date));
              }
            }}
            onBlur={form.handleBlur}
            error={form.touched.endDate && (form.errors.endDate as string)}
          />
        </Group>

        <Group justify="flex-end" mt="xl">
          <Button radius="xl" onClick={handleUpdate} loading={loading}>
            Save Changes
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};
