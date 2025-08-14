import { Card, Center, Divider, Grid, Paper, Stack, Text } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import React, { useState } from "react";
import { Swap } from "src/interfaces";
import { Conditional } from "src/components";
import { formatDate } from "src/helpers/date";
import { useAppAuthentication } from "src/hooks";
import { CalendarDay } from "./CalenderDay";
import { SessionCard } from "./SessionCard";
import { useCalendarActions } from "../hooks/useSwapActions";
import { TimeTableCard } from "./TimeTableCard";
import { EmptySchedule } from "./EmptySchedule";

interface CalendarProps {
  swapData: Swap;
}

export const CalendarTab: React.FC<CalendarProps> = ({ swapData }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { user } = useAppAuthentication();
  const actions = useCalendarActions(swapData);

  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper withBorder p="xs">
            <Center>
              <Calendar
                size="md"
                getDayProps={(date) => ({
                  selected:
                    new Date(date).toDateString() ===
                    selectedDate.toDateString(),
                  onClick: () => setSelectedDate(new Date(date)),
                })}
                renderDay={(date) => (
                  <CalendarDay actions={actions} date={date} user={user} />
                )}
              />
            </Center>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card withBorder>
            <Text size="lg" fw={600} mb="md">
              {formatDate(selectedDate)}
            </Text>
            <Divider mb="md" />
            <Conditional condition={Boolean(selectedDate)}>
              <Stack gap="sm">
                <TimeTableCard
                  actions={actions}
                  selectedDate={selectedDate}
                  user={user}
                />

                <SessionCard
                  actions={actions}
                  selectedDate={selectedDate}
                  user={user}
                />

                <EmptySchedule actions={actions} selectedDate={selectedDate} />
              </Stack>
            </Conditional>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
};
