import {
  ActionIcon,
  Alert,
  Button,
  Card,
  Flex,
  Group,
  rem,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconPencil, IconPlus, IconSchool } from "@tabler/icons-react";
import React from "react";
import { Conditional } from "src/components";
import { UpdateEducationModal } from "../modals/UpdateEducationModal";
import { useDisclosure } from "@mantine/hooks";
import { formatDate } from "src/helpers/date";
import { EducationalInfoProps } from "../interfaces";

export const EducationalInfo: React.FC<EducationalInfoProps> = ({ user }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const showDetails = Boolean(user?.education);
  return (
    <>
      <Title order={3} mt="xl" mb="md">
        Education
      </Title>

      <Card mb="xl" padding="md" radius="md" withBorder>
        <Conditional condition={showDetails}>
          <Group justify="space-between" mb="md">
            <Flex>
              <IconSchool size={70} stroke={1} color="gray" />
              <Stack gap={2} ml="md">
                <Title order={2} fw={500}>
                  {user?.education?.institution}
                </Title>
                <Text size="sm">
                  {user?.education?.degree} in {user?.education?.fieldOfStudy},{" "}
                  {user?.education?.level}
                </Text>
                <Text size="sm" c="dimmed">
                  {formatDate(user?.education?.startDate)} -{" "}
                  {formatDate(user?.education?.endDate)}
                </Text>
              </Stack>
            </Flex>
            <Tooltip label="Edit" withArrow>
              <ActionIcon
                onClick={open}
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
            </Tooltip>
          </Group>
        </Conditional>
        <Conditional condition={!showDetails}>
          <Alert>
            <Group>
              <Text size="sm" flex={1}>
                Add your educational background here to let other swappers know
                where you studied or are currently studying.
              </Text>
              <Button
                variant="outline"
                leftSection={<IconPlus size={16} />}
                onClick={open}
              >
                Add Education
              </Button>
            </Group>
          </Alert>
        </Conditional>
      </Card>

      <UpdateEducationModal opened={opened} onClose={close} user={user} />
    </>
  );
};
