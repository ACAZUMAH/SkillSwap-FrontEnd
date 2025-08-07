import { Card, Center, Divider, Grid, Stack, Text } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import React, { useState } from "react";
import { Swap } from "src/interfaces";
import { Conditional } from "src/components";
import { formatDate } from "src/helpers/date";
import { useAppAuthentication } from "src/hooks";
import { CalanderDay } from "./CalanderDay";
import { SessionCard } from "./SessionCard";
import { useCalanderActions } from "../hooks/useSwapActions";
import { TimeTableCard } from "./TimeTableCard";
import { EmptySchedule } from "./EmptySchedule";

interface CalanderProps {
  swapData: Swap;
}

export const Calander: React.FC<CalanderProps> = ({ swapData }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { user } = useAppAuthentication();
  const actions = useCalanderActions(swapData);

  return (
    <>
      <Grid>
        <Grid.Col span={6}>
          <Card withBorder>
            <Center>
              <Calendar
                size="xl"
                getDayProps={(date) => ({
                  selected:
                    new Date(date).toDateString() ===
                    selectedDate.toDateString(),
                  onClick: () => setSelectedDate(new Date(date)),
                })}
                renderDay={(date) => (
                  <CalanderDay
                    actions={actions}
                    date={date}
                    user={user}
                  />
                )}
              />
            </Center>
          </Card>
        </Grid.Col>
        <Grid.Col span={6}>
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
