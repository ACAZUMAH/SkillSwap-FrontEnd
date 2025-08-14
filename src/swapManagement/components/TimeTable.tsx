import {
  ActionIcon,
  Button,
  Card,
  Center,
  Group,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import React from "react";
import { Conditional } from "src/components";
import { formatDate, formatTime } from "src/helpers/date";
import { Swap } from "src/interfaces";
import { TimeTableForm } from "./TimeTableForm";
import { useAppAuthentication } from "src/hooks";
import { TimeTableMobileView } from "./TimeTableMobileView";

interface TimeTableProps {
  swapData: Swap;
}

export const TimeTable: React.FC<TimeTableProps> = ({ swapData }) => {
  const { user } = useAppAuthentication();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Card withBorder>
        <Group justify="space-between" mb="md">
          <Text size="lg" fw={600}>
            Current Timetable
          </Text>
          <Button
            size="sm"
            leftSection={<IconPlus size={16} />}
            variant="light"
            onClick={open}
          >
            Add
          </Button>
        </Group>
        <Conditional condition={opened}>
          <TimeTableForm swapData={swapData} close={close} />
        </Conditional>
        <Conditional condition={!opened}>
          <Conditional condition={Boolean(swapData.timeTable?.length)}>
            <Table.ScrollContainer visibleFrom="sm" minWidth={800}>
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Skill</Table.Th>
                    <Table.Th ta="center">By</Table.Th>
                    <Table.Th ta="center">Day</Table.Th>
                    <Table.Th ta="center">Time</Table.Th>
                    <Table.Th ta="center">Duration</Table.Th>
                    <Table.Th ta="center">Start Date</Table.Th>
                    <Table.Th ta="center">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {swapData?.timeTable?.map((entry, index) => (
                    <Table.Tr key={index}>
                      <Table.Td>{entry?.skill}</Table.Td>
                      <Table.Td ta="center">
                        {entry?.taughtBy === user?.id
                          ? "You"
                          : swapData.senderId !== user?.id
                          ? swapData?.sender?.firstName
                          : swapData?.receiver?.firstName}
                      </Table.Td>
                      <Table.Td ta="center">{entry?.dayOfweek}</Table.Td>
                      <Table.Td ta="center">
                        {formatTime(entry?.time!)}
                      </Table.Td>
                      <Table.Td ta="center">
                        {entry?.durationInWeeks} weeks
                      </Table.Td>
                      <Table.Td ta="center">
                        {formatDate(entry?.startDate)}
                      </Table.Td>
                      <Table.Td ta="center">
                        <ActionIcon variant="transparent" c="red">
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Table.ScrollContainer>
            <Stack gap="xs" mt="xs" hiddenFrom="sm">
              {swapData?.timeTable?.map((entry, index) => (
                <TimeTableMobileView
                  key={index}
                  entry={entry}
                  user={user!}
                  swapData={swapData}
                />
              ))}
            </Stack>
          </Conditional>
          <Conditional condition={!swapData.timeTable?.length}>
            <Center py="xl">
              <Text c="dimmed">No timetable entries yet</Text>
            </Center>
          </Conditional>
        </Conditional>
      </Card>
    </>
  );
};
