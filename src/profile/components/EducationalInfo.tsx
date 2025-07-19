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
} from "@mantine/core";
import { IconPencil, IconPlus, IconSchool } from "@tabler/icons-react";
import React from "react";
import { Conditional } from "src/components";
import { User } from "src/interfaces";

interface EducationalInfoProps {
  user?: User;
}

export const EducationalInfo: React.FC<EducationalInfoProps> = ({ user }) => {
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
              <IconSchool size={20} />
              <Stack>
                <Title>{user?.education?.institution}</Title>
                <Text size="sm">
                  {user?.education?.degree} in {user?.education?.fieldOfStudy},
                  expected to graduate in
                  {user?.education?.endDate}
                </Text>
              </Stack>
            </Flex>

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
          </Group>
        </Conditional>
        <Conditional condition={!showDetails}>
          <Alert>
            <Group>
              <Text size="sm" flex={1}>
                Add your educational background here to let other swappers know
                where you studied or are currently studying.
              </Text>
              <Button variant="outline" leftSection={<IconPlus size={16} />}>
                Add Education
              </Button>
            </Group>
          </Alert>
        </Conditional>
      </Card>
    </>
  );
};
