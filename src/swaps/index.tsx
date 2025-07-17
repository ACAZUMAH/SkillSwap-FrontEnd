import React from "react";
import {
  Container,
  Tabs,
} from "@mantine/core";
import { SentSwaps } from "./components/sentSwaps";
import { ReceivedSwaps } from "./components/receivedSwaps";

export const Swaps: React.FC = () => {
  return (
    <Container w="100%" maw={1400} py={20}>
      <Tabs defaultValue="sent" mb="md">
        <Tabs.List>
          <Tabs.Tab value="sent" fz="md">Sent Swaps</Tabs.Tab>
          <Tabs.Tab value="received" fz="md">Received Swaps</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="sent">
          <SentSwaps />
        </Tabs.Panel>
        <Tabs.Panel value="received">
          <ReceivedSwaps />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};
