import {
  Anchor,
  Button,
  Group,
  Modal,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { User } from "src/interfaces";
import { useUpdateAvailabilityForm } from "../hooks/useUpdateAvailabilityForm";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Conditional } from "src/components";
import { CapitalizeFirstLetter } from "../helpers";
import { useUpdateUserProfileMutation } from "../hooks/useUpdateUserProfileMutation";

interface UpdateAvailabiltyModalProps {
  opened: boolean;
  onClose: () => void;
  user?: User;
}

export const UpdateAvailabiltyModal: React.FC<UpdateAvailabiltyModalProps> = ({
  opened,
  onClose,
  user,
}) => {
  const [day, setDay] = useState<string>("");
  const [openform, setOpenForm] = useState(false);
  const form = useUpdateAvailabilityForm(user);
  const { updateUser, loading } = useUpdateUserProfileMutation();

  useEffect(() => {
    if (!form.values.availability.length) {
      setOpenForm(true);
    }
  }, [form.values.availability]);

  const handleAddDay = () => {
    if (day.trim() === "") return;
    form.addAvailability(day);
    setDay("");
  };

  const handleUpdate = async () => {
    const update = await updateUser({
      availability: form.values.availability,
    });
    if (update?.id) {
      form.resetForm();
      onClose();
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Availability">
      <Text mb="md">
        Add your days to let other swappers know what days you are available.
      </Text>
      <Conditional condition={openform}>
        <Group mb="md">
          <TextInput
            flex={1}
            radius="xl"
            placeholder="Enter days you are available"
            value={day}
            onChange={(event) =>
              setDay(CapitalizeFirstLetter(event.currentTarget.value))
            }
          />
          <Button
            radius="xl"
            leftSection={<IconPlus size={16} />}
            onClick={() => {
              handleAddDay();
              setOpenForm(false);
            }}
          >
            Add
          </Button>
        </Group>
      </Conditional>
      <Conditional condition={form.values.availability.length > 0}>
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th ta="left">Days</Table.Th>
              <Table.Th ta="right">
                <Anchor
                  underline="never"
                  onClick={() => {
                    setOpenForm(!openform);
                  }}
                >
                  Add New
                </Anchor>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {form.values.availability?.map((day, index) => (
              <Table.Tr key={index}>
                <Table.Td ta="left">
                  <Text>{day}</Text>
                </Table.Td>
                <Table.Td ta="right">
                  <Anchor
                    mr="md"
                    underline="never"
                    c="red"
                    onClick={() => form.removeAvailability(day!)}
                  >
                    <IconTrash stroke={1.5} size={20} />
                  </Anchor>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Conditional>

      <Group justify="flex-end" mt="lg">
        <Button radius="xl" mt="md" onClick={handleUpdate} loading={loading}>
          Save Changes
        </Button>
      </Group>
    </Modal>
  );
};
