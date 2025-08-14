import React from "react";
import { useCalendarActions } from "../hooks/useSwapActions";
import { Conditional } from "src/components";
import { Text } from "@mantine/core";

interface EmptyScheduleProps {
  actions: ReturnType<typeof useCalendarActions>;
  selectedDate: Date;
}

export const EmptySchedule: React.FC<EmptyScheduleProps> = ({
  actions,
  selectedDate,
}) => {
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
  const sessions = actions.getSessionsForDate(selectedDate);
  return (
    <>
      <Conditional
        condition={
          activeTimetableEntries?.length === 0 && sessions?.length === 0
        }
      >
        <Text c="dimmed" ta="center" py="md">
          No classes scheduled for this date
        </Text>
      </Conditional>
    </>
  );
};
