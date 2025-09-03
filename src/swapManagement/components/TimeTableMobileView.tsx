import { ActionIcon, Badge, Card, Group, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import React from "react";
import { formatDate, formatTime } from "src/helpers/date";
import { Swap, User } from "src/interfaces";

interface TimeTableMobileViewProps {
  entry: any; // TODO Replace 'any' with the actual type of entry
  swapData: Swap;
  user: User;
  deleteEntry: (entryId: string) => void;
}

export const TimeTableMobileView: React.FC<TimeTableMobileViewProps> = ({
  entry,
  user,
  swapData,
  deleteEntry,
}) => {
  const teacher =
    entry?.taughtBy === user?.id
      ? "You"
      : swapData.senderId !== user?.id
      ? swapData?.sender?.firstName
      : swapData?.receiver?.firstName;
  return (
    <Card withBorder padding="sm">
      <Group justify="space-between" wrap="nowrap" mb={4}>
        <Text fw={600} size="sm">
          {entry?.skill}
        </Text>
        <ActionIcon
          variant="subtle"
          color="red"
          size="sm"
          onClick={() => deleteEntry(entry?.id!)}
        >
          <IconTrash size={14} />
        </ActionIcon>
      </Group>
      <Group gap={6} wrap="wrap">
        <Badge size="sm" variant="light">
          {teacher}
        </Badge>
        <Badge size="sm" variant="light" color="blue">
          {entry?.dayOfweek}
        </Badge>
        <Badge size="sm" variant="light" color="grape">
          {formatTime(entry?.time)}
        </Badge>
        <Badge size="sm" variant="light" color="teal">
          {entry?.durationInWeeks}w
        </Badge>
        <Badge size="sm" variant="light" color="orange">
          {formatDate(entry?.startDate)}
        </Badge>
      </Group>
    </Card>
  );
};
