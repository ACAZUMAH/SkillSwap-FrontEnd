import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Center,
  Group,
  Paper,
  rem,
  Text,
  Title,
} from "@mantine/core";
import { IconCancel, IconLink, IconPencil } from "@tabler/icons-react";
import React from "react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { getInitialsNameLatter } from "src/helpers";
import { User } from "src/interfaces";

interface PersonalDetailsProps {
  user?: User;
}
export const PersonalDetails: React.FC<PersonalDetailsProps> = ({ user }) => {
  return (
    <>
      <Card padding="md" radius="md" withBorder>
        <ActionIcon
          onClick={() => {}}
          variant="transparent"
          style={{
            position: "absolute",
            top: rem(10),
            right: rem(10),
            zIndex: 1,
          }}
          aria-label="Edit profile"
        >
          <IconPencil size={18} />
        </ActionIcon>

        <Title order={4} ta="center" mt="sm" mb="md">
          Personal Details
        </Title>

        <Center style={{ flexDirection: "column" }} mb="md">
          <Paper
            mt="lg"
            p="xs"
            style={{
              cursor: "pointer",
              borderRadius: "50%",
              width: 150,
              height: 150,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
            }}
          >
            <Dropzone
              onDrop={() => {}}
              accept={[...IMAGE_MIME_TYPE]}
              style={{
                width: 150,
                height: 150,
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
                      width: 140,
                      height: 140,
                      borderRadius: "50%",
                      background: "#1f5de5",
                      cursor: "pointer",
                    }}
                  >
                    <Text c="white" size="3rem" fw="bold">
                      {getInitialsNameLatter(user?.firstName!)}
                    </Text>
                  </Avatar>
                </Dropzone.Idle>
              </Group>
            </Dropzone>
          </Paper>
          <Title mt="lg" order={2} ta="center">
            {user?.firstName} {user?.lastName}
          </Title>

          <Button
            variant="outline"
            mt="xl"
            radius="xl"
            size="md"
            w={230}
            leftSection={<IconLink size={16} />}
          >
            Share Profile
          </Button>
        </Center>
      </Card>
    </>
  );
};
