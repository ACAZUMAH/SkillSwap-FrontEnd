import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Center,
  Group,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import React, { useState } from "react";
import {
  IconCheck,
  IconEdit,
  IconPlus,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { getStatusColor } from "../helpers";
import {
  ScheduleStatus,
  Session,
  Swap,
  UpdateSwapSessionInput,
} from "src/interfaces";
import { Conditional } from "src/components";
import { formatDate, formatTime } from "src/helpers/date";
import { useAppAuthentication } from "src/hooks";
import { useDisclosure } from "@mantine/hooks";
import { ScheduleSessionForm } from "./ScheduleSession";
import { SessionsMobileView } from "./SessionsMobileView";
import { UpdateSessionForm } from "./UpdateSession";
import { useUpdateSwapSessionMutation } from "../hooks/useUpdateSwapSessionMutation";
import { useDeleteSessionMutation } from "../hooks/useDeleteSessionMutation";

interface SessionsProps {
  swapData: Swap;
}

export const SessionsTab: React.FC<SessionsProps> = ({ swapData }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [updateSession, setUpdateSession] = useState<Session>();
  const { user } = useAppAuthentication();
  const { handleUpdateSwapSession } = useUpdateSwapSessionMutation();
  const { handleDeleteSessionEntry } = useDeleteSessionMutation();
  const updateStatus = async (data: UpdateSwapSessionInput) => {
    await handleUpdateSwapSession({
      sessionId: data.sessionId,
      status: data.status,
    });
  };

  const deleteSession = async (sessionId: string) => {
    await handleDeleteSessionEntry(sessionId);
  };

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
            disabled={opened || Boolean(updateSession)}
          >
            Add
          </Button>
        </Group>
        <Conditional condition={opened}>
          <ScheduleSessionForm swapData={swapData} user={user!} close={close} />
        </Conditional>
        <Conditional condition={Boolean(updateSession)}>
          <UpdateSessionForm
            swapData={swapData}
            user={user!}
            currentSession={updateSession!}
            close={() => setUpdateSession(undefined)}
          />
        </Conditional>
        <Conditional condition={!opened && !Boolean(updateSession)}>
          <Conditional condition={Boolean(swapData?.sessions?.length)}>
            <Table.ScrollContainer visibleFrom="sm" minWidth={800}>
              <Table striped highlightOnHover>
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
                      <Table.Td ta="center">
                        {formatDate(session?.date)}
                      </Table.Td>
                      <Table.Td ta="center">
                        {formatTime(session?.time!)}
                      </Table.Td>
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
                          <ActionIcon
                            variant="light"
                            color="green"
                            disabled={
                              session?.status === ScheduleStatus.Completed ||
                              session?.status === ScheduleStatus.Cancelled
                            }
                            // loading={loading}
                            onClick={() => {
                              updateStatus({
                                sessionId: session?.id!,
                                status: ScheduleStatus.Completed,
                              });
                            }}
                          >
                            <IconCheck size={16} />
                          </ActionIcon>
                          <ActionIcon
                            variant="light"
                            color="red"
                            disabled={
                              session?.status === ScheduleStatus.Completed ||
                              session?.status === ScheduleStatus.Cancelled
                            }
                            // loading={loading}
                            onClick={() => {
                              updateStatus({
                                sessionId: session?.id!,
                                status: ScheduleStatus.Cancelled,
                              });
                            }}
                          >
                            <IconX size={16} />
                          </ActionIcon>
                          <ActionIcon
                            variant="light"
                            color="blue"
                            disabled={
                              session?.status === ScheduleStatus.Completed ||
                              session?.status === ScheduleStatus.Cancelled
                            }
                            // loading={loading}
                            onClick={() => setUpdateSession(session!)}
                          >
                            <IconEdit size={16} />
                          </ActionIcon>

                          <ActionIcon
                            variant="transparent"
                            c="red"
                            onClick={() => deleteSession(session?.id!)}
                          >
                            <IconTrash size={16} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Table.ScrollContainer>
            <Stack gap="xs" mt="xs" hiddenFrom="sm">
              {swapData?.sessions?.map((session, index) => (
                <SessionsMobileView
                  updateSession={setUpdateSession}
                  key={index}
                  session={session}
                  swapData={swapData}
                  user={user!}
                />
              ))}
            </Stack>
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
