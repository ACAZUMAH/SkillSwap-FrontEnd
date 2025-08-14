import React from "react";
import { useCalendarActions } from "../hooks/useSwapActions";
import { User } from "src/interfaces";
import {
  Badge,
  Divider,
  Group,
  HoverCard,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { Conditional } from "src/components";
import { getStatusColor } from "../helpers";
import { DayContent } from "./DayContent";
import { formatDate, formatTime } from "src/helpers/date";

interface CalendarDayProps {
  actions: ReturnType<typeof useCalendarActions>;
  date: string;
  user?: User;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
  actions,
  date,
  user,
}) => {
  const sessions = actions.getSessionsForDate(new Date(date));
  const dayName = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  });
  const timetableEntries = actions.getTimetableForDay(dayName);

  const activeTimetableEntries = timetableEntries?.filter((entry) => {
    const startDate = new Date(entry?.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + entry?.durationInWeeks! * 7);
    return new Date(date) >= startDate && new Date(date) <= endDate;
  });

  const hasSession = sessions?.length! > 0;
  const hasTimetableClass = activeTimetableEntries?.length! > 0;
  const hasAnyClass = hasSession || hasTimetableClass;

  if (!hasAnyClass) {
    return <DayContent date={date} hasAnyClass={hasAnyClass} />;
  }

  return (
    <>
      <HoverCard width={280} shadow="md" position="top">
        <HoverCard.Target>
          <div tabIndex={0}>
            <DayContent date={date} hasAnyClass={hasAnyClass} />
          </div>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Stack gap="xs">
            <Text fw={600} size="sm">
              {formatDate(new Date(date))}
            </Text>

            <Conditional condition={Boolean(activeTimetableEntries?.length)}>
              <>
                <Text size="xs" fw={500} c="blue">
                  Regular Classes:
                </Text>
                {activeTimetableEntries?.map((entry, index) => (
                  <Paper key={`timetable-${index}`} p="xs" withBorder>
                    <Group justify="space-between" gap="xs">
                      <div>
                        <Text size="xs" fw={500}>
                          {entry?.skill}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {formatTime(entry?.time!)} • Week{" "}
                          {Math.floor(
                            (new Date(date).getTime() -
                              new Date(entry?.startDate).getTime()) /
                              (7 * 24 * 60 * 60 * 1000)
                          ) + 1}{" "}
                          of {entry?.durationInWeeks}
                        </Text>
                      </div>
                      <Badge size="xs" color="blue" variant="light">
                        Timetable
                      </Badge>
                    </Group>
                  </Paper>
                ))}
              </>
            </Conditional>

            <Conditional condition={Boolean(sessions?.length)}>
              <>
                <Conditional
                  condition={Boolean(activeTimetableEntries?.length)}
                >
                  <Divider />
                </Conditional>
                <Text size="xs" fw={500} c="green">
                  Scheduled Sessions:
                </Text>
                {sessions?.map((session, index) => (
                  <Paper key={`session-${index}`} p="xs" withBorder>
                    <Group justify="space-between" gap="xs">
                      <div>
                        <Text size="xs" fw={500}>
                          {session?.skill}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {session?.time} •{" "}
                          {session?.taughtBy === user?.id
                            ? "Teaching"
                            : "Learning"}
                        </Text>
                      </div>
                      <Badge
                        size="xs"
                        color={getStatusColor(session?.status!)}
                        variant="light"
                      >
                        {session?.status}
                      </Badge>
                    </Group>
                  </Paper>
                ))}
              </>
            </Conditional>
          </Stack>
        </HoverCard.Dropdown>
      </HoverCard>
    </>
  );
};
