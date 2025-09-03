import { ActionIcon, Badge, Card, Group, Text } from "@mantine/core";
import { IconCheck, IconEdit, IconTrash, IconX } from "@tabler/icons-react";
import React from "react";
import { formatDate, formatTime } from "src/helpers/date";
import { ScheduleStatus, Session, Swap, UpdateSwapSessionInput, User } from "src/interfaces";
import { getStatusColor } from "../helpers";
import { useUpdateSwapSessionMutation } from "../hooks/useUpdateSwapSessionMutation";
import { useDeleteSessionMutation } from "../hooks/useDeleteSessionMutation";

interface SessionsMobileViewProps {
  session: any; // TODO Replace 'any' with the actual type of entry
  swapData: Swap;
  user: User;
  updateSession: (session: Session) => void;
}

export const SessionsMobileView: React.FC<SessionsMobileViewProps> = ({
  session,
  swapData,
  user,
  updateSession,
}) => {
  const { handleUpdateSwapSession } = useUpdateSwapSessionMutation();
  const { handleDeleteSessionEntry } = useDeleteSessionMutation();
  const teacher =
    session?.taughtBy === user?.id
      ? "You"
      : swapData.senderId! !== user?.id
      ? swapData?.sender?.firstName
      : swapData?.receiver?.firstName;
  const student =
    session?.receivedBy === user?.id
      ? "You"
      : swapData.senderId! !== user?.id
      ? swapData?.receiver?.firstName
      : swapData?.sender?.firstName;
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
    <Card withBorder padding="sm">
      <Group justify="space-between" mb={4}>
        <Text fw={600} size="sm">
          {session?.skill}
        </Text>
        <Group gap={4}>
          <ActionIcon variant="subtle" color="green" size="sm"
            onClick={() => updateStatus({ sessionId: session?.id!, status: ScheduleStatus.Completed }) }>
            <IconCheck size={14} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red" size="sm"
            onClick={() => updateStatus({ sessionId: session?.id!, status: ScheduleStatus.Cancelled }) }>
            <IconX size={14} />
          </ActionIcon>

          <ActionIcon variant="subtle" color="blue" size="sm"
                                      onClick={() => updateSession(session!)}
          >
            <IconEdit size={14} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="blue" size="sm"
            onClick={() => deleteSession(session?.id!)}
          >
            <IconTrash size={14} />
          </ActionIcon>
        </Group>
      </Group>
      <Group gap={6} wrap="wrap">
        <Badge size="sm" variant="light">
          {formatDate(session?.date)}
        </Badge>
        <Badge size="sm" variant="light" color="grape">
          {formatTime(session?.time)}
        </Badge>
        <Badge size="sm" variant="light" color="teal">
          T: {teacher}
        </Badge>
        <Badge size="sm" variant="light" color="cyan">
          S: {student}
        </Badge>
        <Badge
          size="sm"
          variant="light"
          color={getStatusColor(session?.status!)}
        >
          {session?.status}
        </Badge>
      </Group>
    </Card>
  );
};
