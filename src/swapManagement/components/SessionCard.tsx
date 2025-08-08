import React from "react";
import { useCalanderActions } from "../hooks/useSwapActions";
import { Badge, Group, Paper, Text } from "@mantine/core";
import { getStatusColor } from "../helpers";
import { User } from "src/interfaces";

interface SessionCardProps {
  actions: ReturnType<typeof useCalanderActions>;
  selectedDate: Date;
  user?: User;
}

export const SessionCard: React.FC<SessionCardProps> = ({
  actions,
  selectedDate,
  user,
}) => {
  return (
    <>
      {actions.getSessionsForDate(selectedDate)?.map((session, index) => (
        <Paper key={`session-detail-${index}`} p="sm" withBorder>
          <Group justify="space-between" mb="xs">
            <Text fw={500}>{session?.skill}</Text>
            <Badge color={getStatusColor(session?.status!)} size="sm">
              {session?.status}
            </Badge>
          </Group>
          <Text size="sm" c="dimmed">
            {session?.time} •{" "}
            {session?.taughtBy === user?.id ? "Teaching" : "Learning"}
          </Text>
        </Paper>
      ))}
    </>
  );
};
