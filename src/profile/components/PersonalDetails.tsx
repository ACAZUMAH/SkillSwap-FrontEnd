import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Center,
  Group,
  Paper,
  rem,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconCamera, IconLink, IconPencil } from "@tabler/icons-react";
import React from "react";
import { getInitialsNameLatter } from "src/helpers";
import { useDisclosure, useHover } from "@mantine/hooks";
import { UpdatePersonalDetailsModal } from "../modals/UpdatePersonalDetailsModal";
import { Conditional } from "src/components";
import { PersonalDetailsProps } from "../interfaces";

export const PersonalDetails: React.FC<PersonalDetailsProps> = ({ user }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { hovered, ref } = useHover();

  return (
    <>
      <Card padding="md" radius="md" withBorder>
        <ActionIcon
          variant="transparent"
          style={{
            position: "absolute",
            top: rem(10),
            right: rem(10),
            zIndex: 1,
          }}
          aria-label="Edit profile"
          onClick={open}
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
            ref={ref}
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
            onClick={open}
          >
            <Group>
              <Conditional condition={!hovered}>
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
              </Conditional>
              <Conditional condition={hovered}>
                <Stack
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    background: "#1f5de5",
                    cursor: "pointer",
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                  justify="center"
                  align="center"
                >
                  <IconCamera stroke={1.5} size={25} color="white" />
                </Stack>
              </Conditional>
            </Group>
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
      <UpdatePersonalDetailsModal opened={opened} onClose={close} user={user} />
    </>
  );
};
