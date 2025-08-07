import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Center,
  Group,
  Table,
  Text,
} from "@mantine/core";
import React from "react";
import { IconCheck, IconEdit, IconPlus, IconX } from "@tabler/icons-react";
import { getStatusColor } from "../helpers";
import { Swap } from "src/interfaces";
import { Conditional } from "src/components";
import { formatDate } from "src/helpers/date";
import { useAppAuthentication } from "src/hooks";
import { useDisclosure } from "@mantine/hooks";
import { ScheduleSessionForm } from "./ScheduleSession";

interface SessionsProps {
  swapData: Swap;
}

export const Sessions: React.FC<SessionsProps> = ({ swapData }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { user } = useAppAuthentication();

  return (
    <>
      <Card withBorder>
        <Group justify="space-between" mb="md">
          <Text size="lg" fw={600}>
            Scheduled Sessions
          </Text>
          <Button
            leftSection={<IconPlus size={16} />}
            variant="light"
            onClick={open}
          >
            Add
          </Button>
        </Group>
        <Conditional condition={opened}>
          <ScheduleSessionForm swapData={swapData} user={user!} close={close} />
        </Conditional>
        <Conditional condition={!opened}>
          <Conditional condition={Boolean(swapData?.sessions?.length)}>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Skill</Table.Th>
                  <Table.Th ta="center">Date</Table.Th>
                  <Table.Th ta="center">Time</Table.Th>
                  <Table.Th ta="center">Teacher</Table.Th>
                  <Table.Th ta="center">Student</Table.Th>
                  <Table.Th ta="center">Status</Table.Th>
                  <Table.Th ta="center">Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {swapData?.sessions?.map((session, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>{session?.skill}</Table.Td>
                    <Table.Td ta="center">{formatDate(session?.date)}</Table.Td>
                    <Table.Td ta="center">{session?.time}</Table.Td>
                    <Table.Td ta="center">
                      {session?.taughtBy === user?.id
                        ? "You"
                        : swapData.senderId! !== user?.id
                        ? swapData?.sender?.firstName
                        : swapData?.receiver?.firstName}
                    </Table.Td>
                    <Table.Td ta="center">
                      {session?.receivedBy === user?.id
                        ? "You"
                        : swapData.senderId! !== user?.id
                        ? swapData?.receiver?.firstName
                        : swapData?.sender?.firstName}
                    </Table.Td>
                    <Table.Td ta="center">
                      <Badge
                        color={getStatusColor(session?.status!)}
                        variant="light"
                      >
                        {session?.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td ta="center">
                      <Group gap="xs" justify="center">
                        {session?.status === "SCHEDULED" && (
                          <>
                            <ActionIcon variant="light" color="green">
                              <IconCheck size={16} />
                            </ActionIcon>
                            <ActionIcon variant="light" color="red">
                              <IconX size={16} />
                            </ActionIcon>
                          </>
                        )}
                        <ActionIcon variant="light" color="blue">
                          <IconEdit size={16} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Conditional>
          <Conditional condition={!swapData?.sessions?.length}>
            <Center py="xl">
              <Text c="dimmed">No sessions scheduled yet</Text>
            </Center>
          </Conditional>
        </Conditional>
      </Card>
    </>
  );
};
