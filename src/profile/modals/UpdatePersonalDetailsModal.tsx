import {
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
import {
  useProfileImageform,
  useUpdatePersonalInfoForm,
} from "src/profile/hooks/UseUpdatePersonalInfoForm";
import { Conditional } from "src/components";
import { useHover } from "@mantine/hooks";
import { useUpdateUserProfileMutation } from "../hooks/useUpdateUserProfileMutation";
import { useUploadProfileImage } from "../hooks/useUploadProfileImage";
import { UpdatePersonalDetailsModalProps } from "../interfaces";
import { useAppSettings } from "src/hooks";
import { UserAvatar } from "src/components/Avatar/UserAvatar";

export const UpdatePersonalDetailsModal: React.FC<
  UpdatePersonalDetailsModalProps
> = ({ opened, onClose, user }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { hovered, ref } = useHover();
  const form = useUpdatePersonalInfoForm(user);
  const imageForm = useProfileImageform();
  const { updateUser, loading } = useUpdateUserProfileMutation();
  const { uploadProfileImage } = useUploadProfileImage();
  const { isDarkMode } = useAppSettings();

  const url = imageForm.values.profileImgFile
    ? URL.createObjectURL(imageForm.values.profileImgFile)
    : undefined;

  const handleSubmit = async () => {
    if (imageForm.values.profileImgFile) {
      setIsLoading(true);
      const profile_img = await uploadProfileImage(
        imageForm.values.profileImgFile
      );
      setIsLoading(false);
      const res = await updateUser({
        firstName: form.values.firstName,
        lastName: form.values.lastName,
        profile_img: profile_img || user?.profile_img,
      });
      if (res?.id) {
        form.resetForm();
        onClose();
      }
    } else {
      const res = await updateUser({
        firstName: form.values.firstName,
        lastName: form.values.lastName,
        profile_img: user?.profile_img,
      });

      if (res?.id) {
        form.resetForm();
        onClose();
      }
    }
  };

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
                <UserAvatar
                  width={190}
                  height={190}
                  url={url}
                  name={user?.firstName!}
                  radius="50%"
                  size={100}
                  textSize="3rem"
                  textColor="white"
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconCancel />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <Conditional condition={!hovered}>
                  <UserAvatar
                    width={190}
                    height={190}
                    url={url || user?.profile_img!}
                    name={user?.firstName!}
                    radius="50%"
                    size={100}
                    textSize="3rem"
                    textColor="white"
                    onLoad={() => {
                      URL.revokeObjectURL(url!);
                    }}
                  />
                </Conditional>
                <Conditional condition={hovered}>
                  <Stack
                    style={{
                      width: 200,
                      height: 200,
                      borderRadius: "50%",
                      background: "#1f5de5",
                      cursor: "pointer",
                      backgroundColor: isDarkMode
                        ? "rgba(0,0,0,0.5)"
                        : "rgba(0,0,0,0.9)",
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
          radius="xl"
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
          radius="xl"
          placeholder="Enter your last name"
          mt="md"
          value={form.values.lastName}
          onChange={(event) =>
            form.setFieldValue("lastName", event.currentTarget.value)
          }
          onBlur={form.handleBlur}
          error={form.touched.lastName ? form.errors.lastName : ""}
        />

        <Group justify="flex-end" mt="xl">
          <Button
            radius="xl"
            onClick={handleSubmit}
            loading={loading || isLoading}
          >
            Save Changes
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};
