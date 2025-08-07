import React from "react";
import { useCalanderActions } from "../hooks/useSwapActions";
import { Badge, Group, Paper, Text } from "@mantine/core";
import { User } from "src/interfaces";

interface TimetableProps {
  actions: ReturnType<typeof useCalanderActions>;
  selectedDate: Date;
  user?: User;
}

export const TimeTableCard: React.FC<TimetableProps> = ({ actions, selectedDate, user }) => {
  const dayName = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const timetableEntries = actions.getTimetableForDay(dayName);
  const activeTimetableEntries = timetableEntries?.filter((entry) => {
    const startDate = new Date(entry?.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + entry?.durationInWeeks! * 7);
    return selectedDate >= startDate && selectedDate <= endDate;
  });
  return (
    <>
      {activeTimetableEntries?.map((entry, index) => (
        <Paper key={`timetable-detail-${index}`} p="sm" withBorder>
          <Group justify="space-between" mb="xs">
            <Text fw={500}>{entry?.skill}</Text>
            <Badge color="blue" size="sm">
              Timetable
            </Badge>
          </Group>
          <Text size="sm" c="dimmed">
            {entry?.time} • Week{" "}
            {Math.floor(
              (selectedDate.getTime() - new Date(entry?.startDate).getTime()) /
                (7 * 24 * 60 * 60 * 1000)
            ) + 1}{" "}
            of {entry?.durationInWeeks}
          </Text>
          <Text size="sm" c="dimmed">
            {entry?.taughtBy === user?.id ? "Teaching" : "Learning"}
          </Text>
        </Paper>
      ))}
    </>
  );
};
