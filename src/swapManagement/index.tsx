"use client";

import React, { useState } from "react";
import { Modal, Group, Tabs, Title, Loader, Center, Alert } from "@mantine/core";
import {
  IconCalendar,
  IconClock,
  IconUser,
  IconExchange,
} from "@tabler/icons-react";
import { OverView } from "./components/OverView";
import { TimeTableTab } from "./components/TimeTableTab";
import { Sessions } from "./components/Sessions";
import { CalendarTab } from "./components/Calendar";
import { getSwapByUsersQuery } from "./hooks/useGetSwapQuery";
import { CapitalizeFirstLetter } from "src/helpers";
import { Conditional } from "src/components";

interface SwapModalProps {
  senderId: string;
  receiverId: string;
  opened: boolean;
  onClose: () => void;
}

export const SwapModal: React.FC<SwapModalProps> = ({
  opened,
  onClose,
  senderId,
  receiverId,
}) => {
  const [activeTab, setActiveTab] = useState<string | null>("overview");
  const { swap, loading, error } = getSwapByUsersQuery({
    senderId,
    receiverId,
  });

  const shadowErrorAlert  = !loading && !swap && error
  const showNoSwapAlert = !loading && !swap && !error;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group>
          <IconExchange size={24} />
          <Title order={3}>
            {CapitalizeFirstLetter(activeTab || "Overview")}
          </Title>
        </Group>
      }
      size="90%"
      overlayProps={{ backgroundOpacity: 0.55, blur: 4 }}
    >
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="overview" leftSection={<IconUser size={16} />}>
            Overview
          </Tabs.Tab>
          <Tabs.Tab value="timetable" leftSection={<IconClock size={16} />}>
            Timetable
          </Tabs.Tab>
          <Tabs.Tab value="sessions" leftSection={<IconCalendar size={16} />}>
            Sessions
          </Tabs.Tab>
          <Tabs.Tab value="calendar" leftSection={<IconCalendar size={16} />}>
            Calendar
          </Tabs.Tab>
        </Tabs.List>
        <Conditional condition={!loading}>
          <Tabs.Panel value="overview" pt="md">
            <OverView swapData={swap!} />
          </Tabs.Panel>

          <Tabs.Panel value="timetable" pt="md">
            <TimeTableTab swapData={swap!} />
          </Tabs.Panel>

          <Tabs.Panel value="sessions" pt="md">
            <Sessions swapData={swap!} />
          </Tabs.Panel>

          <Tabs.Panel value="calendar" pt="md">
            <CalendarTab swapData={swap!} />
          </Tabs.Panel>
        </Conditional>

        <Conditional condition={loading}>
          <Center>
            <Loader type="dots" size="xl" />
          </Center>
        </Conditional>

        <Conditional condition={showNoSwapAlert}>
          <Center>
            <Alert color="yellow">
              No swap data found for the selected users.
            </Alert>
          </Center>
        </Conditional>

        <Conditional condition={Boolean(shadowErrorAlert)}>
          <Center>
            <Alert color="red">
              An error occurred while fetching swap data. Please try again later.
            </Alert>
          </Center> 
        </Conditional>
      </Tabs>
    </Modal>
  );
};
