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
  Tooltip,
} from "@mantine/core";
import {
  IconBrandDaysCounter,
  IconPencil,
  IconPlus,
} from "@tabler/icons-react";
import React from "react";
import { Conditional } from "src/components";
import { UpdateAvailabiltyModal } from "../modals/UpdateAvailabiltyModal";
import { useDisclosure } from "@mantine/hooks";
import { AvailabilityProps } from "../interfaces";

export const Availability: React.FC<AvailabilityProps> = ({ user }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const showDetails = Boolean(
    user?.availability && user?.availability?.length > 0
  );
  return (
    <>
      <Title order={3} mt="xl" mb="md">
        Availability
      </Title>

      <Card mb="xl" padding="md" radius="md" withBorder>
        <Conditional condition={showDetails}>
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
          <Text mb="md" size="sm" c="dimmed">
            You are available on the following days:
          </Text>
          <Group mb="md">
            {user?.availability?.map((aval, i) => (
              <Badge
                key={i}
                variant="default"
                size="lg"
                radius="xl"
                leftSection={<IconBrandDaysCounter size={16} />}
              >
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
              <Button
                variant="outline"
                leftSection={<IconPlus size={16} />}
                onClick={open}
              >
                Add Availability
              </Button>
            </Group>
          </Alert>
        </Conditional>
      </Card>

      <UpdateAvailabiltyModal opened={opened} onClose={close} />
    </>
  );
};
