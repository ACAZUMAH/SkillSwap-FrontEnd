import { ActionIcon, Badge, Card, Group, Text } from "@mantine/core";
import { IconCheck, IconEdit, IconX } from "@tabler/icons-react";
import React from "react";
import { formatDate, formatTime } from "src/helpers/date";
import { Swap, User } from "src/interfaces";
import { getStatusColor } from "../helpers";

interface SessionsMobileViewProps {
  session: any; // TODO Replace 'any' with the actual type of entry
  swapData: Swap;
  user: User;
}

export const SessionsMobileView: React.FC<SessionsMobileViewProps> = ({
  session,
  swapData,
  user,
}) => {
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

  return (
    <Card withBorder padding="sm">
      <Group justify="space-between" mb={4}>
        <Text fw={600} size="sm">
          {session?.skill}
        </Text>
        <Group gap={4}>
          {session?.status === "SCHEDULED" && (
            <>
              <ActionIcon variant="subtle" color="green" size="sm">
                <IconCheck size={14} />
              </ActionIcon>
              <ActionIcon variant="subtle" color="red" size="sm">
                <IconX size={14} />
              </ActionIcon>
            </>
          )}
          <ActionIcon variant="subtle" color="blue" size="sm">
            <IconEdit size={14} />
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
