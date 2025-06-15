import { Avatar, Group, Paper, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import React from "react";
import { ProfileImageProps } from "../interfaces";
import { useAppAuthentication } from "src/hooks";
import { getInitialsNameLatter } from "src/helpers";
import { IconCancel } from "@tabler/icons-react";

export const ProfileImage: React.FC<ProfileImageProps> = ({ imageForm }) => {
  const { user } = useAppAuthentication();
  return (
    <>
      <Text size="xl" fw="bold">
        Profile Photo
      </Text>
      <Text mt="xs" size="sm" c="dimmed">
        Choose a photo that shows your face clearly and has a professional look.
        {/* If you use other professional platforms, it’s a good idea to
                keep them consistent. */}
      </Text>

      <Paper
        mt="lg"
        p="xs"
        style={{
          cursor: "pointer",
          borderRadius: "50%",
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <Dropzone
          onDrop={() => {imageForm.handleFileChange}}
          accept={[...IMAGE_MIME_TYPE]}
          style={{
            width: 180,
            height: 180,
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
              <Avatar
                size={100}
                src={user?.profile_img}
                style={{
                  width: 170,
                  height: 170,
                  borderRadius: "50%",
                  background: "#1f5de5",
                  cursor: "pointer",
                }}
              >
                {getInitialsNameLatter(user?.firstName!)}
              </Avatar>
            </Dropzone.Idle>
          </Group>
        </Dropzone>
      </Paper>
    </>
  );
};
