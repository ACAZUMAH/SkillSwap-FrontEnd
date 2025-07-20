import {
  Avatar,
  Box,
  Button,
  Group,
  Modal,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconCamera, IconCancel } from "@tabler/icons-react";
import React from "react";
import { getInitialsNameLatter } from "src/helpers";
import {
  useProfileImageform,
  useUpdatePersonalInfoForm,
} from "src/profile/hooks/UseUpdatePersonalInfoForm";
import { User } from "src/interfaces";
import { Conditional } from "src/components";
import { useHover } from "@mantine/hooks";

interface UpdatePersonalDetailsModalProps {
  opened: boolean;
  onClose: () => void;
  user?: User;
}

export const UpdatePersonalDetailsModal: React.FC<
  UpdatePersonalDetailsModalProps
> = ({ opened, onClose, user }) => {
  const { hovered, ref } = useHover();
  const form = useUpdatePersonalInfoForm(user);
  const imageForm = useProfileImageform();

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text size="lg" fw="bold">
          Personal Details
        </Text>
      }
      size="lg"
    >
      <Box p="md">
        <Text>
          Add your personal details as you would like it to appear on your
          profile.
        </Text>

        <Title order={5} mt="md">
          Profile Photo
        </Title>

        <Paper
          mt="lg"
          p="xs"
          ref={ref}
          style={{
            cursor: "pointer",
            borderRadius: "50%",
            width: 190,
            height: 190,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
          }}
        >
          <Dropzone
            onDrop={(file) => imageForm.handleFileChange(file[0])}
            accept={[...IMAGE_MIME_TYPE]}
            style={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Group>
              <Dropzone.Accept>
                <h1>drop</h1>
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconCancel />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <Conditional condition={!hovered}>
                  <Avatar
                    size={100}
                    src={user?.profile_img}
                    style={{
                      width: 190,
                      height: 190,
                      borderRadius: "50%",
                      background: "#1f5de5",
                      cursor: "pointer",
                    }}
                  >
                    <Text c="white" size="3rem" fw="bold">
                      {getInitialsNameLatter(user?.firstName!)}
                    </Text>
                  </Avatar>
                </Conditional>
                <Conditional condition={hovered}>
                  <Stack
                    style={{
                      width: 200,
                      height: 200,
                      borderRadius: "50%",
                      background: "#1f5de5",
                      cursor: "pointer",
                      backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                    justify="center"
                    align="center"
                  >
                    <IconCamera stroke={1.5} size={40} color="white" />
                  </Stack>
                </Conditional>
              </Dropzone.Idle>
            </Group>
          </Dropzone>
        </Paper>

        <Text mt="lg">
          Maximum size: 1MB. Supported formats: JPG, GIF, or PNG.
        </Text>

        <TextInput
          withAsterisk
          label="First Name"
          name="firstName"
          placeholder="Enter your first name"
          mt="xl"
          value={form.values.firstName}
          onChange={(event) =>
            form.setFieldValue("firstName", event.currentTarget.value)
          }
          onBlur={form.handleBlur}
          error={form.touched.firstName ? form.errors.firstName : ""}
        />

        <TextInput
          withAsterisk
          label="Last Name"
          name="lastName"
          placeholder="Enter your last name"
          mt="md"
          value={form.values.lastName}
          onChange={(event) =>
            form.setFieldValue("lastName", event.currentTarget.value)
          }
          onBlur={form.handleBlur}
          error={form.touched.lastName ? form.errors.lastName : ""}
        />

        <Button mt="xl" radius="xl">
          Save
        </Button>
      </Box>
    </Modal>
  );
};
