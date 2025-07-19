import {
  ActionIcon,
  Alert,
  Badge,
  Button,
  Card,
  Group,
  rem,
  Text,
  Title,
} from "@mantine/core";
import { IconPencil, IconPlus } from "@tabler/icons-react";
import React from "react";
import { Conditional } from "src/components";
import { User } from "src/interfaces";

interface AvailabilityProps {
  user?: User;
}

export const Availability: React.FC<AvailabilityProps> = ({ user }) => {
  const showDetails = Boolean(user?.education);
  return (
    <>
      <Title order={3} mt="xl" mb="md">
        Availability
      </Title>

      <Card mb="xl" padding="md" radius="md" withBorder>
        <Conditional condition={showDetails}>
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
          <Group justify="space-between" mb="md">
            {user?.availability?.map((aval, i) => (
                <Badge key={i} variant="default" size="lg" radius="sm">
                    {aval}
                </Badge>
            ))}
          </Group>
        </Conditional>
        <Conditional condition={!showDetails}>
          <Alert>
            <Group>
              <Text size="sm" flex={1}>
                Add your availability details to let other swappers know when
                you are available.
              </Text>
              <Button variant="outline" leftSection={<IconPlus size={16} />}>
                Add Availability
              </Button>
            </Group>
          </Alert>
        </Conditional>
      </Card>
    </>
  );
};
